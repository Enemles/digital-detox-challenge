import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  variant?: 'default' | 'success' | 'warning' | 'danger';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  children: React.ReactNode;
  className?: string;
}

const modalSizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-7xl',
};

const modalVariants = {
  default: 'bg-white border-gray-200',
  success: 'bg-white border-success/30',
  warning: 'bg-white border-warning/30',
  danger: 'bg-white border-danger/30',
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalContentVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8, 
    y: 50 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0
  },
  exit: { 
    opacity: 0, 
    scale: 0.8, 
    y: 50
  },
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  variant = 'default',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  children,
  className,
}) => {
  // Gérer la fermeture avec Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Bloquer le scroll du body
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeOnEscape, onClose]);

  const modalClasses = cn(
    'relative w-full mx-4 my-8 p-6 rounded-lg shadow-xl border',
    modalSizes[size],
    modalVariants[variant],
    className
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeOnOverlayClick ? onClose : undefined}
          />

          {/* Contenu du modal */}
          <motion.div
            className={modalClasses}
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* En-tête avec titre et bouton fermer */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between mb-4">
                {title && (
                  <h2 className="text-xl font-semibold text-gray-900">
                    {title}
                  </h2>
                )}
                                 {showCloseButton && (
                   <Button
                     variant="ghost"
                     size="sm"
                     onClick={onClose}
                     className="p-1 -mr-1"
                     icon={<X className="w-5 h-5" />}
                   >
                     <span className="sr-only">Fermer</span>
                   </Button>
                 )}
              </div>
            )}

            {/* Contenu */}
            <div className="modal-content">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Sous-composants pour structurer le contenu du modal
export const ModalHeader: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => (
  <div className={cn('pb-4 border-b border-gray-200 mb-4', className)}>
    {children}
  </div>
);

export const ModalBody: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => (
  <div className={cn('py-2', className)}>
    {children}
  </div>
);

export const ModalFooter: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => (
  <div className={cn('pt-4 border-t border-gray-200 mt-4 flex justify-end gap-3', className)}>
    {children}
  </div>
);

// Modal de confirmation spécialisé
export const ConfirmModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  loading?: boolean;
}> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  variant = 'default',
  loading = false,
}) => {
  const getConfirmVariant = () => {
    switch (variant) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'danger':
        return 'danger';
      default:
        return 'primary';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm" variant={variant}>
      <ModalBody>
        <p className="text-gray-600">{message}</p>
      </ModalBody>
      
      <ModalFooter>
        <Button
          variant="outline"
          onClick={onClose}
          disabled={loading}
        >
          {cancelText}
        </Button>
        <Button
          variant={getConfirmVariant()}
          onClick={onConfirm}
          loading={loading}
        >
          {confirmText}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

// Modal d'achievement/badge débloqué
export const AchievementModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  badge: {
    name: string;
    description: string;
    icon: string;
    color: string;
  };
  xpGained?: number;
}> = ({ isOpen, onClose, badge, xpGained }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size="md" 
      variant="success"
      showCloseButton={false}
      closeOnOverlayClick={false}
    >
      <div className="text-center py-4">
        {/* Animation de confettis simulée */}
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="text-6xl mb-4"
        >
          {badge.icon}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-900 mb-2"
        >
          Nouveau Badge Débloqué !
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg font-semibold mb-2"
          style={{ color: badge.color }}
        >
          {badge.name}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 mb-4"
        >
          {badge.description}
        </motion.p>

        {xpGained && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="bg-success/10 text-success px-4 py-2 rounded-full inline-block mb-6"
          >
            +{xpGained} XP
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Button
            variant="success"
            onClick={onClose}
            size="lg"
            className="px-8"
          >
            Fantastique ! 🎉
          </Button>
        </motion.div>
      </div>
    </Modal>
  );
};

// Modal de niveau up
export const LevelUpModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  newLevel: number;
  levelName: string;
  levelIcon: string;
  rewards?: Array<{ name: string; icon: string }>;
}> = ({ isOpen, onClose, newLevel, levelName, levelIcon, rewards }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size="md"
      showCloseButton={false}
      closeOnOverlayClick={false}
    >
      <div className="text-center py-6">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="text-7xl mb-4"
        >
          {levelIcon}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-gradient mb-2"
        >
          Niveau {newLevel} !
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl font-semibold text-primary mb-4"
        >
          {levelName}
        </motion.h3>

        {rewards && rewards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-50 rounded-lg p-4 mb-6"
          >
            <h4 className="font-medium text-gray-900 mb-3">
              Récompenses débloquées :
            </h4>
            <div className="flex justify-center gap-4">
              {rewards.map((reward, index) => (
                <motion.div
                  key={reward.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl mb-1">{reward.icon}</div>
                  <div className="text-xs text-gray-600">{reward.name}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            variant="primary"
            onClick={onClose}
            size="lg"
            className="px-8"
          >
            Continuer l'aventure ! 🚀
          </Button>
        </motion.div>
      </div>
    </Modal>
  );
};

export default Modal; 