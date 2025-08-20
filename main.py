from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from PIL import Image
import io
import google.generativeai as genai
import re
import json



app = FastAPI()

# Enable CORS so your frontend can call the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Data model for chat request ===
class ChatRequest(BaseModel):
    message: str
    documentContext: dict  # Contains all fields, extracted_text, englishSummary, teluguSummary

# === Endpoint 1: Analyze Document ===
@app.post("/analyze_document/")
async def analyze_document(file: UploadFile = File(...)):
    # Read image
    contents = await file.read()
    img = Image.open(io.BytesIO(contents))

    # Gemini prompt
    prompt = """
    You are an AI trained to analyze official documents (Aadhaar, Passport, TC, Memo, Bonafide, Handwritten Notes, etc.).
    1. Extract all readable text (including handwriting)
    2. Identify document type
    3. Extract structured fields: Name, DOB, ID numbers, Institution, Issue Date, Expiry Date, etc.
    4. Provide English and Telugu summaries

    Return JSON:
    {
        "document_type": "...",
        "extracted_text": "...",
        "fields": { "Name": "...", "DOB": "...", "ID": "...", "Others": "..." },
        "englishSummary": "...",
        "teluguSummary": "..."
    }
    """

    # Call Gemini vision model
    response = vision_model.generate_content([prompt, img])

        # Clean markdown fences
    raw_text = response.text.strip()
    cleaned = re.sub(r"```(?:json)?", "", raw_text).strip()

    try:
        parsed = json.loads(cleaned)
    except Exception:
        parsed = {"raw": cleaned}  # fallback

    return JSONResponse(content={"analysis": parsed})


# === CONFIG ===
GEMINI_API_KEY = ""  # Replace with your actual key
genai.configure(api_key=GEMINI_API_KEY)
vision_model = genai.GenerativeModel("gemini-1.5-flash")  # Vision-enabled model


# === Endpoint 2: Chat with Document Context ===
@app.post("/chat/")
async def chat_with_document(req: ChatRequest):
    user_msg = req.message
    doc_context = req.documentContext

    # Construct a detailed prompt using all fields + extracted text + summaries
    prompt = f"""
    You are an AI assistant. Use the document context below to answer the user's question.
    
    Document Type: {doc_context.get('document_type')}
    Extracted Text: {doc_context.get('extracted_text')}
    Fields: {doc_context.get('fields')}
    English Summary: {doc_context.get('englishSummary')}
    Telugu Summary: {doc_context.get('teluguSummary')}

    Question: {user_msg}
    Answer concisely and accurately, referring to the extracted fields or text whenever possible.
    """

    # Call Gemini / LLM
    response = vision_model.generate_content([prompt])
    reply = response.text  # The AI's answer

    return JSONResponse(content={"reply": reply})


# === Run with: uvicorn backend:app --reload ===
