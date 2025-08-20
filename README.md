# 📄 Major Project - Document Analyzer

This project is a **Document Analyzer** built with **FastAPI**, **MongoDB**, and **React**.  
It allows users to upload documents (PDFs, images, etc.), extract text using OCR, and process them with AI models for summarization, translation, and chatbot-based interactions.

---

## 🚀 Features
- 📤 Upload documents (PDF, images, etc.).
- 🔎 OCR processing with **Tesseract**.
- 🤖 AI-powered text summarization (English & Telugu).
- 🌐 Translation support.
- 💬 Interactive chatbot to query document contents.
- 📦 Data storage with **MongoDB**.
- 🎨 Frontend built using **React (TypeScript + Tailwind)**.
- ⚡ Backend with **FastAPI**.

---

## 🏗️ Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS  
- **Backend**: FastAPI (Python)  
- **Database**: MongoDB  
- **AI/ML**: OCR (pytesseract), Google Generative AI / LLMs  
- **Other Tools**: pdf2image, OpenAI/OpenRouter API (optional)

---

## 📂 Project Structure
```
Major_project/
│── backend/                 # FastAPI backend
│   ├── main.py               # API entrypoint
│   ├── requirements.txt      # Python dependencies
│   └── ...                   # Other backend files
│
│── frontend/                # React frontend
│   ├── src/                  # Components, pages, utils
│   ├── package.json          # Frontend dependencies
│   └── ...                   # Other frontend files
│
│── README.md                # Project documentation
```

---

## ⚙️ Installation & Setup

### 🔹 1. Clone the Repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 🔹 2. Backend Setup (FastAPI)
```bash
cd backend
python -m venv venv
venv\Scriptsctivate   # On Windows
source venv/bin/activate  # On Mac/Linux
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend will start at: **http://127.0.0.1:8000**

### 🔹 3. Frontend Setup (React + TypeScript + Tailwind)
```bash
cd frontend
npm install
npm start
```

Frontend will start at: **http://localhost:3000**

---

## 📌 API Endpoints
- `POST /analyze_document/` → Upload & analyze documents  
- `POST /summarize/` → Summarize extracted content  
- `POST /translate/` → Translate document text  
- `GET /chat/` → Query document via chatbot  

---

## 🖼️ Screenshots / Demo
(Add your screenshots or demo video links here)

---

## 👨‍💻 Author
- **Your Name**  
- GitHub: [your-username](https://github.com/your-username)

---

## 📜 License
This project is licensed under the MIT License.
