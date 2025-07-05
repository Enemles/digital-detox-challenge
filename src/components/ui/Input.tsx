import React, { useState, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../utils/cn';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'danger';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  showPasswordToggle?: boolean;
}

const inputSizes = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-5 py-4 text-lg',
};

const inputVariants = {
  default: 'border-gray-300 focus:border-primary focus:ring-primary/20',
  success: 'border-success focus:border-success focus:ring-success/20',
  warning: 'border-warning focus:border-warning focus:ring-warning/20',
  danger: 'border-danger focus:border-danger focus:ring-danger/20',
};

const labelVariants = {
  default: 'text-gray-700',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  hint,
  size = 'md',
  variant = 'default',
  fullWidth = false,
  leftIcon,
  rightIcon,
  loading = false,
  showPasswordToggle = false,
  type = 'text',
  disabled,
  className,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = showPasswordToggle && type === 'password' 
    ? (showPassword ? 'text' : 'password')
    : type;

  const inputVariant = error ? 'danger' : variant;

  const baseClasses = cn(
    // Base
    'w-full rounded-lg border transition-all duration-200 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-1',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50',
    // Taille
    inputSizes[size],
    // Variant
    inputVariants[inputVariant],
    // Largeur
    fullWidth && 'w-full',
    // Padding pour les icônes
    leftIcon && 'pl-10',
    (rightIcon || showPasswordToggle) && 'pr-10',
    // Classes personnalisées
    className
  );

  const containerClasses = cn(
    'relative',
    fullWidth && 'w-full'
  );

  const labelClasses = cn(
    'block text-sm font-medium mb-2',
    labelVariants[inputVariant]
  );

  return (
    <div className={containerClasses}>
      {/* Label */}
      {label && (
        <motion.label
          className={labelClasses}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      )}

      {/* Container d'input avec icônes */}
      <div className="relative">
        {/* Icône gauche */}
        {leftIcon && (
          <motion.div
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            {leftIcon}
          </motion.div>
        )}

        {/* Input */}
        <motion.input
          ref={ref}
          type={inputType}
          disabled={disabled || loading}
          className={baseClasses}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          {...props}
        />

        {/* Icône droite ou toggle password */}
        {(rightIcon || showPasswordToggle) && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {showPasswordToggle && type === 'password' ? (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            ) : (
              rightIcon && (
                <motion.div
                  className="text-gray-400"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  {rightIcon}
                </motion.div>
              )
            )}
          </div>
        )}

        {/* Indicateur de focus */}
        {isFocused && (
          <motion.div
            className="absolute inset-0 rounded-lg border-2 border-primary/30 pointer-events-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          />
        )}

        {/* Indicateur de chargement */}
        {loading && (
          <motion.div
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
      </div>

      {/* Message d'erreur */}
      {error && (
        <motion.p
          className="mt-2 text-sm text-danger"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}

      {/* Message d'aide */}
      {hint && !error && (
        <motion.p
          className="mt-2 text-sm text-gray-500"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {hint}
        </motion.p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

// Composant TextArea spécialisé
export const TextArea = forwardRef<HTMLTextAreaElement, 
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> & {
    label?: string;
    error?: string;
    hint?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'success' | 'warning' | 'danger';
    fullWidth?: boolean;
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  }
>(({
  label,
  error,
  hint,
  size = 'md',
  variant = 'default',
  fullWidth = false,
  resize = 'vertical',
  disabled,
  className,
  rows = 4,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const textareaVariant = error ? 'danger' : variant;

  const baseClasses = cn(
    // Base
    'w-full rounded-lg border transition-all duration-200 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-1',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50',
    // Taille
    inputSizes[size],
    // Variant
    inputVariants[textareaVariant],
    // Resize
    resize === 'none' && 'resize-none',
    resize === 'vertical' && 'resize-y',
    resize === 'horizontal' && 'resize-x',
    resize === 'both' && 'resize',
    // Largeur
    fullWidth && 'w-full',
    // Classes personnalisées
    className
  );

  const containerClasses = cn(
    'relative',
    fullWidth && 'w-full'
  );

  const labelClasses = cn(
    'block text-sm font-medium mb-2',
    labelVariants[textareaVariant]
  );

  return (
    <div className={containerClasses}>
      {/* Label */}
      {label && (
        <motion.label
          className={labelClasses}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      )}

      {/* Container textarea */}
      <div className="relative">
        {/* Textarea */}
        <motion.textarea
          ref={ref}
          disabled={disabled}
          className={baseClasses}
          rows={rows}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          {...props}
        />

        {/* Indicateur de focus */}
        {isFocused && (
          <motion.div
            className="absolute inset-0 rounded-lg border-2 border-primary/30 pointer-events-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          />
        )}
      </div>

      {/* Message d'erreur */}
      {error && (
        <motion.p
          className="mt-2 text-sm text-danger"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}

      {/* Message d'aide */}
      {hint && !error && (
        <motion.p
          className="mt-2 text-sm text-gray-500"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {hint}
        </motion.p>
      )}
    </div>
  );
});

TextArea.displayName = 'TextArea';

// Composant Select spécialisé
export const Select = forwardRef<HTMLSelectElement,
  Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> & {
    label?: string;
    error?: string;
    hint?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'success' | 'warning' | 'danger';
    fullWidth?: boolean;
    options: Array<{ value: string; label: string; disabled?: boolean }>;
    placeholder?: string;
  }
>(({
  label,
  error,
  hint,
  size = 'md',
  variant = 'default',
  fullWidth = false,
  options,
  placeholder,
  disabled,
  className,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const selectVariant = error ? 'danger' : variant;

  const baseClasses = cn(
    // Base
    'w-full rounded-lg border transition-all duration-200 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-1',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50',
    'appearance-none bg-white',
    // Taille
    inputSizes[size],
    // Variant
    inputVariants[selectVariant],
    // Largeur
    fullWidth && 'w-full',
    // Padding pour la flèche
    'pr-10',
    // Classes personnalisées
    className
  );

  const containerClasses = cn(
    'relative',
    fullWidth && 'w-full'
  );

  const labelClasses = cn(
    'block text-sm font-medium mb-2',
    labelVariants[selectVariant]
  );

  return (
    <div className={containerClasses}>
      {/* Label */}
      {label && (
        <motion.label
          className={labelClasses}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      )}

      {/* Container select */}
      <div className="relative">
        {/* Select */}
        <motion.select
          ref={ref}
          disabled={disabled}
          className={baseClasses}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </motion.select>

        {/* Flèche custom */}
        <motion.div
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>

        {/* Indicateur de focus */}
        {isFocused && (
          <motion.div
            className="absolute inset-0 rounded-lg border-2 border-primary/30 pointer-events-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          />
        )}
      </div>

      {/* Message d'erreur */}
      {error && (
        <motion.p
          className="mt-2 text-sm text-danger"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}

      {/* Message d'aide */}
      {hint && !error && (
        <motion.p
          className="mt-2 text-sm text-gray-500"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {hint}
        </motion.p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Input; 