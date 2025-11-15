import { AppShell } from '@/components/AppShell';
import { PricingTable } from '@/components/PricingTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUIStore } from '@/state/uiStore';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, Copy, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const ProposalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const getProposalById = useUIStore((state) => state.getProposalById);

  const proposal = id ? getProposalById(id) : null;

  if (!proposal) {
    return (
      <AppShell>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Proposal not found</h2>
          <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
      </AppShell>
    );
  }

  const handleDownloadPDF = () => {
    window.open(proposal.proposal_pdf_download_url, '_blank');
    toast({
      title: 'Downloading PDF',
      description: 'Your proposal PDF is being downloaded',
    });
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: `${label} copied to clipboard`,
    });
  };

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{proposal.client_name}</h1>
            <p className="text-muted-foreground mt-1">{proposal.project_type}</p>
          </div>
          <Button onClick={handleDownloadPDF}>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Pricing Table */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing Breakdown</CardTitle>
              <CardDescription>Detailed cost breakdown for this project</CardDescription>
            </CardHeader>
            <CardContent>
              <PricingTable items={proposal.pricing_table} total={proposal.total} />
            </CardContent>
          </Card>

          {/* Cover Letter */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Cover Letter</CardTitle>
                  <CardDescription>Introduction and project overview</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyText(proposal.cover_letter, 'Cover letter')}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-wrap text-foreground">{proposal.cover_letter}</p>
              </div>
            </CardContent>
          </Card>

          {/* Contract Text */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Contract Terms</CardTitle>
                  <CardDescription>Legal terms and conditions</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyText(proposal.contract_text, 'Contract terms')}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-wrap text-foreground">{proposal.contract_text}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
};

export default ProposalDetail;
