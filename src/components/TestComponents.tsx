import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Settings, 
  Star,
  Heart,
  Zap,
  Leaf 
} from 'lucide-react';

// Import des composants UI
import { Button } from './ui/Button';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter, 
  CardStats 
} from './ui/Card';
import { 
  Modal, 
  ModalBody, 
  ModalFooter, 
  ConfirmModal, 
  AchievementModal, 
  LevelUpModal 
} from './ui/Modal';
import { 
  XPProgressBar, 
  BadgeProgress, 
  StatsBar 
} from './ui/ProgressBar';
import { Input, TextArea, Select } from './ui/Input';
import { DashboardLayout } from './layout/Layout';

const TestComponents: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fonction pour simuler un chargement
  const handleAsyncAction = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  const testStats = [
    { label: 'CO2 Économisé', value: '2.4 kg', icon: '🌱', color: '#059669' },
    { label: 'Défis Terminés', value: '12', icon: '🎯', color: '#3B82F6' },
    { label: 'XP Gagné', value: '1,250', icon: '⚡', color: '#F59E0B' },
    { label: 'Badges', value: '8', icon: '🏆', color: '#8B5CF6' },
  ];

  const cardStats = [
    { label: 'Emails', value: '45', icon: <Mail className="w-5 h-5" />, color: 'success' as const },
    { label: 'Streaming', value: '2.3h', icon: <Zap className="w-5 h-5" />, color: 'warning' as const },
    { label: 'Cloud', value: '1.2 Go', icon: <Settings className="w-5 h-5" />, color: 'danger' as const },
    { label: 'Économie', value: '234g', icon: <Leaf className="w-5 h-5" />, color: 'success' as const },
  ];

  const progressStats = [
    { label: 'Réduction emails', value: 35, max: 50, color: 'success' as const, icon: <Mail className="w-4 h-4" /> },
    { label: 'Temps d\'écran', value: 120, max: 180, color: 'warning' as const, icon: <Zap className="w-4 h-4" /> },
    { label: 'Stockage cloud', value: 8, max: 10, color: 'danger' as const, icon: <Settings className="w-4 h-4" /> },
    { label: 'Score écologique', value: 75, max: 100, color: 'eco' as const, icon: <Leaf className="w-4 h-4" /> },
  ];

  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const badgeExample = {
    name: 'Éco-Guerrier',
    description: 'Vous avez terminé 10 défis écologiques !',
    icon: '🌟',
    color: '#059669',
  };

  const levelRewards = [
    { name: 'Nouveau défi', icon: '🎯' },
    { name: 'Badge spécial', icon: '🏆' },
    { name: 'Points bonus', icon: '⚡' },
  ];

  return (
    <DashboardLayout
      title="Test des Composants UI"
      subtitle="Démonstration de tous les composants créés pour Digital Detox Challenge"
      stats={testStats}
    >
      <div className="space-y-12">
        {/* Section Boutons */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Boutons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle level={3}>Variants de boutons</CardTitle>
                <CardDescription>Différents styles disponibles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Button variant="primary">Primaire</Button>
                    <Button variant="secondary">Secondaire</Button>
                    <Button variant="success">Succès</Button>
                    <Button variant="warning">Attention</Button>
                    <Button variant="danger">Danger</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline">Contour</Button>
                    <Button variant="ghost">Fantôme</Button>
                    <Button loading={loading} onClick={handleAsyncAction}>
                      {loading ? 'Chargement...' : 'Charger'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle level={3}>Boutons avec icônes</CardTitle>
                <CardDescription>Boutons avec icônes et tailles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" icon={<Search className="w-4 h-4" />}>Petit</Button>
                    <Button size="md" icon={<User className="w-5 h-5" />}>Moyen</Button>
                    <Button size="lg" icon={<Heart className="w-6 h-6" />}>Grand</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button icon={<Star className="w-5 h-5" />} iconPosition="left">
                      Icône à gauche
                    </Button>
                    <Button icon={<Bell className="w-5 h-5" />} iconPosition="right">
                      Icône à droite
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Section Cartes */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cartes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="eco" interactive>
              <CardHeader>
                <CardTitle>Carte Éco</CardTitle>
                <CardDescription>Carte avec thème écologique</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Cette carte utilise le variant écologique avec des couleurs vertes.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="success" size="sm">Action</Button>
              </CardFooter>
            </Card>

            <Card variant="glass" glow>
              <CardHeader>
                <CardTitle>Carte Glass</CardTitle>
                <CardDescription>Effet verre avec lueur</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Carte avec effet de verre et animation de lueur.
                </p>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Statistiques</CardTitle>
                <CardDescription>Carte avec stats animées</CardDescription>
              </CardHeader>
              <CardContent>
                <CardStats stats={cardStats} />
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Section Barres de progression */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Barres de progression</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle level={3}>Progression XP</CardTitle>
                <CardDescription>Barre de progression spécialisée pour l'XP</CardDescription>
              </CardHeader>
              <CardContent>
                <XPProgressBar
                  currentXP={1250}
                  nextLevelXP={500}
                  currentLevel={3}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle level={3}>Progression de badge</CardTitle>
                <CardDescription>Suivi des progrès vers un badge</CardDescription>
              </CardHeader>
              <CardContent>
                <BadgeProgress
                  progress={7}
                  max={10}
                  badgeName="Maître de l'Email"
                  icon={<Mail className="w-6 h-6" />}
                />
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle level={3}>Statistiques avec barres</CardTitle>
                <CardDescription>Graphiques de progression multiples</CardDescription>
              </CardHeader>
              <CardContent>
                <StatsBar stats={progressStats} />
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Section Formulaires */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Formulaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle level={3}>Champs de saisie</CardTitle>
                <CardDescription>Inputs avec variants et icônes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    label="Email"
                    placeholder="votre@email.com"
                    leftIcon={<Mail className="w-5 h-5" />}
                    hint="Utilisé pour les notifications"
                  />
                  <Input
                    label="Mot de passe"
                    type="password"
                    placeholder="••••••••"
                    showPasswordToggle
                    leftIcon={<Lock className="w-5 h-5" />}
                  />
                  <Input
                    label="Recherche"
                    placeholder="Rechercher..."
                    leftIcon={<Search className="w-5 h-5" />}
                    loading={loading}
                  />
                  <Input
                    label="Champ avec erreur"
                    placeholder="Test"
                    error="Ce champ est obligatoire"
                    variant="danger"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle level={3}>Autres champs</CardTitle>
                <CardDescription>TextArea et Select</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Select
                    label="Choix"
                    options={selectOptions}
                    placeholder="Sélectionner une option"
                  />
                  <TextArea
                    label="Commentaire"
                    placeholder="Votre commentaire..."
                    hint="Maximum 500 caractères"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Section Modals */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Modals</h2>
          <Card>
            <CardHeader>
              <CardTitle level={3}>Types de modals</CardTitle>
              <CardDescription>Différents types de modals avec animations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => setShowModal(true)}>
                  Modal basique
                </Button>
                <Button onClick={() => setShowConfirmModal(true)} variant="warning">
                  Modal confirmation
                </Button>
                <Button onClick={() => setShowAchievementModal(true)} variant="success">
                  Modal achievement
                </Button>
                <Button onClick={() => setShowLevelUpModal(true)} variant="primary">
                  Modal level up
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Modals */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Modal de démonstration"
        >
          <ModalBody>
            <p className="text-gray-600">
              Ceci est un modal de démonstration avec animations et effets visuels.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Annuler
            </Button>
            <Button variant="primary" onClick={() => setShowModal(false)}>
              Confirmer
            </Button>
          </ModalFooter>
        </Modal>

        <ConfirmModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={() => setShowConfirmModal(false)}
          title="Confirmation"
          message="Êtes-vous sûr de vouloir effectuer cette action ?"
          variant="warning"
        />

        <AchievementModal
          isOpen={showAchievementModal}
          onClose={() => setShowAchievementModal(false)}
          badge={badgeExample}
          xpGained={100}
        />

        <LevelUpModal
          isOpen={showLevelUpModal}
          onClose={() => setShowLevelUpModal(false)}
          newLevel={4}
          levelName="Éco-Expert"
          levelIcon="🌟"
          rewards={levelRewards}
        />
      </div>
    </DashboardLayout>
  );
};

export default TestComponents; 