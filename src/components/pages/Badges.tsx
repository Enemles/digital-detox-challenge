import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Target, Calendar } from 'lucide-react';
import { BadgeDisplay } from '../features';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { BADGES } from '../../constants';
import type { Badge } from '../../types';

const Badges: React.FC = () => {
  // Simulation de badges gagnés
  const earnedBadges: Badge[] = [
    { ...BADGES[0], earnedAt: new Date(), progress: 100 },
    { ...BADGES[1], earnedAt: new Date(Date.now() - 86400000), progress: 100 },
    { ...BADGES[2], earnedAt: new Date(Date.now() - 172800000), progress: 100 },
    { ...BADGES[3], earnedAt: new Date(Date.now() - 259200000), progress: 100 },
    { ...BADGES[4], earnedAt: new Date(Date.now() - 345600000), progress: 100 },
    { ...BADGES[5], earnedAt: new Date(Date.now() - 432000000), progress: 100 },
    { ...BADGES[6], earnedAt: new Date(Date.now() - 518400000), progress: 100 },
    { ...BADGES[7], earnedAt: new Date(Date.now() - 604800000), progress: 100 },
  ];

  // Simulation de badges en cours
  const inProgressBadges: Badge[] = [
    { ...BADGES[8], progress: 65 },
    { ...BADGES[9], progress: 30 },
    { ...BADGES[10], progress: 80 },
  ];

  // Statistiques des badges
  const badgeStats = {
    total: BADGES.length,
    earned: earnedBadges.length,
    inProgress: inProgressBadges.length,
    percentage: Math.round((earnedBadges.length / BADGES.length) * 100),
    recentEarned: earnedBadges.filter(badge => 
      badge.earnedAt && new Date().getTime() - badge.earnedAt.getTime() < 7 * 24 * 60 * 60 * 1000
    ).length
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🏆 Ma Collection de Badges
        </h1>
        <p className="text-lg text-gray-600">
          Découvrez tous vos achievements et votre progression
        </p>
      </motion.div>

      {/* Statistiques */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <Card size="full">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {badgeStats.earned}
            </div>
            <div className="text-sm text-gray-600">Badges obtenus</div>
          </CardContent>
        </Card>

        <Card size="full">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {badgeStats.inProgress}
            </div>
            <div className="text-sm text-gray-600">En cours</div>
          </CardContent>
        </Card>

        <Card size="full">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {badgeStats.percentage}%
            </div>
            <div className="text-sm text-gray-600">Complétion</div>
          </CardContent>
        </Card>

        <Card size='full'>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {badgeStats.recentEarned}
            </div>
            <div className="text-sm text-gray-600">Cette semaine</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Collection de badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card size="full">
          <CardHeader>
            <CardTitle level={3}>
              📋 Tous mes Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BadgeDisplay
              earnedBadges={[...earnedBadges, ...inProgressBadges]}
              layout="grid"
              showProgress={true}
            />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Badges; 