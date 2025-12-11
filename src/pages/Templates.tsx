import { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { 
  FileText, 
  Palette, 
  Layout, 
  Save, 
  Eye, 
  Plus,
  Check
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
}

const defaultTemplates: Template[] = [
  { id: 'professional', name: 'Professional', description: 'Clean and corporate design', isDefault: true },
  { id: 'modern', name: 'Modern', description: 'Contemporary with bold typography', isDefault: false },
  { id: 'minimal', name: 'Minimal', description: 'Simple and elegant layout', isDefault: false },
];

const Templates = () => {
  const { user } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('professional');
  const [companyName, setCompanyName] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#5B4EF7');
  const [footerText, setFooterText] = useState('');
  const [headerText, setHeaderText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // TODO: Save to backend when endpoint is ready
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: 'Settings saved',
        description: 'Your template customizations have been saved.',
      });
    } catch (error) {
      toast({
        title: 'Failed to save',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AppShell>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Proposal Templates</h1>
          <p className="text-muted-foreground mt-2">
            Customize how your proposals look and feel
          </p>
        </div>

        <Tabs defaultValue="templates" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="branding" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Branding
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Content
            </TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              {defaultTemplates.map((template) => (
                <Card 
                  key={template.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedTemplate === template.id 
                      ? 'ring-2 ring-primary border-primary' 
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      {selectedTemplate === template.id && (
                        <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center border">
                      <FileText className="h-12 w-12 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="cursor-pointer border-dashed hover:border-primary/50 transition-all">
                <CardHeader>
                  <CardTitle className="text-lg text-muted-foreground">Custom Template</CardTitle>
                  <CardDescription>Create your own design</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[3/4] bg-muted/50 rounded-lg flex flex-col items-center justify-center border border-dashed">
                    <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Coming Soon</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="branding" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Brand Settings</CardTitle>
                <CardDescription>
                  Customize your proposals with your company branding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      placeholder="Your Company Name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyLogo">Logo URL</Label>
                    <Input
                      id="companyLogo"
                      placeholder="https://example.com/logo.png"
                      value={companyLogo}
                      onChange={(e) => setCompanyLogo(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Brand Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-16 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        placeholder="#5B4EF7"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                {companyLogo && (
                  <div className="space-y-2">
                    <Label>Logo Preview</Label>
                    <div className="p-4 bg-muted rounded-lg inline-block">
                      <img 
                        src={companyLogo} 
                        alt="Company logo preview" 
                        className="max-h-16 max-w-48 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Default Content</CardTitle>
                <CardDescription>
                  Set default text that appears on all your proposals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="headerText">Header Text</Label>
                  <Input
                    id="headerText"
                    placeholder="Proposal for [Client Name]"
                    value={headerText}
                    onChange={(e) => setHeaderText(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Use [Client Name] as a placeholder for the client's name
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="footerText">Footer Text</Label>
                  <Textarea
                    id="footerText"
                    placeholder="Thank you for considering our services. We look forward to working with you."
                    value={footerText}
                    onChange={(e) => setFooterText(e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 mt-8">
          <Button variant="outline" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button 
            onClick={handleSaveSettings} 
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </AppShell>
  );
};

export default Templates;
