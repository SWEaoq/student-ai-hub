import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useToastContext } from './ToastProvider';

/**
 * CopyButton - Reusable copy button with toast feedback
 * @param {string} text - Text to copy
 * @param {string} successMessage - Success message (default: "Copied!")
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Button content (optional)
 */
const CopyButton = ({ 
  text, 
  successMessage = 'Copied!',
  className = '',
  children,
  ...props 
}) => {
  const [copied, setCopied] = useState(false);
  const { success } = useToastContext();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      success(successMessage);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleCopy}
      className={`
        flex items-center justify-center gap-2 transition-all
        ${copied 
          ? 'bg-green-500 text-black' 
          : 'bg-white/10 text-white hover:bg-purple-600 hover:text-white'
        }
        ${className}
      `}
      {...props}
    >
      {children || (
        <>
          {copied ? (
            <>
              <Check size={16} />
              <span>{successMessage}</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span>Copy</span>
            </>
          )}
        </>
      )}
    </motion.button>
  );
};

export default CopyButton;

