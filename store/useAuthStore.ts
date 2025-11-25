// stores/auth-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  contactType: 'email' | 'phone';
  contact: string;
  setContactInfo: (contactType: 'email' | 'phone', contact: string) => void;
  clearContactInfo: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      contactType: 'email',
      contact: '',
      setContactInfo: (contactType, contact) => set({ contactType, contact }),
      clearContactInfo: () => set({ contactType: 'email', contact: '' }),
    }),
    {
      name: 'auth-storage',
    }
  )
);