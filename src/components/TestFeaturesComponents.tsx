import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CarbonCalculator, BadgeDisplay } from './features';
import { DashboardLayout } from './layout/Layout';
import { Button } from './ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { BADGES } from '../constants';
import type { Badge } from '../types';

const TestFeaturesComponents: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'badges'>('calculator');
  
  // Données de test pour les badges
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([
    // On simule quelques badges gagnés
    { ...BADGES[0], earnedAt: new Date(), progress: 100 },
    { ...BADGES[3], earnedAt: new Date(Date.now() - 86400000), progress: 100 }, // Hier
  ]);

  const [badgeProgress] = useState<Record<string, { current: number; target: number }>>({
    'email-cleaner-silver': { current: 350, target: 500 },
    'cloud-cleaner-bronze': { current: 0.8, target: 1 },
    'streaming-reducer-bronze': { current: 7, target: 10 },
  });

  const handleCalculationComplete = (result: unknown) => {
    console.log('Calcul terminé:', result);
    // Ici on pourrait déclencher des achievements, sauvegarder les données, etc.
  };

  const handleBadgeClick = (badge: Badge) => {
    console.log('Badge cliqué:', badge);
    // Ici on pourrait ouvrir une modal de détail, etc.
  };

  const tabs = [
    { id: 'calculator', label: '🌱 Calculateur Carbone', icon: '📊' },
    { id: 'badges', label: '🏆 Badges', icon: '🎖️' },
  ];

  return (
    <DashboardLayout
      title="Digital Detox Challenge - Test"
      subtitle="Démonstration des composants métier"
      stats={[
        { label: 'Niveau', value: '3', icon: '🎯', color: '#059669' },
        { label: 'XP Total', value: '750', icon: '⭐', color: '#dc2626' },
        { label: 'CO2 Économisé', value: '1.25kg', icon: '🌱', color: '#16a34a' },
        { label: 'Série', value: '7 jours', icon: '🔥', color: '#ea580c' },
      ]}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🧪 Test des Composants Métier
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Démonstration des composants métier pour l'application Digital Detox Challenge
          </p>
        </motion.div>

        {/* Navigation par onglets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'primary' : 'ghost'}
                size="md"
                onClick={() => setActiveTab(tab.id as 'calculator' | 'badges')}
                className="px-6 py-3"
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Contenu des onglets */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          {activeTab === 'calculator' && (
            <div className="space-y-8">
              {/* Calculateur Carbone */}
              <Card>
                <CardHeader>
                  <CardTitle level={2}>
                    🌱 Calculateur d'Empreinte Carbone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">
                    Testez le calculateur d'empreinte carbone avec vos habitudes numériques.
                    Le composant calcule automatiquement votre impact et propose des équivalents concrets.
                  </p>
                  
                  <CarbonCalculator
                    onCalculationComplete={handleCalculationComplete}
                    className="bg-white rounded-lg"
                  />
                </CardContent>
              </Card>

              {/* Informations techniques */}
              <Card variant="outline">
                <CardHeader>
                  <CardTitle level={3}>
                    ⚙️ Informations Techniques
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Fonctionnalités :</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Calcul en temps réel</li>
                        <li>• Équivalents concrets</li>
                        <li>• Comparaison à la moyenne</li>
                        <li>• Répartition par usage</li>
                        <li>• Animations fluides</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Technologies :</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• React + TypeScript</li>
                        <li>• Framer Motion</li>
                        <li>• Tailwind CSS</li>
                        <li>• Lucide React</li>
                        <li>• Composants UI réutilisables</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'badges' && (
            <div className="space-y-8">
              {/* Affichage des badges */}
              <Card>
                <CardHeader>
                  <CardTitle level={2}>
                    🏆 Système de Badges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">
                    Système de badges gamifié avec progression, filtres par catégorie et modal de détails.
                    Badges obtenus : {earnedBadges.length} / {BADGES.length}
                  </p>
                  
                  <BadgeDisplay
                    earnedBadges={earnedBadges}
                    badgeProgress={badgeProgress}
                    onBadgeClick={handleBadgeClick}
                    showProgress={true}
                    layout="grid"
                    className="bg-white rounded-lg"
                  />
                </CardContent>
              </Card>

              {/* Test des layouts */}
              <Card variant="outline">
                <CardHeader>
                  <CardTitle level={3}>
                    🎨 Layouts Alternatifs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Layout Compact :</h4>
                      <BadgeDisplay
                        earnedBadges={earnedBadges}
                        badgeProgress={badgeProgress}
                        onBadgeClick={handleBadgeClick}
                        showProgress={false}
                        layout="compact"
                        className="bg-gray-50 rounded-lg p-4"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions de test */}
              <Card variant="outline">
                <CardHeader>
                  <CardTitle level={3}>
                    🧪 Actions de Test
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <Button
                      variant="success"
                      onClick={() => {
                        // Simuler l'obtention d'un nouveau badge
                        const availableBadges = BADGES.filter(badge => 
                          !earnedBadges.some(earned => earned.id === badge.id)
                        );
                        if (availableBadges.length > 0) {
                          const newBadge = availableBadges[0];
                          setEarnedBadges(prev => [...prev, { 
                            ...newBadge, 
                            earnedAt: new Date(), 
                            progress: 100 
                          }]);
                        }
                      }}
                    >
                      ✨ Gagner un Badge
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => {
                        // Réinitialiser les badges
                        setEarnedBadges([]);
                      }}
                    >
                      🔄 Réinitialiser
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-gray-600 mt-12"
        >
          <p className="mb-4">
            🎯 <strong>Phase 3 terminée</strong> - Composants métier créés avec succès !
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              CarbonCalculator
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 bg-success rounded-full"></span>
              BadgeDisplay
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 bg-warning rounded-full"></span>
              ChallengeCard (en cours)
            </span>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default TestFeaturesComponents; 