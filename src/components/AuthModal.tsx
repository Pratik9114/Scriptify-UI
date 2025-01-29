import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import ReCAPTCHA from 'react-google-recaptcha';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'login' | 'signup';
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, type, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const { login, signup, resetPassword } = useAuth();

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number';
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return 'Password must contain at least one special character (!@#$%^&*)';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (type === 'login') {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      onSuccess?.();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred');
      }
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    try {
      await resetPassword(email);
      setError('');
      setShowForgotPassword(false);
      alert('Password reset instructions have been sent to your email');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred');
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-neutral-900 p-8 rounded-lg w-full max-w-md relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
            
            <h2 className="text-2xl font-bold mb-6 dark:text-white">
              {showForgotPassword ? 'Reset Password' : type === 'login' ? 'Login' : 'Sign Up'}
            </h2>
            
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200"
              >
                {error}
              </motion.div>
            )}
            
            <form onSubmit={showForgotPassword ? handleForgotPassword : handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">Email</label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-neutral-800 rounded border border-gray-300 dark:border-neutral-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 dark:text-white"
                  required
                />
              </div>
              
              {!showForgotPassword && (
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-white">
                    Password
                    {type === 'signup' && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                        (min. 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character)
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-neutral-800 rounded border border-gray-300 dark:border-neutral-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 dark:text-white pr-10"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              )}

              {type === 'login' && !showForgotPassword && (
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
                >
                  Forgot your password?
                </button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded font-medium text-white"
              >
                {showForgotPassword ? 'Reset Password' : type === 'login' ? 'Login' : 'Sign Up'}
              </motion.button>

              {showForgotPassword && (
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="w-full text-sm text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
                >
                  Back to login
                </button>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
