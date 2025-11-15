import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GenerateProposalResponse } from '@/api/client';

interface Proposal extends GenerateProposalResponse {
  id: string;
  client_name: string;
  project_type: string;
  company_name?: string;
  created_at: string;
}

interface UIStore {
  proposals: Proposal[];
  currentProposal: Proposal | null;
  isLoading: boolean;
  error: string | null;
  addProposal: (proposal: Omit<Proposal, 'id' | 'created_at'>) => void;
  setCurrentProposal: (proposal: Proposal | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  getProposalById: (id: string) => Proposal | undefined;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      proposals: [],
      currentProposal: null,
      isLoading: false,
      error: null,
      addProposal: (proposal) => {
        const newProposal: Proposal = {
          ...proposal,
          id: crypto.randomUUID(),
          created_at: new Date().toISOString(),
        };
        set((state) => ({
          proposals: [newProposal, ...state.proposals],
          currentProposal: newProposal,
        }));
      },
      setCurrentProposal: (proposal) => set({ currentProposal: proposal }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      getProposalById: (id) => {
        return get().proposals.find((p) => p.id === id);
      },
    }),
    {
      name: 'proposely-storage',
    }
  )
);
