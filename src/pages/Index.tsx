import { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { DocumentDisplay } from '@/components/DocumentDisplay';
import { SummarySection } from '@/components/SummarySection';
import { ChatInterface } from '@/components/ChatInterface';
import { uploadAndProcessDocument, sendChatMessage } from '@/utils/api';
import { useToast } from '@/hooks/use-toast';
import { FileText, Zap } from 'lucide-react';
import heroBackground from '@/assets/hero-background.jpg';
import { ProcessedDocument } from '@/utils/api';

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [processedDocument, setProcessedDocument] = useState<ProcessedDocument | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
  setUploadedFile(file);
  setImageUrl(URL.createObjectURL(file));
  setIsProcessing(true);

  try {
    // Upload & get full processed document
    const result = await uploadAndProcessDocument(file);

    // Only display English & Telugu summaries in UI
    setProcessedDocument(result);
;

    toast({
      title: "Document Processed",
      description: "Summaries are ready. Chat with AI about this document!",
    });
  } catch (error) {
    toast({
      title: "Processing Failed",
      description: "There was an error processing your document. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsProcessing(false);
  }
};


  const handleRemoveFile = () => {
    setUploadedFile(null);
    setImageUrl('');
    setProcessedDocument(null);
    setIsProcessing(false);
  };

  const handleChatMessage = async (message: string): Promise<string> => {
    return await sendChatMessage(message, processedDocument);
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-primary/10 backdrop-blur-sm" />
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-gradient-primary rounded-2xl shadow-primary">
                <FileText className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Document Intelligence
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Upload your document images and get instant OCR, intelligent summaries in multiple languages, and interactive AI chat capabilities.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <FileUpload
              onFileUpload={handleFileUpload}
              uploadedFile={uploadedFile}
              onRemoveFile={handleRemoveFile}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Document Display */}
        {imageUrl && uploadedFile && (
          <div className="animate-in fade-in-50 duration-500">
            <div className="flex items-center space-x-2 mb-6">
              <Zap className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Uploaded Document</h2>
            </div>
            <DocumentDisplay imageUrl={imageUrl} fileName={uploadedFile.name} />
          </div>
        )}

        {/* Summaries Section */}
        {(isProcessing || processedDocument) && (
          <div className="animate-in fade-in-50 duration-500">
            <div className="flex items-center space-x-2 mb-6">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Document Summaries</h2>
            </div>
            <SummarySection
              englishSummary={processedDocument?.englishSummary}
              teluguSummary={processedDocument?.teluguSummary}
              isLoading={isProcessing}
            />
          </div>
        )}

        {/* Chat Interface */}
        {processedDocument && (
          <div className="animate-in fade-in-50 duration-700">
            <ChatInterface onSendMessage={handleChatMessage} />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>Powered by Advanced OCR, AI Summarization, and Intelligent Chat</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;