from sqlalchemy import Column, ForeignKey,Integer,String,DateTime,create_engine,Text

from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import sessionmaker
from datetime import datetime

engine=create_engine("sqlite:////database.db",echo=True)

Base=declarative_base()

class EmailRecord(Base):
    __tablename__='email_records'

    id=Column(Integer,primary_key=True,index=True)
    email_subject=Column(Text)
    original_email=Column(Text)
    summary=Column(Text)
    category=Column(Text)
    named_entities=Column(Text)
    created_by=Column(String,nullable=False)


Base.metadata.create_all(engine)

SessionLocal=sessionmaker(autocommit=False,autoflush=False,bind=engine)

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()
    

    
