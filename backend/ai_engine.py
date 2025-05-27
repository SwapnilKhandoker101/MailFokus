from transformers import pipeline,AutoTokenizer, AutoModelForSeq2SeqLM
import torch



class AI_engine:
    
    def __init__(self):
        summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

    
    def summarize_facebook_bart(self,text:str,model:str)->str:
        word_count=len(text.split())
        if word_count<30:
            return text
        
        
        summary=self.summarizer(
            text,
            max_length=130,
            min_length=30,
            do_sample=False
        )[0]['summary_text']

        return summary
    
        

# print(torch.cuda.is_available())
# print(torch.cuda.get_device_name(0))
# model=pipeline("summarization",model='facebook/bart-large-cnn',device="0")
# response=model("LangChain is a powerful, open-source framework designed to simplify the development of applications powered by large language models (LLMs). It provides tools and APIs to connect LLMs to various data sources and create complex workflows, making it easier for developers to build things like chatbots, AI agents, and other LLM-driven applications.  ")
# print(response)

