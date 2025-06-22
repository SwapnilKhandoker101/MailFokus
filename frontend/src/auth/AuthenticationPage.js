import React from "react";
import { SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const AuthenticationPage = () => {
  return (
    <div className="auth-container">
      <SignedOut>
        <SignIn routing="path" path="/sign-in" />
        <SignUp routing="path" path="/sign-up" />
      </SignedOut>
      <SignedIn>
        <div className="redirect-message">
          <p>You are already signed In</p>
        </div>
        <Navigate to="/login" replace />
      </SignedIn>
    </div>
  );
};

export default AuthenticationPage;
