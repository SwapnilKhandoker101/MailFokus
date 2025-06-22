from transformers import pipeline,AutoTokenizer, AutoModelForSeq2SeqLM,set_seed
import torch
from langchain_huggingface import HuggingFacePipeline
from langchain.prompts import PromptTemplate
from summarizer import Summarizer



class AI_engine:
    
    def __init__(self):
        
        # summarizer:
        self.summarize_facebook_bart = pipeline("summarization", model="facebook/bart-large-cnn")
        self.tokenizer = AutoTokenizer.from_pretrained("facebook/bart-large-cnn")
        self.extractive_model_summarize=Summarizer()


        # classifier:
        # self.classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
        # self.classifier = pipeline("zero-shot-classification", model="valhalla/distilbart-mnli-12-1")

        self.classifier = pipeline("zero-shot-classification", model="MoritzLaurer/mDeBERTa-v3-base-mnli-xnli")

        # name-entity-extraction:
        # self.ner_bert = pipeline("ner", model="dslim/bert-base-NER", aggregation_strategy="simple")

        self.ner_bert = pipeline(
    "ner",
    model="Davlan/bert-base-multilingual-cased-ner-hrl",
    tokenizer="Davlan/bert-base-multilingual-cased-ner-hrl",
    aggregation_strategy="simple"
)


    
    def summarizer_facebook_bart(self,text:str)->str:
        # word_count=len(text.split())
        input_tokens=len(self.tokenizer.encode(text))
        if input_tokens<142:
           return text
        
        hint = "Summarize the email and make sure to include any dates, deadlines, or scheduled meetings.Give me important information in bullet points\n\n"
        augmented_text=hint+text
        
        
        summary=self.summarize_facebook_bart(
            augmented_text,
            max_length=142,
            min_length=30,
            do_sample=False,

        )[0]['summary_text']

        return summary
    
    def summarizer_extractive_model(self,text:str)->str:
        summary=self.extractive_model_summarize(text,ratio=0.40) 
        return summary
   
 
    def categorization(self,text)->str:
        # set_seed(42)
        # template=PromptTemplate.from_template("Categorizes the following email text :{\n\ntext} into a one category")
        # categorization_pipeline=HuggingFacePipeline(pipeline=self.category_generator_openai_gpt)
        
        # categorization_chain=template| categorization_pipeline

        # category=categorization_chain.invoke({'text':text})

        candidate_labels = ["meeting", "order", "invoice", "reminder", "event", "subscription", "security", "policy", "legal", "finance"]
        category=self.classifier(text,candidate_labels,multi_label=False)

        return category
        
    def entity_extraction_xlm_roberta(self,text:str)->str:

        entities=self.ner_bert(text)

        return [(ent["word"], ent["entity_group"]) for ent in entities]

    

    
        

# print(torch.cuda.is_available())
# print(torch.cuda.get_device_name(0))
# model=pipeline("summarization",model='facebook/bart-large-cnn',device="0")
# response=model("LangChain is a powerful, open-source framework designed to simplify the development of applications powered by large language models (LLMs). It provides tools and APIs to connect LLMs to various data sources and create complex workflows, making it easier for developers to build things like chatbots, AI agents, and other LLM-driven applications.  ")
# print(response)

