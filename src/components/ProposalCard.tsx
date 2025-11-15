import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProposalCardProps {
  id: string;
  client_name: string;
  project_type: string;
  company_name?: string;
  created_at: string;
  total: number;
}

export const ProposalCard = ({
  id,
  client_name,
  project_type,
  company_name,
  created_at,
  total,
}: ProposalCardProps) => {
  const navigate = useNavigate();
  const date = new Date(created_at).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/proposal/${id}`)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{client_name}</CardTitle>
              <CardDescription>{project_type}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-muted-foreground">
          {company_name && (
            <p className="font-medium text-foreground">{company_name}</p>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <p className="text-lg font-bold text-foreground">₹{total.toLocaleString()}</p>
        </div>
        <Button variant="outline" className="w-full mt-4" onClick={(e) => {
          e.stopPropagation();
          navigate(`/proposal/${id}`);
        }}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};
