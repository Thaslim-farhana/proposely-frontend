import { AppShell } from '@/components/AppShell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');

  const handleSave = () => {
    // In a real app, this would save to a backend
    localStorage.setItem('company_settings', JSON.stringify({
      companyName,
      companyEmail,
      companyPhone,
      companyAddress,
    }));
    
    toast({
      title: 'Settings saved',
      description: 'Your company settings have been updated',
    });
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your company information and preferences
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>
              This information will appear in your proposals
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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
              <Label htmlFor="companyEmail">Company Email</Label>
              <Input
                id="companyEmail"
                type="email"
                placeholder="hello@company.com"
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyPhone">Phone Number</Label>
              <Input
                id="companyPhone"
                placeholder="+91 1234567890"
                value={companyPhone}
                onChange={(e) => setCompanyPhone(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyAddress">Address</Label>
              <Input
                id="companyAddress"
                placeholder="Company address"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
              />
            </div>

            <Separator />

            <Button onClick={handleSave} className="w-full">
              Save Settings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
            <CardDescription>
              Configure backend API endpoint
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>Backend URL</Label>
              <Input
                value={import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}
                disabled
                className="bg-muted"
              />
              <p className="text-sm text-muted-foreground">
                Configure this in your .env file: VITE_API_BASE_URL
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
};

export default Settings;
