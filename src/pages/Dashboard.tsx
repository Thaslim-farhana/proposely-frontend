import { AppShell } from '@/components/AppShell';
import { ProposalCard } from '@/components/ProposalCard';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { useUIStore } from '@/state/uiStore';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const proposals = useUIStore((state) => state.proposals);

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage your proposals and quotations
            </p>
          </div>
          <Button onClick={() => navigate('/create')}>
            <PlusCircle className="w-4 h-4 mr-2" />
            New Proposal
          </Button>
        </div>

        {proposals.length === 0 ? (
          <EmptyState
            title="No proposals yet"
            description="Create your first proposal to get started"
            actionLabel="Create Proposal"
            onAction={() => navigate('/create')}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proposals.map((proposal) => (
              <ProposalCard
                key={proposal.id}
                id={proposal.id}
                client_name={proposal.client_name}
                project_type={proposal.project_type}
                company_name={proposal.company_name}
                created_at={proposal.created_at}
                total={proposal.total}
              />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
};

export default Dashboard;
