import { User } from '@/types';

export const users: User[] = [
  { id: 'u1', name: 'Alice Johnson', email: 'alice@example.com', role: 'user', password: 'password' },
  { id: 'u2', name: 'Bob Smith', email: 'bob@example.com', role: 'user', password: 'password' },
  { id: 'u3', name: 'Carol Lee', email: 'carol@example.com', role: 'admin', password: 'admin' },
  { id: 'u4', name: 'John Doe', email: 'john@example.com', role: 'user', password: 'password' },
];

// Export users without passwords for client-side use
export const usersWithoutPasswords: User[] = users.map(({ password, ...user }) => user);
