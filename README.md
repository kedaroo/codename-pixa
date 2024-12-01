# Pixa 📸  
Natural Language Search Engine for Photo Library

<img width="1352" alt="image" src="https://github.com/user-attachments/assets/b3dcaf57-0970-48f7-9e33-b26e9e464082">

## 🎥 Demo  
Watch the [Demo Video](https://youtu.be/qOda1cDuhcI) to see Pixa in action.  

## Powered by Kestra
Architecture diagram:
![pixa-diagram](https://github.com/user-attachments/assets/284ec7e0-ed70-4559-b21e-bcc238189bd9)

*Pixa* is a natural language search engine for your photo library, designed to make finding your cherished memories as effortless as a conversation. With Pixa, you can simply query your images using natural language, and it will return all relevant results.  

This project was created during the *HackFrost Hackathon* using *Kestra*.  

## 🌟 Features  
- *Natural Language Search*: Query your photos using conversational language.  
- *AI-Powered Tagging*: Automatically generates descriptions for uploaded images using Gemini’s Vision models.  
- *Vector-Based Retrieval*: Queries are embedded and matched with image embeddings for precise results.  
- *Efficient Storage: Images and metadata are stored securely in **Supabase*.  

---

## 🛠️ How It Works  

### *1. Image Upload and Processing*  
When you upload an image, Pixa follows these steps:  
1. *Generate Descriptions*:  
   - Uses *Gemini's Vision models* to describe the image.  
   - Example: "A group of friends celebrating a birthday party."  
2. *Generate Embeddings*:  
   - Converts the image description into vector embeddings using *Gemini’s Embedding API*.  
3. *Store in Database*:  
   - Saves the embeddings in a *vector database* hosted on *Supabase*.  

### *2. Query Execution*  
1. User inputs a natural language query (e.g., "Show me the birthday pic.").  
2. The query is vectorized using the same embedding API.  
3. It searches the vector database for relevant results and displays them to the user.  

---

## 🧰 Tech Stack  

- *Programming Language*: Python/TypeScript  
- *Workflow Orchestration*: [Kestra](https://kestra.io/)  
- *Image Analysis*: Gemini's Vision and Embedding APIs  
- *Database*: Supabase (pgvector (Vector Database) + Storage)  
- *Deployment*: Hosted on DigitalOcean (Kestra) & Vercel (Frontend)  

---

## 🚀 Deployment  

### Prerequisites  
- Python 3.8+  
- Kestra installed on your server  
- Supabase account with a configured vector database  

### Setup Instructions  

1. Clone the repository:  
   bash
   git clone https://github.com/kedaroo/codename-pixa.git  
   cd pixa  
     

2. Install dependencies:  
   bash
   npm i  
     

3. Configure environment variables:  
   - Create a .env file with your API keys and Supabase credentials.  
     

5. Upload your images and start querying!  

---

## 🎥 Demo  
Watch the [Demo Video](https://youtu.be/qOda1cDuhcI) to see Pixa in action.  

---

## 💡 How We Used Kestra  
Kestra orchestrates the entire image processing workflow in three steps:  
1. Run a Python script to generate image descriptions.  
2. Generate vector embeddings for these descriptions.  
3. Store the embeddings in the Supabase vector database.  

Our Kestra instance is hosted on *DigitalOcean* and ensures a smooth and scalable image processing pipeline.  

---

## 🤝 Contributions  
We welcome contributions! Feel free to:  
- Report issues.  
- Suggest new features.  
- Submit pull requests.  

### Steps to Contribute  
1. Fork this repository.  
2. Create a new branch:  
   bash
   git checkout -b feature-name  
     
3. Commit your changes and open a pull request.  

---

## 📜 License  
This project is licensed under the [MIT License](LICENSE).  

---

We hope Pixa transforms how you explore your photo library! 🌈  
