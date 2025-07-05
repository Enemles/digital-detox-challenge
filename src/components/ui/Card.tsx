import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface CardProps {
  variant?: 'default' | 'eco' | 'glass' | 'outline' | 'elevated';
  size?: 'sm' | 'md' | 'lg' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
  glow?: boolean;
  className?: string;
  children: React.ReactNode;
}

const cardVariants = {
  default: 'bg-white border border-gray-200 shadow-md',
  eco: 'bg-white shadow-eco border border-forest-200',
  glass: 'glass-effect border border-white/20',
  outline: 'bg-transparent border-2 border-gray-300',
  elevated: 'bg-white shadow-xl border-0',
};

const cardSizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  full: 'w-full',
};

const cardPadding = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const cardRounded = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
};



export const Card: React.FC<CardProps> = ({
  variant = 'default',
  size = 'full',
  padding = 'md',
  rounded = 'lg',
  interactive = false,
  glow = false,
  className,
  children,
}) => {
  const baseClasses = cn(
    // Base
    'relative overflow-hidden transition-smooth',
    // Variants
    cardVariants[variant],
    size !== 'full' && cardSizes[size],
    size === 'full' && 'w-full',
    cardPadding[padding],
    cardRounded[rounded],
    // Interactive
    interactive && 'cursor-pointer',
    // Glow effect
    glow && 'animate-pulse',
    // Classes personnalisées
    className
  );

  return (
    <motion.div
      className={baseClasses}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={interactive ? { y: -2, scale: 1.02 } : undefined}
      whileTap={interactive ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// Sous-composants pour structurer le contenu de la carte
export const CardHeader: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => (
  <div className={cn('pb-4 border-b border-gray-200', className)}>
    {children}
  </div>
);

export const CardTitle: React.FC<{
  level?: 1 | 2 | 3 | 4;
  className?: string;
  children: React.ReactNode;
}> = ({ level = 2, className, children }) => {
  const titleClasses = cn(
    'font-semibold text-gray-900',
    level === 1 && 'text-2xl',
    level === 2 && 'text-xl',
    level === 3 && 'text-lg',
    level === 4 && 'text-base',
    className
  );

  if (level === 1) return <h1 className={titleClasses}>{children}</h1>;
  if (level === 2) return <h2 className={titleClasses}>{children}</h2>;
  if (level === 3) return <h3 className={titleClasses}>{children}</h3>;
  return <h4 className={titleClasses}>{children}</h4>;
};

export const CardDescription: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => (
  <p className={cn('text-gray-600 text-sm mt-1', className)}>
    {children}
  </p>
);

export const CardContent: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => (
  <div className={cn('py-4', className)}>
    {children}
  </div>
);

export const CardFooter: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => (
  <div className={cn('pt-4 border-t border-gray-200 flex items-center justify-between', className)}>
    {children}
  </div>
);

export const CardStats: React.FC<{
  stats: Array<{
    label: string;
    value: string | number;
    icon?: React.ReactNode;
    color?: 'default' | 'success' | 'warning' | 'danger';
  }>;
  className?: string;
}> = ({ stats, className }) => (
  <div className={cn('grid grid-cols-2 gap-4', className)}>
    {stats.map((stat, index) => (
      <motion.div
        key={index}
        className="text-center p-3 rounded-lg bg-gray-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
      >
        {stat.icon && (
          <div className="flex justify-center mb-1">
            {stat.icon}
          </div>
        )}
        <div className={cn(
          'text-lg font-semibold',
          stat.color === 'success' && 'text-success',
          stat.color === 'warning' && 'text-warning',
          stat.color === 'danger' && 'text-danger',
          !stat.color && 'text-gray-900'
        )}>
          {stat.value}
        </div>
        <div className="text-xs text-gray-500">
          {stat.label}
        </div>
      </motion.div>
    ))}
  </div>
);

export default Card; 