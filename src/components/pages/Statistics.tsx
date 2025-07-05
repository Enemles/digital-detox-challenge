import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Calendar, 
  Leaf, 
  Zap, 
  Mail,
  Cloud,
  Tv,
  Smartphone,
  BarChart3,
  PieChart
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { CarbonCalculator } from '../features';
import { cn } from '../../utils/cn';

const Statistics: React.FC = () => {
  // Données statistiques simulées
  const stats = {
    daily: {
      co2Saved: 45,
      emailsDeleted: 23,
      streamingReduced: 2.5,
      cloudCleaned: 0.8
    },
    weekly: {
      co2Saved: 280,
      emailsDeleted: 156,
      streamingReduced: 15,
      cloudCleaned: 4.2
    },
    monthly: {
      co2Saved: 1250,
      emailsDeleted: 642,
      streamingReduced: 68,
      cloudCleaned: 18.5
    },
    yearly: {
      co2Saved: 15000,
      emailsDeleted: 7800,
      streamingReduced: 820,
      cloudCleaned: 220
    }
  };

  const goals = [
    {
      title: 'Objectif CO2 mensuel',
      current: stats.monthly.co2Saved,
      target: 1500,
      unit: 'g CO2',
      color: 'success',
      icon: Leaf
    },
    {
      title: 'Emails supprimés',
      current: stats.monthly.emailsDeleted,
      target: 1000,
      unit: 'emails',
      color: 'warning',
      icon: Mail
    },
    {
      title: 'Streaming réduit',
      current: stats.monthly.streamingReduced,
      target: 100,
      unit: 'heures',
      color: 'primary',
      icon: Tv
    },
    {
      title: 'Stockage libéré',
      current: stats.monthly.cloudCleaned,
      target: 25,
      unit: 'Go',
      color: 'danger',
      icon: Cloud
    }
  ];

  const categoryBreakdown = [
    {
      category: 'Emails',
      percentage: 35,
      co2Saved: 437,
      color: 'bg-blue-500',
      icon: Mail
    },
    {
      category: 'Streaming',
      percentage: 40,
      co2Saved: 500,
      color: 'bg-red-500',
      icon: Tv
    },
    {
      category: 'Stockage Cloud',
      percentage: 15,
      co2Saved: 187,
      color: 'bg-green-500',
      icon: Cloud
    },
    {
      category: 'Appareils',
      percentage: 10,
      co2Saved: 126,
      color: 'bg-purple-500',
      icon: Smartphone
    }
  ];

  const weeklyData = [
    { day: 'Lun', co2: 32 },
    { day: 'Mar', co2: 45 },
    { day: 'Mer', co2: 38 },
    { day: 'Jeu', co2: 52 },
    { day: 'Ven', co2: 41 },
    { day: 'Sam', co2: 35 },
    { day: 'Dim', co2: 37 }
  ];

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
          📊 Mes Statistiques
        </h1>
        <p className="text-lg text-gray-600">
          Analysez votre impact environnemental et vos progrès
        </p>
      </motion.div>

      {/* Vue d'ensemble */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <Card size="full">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stats.daily.co2Saved}g
            </div>
            <div className="text-sm text-gray-600">CO2 économisé aujourd'hui</div>
          </CardContent>
        </Card>

        <Card size="full">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stats.weekly.co2Saved}g
            </div>
            <div className="text-sm text-gray-600">Cette semaine</div>
          </CardContent>
        </Card>

        <Card size="full">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stats.monthly.co2Saved}g
            </div>
            <div className="text-sm text-gray-600">Ce mois</div>
          </CardContent>
        </Card>

        <Card size="full">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {(stats.yearly.co2Saved / 1000).toFixed(1)}kg
            </div>
            <div className="text-sm text-gray-600">Cette année</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Graphiques et objectifs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Graphique hebdomadaire */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card size="full">
            <CardHeader>
              <CardTitle level={3}>
                📈 Évolution hebdomadaire
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyData.map((data, _index) => (
                  <div key={data.day} className="flex items-center gap-4">
                    <div className="w-12 text-sm font-medium text-gray-600">
                      {data.day}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">{data.co2}g CO2</span>
                        <span className="text-xs text-gray-500">
                          {Math.round((data.co2 / 60) * 100)}%
                        </span>
                      </div>
                      <ProgressBar
                        value={data.co2}
                        max={60}
                        variant="success"
                        size="sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Objectifs mensuels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card size="full">
            <CardHeader>
              <CardTitle level={3}>
                🎯 Objectifs mensuels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {goals.map((goal, _index) => (
                  <div key={goal.title} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <goal.icon className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-900">
                          {goal.title}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {goal.current}/{goal.target} {goal.unit}
                      </span>
                    </div>
                    <ProgressBar
                      value={goal.current}
                      max={goal.target}
                      variant={goal.color as 'success' | 'warning' | 'primary' | 'danger'}
                      size="sm"
                      showPercentage
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Répartition par catégorie */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-8"
      >
        <Card size="full">
          <CardHeader>
            <CardTitle level={3}>
              🥧 Répartition par catégorie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Graphique en barres */}
              <div className="space-y-4">
                {categoryBreakdown.map((category, _index) => (
                  <div key={category.category} className="flex items-center gap-4">
                    <div className="flex items-center gap-2 w-32">
                      <category.icon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-900">
                        {category.category}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">
                          {category.co2Saved}g CO2
                        </span>
                        <span className="text-xs text-gray-500">
                          {category.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={cn('h-2 rounded-full', category.color)}
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Graphique circulaire visuel */}
              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 rounded-full border-8 border-gray-200" />
                  <div className="absolute inset-0 rounded-full border-8 border-blue-500 border-r-transparent border-b-transparent transform -rotate-90" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {stats.monthly.co2Saved}g
                      </div>
                      <div className="text-sm text-gray-600">
                        CO2 économisé
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Calculateur d'empreinte */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card size="full">
          <CardHeader>
            <CardTitle level={3}>
              🌱 Calculateur d'impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CarbonCalculator />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Statistics; 