from fastapi import APIRouter,Depends,HTTPException,Request
from pydantic import BaseModel
from sqlalchemy.orm import Session
from bs4 import BeautifulSoup
from database.models import EmailRecord, SessionLocal
from collections import defaultdict

from utility.extractor import get_message_details, api_call, authenticiate

from database.db import *

from utility.utils import authenticate_and_get_user_details
from database.models import get_db
import json
from datetime import datetime
from AI_engine.ai_engine import AI_engine
from fastapi import BackgroundTasks

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

# @router.get("/extract-original-emails")
def extract_original_emails(user_id,service):
    db=SessionLocal()
    try:

        print("Starting email extraction...")
        print("User ID:", user_id)
        print("Service:", service)

        existing_subjects=set(
            email.gmail_id for email in get_emails_from_db(db,user_id) if email.gmail_id
        )
        

        

        if not service:
            return {"error": "Gmail service could not be initialized"}
        

        emails=get_message_details(service,user_id='me',max_results=50)
        print("Fetched emails from Gmail:", len(emails))
        stored_ids=[]

        for email in emails:
            print("Email")
            soup=BeautifulSoup(email['body'],'html.parser')
            clean_text=soup.get_text()
            # summary=engine.summarizer_extractive_model(clean_text)
            # print(summary)

            # categories=engine.categorization(clean_text)
            # category=categories['label'][0]
            # print(category)
            
            # entities=engine.entity_extraction_xlm_roberta(clean_text)
            # print("Named Entities:", entities)

            # formatted_entities = [f"{word} ({ent_type})" for word, ent_type in entities]
            # entity_str = ", ".join(formatted_entities)


            # print(entities)
            db_record=create_email_into_db(
                db=db,
                gmail_id=email['gmail_id'],
                sender=email['sender'],
                email_subject=email['subject'],
                original_email=clean_text,
                original_email_label=",".join(email.get('label',[])),
                summary=None,
                category=None,
                named_entities=None,
                user_id=user_id

            )


            
            stored_ids.append(db_record.id)
        
        print("📦 All stored IDs:", stored_ids)


        return{
            "user_id":user_id,
            "stored_email_ids":stored_ids
        }



    except Exception as e:
        return {"error": str(e)}


    



@router.get("/get-emails")
async def get_emails(request:Request,background_tasks: BackgroundTasks, db:Session=Depends(get_db)):
    user_details=authenticate_and_get_user_details(request)
    user_id=user_details.get('user_id')
    user_service=user_details.get('service')

    # creating_emails into db:

    # existing_emails=get_emails_from_db(db,user_id)
    # background_tasks.add_task(extract_original_emails,user_id, user_service)
    extract_result = extract_original_emails(user_id, user_service)
    emails = get_emails_from_db(db, user_id)



    
    return emails


@router.get("/get-email-by-email-id/{email_id}")
async def get_email_by_email_id(email_id:int,request:Request,db:Session=Depends(get_db)):
    user_details=authenticate_and_get_user_details(request)
    user_id=user_details.get('user_id')
    user_service=user_details.get('service')
    email_record=get_email_by_id_from_db(db,user_id,email_id=email_id)

    if not email_record:
        raise HTTPException(status_code=404,detail='Email not found')
    
    return email_record
   



@router.post("/generate-summary/{email_id}")
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

        if email_record.summary is None:
            summary=engine.summarizer_extractive_model(clean_text)
            email_record_with_summary=post_email_summary_by_id(db,user_id,email_id=email_id,summary=summary)
            return email_record_with_summary


        # summary=engine.summarizer_extractive_model(clean_text)

        # email_record=post_email_summary_by_id(db,user_id,email_id=email_id,summary=summary)

        return {"message": "Email summary already exists for this email"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

# @router.get("/get-summarized-emails")
# def get_summarized_emails(request: Request, db: Session = Depends(get_db)):
#     user_details = authenticate_and_get_user_details(request)
#     user_id = user_details.get("user_id")

#     emails = db.query(EmailRecord).filter(
#         EmailRecord.user_id == user_id,
#         EmailRecord.summary.isnot(None)
#     ).all()

#     return emails
    

@router.post("/generate-category/{email_id}")
async def generate_category(email_id,request_obj:Request,db:Session=Depends(get_db)):
    try:
        user_details=authenticate_and_get_user_details(request_obj)
        user_id=user_details.get('user_id')
        user_service=user_details.get('service')

        email_record=get_email_by_id_from_db(db,user_id,email_id=email_id)

        if email_record.category is None:
            clean_text=email_record.email_subject.strip()
            category=engine.categorization(clean_text)
            category=category['labels'][0]
            email_record_with_category=post_email_categories_by_id(db,user_id,email_id,category)
            return email_record_with_category
            




        # soup=BeautifulSoup(email_record.email_subject,'html.parser')
        

        
        

        
        return {"message": "Email category already exists for this email"}




    except Exception as e:
        print("Error in generating categories")
        raise HTTPException(status_code=500,detail=str(e))



@router.post("/generate-named-entities/{email_id}")
async def generate_named_entities(email_id:int,request_obj:Request,db:Session=Depends(get_db)):
    try:
        user_details=authenticate_and_get_user_details(request_obj)
        user_id=user_details.get('user_id')
        user_service=user_details.get('service')

        email_record=get_email_by_id_from_db(db,user_id,email_id)

        if email_record.named_entities is None:
            soup=BeautifulSoup(email_record.original_email,'html.parser')
            clean_text=soup.get_text()
            entities=engine.entity_extraction_xlm_roberta(clean_text)
            print("Named Entities:", entities)
            entity_dict = defaultdict(list)
            for word, ent_type in entities:
               entity_dict[ent_type].append(word)


            

            # formatted_entities = [f"{word} ({ent_type})" for word, ent_type in entities]
            # entity_str = ", ".join(formatted_entities)
            entities_json_str = json.dumps([list(e) for e in entities])
            email_record=post_email_named_entities_by_id(db,user_id,email_id,entities_json_str)
            print(entities_json_str)
            return email_record



        # soup=BeautifulSoup(email_record.original_email,'html.parser')
        # clean_text=soup.get_text()

        # entities=engine.entity_extraction_xlm_roberta(clean_text)
        # entities_json_str=json.dumps(entities)
        # email_record=post_email_named_entities_by_id(db,user_id,email_id,entities_json_str)
        return {"message": "Email NER already exists for this email"}


    except Exception as e:
        print("Error in NER generation")
        raise HTTPException(status_code=500,detail=str(e))
        

@router.get("/auth-gmail")
def auth_gmail(user_id: str):
    creds = authenticiate(user_id)  # This opens browser
    if creds:
        return {"success": True}
    else:
        raise HTTPException(status_code=400, detail="Failed to authenticate Gmail")