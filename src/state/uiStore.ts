import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GenerateProposalResponse } from '@/api/client';

export interface Proposal extends GenerateProposalResponse {
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
  addProposal: (proposal: Proposal) => void;
  setCurrentProposal: (proposal: Proposal | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  getProposalById: (id: string) => Proposal | undefined;
  clearProposals: () => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      proposals: [],
      currentProposal: null,
      isLoading: false,
      error: null,
      addProposal: (proposal) => {
        set((state) => ({
          proposals: [...state.proposals, proposal],
          currentProposal: proposal,
        }));
      },
      setCurrentProposal: (proposal) => set({ currentProposal: proposal }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      getProposalById: (id) => {
        return get().proposals.find((p) => p.id === id);
      },
      clearProposals: () => set({ proposals: [], currentProposal: null }),
    }),
    {
      name: 'proposely-storage',
      partialize: (state) => ({
        proposals: state.proposals,
        currentProposal: state.currentProposal,
      }),
    }
  )
);
