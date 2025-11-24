import { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { useUIStore } from '@/state/uiStore';
import { useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  FileText, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Search,
  Download,
  Eye,
  Copy,
  Filter
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type ProposalStatus = 'Draft' | 'Sent' | 'Accepted' | 'Rejected';

const Dashboard = () => {
  const navigate = useNavigate();
  const proposals = useUIStore((state) => state.proposals);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedProposal, setSelectedProposal] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Helper to get random status for demo
  const getStatus = (index: number): ProposalStatus => {
    const statuses: ProposalStatus[] = ['Draft', 'Sent', 'Accepted', 'Rejected'];
    return statuses[index % 4];
  };

  // Filter proposals
  const filteredProposals = proposals.filter((proposal) => {
    const matchesSearch = 
      proposal.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.project_type.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === 'All') return matchesSearch;
    return matchesSearch && getStatus(proposals.indexOf(proposal)) === statusFilter;
  });

  // Calculate KPIs
  const thisMonthProposals = proposals.length;
  const wonValue = proposals
    .filter((_, idx) => getStatus(idx) === 'Accepted')
    .reduce((sum, p) => sum + (p.total || 0), 0);
  const pendingProposals = proposals.filter((_, idx) => 
    getStatus(idx) === 'Sent' || getStatus(idx) === 'Draft'
  ).length;
  const avgResponseTime = '2.5 days';

  const handleRowClick = (proposal: any) => {
    setSelectedProposal(proposal);
    setDrawerOpen(true);
  };

  const handleDownload = (url: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    window.open(url, '_blank');
  };

  const getStatusVariant = (status: ProposalStatus): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'Accepted': return 'default';
      case 'Sent': return 'secondary';
      case 'Draft': return 'outline';
      case 'Rejected': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Track your proposals, status, and revenue at a glance.
            </p>
          </div>
          <Button onClick={() => navigate('/create')}>
            <PlusCircle className="w-4 h-4 mr-2" />
            New Proposal
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Proposals This Month</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{thisMonthProposals}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Won Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{wonValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">+8%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Proposals</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingProposals}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Awaiting response
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgResponseTime}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">-15%</span> faster
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => navigate('/create')}>
                <PlusCircle className="w-4 h-4 mr-2" />
                Create Proposal
              </Button>
              <Button variant="outline" onClick={() => console.log('Duplicate last')}>
                <Copy className="w-4 h-4 mr-2" />
                Duplicate Last Proposal
              </Button>
              <Button variant="outline" onClick={() => console.log('View templates')}>
                <FileText className="w-4 h-4 mr-2" />
                View Templates
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Proposals Table Section */}
        {proposals.length === 0 ? (
          <EmptyState
            title="No proposals yet"
            description="Create your first professional proposal in under 60 seconds."
            actionLabel="Create your first proposal"
            onAction={() => navigate('/create')}
          />
        ) : (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Proposals</CardTitle>
              </div>
              <CardDescription>
                Manage and track all your proposals
              </CardDescription>
              
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by client or project type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Status</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Sent">Sent</SelectItem>
                    <SelectItem value="Accepted">Accepted</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>

            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-sm">Client</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Project Type</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                      <th className="text-right py-3 px-4 font-medium text-sm">Total</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Last Updated</th>
                      <th className="text-right py-3 px-4 font-medium text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProposals.map((proposal, index) => {
                      const status = getStatus(proposals.indexOf(proposal));
                      const date = new Date(proposal.created_at).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      });

                      return (
                        <tr 
                          key={proposal.id} 
                          className="border-b hover:bg-muted/50 cursor-pointer transition-colors"
                          onClick={() => handleRowClick(proposal)}
                        >
                          <td className="py-3 px-4">
                            <div className="font-medium">{proposal.client_name}</div>
                            {proposal.company_name && (
                              <div className="text-xs text-muted-foreground">{proposal.company_name}</div>
                            )}
                          </td>
                          <td className="py-3 px-4 text-sm">{proposal.project_type}</td>
                          <td className="py-3 px-4">
                            <Badge variant={getStatusVariant(status)}>{status}</Badge>
                          </td>
                          <td className="py-3 px-4 text-right font-medium">
                            ₹{(proposal.total || 0).toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{date}</td>
                          <td className="py-3 px-4">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/proposal/${proposal.id}`);
                                }}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              {proposal.proposal_pdf_download_url && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => handleDownload(proposal.proposal_pdf_download_url, e)}
                                >
                                  <Download className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {filteredProposals.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No proposals found matching your filters.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quick View Drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedProposal && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedProposal.client_name}</SheetTitle>
                <SheetDescription>
                  {selectedProposal.project_type}
                  {selectedProposal.company_name && ` • ${selectedProposal.company_name}`}
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6 mt-6">
                {/* Total */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Amount</h3>
                  <p className="text-2xl font-bold">₹{(selectedProposal.total || 0).toLocaleString()}</p>
                </div>

                {/* Cover Letter */}
                {selectedProposal.cover_letter && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Cover Letter</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {selectedProposal.cover_letter}
                    </p>
                  </div>
                )}

                {/* Pricing Table */}
                {selectedProposal.pricing_table && selectedProposal.pricing_table.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-3">Pricing Breakdown</h3>
                    <div className="space-y-2">
                      {selectedProposal.pricing_table.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center py-2 border-b">
                          <div>
                            <p className="text-sm font-medium">{item.name}</p>
                            {item.duration && (
                              <p className="text-xs text-muted-foreground">{item.duration}</p>
                            )}
                          </div>
                          <p className="text-sm font-medium">₹{item.price.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <SheetFooter className="mt-6 flex-col sm:flex-row gap-2">
                {selectedProposal.proposal_pdf_download_url && (
                  <Button 
                    onClick={() => handleDownload(selectedProposal.proposal_pdf_download_url)}
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  onClick={() => console.log('Duplicate', selectedProposal.id)}
                  className="w-full"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </AppShell>
  );
};

export default Dashboard;
