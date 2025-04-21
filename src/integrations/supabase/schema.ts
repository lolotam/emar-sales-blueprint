
import { Database } from './types';

// Extend the existing Supabase types with our new tables
export interface ExtendedDatabase extends Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string | null;
          email: string | null;
          role_id: string | null;
        };
        Insert: {
          id: string;
          name?: string | null;
          email?: string | null;
          role_id?: string | null;
        };
        Update: {
          id?: string;
          name?: string | null;
          email?: string | null;
          role_id?: string | null;
        };
      };
      roles: {
        Row: {
          id: string;
          role_name: string;
        };
        Insert: {
          id?: string;
          role_name: string;
        };
        Update: {
          id?: string;
          role_name?: string;
        };
      };
    } & Database['public']['Tables'];
    Views: Database['public']['Views'];
    Functions: Database['public']['Functions'];
    Enums: Database['public']['Enums'];
    CompositeTypes: Database['public']['CompositeTypes'];
  };
}

export type Role = 'Admin' | 'Salesman' | 'Accountant' | 'Warehouse';

export interface Profile {
  id: string;
  name: string | null;
  email: string | null;
  role: Role | null;
}
