from sqlalchemy.orm import Session
from datetime import datetime,timedelta
from . import models

def create_email_into_db(
        db:Session,
        email_subject:str,
        original_email_label:str,
        original_email:str,
        summary:str,
        category:str,
        named_entities:str,
        user_id:str
):
    db_emails=models.EmailRecord(
        email_subject=email_subject,
        original_email_label=original_email_label,
        original_email=original_email,
        summay=summary,
        category=category,
        named_entities=named_entities,
        created_by=user_id
    )

    db.add(db_emails)
    db.commit()
    db.refresh(db_emails)
    return db_emails

def get_emails_from_db(db:Session,user_id:str):
    return db.query(models.EmailRecord).filter(models.EmailRecord.created_by==user_id).all()


def get_email_by_id_from_db(db:Session,user_id:str,email_id:int):
    return db.query(models.EmailRecord).filter(models.EmailRecord.id==email_id,models.EmailRecord.created_by==user_id).first()


def post_email_summary_by_id(db:Session,user_id:str,email_id:int,summary:str):
    email_record=db.query(models.EmailRecord).filter(
        models.EmailRecord.id==email_id,
        models.EmailRecord.created_by==user_id
    ).first()

    if email_record:
        email_record.summary=summary
        db.commit()
        db.refresh(email_record)
        return email_record
    else:
        return None
    

def post_email_categories_by_id(db:Session,user_id:str,email_id:int,category:str):
    email_record=db.query(models.EmailRecord).filter(
        models.EmailRecord.id==email_id,
        models.EmailRecord.created_by==user_id
    ).first()

    if email_record:
        email_record.category=category
        db.commit()
        db.refresh(email_record)
        return email_record
    
    else:
        return None
    
def post_email_named_entities_by_id(db:Session,user_id:str,email_id:int,namedEntities:str):
    email_record=db.query(models.EmailRecord).filter(
        models.EmailRecord.id==email_id,
        models.EmailRecord.created_by==user_id
    ).first()

    if email_record:
        email_record.named_entities=namedEntities
        db.commit()
        db.refresh(email_record)
        return email_record
    
    else:
        return None
    

