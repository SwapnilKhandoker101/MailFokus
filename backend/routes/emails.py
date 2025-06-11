from fastapi import APIRouter,Depends,HTTPException,Request
from pydantic import BaseModel
from sqlalchemy.orm import Session
from bs4 import BeautifulSoup
from database.models import EmailRecord

from utility.extractor import get_message_details, api_call, authenticiate

from database.db import *

from utility.utils import authenticate_and_get_user_details
from database.models import get_db
import json
from datetime import datetime
from AI_engine.ai_engine import AI_engine

router=APIRouter()
engine=AI_engine()
class EmailRequest(BaseModel):
    email_subject:str
    original_email: str

    class Config:
        json_schema_extra = {
            "example": {
                "email_subject":"Developer team meeting on recent progress",
                "original_email": "Hi team, please find the notes from our last meeting attached...",
            }
        }

@router.get("/extract-original-emails")
async def extract_original_emails(request:Request,db:Session=Depends(get_db)):
    try:
        user_details=authenticate_and_get_user_details(request)
        user_id=user_details.get('user_id')
        service=user_details.get('service')

        if not service:
            return {"error": "Gmail service could not be initialized"}
        

        emails=get_message_details(service,user_id='me',max_results=50)
        stored_ids=[]

        for email in emails:
            soup=BeautifulSoup(email['body'],'html.parser')
            clean_text=soup.get_text()
            db_record=create_email_into_db(
                db=db,
                sender=email['sender'],
                email_subject=email['subject'],
                original_email=clean_text,
                original_email_label=",".join(email.get('label',[])),
                summary=None,
                category=None,
                named_entities=None,
                created_by=user_id

            )

            stored_ids.append(db_record.id)
        


        return{
            "user_id":user_id,
            "stored_email_ids":stored_ids
        }



    except Exception as e:
        return {"error": str(e)}


    



@router.get("/get-emails")
async def get_emails(request:Request,db:Session=Depends(get_db)):
    user_details=authenticate_and_get_user_details(request)
    user_id=user_details.get('user_id')
    user_service=user_details.get('service')

    emails_record=get_emails_from_db(db,user_id)
    return emails_record


@router.get("/get-email-by-email-id/{email_id}")
async def get_email_by_email_id(email_id:int,request:Request,db:Session=Depends(get_db)):
    user_details=authenticate_and_get_user_details(request)
    user_id=user_details.get('user_id')
    user_service=user_details.get('service')
    email_record=get_email_by_id_from_db(db,user_id,email_id=email_id)

    if not email_record:
        raise HTTPException(status_code=404,detail='Email not found')
    
    return email_record
   



@router.post("/generate-summary/{email-id}")
async def generate_summary(email_id:int,request_obj:Request,db:Session=Depends(get_db)):
    try:
        user_details=authenticate_and_get_user_details(request_obj)
        user_id=user_details.get('user_id')
        user_service=user_details.get('service')

        email_record=get_email_by_id_from_db(db,user_id,email_id=email_id)

        
        if not email_record:
            raise HTTPException(status_code=404,detail='Email not found')
        
        
        soup=BeautifulSoup(email_record.original_email,'html.parser')
        clean_text=soup.get_text()

        summary=engine.summarizer_extractive_model(clean_text)

        email_record=post_email_summary_by_id(db,user_id,email_id=email_id,summary=summary)

        return email_record

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.post("/generate-category/{email_id}")
async def generate_category(email_id,request_obj:Request,db:Session=Depends(get_db)):
    try:
        user_details=authenticate_and_get_user_details(request_obj)
        user_id=user_details.get('user_id')
        user_service=user_details.get('service')

        email_record=get_email_by_id_from_db(db,user_id,email_id=email_id)

        soup=BeautifulSoup(email_record.original_email,'html.parser')
        clean_text=soup.get_text()

        category=engine.categorization(clean_text)
        category=category['labels'][0]

        email_record=post_email_categories_by_id(db,user_id,email_id,category)
        return email_record




    except Exception as e:
        raise HTTPException(status_code=500,detail=str(e))



@router.post("/generate-named-entities/{email_id}")
def generate_named_entities(email_id:int,request_obj:Request,db:Session=Depends(get_db)):
    try:
        user_details=authenticate_and_get_user_details(request_obj)
        user_id=user_details.get('user_id')
        user_service=user_details.get('service')

        email_record=get_email_by_id_from_db(db,user_id,email_id)

        soup=BeautifulSoup(email_record.original_email,'html.parser')
        clean_text=soup.get_text()

        entities=engine.entity_extraction_xlm_roberta(clean_text)
        entities_json_str=json.dumps(entities)
        email_record=post_email_named_entities_by_id(db,user_id,email_id,entities_json_str)
        return email_record


    except Exception as e:
        raise HTTPException(status_code=500,detail=str(e))
        
