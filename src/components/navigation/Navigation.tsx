import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Target, 
  Trophy, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  Leaf,
  User,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { cn } from '../../utils/cn';

interface NavigationProps {
  className?: string;
}

interface UserStats {
  name: string;
  level: number;
  currentXP: number;
  maxXP: number;
  co2Saved: number;
  streak: number;
  avatar?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();

  // Données utilisateur (normalement viendraient du store)
  const userStats: UserStats = {
    name: 'Alex Martin',
    level: 3,
    currentXP: 750,
    maxXP: 1000,
    co2Saved: 1250,
    streak: 7,
    avatar: '🌱'
  };

  // Navigation items
  const navigationItems = [
    {
      path: '/',
      icon: Home,
      label: 'Dashboard',
      description: 'Vue d\'ensemble'
    },
    {
      path: '/challenges',
      icon: Target,
      label: 'Défis',
      description: 'Défis éco-responsables',
      badge: 3 // Nombre de défis actifs
    },
    {
      path: '/badges',
      icon: Trophy,
      label: 'Badges',
      description: 'Collection d\'achievements'
    },
    {
      path: '/stats',
      icon: BarChart3,
      label: 'Statistiques',
      description: 'Analyses et graphiques'
    },
    {
      path: '/settings',
      icon: Settings,
      label: 'Paramètres',
      description: 'Profil et préférences'
    }
  ];

  // Fermer le menu sur changement de route
  useEffect(() => {
    setIsOpen(false);
    setShowUserMenu(false);
  }, [location.pathname]);

  // Fermer les menus en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-menu') && !target.closest('.user-menu-button')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sidebarVariants = {
    closed: { x: '-100%' },
    open: { x: 0 }
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  return (
    <>
      {/* Header Mobile/Desktop */}
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm',
        className
      )}>
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo et menu burger */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              icon={<Menu className="w-5 h-5" />}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden"
            >
              Menu
            </Button>
            
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-2xl">🌱</span>
              <span className="font-bold text-lg text-gray-900 hidden sm:block">
                Digital Detox
              </span>
            </motion.div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  'relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
                {item.badge && (
                  <span className="absolute -top-1 -right-1 bg-danger text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Profil utilisateur */}
          <div className="relative">
            <button
              className="user-menu-button flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-gray-900">
                  {userStats.name}
                </div>
                <div className="text-xs text-gray-500">
                  Niveau {userStats.level}
                </div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-success to-forest rounded-full flex items-center justify-center text-white font-bold">
                {userStats.avatar}
              </div>
              <ChevronDown className={cn(
                'w-4 h-4 text-gray-400 transition-transform duration-200',
                showUserMenu && 'rotate-180'
              )} />
            </button>

            {/* Menu utilisateur */}
            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  className="user-menu absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Stats utilisateur */}
                  <div className="p-4 bg-gradient-to-r from-success/10 to-forest/10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-success to-forest rounded-full flex items-center justify-center text-white text-lg font-bold">
                        {userStats.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{userStats.name}</div>
                        <div className="text-sm text-gray-600">Niveau {userStats.level}</div>
                      </div>
                    </div>
                    
                    {/* Barre XP */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>XP: {userStats.currentXP}/{userStats.maxXP}</span>
                        <span>{Math.round((userStats.currentXP / userStats.maxXP) * 100)}%</span>
                      </div>
                      <ProgressBar
                        value={userStats.currentXP}
                        max={userStats.maxXP}
                        variant="success"
                        size="sm"
                      />
                    </div>

                    {/* Stats rapides */}
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="bg-white/50 rounded-lg p-2">
                        <div className="text-lg font-bold text-success">{userStats.co2Saved}g</div>
                        <div className="text-xs text-gray-600">CO2 économisé</div>
                      </div>
                      <div className="bg-white/50 rounded-lg p-2">
                        <div className="text-lg font-bold text-warning">{userStats.streak}</div>
                        <div className="text-xs text-gray-600">Jours de suite</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      <User className="w-4 h-4" />
                      Mon Profil
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      <Settings className="w-4 h-4" />
                      Paramètres
                    </button>
                    <hr className="my-2" />
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <LogOut className="w-4 h-4" />
                      Déconnexion
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Sidebar Mobile */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.aside
              className="fixed top-0 left-0 bottom-0 w-80 bg-white shadow-xl z-50 lg:hidden"
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌱</span>
                  <span className="font-bold text-lg text-gray-900">
                    Digital Detox
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<X className="w-5 h-5" />}
                  onClick={() => setIsOpen(false)}
                >
                  Fermer
                </Button>
              </div>

              {/* Navigation */}
              <nav className="p-4 space-y-2">
                {navigationItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => cn(
                      'relative flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-all duration-200',
                      isActive 
                        ? 'bg-primary text-white shadow-md' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <div className="flex-1">
                      <div>{item.label}</div>
                      <div className="text-xs opacity-75">{item.description}</div>
                    </div>
                    {item.badge && (
                      <span className="bg-danger text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </nav>

              {/* Footer avec stats */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
                <div className="text-center">
                  <div className="text-lg font-bold text-success mb-1">
                    {userStats.co2Saved}g CO2
                  </div>
                  <div className="text-xs text-gray-600 mb-2">
                    économisés aujourd'hui
                  </div>
                  <div className="flex items-center justify-center gap-1 text-xs text-warning">
                    <Leaf className="w-3 h-3" />
                    Série de {userStats.streak} jours
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation; 