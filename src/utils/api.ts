// Dummy API functions - Replace these with your actual backend endpoints

export interface ProcessedDocument {
  document_type: string;
  extracted_text: string;
  fields: Record<string, string>;
  englishSummary: string;
  teluguSummary: string;
}

export const uploadAndProcessDocument = async (file: File): Promise<ProcessedDocument> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://127.0.0.1:8000/analyze_document/", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to process document");

  const data = await response.json();
  console.log("Backend response:", data);
  console.log("Analysis:", data.analysis);


  // Now data.analysis is already an object
  return data.analysis ?? null;
};


export const sendChatMessage = async (message: string, documentContext?: ProcessedDocument) => {
  if (!documentContext) throw new Error("No document context");

  const response = await fetch("http://127.0.0.1:8000/chat/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, documentContext }),
  });

  if (!response.ok) throw new Error("Chat failed");
  const data = await response.json();
  return data.reply;
};
