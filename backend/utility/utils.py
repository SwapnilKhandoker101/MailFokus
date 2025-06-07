from fastapi import HTTPException
from clerk_backend_api import Clerk,AuthenticateRequestOptions
import os

from dotenv import load_dotenv
dotenv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
load_dotenv(dotenv_path)

clerk_sdk=Clerk(bearer_auth=os.getenv("CLERK_SECRET_KEY"))

def authenticate_and_get_user_details(request):
    try:

        request_state=clerk_sdk.authenticate_request(
            request,
            AuthenticateRequestOptions(
                authorized_parties=["http://localhost:5173","http://localhost:5174"],
                jwt_key=os.getenv("JWT_KEY")
            )

        )
        if not request_state.is_signed_in:
            raise HTTPException(status_code=401,detail="Invalid Token")
        

        user_id=request_state.payload.get("sub")

        return {"user_id":user_id}

    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))