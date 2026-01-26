'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types';

type AuthState = {
  user: User | null;
  signingIn: boolean;
  token: string | null;
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

const AUTH_KEY = 'shophub_auth_user';
const TOKEN_KEY = 'shophub_auth_token';
const LOGIN_TIME_KEY = 'shophub_login_time';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, signingIn: false, token: null });
  const router = useRouter();

  // Auto-logout after 30 minutes
  useEffect(() => {
    const checkTokenExpiry = () => {
      const loginTime = localStorage.getItem(LOGIN_TIME_KEY);
      if (loginTime) {
        const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds
        const now = Date.now();
        const timeSinceLogin = now - parseInt(loginTime);
        
        if (timeSinceLogin > thirtyMinutes) {
          signOut();
          alert('Session expired. Please login again.');
        }
      }
    };

    // Check immediately
    checkTokenExpiry();
    
    // Check every minute
    const interval = setInterval(checkTokenExpiry, 60000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(AUTH_KEY);
      const savedToken = localStorage.getItem(TOKEN_KEY);
      if (savedUser && savedToken) {
        setState({ 
          user: JSON.parse(savedUser), 
          signingIn: false, 
          token: savedToken 
        });
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
      signOut();
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    setState((s) => ({ ...s, signingIn: true }));
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store user data and token
      localStorage.setItem(AUTH_KEY, JSON.stringify(data.user));
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(LOGIN_TIME_KEY, Date.now().toString());

      setState({ 
        user: data.user, 
        signingIn: false, 
        token: data.token 
      });

    } catch (error: any) {
      setState({ user: null, signingIn: false, token: null });
      throw error;
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setState((s) => ({ ...s, signingIn: true }));
    
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      // Auto-login after successful signup
      await signIn(email, password);

    } catch (error: any) {
      setState({ user: null, signingIn: false, token: null });
      throw error;
    }
  };

  const signOut = () => {
    try {
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(LOGIN_TIME_KEY);
      // Clear cart when logging out
      localStorage.removeItem('shophub_cart');
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
    setState({ user: null, signingIn: false, token: null });
    router.push('/');
  };

  const changePassword = async (newPassword: string) => {
    if (!state.user) return Promise.reject(new Error('Not signed in'));
    
    try {
      // Call API to update password on server
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.token}`,
        },
        body: JSON.stringify({ newPassword }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to change password');
      }

      // Password changed successfully - no need to update local user object
      return Promise.resolve();
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user: state.user, 
      signingIn: state.signingIn, 
      signIn, 
      signUp, 
      signOut, 
      changePassword 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
