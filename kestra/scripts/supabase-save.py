import os
from supabase import create_client, Client
from kestra import Kestra

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)
response = (
    supabase.table("embeddings")
    .insert({"description": os.getenv("DESCRIPTION"), "embedding" : os.getenv("EMBEDDING"), "user_id": os.getenv("USER_ID"), "path": os.getenv("SUPABASE_PATH")})
    .execute()
)

print(response)

if hasattr(response, 'data'):
    response_data = response.data 
else:
    response_data = str(response) 

Kestra.outputs({"response": response_data})