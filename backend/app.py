from fastapi import FastAPI,Request,Response
from fastapi.middleware.cors import CORSMiddleware
from clerk_backend_api import Clerk
from .routes import emails
import socket
import os
from dotenv import load_dotenv

load_dotenv()

clerk_sdk=Clerk(bearer_auth=os.getenv("CLERK_SECRET_KEY"))
app=FastAPI()


app.add_middleware(CORSMiddleware,
                   allow_origins=["*"],
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"]
)

app.include_router(emails.router,prefix="/api")

