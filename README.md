# 📧 MailFokus

Welcome to the **MailFokus** project — a smart AI-powered email analysis tool designed to help you gain insights from your Gmail inbox.


With MailFokus, you can:
- Connect your Gmail account securely
- Fetch and preview your emails
- Automatically **summarize** email content
- **Categorize** emails into meaningful groups
- Extract **named entities** such as people, organizations, and locations

First step in using this project is to clone this repo and then to follow the steps below: 

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

### 4. Hugging Face Setup (Required for AI Models)

To use the summarization, classification, and named entity recognition (NER) features powered by Hugging Face models, follow these steps:

- Create a free account at [huggingface.co](https://huggingface.co).
- Install the Hugging Face CLI:

```bash
pip install huggingface_hub
```

- In the `backend/` folder, create a `.env` file (if not already created), and add the following line to specify the Hugging Face model for summarization:

```env
MODEL_SUMMARIZATION_FACEBOOK_BART=facebook/bart-large-cnn
```


### 5. Run the Backend Server

Start the server using: 

```bash
python server.py

```
***If you need further help in setting up backend kindly reach out to us.***


##  Setting Up the Frontend


###  Requirements
- Node.js **16+**
- `npm` or `yarn`

---

###  Quick Setup

1. **Install dependencies**:

   ```bash
   npm install
   ```
2. **Set up Clerk Authentication (see below)**

3. **Start the develpoment server**:
```bash
npm run start
```

### Dependencies to Install

If not already in package.json, you can manually install required packages:

``` bash
npm install react react-dom
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
npm install @clerk/clerk-react
```
## Clerk Authentication Setup

1. Create an account at [Clerk.com](https://clerk.com).
2. In your Clerk dashboard, get your **Publishable Key**.
3. Create a `.env` file in the root of your frontend project and add the following line:

```env
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
```

***If you need further help in setting up frontend or any part of the project kindly reach out to us.***



