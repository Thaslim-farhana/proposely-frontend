import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface GenerateProposalPayload {
  client_name: string;
  project_type: string;
  company_name?: string;
}

export interface PricingItem {
  item: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface GenerateProposalResponse {
  proposal_pdf_download_url: string;
  pricing_table: PricingItem[];
  total: number;
  cover_letter: string;
  contract_text: string;
}

export const generateProposal = async (payload: GenerateProposalPayload): Promise<GenerateProposalResponse> => {
  const response = await apiClient.post<GenerateProposalResponse>('/generate', payload);
  return response.data;
};

export const checkHealth = async () => {
  const response = await apiClient.get('/health');
  return response.data;
};

export const getDownloadUrl = (filename: string) => {
  return `${API_BASE_URL}/download/${filename}`;
};
