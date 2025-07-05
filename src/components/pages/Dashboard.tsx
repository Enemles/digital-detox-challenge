import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  Trophy, 
  Zap,
  ChevronRight,
  Leaf,
  Mail,
  Cloud,
  Tv
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CarbonCalculator, BadgeDisplay } from '../features';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { BADGES } from '../../constants';
import { cn } from '../../utils/cn';
import type { Badge } from '../../types';

const Dashboard: React.FC = () => {
  const [greeting, setGreeting] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);

  // Données utilisateur simulées
  const userStats = {
    name: 'Alex',
    level: 3,
    currentXP: 750,
    maxXP: 1000,
    co2SavedToday: 45,
    co2SavedTotal: 1250,
    streak: 7,
    activeChallenges: 3,
    completedChallenges: 12,
    badgesEarned: 8,
    totalBadges: BADGES.length
  };

  // Défis actifs simulés
  const activeChallenges = [
    {
      id: '1',
      title: 'Nettoyer sa boîte mail',
      description: 'Supprimer 50 emails anciens',
      progress: 32,
      target: 50,
      timeLeft: '2 jours',
      category: 'email',
      icon: '📧',
      difficulty: 'easy' as const
    },
    {
      id: '2',
      title: 'Réduire le streaming',
      description: 'Limiter à 2h par jour pendant une semaine',
      progress: 5,
      target: 7,
      timeLeft: '5 jours',
      category: 'streaming',
      icon: '🎬',
      difficulty: 'medium' as const
    },
    {
      id: '3',
      title: 'Organiser le cloud',
      description: 'Libérer 1 Go d\'espace de stockage',
      progress: 0.6,
      target: 1,
      timeLeft: '1 semaine',
      category: 'cloud',
      icon: '☁️',
      difficulty: 'hard' as const
    }
  ];

  // Badges récents simulés
  const recentBadges: Badge[] = [
    { ...BADGES[0], earnedAt: new Date(), progress: 100 },
    { ...BADGES[2], earnedAt: new Date(Date.now() - 86400000), progress: 100 },
  ];

  // Statistiques rapides
  const quickStats = [
    {
      label: 'CO2 économisé aujourd\'hui',
      value: `${userStats.co2SavedToday}g`,
      icon: Leaf,
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+12g vs hier'
    },
    {
      label: 'Série active',
      value: `${userStats.streak} jours`,
      icon: Zap,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      change: 'Record personnel!'
    },
    {
      label: 'Défis en cours',
      value: userStats.activeChallenges,
      icon: Target,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '3 actifs'
    },
    {
      label: 'Badges obtenus',
      value: `${userStats.badgesEarned}/${userStats.totalBadges}`,
      icon: Trophy,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '+2 cette semaine'
    }
  ];

  // Définir le salut selon l'heure
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bonjour');
    else if (hour < 18) setGreeting('Bon après-midi');
    else setGreeting('Bonsoir');
  }, []);

  const handleCalculationComplete = (result: unknown) => {
    console.log('Calcul terminé:', result);
    // Ici on pourrait mettre à jour les stats utilisateur
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header avec salutation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center lg:text-left"
      >
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          {greeting}, {userStats.name} ! 👋
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Voici votre impact écologique aujourd'hui
        </p>
        
        {/* Barre de progression niveau */}
        <div className="max-w-md mx-auto lg:mx-0">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Niveau {userStats.level}</span>
            <span>{userStats.currentXP}/{userStats.maxXP} XP</span>
          </div>
          <ProgressBar
            value={userStats.currentXP}
            max={userStats.maxXP}
            variant="success"
            size="md"
          />
          <p className="text-xs text-gray-500 mt-1">
            Plus que {userStats.maxXP - userStats.currentXP} XP pour passer au niveau {userStats.level + 1}
          </p>
        </div>
      </motion.div>

      {/* Statistiques rapides */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn('p-3 rounded-full', stat.bgColor)}>
                    <stat.icon className={cn('w-6 h-6', stat.color)} />
                  </div>
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Section principale avec 2 colonnes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Colonne principale (2/3) */}
        <div className="lg:col-span-3 space-y-8">
          {/* Calculateur d'empreinte carbone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle level={3}>
                    🌱 Mon Impact Numérique
                  </CardTitle>
                  <Button
                    variant={showCalculator ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setShowCalculator(!showCalculator)}
                  >
                    {showCalculator ? 'Masquer' : 'Calculer'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {showCalculator ? (
                  <CarbonCalculator
                    onCalculationComplete={handleCalculationComplete}
                    className="bg-transparent"
                  />
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🌍</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Calculez votre empreinte carbone
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Découvrez l'impact environnemental de vos habitudes numériques
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => setShowCalculator(true)}
                    >
                      Commencer le calcul
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Défis actifs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card size="full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle level={3}>
                    🎯 Défis en Cours
                  </CardTitle>
                  <Link to="/challenges">
                    <Button variant="outline" size="sm">
                      Voir tous
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeChallenges.map((challenge, index) => (
                    <motion.div
                      key={challenge.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="text-2xl">{challenge.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{challenge.title}</h4>
                          <span className="text-xs text-gray-500">{challenge.timeLeft}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                                                 <ProgressBar
                           value={challenge.progress}
                           max={challenge.target}
                           variant="success"
                           size="sm"
                           showPercentage
                         />
                      </div>
                      <div className={cn(
                        'px-2 py-1 rounded-full text-xs font-medium',
                        challenge.difficulty === 'easy' && 'bg-green-100 text-green-700',
                        challenge.difficulty === 'medium' && 'bg-yellow-100 text-yellow-700',
                        challenge.difficulty === 'hard' && 'bg-red-100 text-red-700'
                      )}>
                        {challenge.difficulty === 'easy' && 'Facile'}
                        {challenge.difficulty === 'medium' && 'Moyen'}
                        {challenge.difficulty === 'hard' && 'Difficile'}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/challenges" className="w-full">
                  <Button variant="primary" className="w-full">
                    Découvrir plus de défis
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar (1/3) */}
        <div className="space-y-6 lg:col-span-3">
          {/* Badges récents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card size="full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle level={4}>
                    🏆 Badges Récents
                  </CardTitle>
                  <Link to="/badges">
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <BadgeDisplay
                  earnedBadges={recentBadges}
                  layout="compact"
                  showProgress={false}
                  className="bg-transparent"
                />
              </CardContent>
              <CardFooter>
                <Link to="/badges" className="w-full">
                  <Button variant="outline" size="sm" className="w-full">
                    Voir ma collection
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Actions rapides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle level={4}>
                  ⚡ Actions Rapides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Nettoyer mes emails
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Cloud className="w-4 h-4 mr-2" />
                    Organiser mon cloud
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Tv className="w-4 h-4 mr-2" />
                    Réduire le streaming
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Astuce du jour */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card variant="eco">
              <CardHeader>
                <CardTitle level={4}>
                  💡 Astuce du Jour
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Saviez-vous qu'un email avec une pièce jointe de 1 Mo émet autant de CO2 qu'une ampoule allumée pendant 24 minutes ?
                </p>
                <Button variant="success" size="sm" className="w-full">
                  En savoir plus
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 