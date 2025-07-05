import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  disabled?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
}

const buttonVariants = {
  // Variants de couleur
  primary: 'bg-primary hover:bg-primary/90 text-white shadow-eco',
  secondary: 'bg-secondary hover:bg-secondary/90 text-white shadow-md',
  success: 'bg-success hover:bg-success/90 text-white shadow-md',
  warning: 'bg-warning hover:bg-warning/90 text-white shadow-md',
  danger: 'bg-danger hover:bg-danger/90 text-white shadow-md',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white bg-transparent',
  ghost: 'text-primary hover:bg-primary/10 bg-transparent',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
};

const buttonRounded = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

const motionVariants = {
  initial: { scale: 1 },
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 17,
  },
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  rounded = 'md',
  disabled,
  className,
  onClick,
  type = 'button',
  children,
}) => {
  const baseClasses = cn(
    // Base
    'inline-flex items-center justify-center font-medium transition-smooth',
    'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    // Variants
    buttonVariants[variant],
    buttonSizes[size],
    buttonRounded[rounded],
    // Largeur
    fullWidth && 'w-full',
    // Classes personnalisées
    className
  );

  const iconClasses = cn(
    'flex-shrink-0',
    size === 'sm' && 'w-4 h-4',
    size === 'md' && 'w-5 h-5',
    size === 'lg' && 'w-6 h-6',
    size === 'xl' && 'w-7 h-7'
  );

  const spacing = size === 'sm' ? 'gap-1.5' : 'gap-2';

  return (
    <motion.button
      className={baseClasses}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      variants={motionVariants}
      initial="initial"
      whileHover={!disabled && !loading ? "whileHover" : undefined}
      whileTap={!disabled && !loading ? "whileTap" : undefined}
      transition={motionVariants.transition}
    >
      {loading ? (
        <>
          <Loader2 className={cn(iconClasses, 'animate-spin')} />
          <span className="ml-2">Chargement...</span>
        </>
      ) : (
        <div className={cn('flex items-center', spacing)}>
          {icon && iconPosition === 'left' && (
            <span className={iconClasses}>{icon}</span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span className={iconClasses}>{icon}</span>
          )}
        </div>
      )}
    </motion.button>
  );
};

export default Button; 