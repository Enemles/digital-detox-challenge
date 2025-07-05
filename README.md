# 🌱 Digital Detox Challenge

Une webapp interactive de sensibilisation à l'empreinte carbone du numérique avec un système de gamification pour encourager des habitudes plus écologiques.

## 🎯 Objectifs

- **Sensibiliser** à l'impact environnemental du numérique (emails, cloud, streaming)
- **Gamifier** le processus de nettoyage numérique avec des défis et des récompenses
- **Calculer** et visualiser l'empreinte carbone en temps réel
- **Encourager** des actions concrètes avec un système de progression

## 🚀 Technologies

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 (CSS-first configuration)
- **Animations**: Framer Motion
- **State Management**: Zustand avec persistence
- **Graphiques**: Recharts (à implémenter)
- **Icons**: Lucide React
- **Routage**: React Router (à implémenter)

## 🏗️ Architecture

```
src/
├── components/          # Composants réutilisables
├── pages/              # Pages principales
├── hooks/              # Hooks personnalisés
├── stores/             # Stores Zustand
├── utils/              # Utilitaires
├── types/              # Types TypeScript
├── constants/          # Constantes et données
└── lib/                # Librairies/helpers
```

## 📊 Données factuelles intégrées

- **Emails** : 4g CO2 (simple) / 50g CO2 (avec pièce jointe)
- **Cloud** : 0.5kg CO2 par Go par an
- **Streaming** : 36g CO2/h (HD) / 97g CO2/h (4K)
- **Secteur numérique** : 4% des émissions mondiales

## 🎮 Fonctionnalités

### ✅ Phase 1 - Configuration (Complétée)
- [x] Configuration Tailwind CSS v4
- [x] Types TypeScript complets
- [x] Calculateur d'empreinte carbone
- [x] Store Zustand avec persistence
- [x] Système de constantes et données
- [x] Utilitaires CSS et helpers

### 🚧 Phase 2 - Composants de base (En cours)
- [ ] Composants UI réutilisables (Button, Card, Modal, etc.)
- [ ] Système de design avec variants
- [ ] Animations Framer Motion
- [ ] Tests unitaires

### 📋 Phase 3 - Logique métier (À venir)
- [ ] Système de progression et niveaux
- [ ] Gestion des badges et achievements
- [ ] Système de défis quotidiens/hebdomadaires
- [ ] Calculs d'impact en temps réel

### 🎨 Phase 4 - Interfaces principales (À venir)
- [ ] Page d'accueil avec hero section
- [ ] Onboarding interactif (5 questions)
- [ ] Dashboard principal avec graphiques
- [ ] Simulateur de nettoyage (drag & drop)

### 🔧 Phase 5 - Finalisation (À venir)
- [ ] Optimisations de performance
- [ ] Tests d'intégration
- [ ] PWA configuration
- [ ] Analytics et tracking
- [ ] Déploiement

## 🛠️ Installation

```bash
# Cloner le projet
git clone <url-du-repo>
cd digital-detox-challenge

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

## 📚 Utilisation

### Calculateur d'empreinte carbone

```typescript
import { carbonCalculator } from './utils/carbonCalculator';

// Calculer l'impact d'un email
const emailImpact = carbonCalculator.emailImpact(25, 1, false);

// Calculer l'impact du cloud
const cloudImpact = carbonCalculator.cloudStorageImpact(10);

// Calculer l'impact du streaming
const streamingImpact = carbonCalculator.streamingImpact(2, 'HD');

// Obtenir le total
const total = carbonCalculator.calculateTotal();
```

### Store Zustand

```typescript
import { useAppStore } from './stores/useAppStore';

function MyComponent() {
  const { 
    user, 
    userStats, 
    addXP, 
    createChallenge,
    unlockBadge 
  } = useAppStore();

  // Utiliser les données et actions
  const handleAction = () => {
    addXP(50);
    unlockBadge('email-cleaner-bronze');
  };
}
```

## 🎨 Design System

### Couleurs
- **Primary**: Forest green (#16a34a)
- **Secondary**: Ocean blue (#0284c7)
- **Accent**: Earth beige (#d2bab0)
- **Success**: Bright green (#22c55e)

### Utilitaires CSS personnalisés
- `.text-gradient` - Gradient de texte éco
- `.glass-effect` - Effet de verre
- `.shadow-eco` - Ombre verte
- `.transition-smooth` - Transition fluide

## 🌟 Fonctionnalités avancées

### Système de profils
- **Streameur Intense** : Forte consommation vidéo
- **Email Collector** : Boîte mail encombrée
- **Cloud Addict** : Stockage excessif
- **Numérique Équilibré** : Bonnes habitudes
- **Eco-Warrior** : Très conscient de l'impact

### Système de progression
- 6 niveaux : Débutant → Légende Verte
- Badges déblocables par catégorie
- Système XP avec récompenses
- Défis quotidiens/hebdomadaires

## 🔍 Scripts disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run preview      # Prévisualisation du build
npm run lint         # Linting du code
```

## 📈 Roadmap

### Version 1.0
- [ ] Onboarding complet
- [ ] Dashboard fonctionnel
- [ ] Simulateur de nettoyage
- [ ] Système de progression

### Version 1.1
- [ ] Leaderboard communautaire
- [ ] Partage social
- [ ] Conseils personnalisés
- [ ] Mode sombre

### Version 2.0
- [ ] PWA complète
- [ ] Notifications push
- [ ] Analytics avancées
- [ ] API backend

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- Données environnementales : [ADEME](https://www.ademe.fr)
- Inspiration design : Approche éco-responsable
- Communauté open source pour les outils utilisés

---

**Version actuelle**: 1.0.0  
**Status**: Phase 1 complétée ✅  
**Dernière mise à jour**: Janvier 2025
