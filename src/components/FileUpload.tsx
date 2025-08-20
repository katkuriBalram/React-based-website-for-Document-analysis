import { useState, useCallback } from 'react';
import { Upload, File, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  uploadedFile?: File | null;
  onRemoveFile: () => void;
}

export const FileUpload = ({ onFileUpload, uploadedFile, onRemoveFile }: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => 
      file.type === 'image/jpeg' || file.type === 'image/png'
    );
    
    if (imageFile) {
      onFileUpload(imageFile);
    }
  }, [onFileUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      onFileUpload(file);
    }
  }, [onFileUpload]);

  if (uploadedFile) {
    return (
      <Card className="shadow-card hover:shadow-card-hover transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <File className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">{uploadedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemoveFile}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className={`shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer ${
        isDragOver ? 'border-primary bg-primary/5' : 'border-border'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CardContent className="p-8">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 bg-gradient-primary rounded-full flex items-center justify-center">
            <Upload className="h-8 w-8 text-primary-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Upload Document Image
          </h3>
          <p className="text-muted-foreground mb-4">
            Drag and drop your image here, or click to browse
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Supports JPG and PNG files
          </p>
          <input
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button asChild className="bg-gradient-primary hover:bg-primary/90 shadow-primary">
              <span>Choose File</span>
            </Button>
          </label>
        </div>
      </CardContent>
    </Card>
  );
};