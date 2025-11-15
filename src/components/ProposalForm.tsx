import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { proposalFormSchema, ProposalFormData } from '@/utils/validators';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Spinner } from './Spinner';

interface ProposalFormProps {
  onSubmit: (data: ProposalFormData) => void;
  isLoading?: boolean;
}

export const ProposalForm = ({ onSubmit, isLoading }: ProposalFormProps) => {
  const form = useForm<ProposalFormData>({
    resolver: zodResolver(proposalFormSchema),
    defaultValues: {
      client_name: '',
      project_type: '',
      company_name: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="client_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Name *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter client name"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="project_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Type *</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Web Design, SEO, Social Media"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter company name"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner size="sm" className="mr-2" />
              Generating Proposal...
            </>
          ) : (
            'Generate Proposal'
          )}
        </Button>
      </form>
    </Form>
  );
};
