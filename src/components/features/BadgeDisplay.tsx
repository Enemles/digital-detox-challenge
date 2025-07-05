import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Lock, Target } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { ProgressBar, BadgeProgress } from '../ui/ProgressBar';
import { Modal, ModalBody, ModalHeader } from '../ui/Modal';
import { BADGES } from '../../constants';
import { cn } from '../../utils/cn';
import type { Badge, BadgeCategory } from '../../types';

interface BadgeDisplayProps {
  earnedBadges: Badge[];
  badgeProgress?: Record<string, { current: number; target: number }>;
  onBadgeClick?: (badge: Badge) => void;
  showProgress?: boolean;
  layout?: 'grid' | 'list' | 'compact';
  className?: string;
}

const BadgeDisplay: React.FC<BadgeDisplayProps> = ({
  earnedBadges,
  badgeProgress = {},
  onBadgeClick,
  showProgress = true,
  layout = 'grid',
  className
}) => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<BadgeCategory | 'all'>('all');

  // Obtenir tous les badges disponibles
  const allBadges = BADGES;
  
  // Filtrer les badges selon la catégorie sélectionnée
  const filteredBadges = selectedCategory === 'all' 
    ? allBadges 
    : allBadges.filter(badge => badge.category === selectedCategory);

  // Vérifier si un badge est débloqué
  const isBadgeEarned = (badgeId: string) => 
    earnedBadges.some(badge => badge.id === badgeId);

  // Obtenir le progrès d'un badge
  const getBadgeProgress = (badgeId: string) => 
    badgeProgress[badgeId] || { current: 0, target: 100 };

  // Animation simple pour les badges
  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    hover: { scale: 1.05, y: -5 },
    tap: { scale: 0.95 }
  };

  const categoryColors: Record<string, string> = {
    emails: 'bg-blue-100 text-blue-700 border-blue-300',
    cloud: 'bg-purple-100 text-purple-700 border-purple-300',
    streaming: 'bg-red-100 text-red-700 border-red-300',
    general: 'bg-green-100 text-green-700 border-green-300',
  };

  const getCategoryColor = (category: string) => 
    categoryColors[category] || 'bg-gray-100 text-gray-700 border-gray-300';

  const categories: Array<{ key: BadgeCategory | 'all'; label: string; icon: React.ReactNode }> = [
    { key: 'all', label: 'Tous', icon: <Star className="w-4 h-4" /> },
    { key: 'emails', label: 'Email', icon: <span className="text-sm">📧</span> },
    { key: 'cloud', label: 'Cloud', icon: <span className="text-sm">☁️</span> },
    { key: 'streaming', label: 'Streaming', icon: <span className="text-sm">🎬</span> },
    { key: 'general', label: 'Général', icon: <Target className="w-4 h-4" /> },
  ];

  // Statistiques des badges
  const badgeStats = {
    total: allBadges.length,
    earned: earnedBadges.length,
    percentage: allBadges.length > 0 ? Math.round((earnedBadges.length / allBadges.length) * 100) : 0,
    byCategory: categories.slice(1).map(cat => ({
      category: cat.key,
      label: cat.label,
      total: allBadges.filter(badge => badge.category === cat.key).length,
      earned: earnedBadges.filter(badge => badge.category === cat.key).length,
    }))
  };

  const renderBadgeCard = (badge: Badge, index: number) => {
    const isEarned = isBadgeEarned(badge.id);
    const progress = getBadgeProgress(badge.id);

    return (
      <motion.div
        key={badge.id}
        variants={badgeVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        transition={{ delay: index * 0.1 }}
        className={cn(
          'relative cursor-pointer transition-all duration-200',
          layout === 'compact' ? 'p-2' : 'p-4'
        )}
        onClick={() => {
          setSelectedBadge(badge);
          onBadgeClick?.(badge);
        }}
      >
        <Card 
          variant={isEarned ? 'eco' : 'outline'}
          className={cn(
            'h-full transition-all duration-300',
            isEarned 
              ? 'shadow-lg border-success bg-gradient-to-br from-success/5 to-forest/5' 
              : 'opacity-60 hover:opacity-80'
          )}
        >
          <CardContent className={cn('text-center', layout === 'compact' ? 'p-3' : 'p-4')}>
            {/* Icône du badge */}
            <div
              className={cn(
                'mx-auto mb-3 flex items-center justify-center rounded-full',
                layout === 'compact' ? 'w-12 h-12 text-2xl' : 'w-16 h-16 text-3xl',
                isEarned 
                  ? 'bg-success/10 border-2 border-success/30' 
                  : 'bg-gray-100 border-2 border-gray-300'
              )}
            >
              {isEarned ? (
                <span>{badge.icon}</span>
              ) : (
                <Lock className="w-6 h-6 text-gray-400" />
              )}
            </div>

            {/* Nom du badge */}
            <h3 className={cn(
              'font-semibold mb-2',
              layout === 'compact' ? 'text-sm' : 'text-base',
              isEarned ? 'text-gray-900' : 'text-gray-500'
            )}>
              {badge.name}
            </h3>

            {/* Description (seulement si pas compact) */}
            {layout !== 'compact' && (
              <p className={cn(
                'text-xs mb-3',
                isEarned ? 'text-gray-600' : 'text-gray-400'
              )}>
                {badge.description}
              </p>
            )}

            {/* Catégorie */}
            <span className={cn(
              'inline-block px-2 py-1 rounded-full text-xs border',
              getCategoryColor(badge.category)
            )}>
              {categories.find(cat => cat.key === badge.category)?.label}
            </span>

            {/* Barre de progression pour les badges non obtenus */}
            {!isEarned && showProgress && progress.target > 0 && (
              <div className="mt-3">
                <ProgressBar
                  value={progress.current}
                  max={progress.target}
                  variant="success"
                  size="sm"
                  showPercentage
                />
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Statistiques des badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card size="full">
          <CardHeader>
            <CardTitle level={3}>🏆 Collection de Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{badgeStats.earned}</div>
                <div className="text-sm text-gray-600">Obtenus</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">{badgeStats.total}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{badgeStats.percentage}%</div>
                <div className="text-sm text-gray-600">Progression</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">{badgeStats.total - badgeStats.earned}</div>
                <div className="text-sm text-gray-600">Restants</div>
              </div>
            </div>
            
            {/* Filtres de catégories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <Button
                  key={category.key}
                  variant={selectedCategory === category.key ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.key)}
                  className="flex items-center gap-2"
                >
                  {category.icon}
                  {category.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Grille des badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className={cn(
          'w-full grid gap-4',
          layout === 'grid' && 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
          layout === 'list' && 'grid-cols-1',
          layout === 'compact' && 'grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
        )}>
          {filteredBadges.map((badge, index) => renderBadgeCard(badge, index))}
        </div>
      </motion.div>

      {/* Modal de détails */}
      <AnimatePresence>
        {selectedBadge && (
          <Modal
            isOpen={!!selectedBadge}
            onClose={() => setSelectedBadge(null)}
            title={selectedBadge.name}
            variant="default"
          >
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-6xl mb-4">{selectedBadge.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {selectedBadge.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {selectedBadge.description}
                </p>
                <span className={cn(
                  'inline-block px-3 py-1 rounded-full text-sm border',
                  getCategoryColor(selectedBadge.category)
                )}>
                  {categories.find(cat => cat.key === selectedBadge.category)?.label}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{selectedBadge.points}</div>
                  <div className="text-sm text-gray-600">Points</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-success">{selectedBadge.co2Impact}g</div>
                  <div className="text-sm text-gray-600">Impact CO2</div>
                </div>
              </div>
              
              {selectedBadge.requirements && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Prérequis :</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedBadge.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span>•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BadgeDisplay; 