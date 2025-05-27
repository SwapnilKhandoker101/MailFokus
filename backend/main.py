from AI_engine.ai_engine import AI_engine
from utility.extractor import extract
import base64
from bs4 import BeautifulSoup


emails=extract()

engine=AI_engine()


for email in emails:
    html_content=email['body']
    soup=BeautifulSoup(html_content,'html.parser')
    text=soup.get_text()
    category=engine.categorization(text)
    print(category['labels'][0])
    print('summary: ')
    # summary=engine.summarizer_facebook_bart(text)
    summary=engine.summarizer_extractive_model(text)
    print(summary)
    break


