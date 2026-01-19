'use client';

import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({ message, type, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto-hide after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'info':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'info':
        return 'ℹ';
      default:
        return '';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className={`${getToastStyles()} px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px]`}>
        <span className="text-lg font-bold">{getIcon()}</span>
        <span className="flex-1">{message}</span>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 font-bold text-lg leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
}