import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText, Globe } from 'lucide-react';

interface SummarySectionProps {
  englishSummary?: string;
  teluguSummary?: string;
  isLoading: boolean;
}

export const SummarySection = ({ englishSummary, teluguSummary, isLoading }: SummarySectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* English Summary */}
      <Card className="shadow-card hover:shadow-card-hover transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-foreground">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <FileText className="h-4 w-4 text-primary-foreground" />
            </div>
            <span>English Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : englishSummary ? (
            <p className="text-foreground leading-relaxed">{englishSummary}</p>
          ) : (
            <p className="text-muted-foreground italic">
              English summary will appear here after processing...
            </p>
          )}
        </CardContent>
      </Card>

      {/* Telugu Summary */}
      <Card className="shadow-card hover:shadow-card-hover transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-foreground">
            <div className="p-2 bg-gradient-hero rounded-lg">
              <Globe className="h-4 w-4 text-accent-foreground" />
            </div>
            <span>Telugu Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ) : teluguSummary ? (
            <p className="text-foreground leading-relaxed" style={{ fontFamily: 'system-ui' }}>
              {teluguSummary}
            </p>
          ) : (
            <p className="text-muted-foreground italic">
              Telugu summary will appear here after processing...
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};