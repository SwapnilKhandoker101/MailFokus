from transformers import pipeline,AutoTokenizer, AutoModelForSeq2SeqLM,set_seed
import torch
from langchain_huggingface import HuggingFacePipeline
from langchain.prompts import PromptTemplate



class AI_engine:
    
    def __init__(self):
        
        self.summarizer_facebook_bart = pipeline("summarization", model="facebook/bart-large-cnn")
        
        self.classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
        
    
    def summarize_facebook_bart(self,text:str,model:str)->str:
        word_count=len(text.split())
        if word_count<30:
            return text
        
        
        summary=self.summarizer_facebook_bart(
            text,
            max_length=130,
            min_length=30,
            do_sample=False
        )[0]['summary_text']

        return summary
    
    def categorization(self,text)->str:
        # set_seed(42)
        # template=PromptTemplate.from_template("Categorizes the following email text :{\n\ntext} into a one category")
        # categorization_pipeline=HuggingFacePipeline(pipeline=self.category_generator_openai_gpt)
        
        # categorization_chain=template| categorization_pipeline

        # category=categorization_chain.invoke({'text':text})

        candidate_labels = ["meeting", "order", "invoice", "reminder", "event", "subscription", "security", "policy", "legal", "finance"]
        category=self.classifier(text,candidate_labels)

        return category
        

    

    
        

# print(torch.cuda.is_available())
# print(torch.cuda.get_device_name(0))
# model=pipeline("summarization",model='facebook/bart-large-cnn',device="0")
# response=model("LangChain is a powerful, open-source framework designed to simplify the development of applications powered by large language models (LLMs). It provides tools and APIs to connect LLMs to various data sources and create complex workflows, making it easier for developers to build things like chatbots, AI agents, and other LLM-driven applications.  ")
# print(response)

