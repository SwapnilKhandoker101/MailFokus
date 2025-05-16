import base64
import os.path
from email.mime import text
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from http import HTTPStatus



from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# If modifying these scopes, delete the file token.json.
# SCOPES = ["https://mail.google.com/"]
SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"]


def authenticiate():
  try:   
       creds=None

       if os.path.exists('token.json'):
         creds=Credentials.from_authorized_user_file("token.json",SCOPES)
       if not creds or not creds.valid:
          if creds and creds.expired and creds.refresh_token:
              creds.refresh(Request())
          else:
              flow=InstalledAppFlow.from_client_secrets_file(
              'credentials.json',SCOPES
              )
              creds=flow.run_local_server(port=8080)
          with open("token.json","w") as token:
              token.write(creds.to_json())

       return creds
  except Exception as error:
       print(f"Fail to authenticate")

def api_call(credentials):
   try:
      service=build('gmail','v1',credentials=credentials)
      return service
   except HttpError as error:
      print(f'An error occurered:{error}')


def get_message_body(service,msg_id,user_id='me'):
   try:
      message=service.users().messages().get(
         userId=user_id,id=msg_id,format='full'
      ).execute()

      payload=message.get('payload',{})
      headers=payload.get('headers',[])

      # Extract the subject:

      subject = next((h["value"] for h in headers if h["name"] == "Subject"), "No Subject")
      sender = next((h["value"] for h in headers if h["name"] == "From"), "Unknown Sender")

      parts = payload.get("parts", [])
      body = ""

      if parts:
         for part in parts:
            mime_type=part.get('mimeType',"")
            body_data=part.get('body',{}).get('data',"")

            if mime_type=='text/plain':
               body += base64.urlsafe_b64decode(body_data.encode("utf-8")).decode("utf-8")
      else:
         body_data=payload.get('body',{}).get('data',"")
         if body_data:
            body += base64.urlsafe_b64decode(body_data.encode("utf-8")).decode("utf-8")
      
      # # print(f"From: {sender}")
      # print(f"Subject: {subject}")
      print("-" * 50)
      print(f"Body:\n{body}")
      print("-" * 50)
      
            
            


      

   except HttpError as error:
      print(f'Error fetching messages:{error}')

def main():
   creds=authenticiate()

   service=api_call(credentials=creds)

   print(service)

   results=service.users().messages().list(userId='me').execute()
   messagesdetails=results.get('messages')
   ids=[ msg.get('id',{}) for msg in messagesdetails]
   # print(ids)
   for id in ids:
      print(f"Message: {id}")
      get_message_body(service,msg_id=id,user_id='me')
      print("###"*50)
      
   
   # messages=service.users().messages().get(userId='me',id=id).execute()
   # get_message_body(service,msg_id=id,user_id='me')
   

  

   
  
   

   
   
 
    








# def main():
#   """Shows basic usage of the Gmail API.
#   Lists the user's Gmail labels.
#   """
#   creds = None
#   # The file token.json stores the user's access and refresh tokens, and is
#   # created automatically when the authorization flow completes for the first
#   # time.
#   if os.path.exists("token.json"):
#     creds = Credentials.from_authorized_user_file("token.json", SCOPES)
#   # If there are no (valid) credentials available, let the user log in.
#   if not creds or not creds.valid:
#     if creds and creds.expired and creds.refresh_token:
#       creds.refresh(Request())
#     else:
#       flow = InstalledAppFlow.from_client_secrets_file(
#           "credentials.json", SCOPES
#       )
#       creds = flow.run_local_server(port=8080)
#     # Save the credentials for the next run
#     with open("token.json", "w") as token:
#       token.write(creds.to_json())

#   try:
#     # Call the Gmail API
#     service = build("gmail", "v1", credentials=creds)
#     results = service.users().messages().list(userId="me",labelIds=['INBOX'],maxResults=10).execute()
#     messages= results.get("messages", [])

#     if not messages:
#       print("No messages found.")
#       return

#     else:
#       print("Message snippets:")
#       for msg in messages:
#         # Fetch the full message
#         msg_id = msg['id']
#         msg_data = service.users().messages().get(userId='me', id=msg_id, format='full').execute()

#         # Print snippet (short preview)
#         print(msg_data['snippet'])

#   except HttpError as error:
#     # TODO(developer) - Handle errors from gmail API.
#     print(f"An error occurred: {error}")




if __name__ == "__main__":
  main()