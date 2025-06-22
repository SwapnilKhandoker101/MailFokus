# 📧 MailFokus

Welcome to the **MailFokus** project — a smart email analysis tool designed to help you gain insights from your Gmail inbox.


With MailFokus, you can:
- Connect your Gmail account securely
- Fetch and preview your emails
- Automatically **summarize** email content
- **Categorize** emails into meaningful groups
- Extract **named entities** such as people, organizations, and locations

##  Setting Up the Backend

To run the backend of this project, please follow the steps below:


### 1. Gmail API Setup
- Go to the [Google Cloud Console](https://console.cloud.google.com/).
- Create a new project and enable the **Gmail API**.
- Set up the **OAuth consent screen** as a **Desktop App**.
- Download the `credentials.json` file.
- Copy this file into both:
  - `backend/`
  - `backend/utility/`

### 2. Clerk Authentication Setup
- Create an account at [Clerk.dev](https://clerk.dev) and set up a new project.
- Generate your **Clerk Secret Key** and a **JWT key**.
- Create a `.env` file in the project root (`Email-Extractor-Project/`) with the following structure:

```env
CLERK_SECRET_KEY=your_clerk_secret_key
JWT_SECRET_KEY=your_jwt_key
```

### 3.Install Python Dependencies

Install all necessary packages using:

```bash
pip install -r requirements.txt
```

### 4. Run the Backend Server

Start the server using: 

```bash
python server.py

```
If you need further help in setting up backend kindly reach out to us

