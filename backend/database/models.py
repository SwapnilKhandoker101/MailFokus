from pydantic import BaseModel, Field
from sqlalchemy import Column, ForeignKey,Integer,String,DateTime,create_engine,Text

from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import sessionmaker
from datetime import datetime

engine = create_engine("sqlite:///backend/database.db", connect_args={"check_same_thread": False})


Base=declarative_base()

class EmailRecord(Base):
    __tablename__='email_records'

    id=Column(Integer,primary_key=True,index=True)
    gmail_id=Column(String,index=True,unique=True)
    sender=Column(Text)
    email_subject=Column(Text)
    original_email_label=Column(Text)
    original_email=Column(Text)
    summary=Column(Text)
    category=Column(Text)
    named_entities=Column(Text)
    user_id=Column(String,nullable=False)


Base.metadata.create_all(engine)

SessionLocal=sessionmaker(autocommit=False,autoflush=False,bind=engine)

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()
    






    
