// ClearEmailsOnSignOut.js
import { useEffect } from "react";
import { SignedOut } from "@clerk/clerk-react";

const ClearEmailsOnSignOut = () => {
  return (
    <SignedOut>
      <ClearEmails />
    </SignedOut>
  );
};

const ClearEmails = () => {
  useEffect(() => {
    localStorage.removeItem("emails");
    console.log("🧹 Cleared emails from localStorage");
  }, []);

  return null;
};

export default ClearEmailsOnSignOut;
