import { useState, useEffect } from 'react';
import { AppShell } from '@/components/AppShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, Trash2, Loader2 } from 'lucide-react';
import { apiRequest } from '@/lib/api';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';

interface Proposal {
  id: string;
  title: string;
  client_name?: string;
  project_title?: string;
  content?: string;
  created_at: string;
  pdf_url?: string;
}

interface GeneratedProposal {
  title: string;
  content: string;
  pricing_breakdown?: any[];
  total_cost?: number;
}

const Dashboard = () => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form state
  const [clientName, setClientName] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [scope, setScope] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [tone, setTone] = useState('Professional');
  const [notes, setNotes] = useState('');
  
  // Generated proposal state
  const [generatedProposal, setGeneratedProposal] = useState<GeneratedProposal | null>(null);
  
  // Proposals list
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    if (token) {
      fetchProposals(token);
    }
  }, [token]);

  const fetchProposals = async (authToken: string) => {
    try {
      const data = await apiRequest('/api/proposals/all', { method: 'GET', token: authToken });
      setProposals(data.proposals || []);
    } catch (error: any) {
      console.error('Failed to fetch proposals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateProposal = async () => {
    if (!clientName || !projectTitle || !scope || !budget || !timeline) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);

    try {
      const result = await apiRequest('/api/proposals/generate', {
        method: 'POST',
        body: {
          client_name: clientName,
          project_title: projectTitle,
          scope,
          budget,
          timeline,
          tone,
          notes,
        },
        token: token!,
      });

      setGeneratedProposal(result);
      toast({
        title: 'Proposal generated!',
        description: 'Review your AI-generated proposal below',
      });
    } catch (error: any) {
      toast({
        title: 'Generation failed',
        description: error.message || 'Failed to generate proposal',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveAndCreatePDF = async () => {
    if (!generatedProposal) return;

    setIsSaving(true);

    try {
      const result = await apiRequest('/api/proposals/create', {
        method: 'POST',
        body: {
          title: generatedProposal.title,
          content: generatedProposal.content,
          generate_pdf: true,
        },
        token: token!,
      });

      toast({
        title: 'Proposal saved!',
        description: 'Your proposal has been created with PDF',
      });

      // Refresh proposals list
      await fetchProposals(token!);
      
      // Clear form and generated proposal
      setClientName('');
      setProjectTitle('');
      setScope('');
      setBudget('');
      setTimeline('');
      setNotes('');
      setGeneratedProposal(null);

      // Open PDF if available
      if (result.pdf_url) {
        window.open(result.pdf_url, '_blank');
      }
    } catch (error: any) {
      toast({
        title: 'Save failed',
        description: error.message || 'Failed to save proposal',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProposal = async (id: string) => {
    try {
      await apiRequest(`/api/proposals/${id}`, { method: 'DELETE', token: token! });
      toast({
        title: 'Proposal deleted',
        description: 'Proposal has been removed',
      });
      await fetchProposals(token!);
    } catch (error: any) {
      toast({
        title: 'Delete failed',
        description: error.message || 'Failed to delete proposal',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AppShell>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Generate professional proposals with AI
          </p>
        </div>

        {/* Proposal Generator */}
        <Card>
          <CardHeader>
            <CardTitle>Create a New Proposal</CardTitle>
            <CardDescription>
              Fill in the details and let AI generate a professional proposal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name *</Label>
                <Input
                  id="clientName"
                  placeholder="John Doe"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectTitle">Project Title *</Label>
                <Input
                  id="projectTitle"
                  placeholder="Website Redesign"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scope">Scope *</Label>
              <Textarea
                id="scope"
                placeholder="Describe the project scope, deliverables, and requirements..."
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Budget *</Label>
                <Input
                  id="budget"
                  placeholder="$5,000 - $10,000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline">Timeline *</Label>
                <Input
                  id="timeline"
                  placeholder="4-6 weeks"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger id="tone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="Friendly">Friendly</SelectItem>
                  <SelectItem value="Formal">Formal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Extra Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional information or special requirements..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            <Button 
              onClick={handleGenerateProposal} 
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Proposal...
                </>
              ) : (
                'Generate Proposal with AI'
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Proposal Preview */}
        {generatedProposal && (
          <Card className="border-primary">
            <CardHeader>
              <CardTitle>Generated Proposal Preview</CardTitle>
              <CardDescription>
                Review your AI-generated proposal before saving
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">{generatedProposal.title}</h3>
                <Separator className="my-3" />
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-sans">
                    {generatedProposal.content}
                  </pre>
                </div>
              </div>

              {generatedProposal.pricing_breakdown && (
                <div>
                  <h4 className="font-semibold mb-2">Pricing Breakdown</h4>
                  <div className="space-y-2">
                    {generatedProposal.pricing_breakdown.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>{item.name}</span>
                        <span className="font-medium">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {generatedProposal.total_cost && (
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total Cost</span>
                  <span>{generatedProposal.total_cost}</span>
                </div>
              )}

              <Button 
                onClick={handleSaveAndCreatePDF} 
                disabled={isSaving}
                className="w-full"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save & Create PDF'
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* My Proposals Section */}
        <Card>
          <CardHeader>
            <CardTitle>My Proposals</CardTitle>
            <CardDescription>
              View and manage all your saved proposals
            </CardDescription>
          </CardHeader>
          <CardContent>
            {proposals.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No proposals yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Create your first proposal using the form above
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {proposals.map((proposal) => (
                  <div
                    key={proposal.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{proposal.title}</h4>
                        {(proposal.client_name || proposal.project_title) && (
                          <p className="text-sm text-muted-foreground">
                            {proposal.client_name && proposal.project_title 
                              ? `${proposal.client_name} • ${proposal.project_title}`
                              : proposal.client_name || proposal.project_title
                            }
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(proposal.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {proposal.pdf_url && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(proposal.pdf_url, '_blank')}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProposal(proposal.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
};

export default Dashboard;
