import React, { createContext, useContext } from 'react';
import { useToast } from '../../hooks/useToast';
import { ToastContainer } from './Toast';

const ToastContext = createContext(null);

/**
 * ToastProvider - Context provider for toast notifications
 * Wraps app and provides toast functionality to all children
 */
export const ToastProvider = ({ children }) => {
  const toast = useToast();

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />
    </ToastContext.Provider>
  );
};

/**
 * useToastContext - Hook to access toast functions from context
 */
export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within ToastProvider');
  }
  return context;
};

