import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Trophy, Target } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ProgressBar } from '../ui/ProgressBar';
import { Modal } from '../ui/Modal';
import { cn } from '../../utils/cn';

const Challenges: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChallenge, setSelectedChallenge] = useState<typeof challenges[0] | null>(null);

  const categories = [
    { id: 'all', label: 'Tous', icon: '🎯' },
    { id: 'email', label: 'Email', icon: '📧' },
    { id: 'streaming', label: 'Streaming', icon: '🎬' },
    { id: 'cloud', label: 'Cloud', icon: '☁️' },
    { id: 'devices', label: 'Appareils', icon: '📱' },
    { id: 'social', label: 'Réseaux sociaux', icon: '📲' }
  ];

  const challenges = [
    {
      id: '1',
      title: 'Nettoyer sa boîte mail',
      description: 'Supprimez 100 emails anciens pour réduire votre empreinte carbone',
      category: 'email',
      difficulty: 'easy',
      duration: '1 jour',
      points: 50,
      participants: 1234,
      icon: '📧',
      status: 'active',
      progress: 32,
      target: 100,
      co2Saved: 15,
      tips: [
        'Commencez par les emails les plus anciens',
        'Supprimez les newsletters non lues',
        'Videz votre corbeille après suppression'
      ]
    },
    {
      id: '2',
      title: 'Semaine sans streaming',
      description: 'Réduisez votre temps de streaming de 50% pendant une semaine',
      category: 'streaming',
      difficulty: 'medium',
      duration: '7 jours',
      points: 100,
      participants: 892,
      icon: '🎬',
      status: 'available',
      progress: 0,
      target: 7,
      co2Saved: 75,
      tips: [
        'Optez pour des podcasts ou de la musique',
        'Lisez un livre ou faites du sport',
        'Regardez en définition standard plutôt qu\'en HD'
      ]
    },
    {
      id: '3',
      title: 'Organiser son cloud',
      description: 'Libérez 2 Go d\'espace de stockage cloud inutilisé',
      category: 'cloud',
      difficulty: 'medium',
      duration: '3 jours',
      points: 80,
      participants: 567,
      icon: '☁️',
      status: 'active',
      progress: 0.8,
      target: 2,
      co2Saved: 45,
      tips: [
        'Supprimez les photos en double',
        'Videz votre corbeille cloud',
        'Archivez les anciens documents'
      ]
    },
    {
      id: '4',
      title: 'Digital detox weekend',
      description: 'Déconnectez-vous complètement pendant 48h',
      category: 'devices',
      difficulty: 'hard',
      duration: '2 jours',
      points: 150,
      participants: 234,
      icon: '📱',
      status: 'available',
      progress: 0,
      target: 48,
      co2Saved: 120,
      tips: [
        'Prévenez vos proches à l\'avance',
        'Préparez des activités offline',
        'Utilisez un réveil classique'
      ]
    },
    {
      id: '5',
      title: 'Réduire les notifications',
      description: 'Désactivez 20 notifications inutiles sur vos appareils',
      category: 'devices',
      difficulty: 'easy',
      duration: '30 minutes',
      points: 30,
      participants: 2156,
      icon: '📱',
      status: 'completed',
      progress: 20,
      target: 20,
      co2Saved: 8,
      tips: [
        'Gardez seulement les notifications essentielles',
        'Désactivez les notifications marketing',
        'Utilisez le mode "Ne pas déranger"'
      ]
    },
    {
      id: '6',
      title: 'Pause réseaux sociaux',
      description: 'Réduisez votre temps sur les réseaux sociaux de 2h par jour',
      category: 'social',
      difficulty: 'medium',
      duration: '5 jours',
      points: 90,
      participants: 1567,
      icon: '📲',
      status: 'available',
      progress: 0,
      target: 5,
      co2Saved: 60,
      tips: [
        'Supprimez les apps de votre écran d\'accueil',
        'Définissez des plages horaires sans écran',
        'Trouvez des activités alternatives'
      ]
    }
  ];

  const filteredChallenges = challenges.filter(challenge => {
    const matchesCategory = selectedCategory === 'all' || challenge.category === selectedCategory;
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'available': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'En cours';
      case 'completed': return 'Terminé';
      case 'available': return 'Disponible';
      default: return 'Disponible';
    }
  };

  const handleStartChallenge = (challenge: typeof challenges[0]) => {
    console.log('Démarrer le défi:', challenge.title);
    setSelectedChallenge(null);
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
          🎯 Défis Éco-responsables
        </h1>
        <p className="text-lg text-gray-600">
          Relevez des défis pour réduire votre empreinte carbone numérique
        </p>
      </motion.div>

      {/* Filtres et recherche */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8"
      >
        <Card size="full">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Recherche */}
              <div className="w-full lg:flex-1">
                <Input
                  placeholder="Rechercher un défi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              
              {/* Filtres catégories */}
              <div className="flex gap-2 flex-wrap lg:flex-nowrap">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2 whitespace-nowrap"
                  >
                    <span>{category.icon}</span>
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Grille des défis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredChallenges.map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="h-full"
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="text-3xl">{challenge.icon}</div>
                  <div className="flex gap-2">
                    <span className={cn(
                      'px-2 py-1 rounded-full text-xs font-medium',
                      getDifficultyColor(challenge.difficulty)
                    )}>
                      {challenge.difficulty === 'easy' && 'Facile'}
                      {challenge.difficulty === 'medium' && 'Moyen'}
                      {challenge.difficulty === 'hard' && 'Difficile'}
                    </span>
                    <span className={cn(
                      'px-2 py-1 rounded-full text-xs font-medium',
                      getStatusColor(challenge.status)
                    )}>
                      {getStatusLabel(challenge.status)}
                    </span>
                  </div>
                </div>
                <CardTitle level={4} className="mb-2">
                  {challenge.title}
                </CardTitle>
                <p className="text-sm text-gray-600">
                  {challenge.description}
                </p>
              </CardHeader>
              
              <CardContent className="flex-1">
                {/* Progression si défi actif */}
                {challenge.status === 'active' && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progression</span>
                      <span>{challenge.progress}/{challenge.target}</span>
                    </div>
                    <ProgressBar
                      value={challenge.progress}
                      max={challenge.target}
                      variant="success"
                      size="sm"
                      showPercentage
                    />
                  </div>
                )}

                {/* Stats du défi */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{challenge.points}</div>
                    <div className="text-xs text-gray-500">Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-success">{challenge.co2Saved}g</div>
                    <div className="text-xs text-gray-500">CO2 économisé</div>
                  </div>
                </div>

                {/* Infos supplémentaires */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Durée: {challenge.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    <span>{challenge.participants} participants</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <div className="w-full space-y-2">
                  {challenge.status === 'available' && (
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={() => setSelectedChallenge(challenge)}
                    >
                      Commencer le défi
                    </Button>
                  )}
                  {challenge.status === 'active' && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setSelectedChallenge(challenge)}
                    >
                      Voir les détails
                    </Button>
                  )}
                  {challenge.status === 'completed' && (
                    <div className="flex items-center justify-center gap-2 text-success">
                      <Trophy className="w-4 h-4" />
                      <span className="text-sm font-medium">Défi terminé!</span>
                    </div>
                  )}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal de détails du défi */}
      <Modal
        isOpen={!!selectedChallenge}
        onClose={() => setSelectedChallenge(null)}
        title={selectedChallenge?.title || ''}
        variant="default"
      >
        {selectedChallenge && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">{selectedChallenge.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {selectedChallenge.title}
              </h3>
              <p className="text-gray-600">
                {selectedChallenge.description}
              </p>
            </div>

            {/* Stats détaillées */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{selectedChallenge.points}</div>
                <div className="text-sm text-gray-600">Points</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-success">{selectedChallenge.co2Saved}g</div>
                <div className="text-sm text-gray-600">CO2 économisé</div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-warning">{selectedChallenge.duration}</div>
                <div className="text-sm text-gray-600">Durée</div>
              </div>
            </div>

            {/* Conseils */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">💡 Conseils pour réussir</h4>
              <ul className="space-y-2">
                {selectedChallenge.tips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-success">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setSelectedChallenge(null)}
                className="flex-1"
              >
                Fermer
              </Button>
              {selectedChallenge.status === 'available' && (
                <Button
                  variant="primary"
                  onClick={() => handleStartChallenge(selectedChallenge)}
                  className="flex-1"
                >
                  Commencer maintenant
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Challenges; 