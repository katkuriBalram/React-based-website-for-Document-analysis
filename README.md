# 📄 Document Intelligence: An AI-Powered Document Analyzer

This project is a web-based application designed for intelligent document analysis. It provides a clean, modern interface for users to upload document images and instantly receive AI-powered insights, including text extraction, multi-language summaries, and an interactive chatbot to query the content.

---

## 🚀 Key Features

* **Document Upload**: A user-friendly drag-and-drop interface allows for easy uploading of document images in JPG and PNG formats.
* **AI-Powered Analysis**: Leverages the **Google Gemini 1.5 Flash Vision model** to perform intelligent document analysis.
* **Optical Character Recognition (OCR)**: Accurately extracts all readable text from the document image, including both typed and handwritten content.
* **Document Classification**: Automatically identifies the type of document (e.g., Aadhaar, Passport, Memo, etc.).
* **Structured Data Extraction**: Extracts key information and fields such as names, dates of birth, ID numbers, and other relevant details.
* **Multi-language Summarization**: Provides concise, intelligent summaries of the document's content in both English and Telugu.
* **Interactive Chatbot**: An integrated chat interface enables users to ask specific questions about the document, receiving clear and accurate answers directly from the analyzed content.
* **Modern UI/UX**: The frontend is built using React with a professional and responsive design, styled with Tailwind CSS and Shadcn/UI components.

---

## 🏗️ Tech Stack

This project is built with a decoupled architecture, using a Python-based backend for AI processing and a modern React frontend for the user interface.

### Frontend

* **Framework**: React (with Vite)
* **Language**: TypeScript
* **Styling**: Tailwind CSS, Shadcn/UI
* **State Management**: TanStack Query (for data fetching)
* **Routing**: React Router DOM

### Backend

* **Framework**: FastAPI
* **Language**: Python
* **AI/ML**: Google Generative AI (Gemini 1.5 Flash Vision model)
* **Image Processing**: Pillow (PIL)

---

## ⚙️ Installation and Setup

To get a local copy of this project running, follow these steps. The entire project is contained in a single directory.

### 1. Clone the Repository

```bash
git clone https://github.com/katkuriBalram/React-based-website-for-Document-analysis.git
cd React-based-website-for-Document-analysis
```

### 2. Backend Setup (Python & FastAPI)

Navigate to the project's root directory and set up the Python virtual environment:

```bash
python -m venv venv
# On Windows
.\venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Configure your Google Gemini API Key. Open the `main.py` file and replace the placeholder with your actual key:

```python
# main.py
# ...
GEMINI_API_KEY = "YOUR_API_KEY_HERE"
genai.configure(api_key=GEMINI_API_KEY)
# ...
```

Run the FastAPI backend server with hot-reloading enabled:

```bash
uvicorn main:app --reload
```

The backend API will be running at: [http://127.0.0.1:8000](http://127.0.0.1:8000)

### 3. Frontend Setup (React)

Open a separate terminal, navigate to the project root, and install Node.js dependencies:

```bash
npm install
npm run dev
```

The React frontend will run at: [http://localhost:5173](http://localhost:5173)

---

## 📌 API Endpoints

The FastAPI backend exposes the following endpoints:

* **POST /analyze\_document/** — Accepts a document image (`multipart/form-data`) and returns a JSON object containing the full analysis.
* **POST /chat/** — Takes a user message and the document context, then returns a natural language response from the AI.

---

## 📜 License

This project is licensed under the **MIT License**.
