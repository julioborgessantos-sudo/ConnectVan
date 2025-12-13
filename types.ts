export enum UserRole {
  CLIENT = 'CLIENT',
  DRIVER = 'DRIVER',
  PARTNER = 'PARTNER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Driver {
  id: string;
  userId: string;
  name: string;
  photoUrl: string;
  vehicle: string;
  route: string;
  schools: string[];
  rating: number;
  phone: string;
  bio: string;
}

export interface Partner {
  id: string;
  userId: string;
  name: string;
  category: string; // e.g., 'Mechanic', 'Stationary', 'Car Wash'
  description: string;
  photoUrl: string;
  address: string;
  phone: string;
}

export interface Discount {
  id: string;
  partnerId: string;
  partnerName: string;
  title: string;
  description: string;
  percentageOff: number;
  code: string;
  expiryDate: string;
}

export type MaintenanceType = 'OLEO' | 'PNEUS' | 'FREIOS' | 'REVISAO' | 'OUTROS';

export interface MaintenanceRecord {
  id: string;
  date: string;
  type: MaintenanceType;
  km: number;
  description: string;
  cost: number;
  nextDueKm?: number; // Sugestão de próxima troca
}