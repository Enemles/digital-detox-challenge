import React from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface LayoutProps {
  children: ReactNode;
  className?: string;
  showHeader?: boolean;
  showNavigation?: boolean;
  showFooter?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  background?: 'default' | 'eco' | 'gradient' | 'glass';
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'max-w-full',
};

const backgroundClasses = {
  default: 'bg-white',
  eco: 'bg-gradient-to-br from-forest-50 to-ocean-50',
  gradient: 'bg-gradient-to-br from-primary/10 to-secondary/10',
  glass: 'glass-effect',
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3
    }
  }
};

export const Layout: React.FC<LayoutProps> = ({
  children,
  className,
  showHeader = true,
  showNavigation = true,
  showFooter = true,
  maxWidth = 'full',
  background = 'default',
}) => {
  const containerClasses = cn(
    'min-h-screen flex flex-col',
    backgroundClasses[background],
    className
  );

  const mainClasses = cn(
    'flex-1 container mx-auto px-4 py-8',
    maxWidthClasses[maxWidth]
  );

  return (
    <motion.div 
      className={containerClasses}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Header */}
      {showHeader && (
        <motion.header 
          className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200"
          variants={itemVariants}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-2xl">🌱</span>
                <span className="text-xl font-bold text-gradient">
                  Digital Detox
                </span>
              </motion.div>

              {/* Navigation Actions */}
              {showNavigation && (
                <motion.nav 
                  className="flex items-center space-x-4"
                  variants={itemVariants}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Niveau 1</span>
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-forest-500 to-success"
                        initial={{ width: 0 }}
                        animate={{ width: '60%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                    <span className="text-sm font-medium text-success">120 XP</span>
                  </div>
                </motion.nav>
              )}
            </div>
          </div>
        </motion.header>
      )}

      {/* Main Content */}
      <motion.main 
        className={mainClasses}
        variants={itemVariants}
      >
        {children}
      </motion.main>

      {/* Footer */}
      {showFooter && (
        <motion.footer 
          className="bg-gray-50 border-t border-gray-200"
          variants={itemVariants}
        >
          <div className="container mx-auto px-4 py-6">
            <div className="text-center text-sm text-gray-600">
              <p>
                Ensemble pour un numérique plus responsable 🌍
              </p>
              <p className="mt-2">
                Fait avec ❤️ pour la planète
              </p>
            </div>
          </div>
        </motion.footer>
      )}
    </motion.div>
  );
};

// Layout spécialisé pour les pages de défi
export const ChallengeLayout: React.FC<{
  children: ReactNode;
  challengeTitle: string;
  challengeProgress?: number;
  challengeIcon?: string;
  onBack?: () => void;
}> = ({ 
  children, 
  challengeTitle, 
  challengeProgress = 0,
  challengeIcon = '🎯',
  onBack 
}) => {
  return (
    <Layout
      background="eco"
      showNavigation={false}
      showFooter={false}
      maxWidth="md"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header du défi */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            {onBack && (
              <motion.button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-primary transition-colors"
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Retour
              </motion.button>
            )}
            <span className="text-2xl">{challengeIcon}</span>
          </div>
          
          <h1 className="text-xl font-bold text-gray-900 mb-3">
            {challengeTitle}
          </h1>
          
          {/* Barre de progression */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-success to-forest-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${challengeProgress}%` }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Progression : {Math.round(challengeProgress)}%
          </p>
        </div>

        {/* Contenu du défi */}
        {children}
      </motion.div>
    </Layout>
  );
};

// Layout spécialisé pour les pages de dashboard
export const DashboardLayout: React.FC<{
  children: ReactNode;
  title: string;
  subtitle?: string;
  stats?: Array<{
    label: string;
    value: string;
    icon: string;
    color?: string;
  }>;
}> = ({ children, title, subtitle, stats }) => {
  return (
    <Layout background="gradient" maxWidth="2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header du dashboard */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-600 text-lg">
              {subtitle}
            </p>
          )}
        </div>

        {/* Statistiques rapides */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-white rounded-lg shadow-md p-4 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div 
                  className="text-2xl font-bold mb-1"
                  style={{ color: stat.color || '#059669' }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Contenu principal */}
        {children}
      </motion.div>
    </Layout>
  );
};

// Layout spécialisé pour l'onboarding
export const OnboardingLayout: React.FC<{
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  onSkip?: () => void;
}> = ({ children, currentStep, totalSteps, onSkip }) => {
  return (
    <Layout 
      background="gradient" 
      showHeader={false} 
      showFooter={false}
      maxWidth="md"
    >
      <motion.div
        className="min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md">
          {/* Indicateur de progression */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                Étape {currentStep} sur {totalSteps}
              </span>
              {onSkip && (
                <button
                  onClick={onSkip}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Passer
                </button>
              )}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Contenu de l'onboarding */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Layout; 