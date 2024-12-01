import os
import google.generativeai as genai
import httpx
import base64
from kestra import Kestra


genai.configure(api_key=os.getenv("GEMINI_KEY"))

generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-flash-8b",
  generation_config=generation_config,
)

image_path = os.getenv("IMAGE_URL")

image = httpx.get(image_path)

prompt = "Caption this image."
response = model.generate_content([{'mime_type':'image/jpeg', 'data': base64.b64encode(image.content).decode('utf-8')}, prompt])

print(response.text)
Kestra.outputs({'description': response.text})




