'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { users as staticUsers } from '@/data/users';
import { User } from '@/types';

type AuthState = {
  user: User | null;
  signingIn: boolean;
};

type AuthContextType = {
  user: User | null;
  signingIn: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  changePassword: (newPassword: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_USER_KEY = 'lm_local_users';
const AUTH_KEY = 'lm_auth_user';

function readLocalUsers(): User[] {
  try {
    const raw = localStorage.getItem(LOCAL_USER_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeLocalUsers(users: User[]) {
  try {
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(users));
  } catch {}
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, signingIn: false });
  const router = useRouter();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (raw) setState({ user: JSON.parse(raw), signingIn: false });
    } catch {}
  }, []);

  const signIn = async (email: string, password: string) => {
    setState((s) => ({ ...s, signingIn: true }));
    // Look for user in static users and local users
    const local = readLocalUsers();
    const found = [...staticUsers, ...local].find((u) => u.email === email);
    if (!found) {
      setState({ user: null, signingIn: false });
      return Promise.reject(new Error('User not found'));
    }
    // Check password for demo users (stored in plain text for dev only)
    if (found.password && found.password !== password) {
      setState({ user: null, signingIn: false });
      return Promise.reject(new Error('Invalid credentials'));
    }
    // Require admin role for admin area
    if (found.role !== 'admin') {
      setState({ user: null, signingIn: false });
      return Promise.reject(new Error('User is not an admin'));
    }
    try {
      localStorage.setItem(AUTH_KEY, JSON.stringify(found));
    } catch {}
    setState({ user: found, signingIn: false });
    return Promise.resolve();
  };

  const signUp = async (name: string, email: string, password: string) => {
    // Development flow: create local admin accounts by default for convenience.
    // In production, replace with secure server-side signup and role assignment.
    const role: 'admin' | 'user' = 'admin';
    const newUser: User = { id: String(Date.now()), name, email, role, password };
    const local = readLocalUsers();
    local.push(newUser);
    writeLocalUsers(local);
    // If user is admin, sign them in automatically
    try {
      localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
    } catch {}
    setState({ user: newUser, signingIn: false });
    return Promise.resolve();
  };

  const signOut = () => {
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch {}
    setState({ user: null, signingIn: false });
    router.push('/');
  };

  const changePassword = async (newPassword: string) => {
    if (!state.user) return Promise.reject(new Error('Not signed in'));
    const updated: User = { ...state.user, password: newPassword };
    // Update local users store so subsequent sign-ins work
    const local = readLocalUsers();
    const existsIndex = local.findIndex((u) => u.email === updated.email);
    if (existsIndex >= 0) {
      local[existsIndex] = { ...local[existsIndex], password: newPassword };
    } else {
      // create a local copy (overrides static user)
      local.push(updated);
    }
    writeLocalUsers(local);
    try {
      localStorage.setItem(AUTH_KEY, JSON.stringify(updated));
    } catch {}
    setState({ user: updated, signingIn: false });
    return Promise.resolve();
  };

  return (
    <AuthContext.Provider value={{ user: state.user, signingIn: state.signingIn, signIn, signUp, signOut, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
