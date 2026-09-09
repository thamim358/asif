export interface RsvpData {
  name: string;
  phone: string;
  guests: number;
  attending: 'yes' | 'no';
  notes?: string;
  submittedAt?: string;
}

export type InvitationPhase = 'intro' | 'playing' | 'revealing' | 'revealed';
