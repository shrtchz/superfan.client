// Auth-related type definitions
export type ContactType = 'email' | 'phone';

export interface ResetPasswordStep1 {
  contact: string;
}

export interface ResetPasswordStep2 {
  code: string;
}

export interface AuthStoreState {
  contactType: 'email' | 'phone';
  contact: string;
  setContactInfo: (contactType: ContactType, contact: string) => void;
  clearContactInfo: () => void;
}
