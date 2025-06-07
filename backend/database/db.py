from sqlalchemy.orm import Session
from datetime import datetime,timedelta
from . import models

def create_email(
        db:Session,
        email_subject:str,
        original_email:str,
        summary:str,
        category:str,
        named_entities=str
):
    db_emails=models.EmailRecord(
        email_subject=email_subject,
        original_email=original_email,
        summay=summary,
        category=category,
        named_entities=named_entities
    )

    db.add(db_emails)
    db.commit()
    db.refresh(db_emails)
    return db_emails

def get_emails(db:Session,user_id:str):
    return db.query(models.EmailRecord).filter(models.EmailRecord.created_by==user_id).all()