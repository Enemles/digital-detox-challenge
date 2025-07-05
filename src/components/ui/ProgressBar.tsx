import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'eco';
  showLabel?: boolean;
  showPercentage?: boolean;
  animated?: boolean;
  striped?: boolean;
  label?: string;
  className?: string;
}

const progressSizes = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

const progressVariants = {
  default: 'bg-gray-200',
  success: 'bg-success/20',
  warning: 'bg-warning/20',
  danger: 'bg-danger/20',
  eco: 'bg-forest-100',
};

const fillVariants = {
  default: 'bg-blue-500',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  eco: 'bg-gradient-to-r from-forest-500 to-success',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  showLabel = false,
  showPercentage = false,
  animated = true,
  striped = false,
  label,
  className,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const progressClasses = cn(
    'relative rounded-full overflow-hidden',
    progressSizes[size],
    progressVariants[variant],
    striped && 'bg-stripes',
    className
  );

  const fillClasses = cn(
    'h-full rounded-full transition-all duration-500 ease-out',
    fillVariants[variant],
    striped && 'bg-stripes',
    animated && 'animate-pulse'
  );

  return (
    <div className="w-full">
      {/* Label et pourcentage */}
      {(showLabel || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {showLabel && label && (
            <span className="text-sm font-medium text-gray-700">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-sm font-medium text-gray-600">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      {/* Barre de progression */}
      <div className={progressClasses}>
        <motion.div
          className={fillClasses}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut",
            delay: 0.1 
          }}
        >
          {/* Effet de brillance pour l'animation */}
          {animated && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>
      </div>

      {/* Valeurs numériques */}
      {!showPercentage && (
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
};

// Composant spécialisé pour l'XP
export const XPProgressBar: React.FC<{
  currentXP: number;
  nextLevelXP: number;
  currentLevel: number;
  className?: string;
}> = ({ currentXP, nextLevelXP, currentLevel, className }) => {
  const progressInLevel = currentXP % nextLevelXP;
  
  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">
            Niveau {currentLevel}
          </span>
          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
            {currentXP} XP
          </span>
        </div>
        <span className="text-xs text-gray-500">
          {nextLevelXP - progressInLevel} XP jusqu'au niveau {currentLevel + 1}
        </span>
      </div>
      
      <ProgressBar
        value={progressInLevel}
        max={nextLevelXP}
        variant="eco"
        animated
        size="md"
      />
    </div>
  );
};

// Composant pour les badges en cours
export const BadgeProgress: React.FC<{
  progress: number;
  max: number;
  badgeName: string;
  icon?: React.ReactNode;
  className?: string;
}> = ({ progress, max, badgeName, icon, className }) => {
  const isCompleted = progress >= max;
  
  return (
    <motion.div 
      className={cn(
        'p-3 rounded-lg border transition-all duration-300',
        isCompleted 
          ? 'bg-success/10 border-success/30' 
          : 'bg-gray-50 border-gray-200',
        className
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center gap-3 mb-2">
        {icon && (
          <span className={cn(
            'text-lg',
            isCompleted ? 'text-success' : 'text-gray-400'
          )}>
            {icon}
          </span>
        )}
        <div className="flex-1">
          <h4 className={cn(
            'font-medium text-sm',
            isCompleted ? 'text-success' : 'text-gray-700'
          )}>
            {badgeName}
          </h4>
          <p className="text-xs text-gray-500">
            {progress} / {max}
          </p>
        </div>
        {isCompleted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            <span className="text-success text-xl">✅</span>
          </motion.div>
        )}
      </div>
      
      <ProgressBar
        value={progress}
        max={max}
        variant={isCompleted ? 'success' : 'default'}
        size="sm"
        animated={!isCompleted}
      />
    </motion.div>
  );
};

// Composant pour afficher les statistiques avec barres
export const StatsBar: React.FC<{
  stats: Array<{
    label: string;
    value: number;
    max: number;
    color?: 'success' | 'warning' | 'danger' | 'eco';
    icon?: React.ReactNode;
  }>;
  className?: string;
}> = ({ stats, className }) => {
  return (
    <div className={cn('space-y-4', className)}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center gap-3 mb-1">
            {stat.icon && (
              <span className="text-sm">{stat.icon}</span>
            )}
            <span className="text-sm font-medium text-gray-700">
              {stat.label}
            </span>
            <span className="text-sm text-gray-500 ml-auto">
              {stat.value} / {stat.max}
            </span>
          </div>
          <ProgressBar
            value={stat.value}
            max={stat.max}
            variant={stat.color || 'default'}
            size="sm"
            animated
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ProgressBar; 