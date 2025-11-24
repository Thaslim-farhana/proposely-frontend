import { AppShell } from '@/components/AppShell';
import { ProposalForm } from '@/components/ProposalForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateProposal } from '@/api/client';
import { useUIStore } from '@/state/uiStore';
import { ProposalFormData } from '@/utils/validators';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const CreateProposal = () => {
  const navigate = useNavigate();
  const { addProposal, setLoading, setError, isLoading } = useUIStore();

  const handleSubmit = async (data: ProposalFormData) => {
    setLoading(true);
    setError(null);

    const payload = {
      client_name: data.client_name,
      project_type: data.project_type,
      company_name: data.company_name || undefined,
    };

    try {
      const payload = {
        client_name: data.client_name,
        project_type: data.project_type,
        company_name: data.company_name || undefined,
      };

      const response = await generateProposal(payload);

      const proposalToAdd = {
        client_name: data.client_name,
        project_type: data.project_type,
        company_name: data.company_name,
        created_at: new Date().toISOString(),
        ...response,
      };

      addProposal(proposalToAdd);

      toast({
        title: 'Success!',
        description: 'Proposal generated successfully',
      });

      navigate(`/proposal/${response.id}`);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Failed to generate proposal';
      setError(errorMessage);
      
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });

      if (!error?.response) {
        localStorage.setItem('draft_proposal', JSON.stringify(payload));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create New Proposal</h1>
          <p className="text-muted-foreground mt-1">
            Fill in the details to generate a professional proposal
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Proposal Details</CardTitle>
            <CardDescription>
              Enter client information and project type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProposalForm onSubmit={handleSubmit} isLoading={isLoading} />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
};

export default CreateProposal;
