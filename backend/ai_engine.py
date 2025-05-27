from transformers import pipeline
import torch
from langchain_huggingface import HuggingFacePipeline
from langchain.prompts import PromptTemplate

# print(torch.cuda.is_available())
# print(torch.cuda.get_device_name(0))
# model=pipeline("summarization",model='facebook/bart-large-cnn',device="0")
# response=model("LangChain is a powerful, open-source framework designed to simplify the development of applications powered by large language models (LLMs). It provides tools and APIs to connect LLMs to various data sources and create complex workflows, making it easier for developers to build things like chatbots, AI agents, and other LLM-driven applications.  ")
# print(response)

