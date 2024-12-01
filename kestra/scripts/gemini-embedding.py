import os
import google.generativeai as genai
from kestra import Kestra

genai.configure(api_key=os.getenv("GEMINI_KEY"))
result = genai.embed_content(
        model="models/text-embedding-004",
        content=os.getenv("DESCRIPTION"))

print(str(result['embedding']))

Kestra.outputs({'embedding': str(result['embedding'])})