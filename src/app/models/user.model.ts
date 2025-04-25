export interface User {
    id: number;
    username: string;
    password: string;
    role: 'patient' | 'doctor';
    email: string;
    firstName: string;
    lastName: string;
    speciality?: string;
    licence?: string;
    contact?: string;
    address?: string;
  }
  