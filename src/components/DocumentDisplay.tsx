import { Card, CardContent } from '@/components/ui/card';

interface DocumentDisplayProps {
  imageUrl: string;
  fileName: string;
}

export const DocumentDisplay = ({ imageUrl, fileName }: DocumentDisplayProps) => {
  return (
    <Card className="shadow-card overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={imageUrl}
            alt={fileName}
            className="w-full max-h-96 object-contain bg-muted"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
            <p className="text-white font-medium truncate">{fileName}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};