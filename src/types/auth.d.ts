
import { User } from '@/contexts/AuthContext';

declare module '@/contexts/AuthContext' {
  export interface User {
    id: string;
    name: string;
    email: string;
    balance: number;
  }
}
