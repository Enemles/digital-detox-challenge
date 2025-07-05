import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Cloud, Monitor, Smartphone, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input, Select } from '../ui/Input';
import { ProgressBar } from '../ui/ProgressBar';
import { 
  DigitalCarbonCalculator, 
  calculateAnnualImpact, 
  convertCO2ToEquivalents, 
  determineProfileType 
} from '../../utils/carbonCalculator';
import { DIGITAL_IMPACT_STATS } from '../../constants';
import { cn } from '../../utils/cn';

interface CarbonCalculationResult {
  daily: {
    total: number;
    breakdown: {
      emails: number;
      screenTime: number;
      streaming: number;
      cloud: number;
    };
  };
  yearly: number;
  equivalents: {
    carKilometers: number;
    treesEquivalent: number;
    phoneCharges: number;
    coffeeCups: number;
    ledHours: number;
  };
  userType: string;
  comparisonToAverage: {
    emails: number;
    streaming: number;
    cloud: number;
  };
}

interface CarbonCalculatorProps {
  onCalculationComplete?: (result: CarbonCalculationResult) => void;
  className?: string;
}

const CarbonCalculator: React.FC<CarbonCalculatorProps> = ({
  onCalculationComplete,
  className
}) => {
  const [habits, setHabits] = useState({
    emailsPerDay: 50,
    hoursScreenTime: 6,
    streamingHours: 2,
    cloudUsageGB: 15,
    devicesCount: 2
  });

  const [results, setResults] = useState<CarbonCalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState('smartphone');

  // Calculer automatiquement quand les habitudes changent
  useEffect(() => {
    const calculateImpact = async () => {
      setIsCalculating(true);
      
      // Simulation d'un délai pour l'effet visuel
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const calculator = new DigitalCarbonCalculator();
      
      // Calculs des impacts quotidiens
      const emailImpact = calculator.emailImpact(25, 1, false) * habits.emailsPerDay; // 25KB par email en moyenne
      const streamingImpact = calculator.streamingImpact(habits.streamingHours, 'HD');
      const cloudImpact = calculator.cloudStorageImpact(habits.cloudUsageGB) / 365; // Impact quotidien du cloud
      const screenTimeImpact = habits.hoursScreenTime * 8; // Estimation: 8g CO2/heure d'écran
      
      const dailyTotal = emailImpact + streamingImpact + cloudImpact + screenTimeImpact;
      
      // Calcul de l'impact annuel
      const yearlyImpact = calculateAnnualImpact({
        dailyEmails: habits.emailsPerDay,
        cloudStorageGB: habits.cloudUsageGB,
        dailyStreamingHours: habits.streamingHours,
        streamingQuality: 'HD'
      });
      
      // Conversion en équivalents
      const equivalents = convertCO2ToEquivalents(dailyTotal);
      
      // Détermination du type d'utilisateur
      const userType = determineProfileType({
        dailyEmails: habits.emailsPerDay,
        cloudStorageGB: habits.cloudUsageGB,
        dailyStreamingHours: habits.streamingHours
      });
      
      const calculationResults: CarbonCalculationResult = {
        daily: {
          total: dailyTotal,
          breakdown: {
            emails: emailImpact,
            screenTime: screenTimeImpact,
            streaming: streamingImpact,
            cloud: cloudImpact,
          }
        },
        yearly: yearlyImpact,
        equivalents,
        userType,
        comparisonToAverage: {
          emails: (habits.emailsPerDay / DIGITAL_IMPACT_STATS.EMAILS_PER_DAY_AVERAGE) * 100,
          streaming: (habits.streamingHours / DIGITAL_IMPACT_STATS.STREAMING_HOURS_AVERAGE) * 100,
          cloud: (habits.cloudUsageGB / DIGITAL_IMPACT_STATS.CLOUD_STORAGE_AVERAGE) * 100,
        }
      };
      
      setResults(calculationResults);
      setIsCalculating(false);
      
      onCalculationComplete?.(calculationResults);
    };

    calculateImpact();
  }, [habits, onCalculationComplete]);

  const handleHabitChange = (field: string, value: number) => {
    setHabits(prev => ({
      ...prev,
      [field]: Math.max(0, value)
    }));
  };

  const deviceOptions = [
    { value: 'smartphone', label: '📱 Smartphone' },
    { value: 'laptop', label: '💻 Ordinateur portable' },
    { value: 'desktop', label: '🖥️ Ordinateur fixe' },
    { value: 'tablet', label: '📱 Tablette' },
  ];

  const getTrendIcon = (percentage: number) => {
    return percentage > 100 ? (
      <TrendingUp className="w-4 h-4 text-danger" />
    ) : (
      <TrendingDown className="w-4 h-4 text-success" />
    );
  };

  const getTrendColor = (percentage: number) => {
    if (percentage > 150) return 'text-danger';
    if (percentage > 100) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Titre */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🌱 Calculateur d'Empreinte Carbone
        </h2>
        <p className="text-gray-600">
          Découvrez l'impact environnemental de vos habitudes numériques
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulaire de saisie */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle level={3}>Vos habitudes numériques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  label="📧 Emails par jour"
                  type="number"
                  value={habits.emailsPerDay}
                  onChange={(e) => handleHabitChange('emailsPerDay', parseInt(e.target.value) || 0)}
                  hint={`Moyenne française: ${DIGITAL_IMPACT_STATS.EMAILS_PER_DAY_AVERAGE} emails/jour`}
                  leftIcon={<Mail className="w-4 h-4" />}
                />

                <Input
                  label="⏱️ Heures d'écran par jour"
                  type="number"
                  value={habits.hoursScreenTime}
                  onChange={(e) => handleHabitChange('hoursScreenTime', parseInt(e.target.value) || 0)}
                  hint="Temps passé devant les écrans"
                  leftIcon={<Monitor className="w-4 h-4" />}
                />

                <Input
                  label="🎬 Heures de streaming par jour"
                  type="number"
                  value={habits.streamingHours}
                  onChange={(e) => handleHabitChange('streamingHours', parseInt(e.target.value) || 0)}
                  hint={`Moyenne française: ${DIGITAL_IMPACT_STATS.STREAMING_HOURS_AVERAGE}h/jour`}
                />

                <Input
                  label="☁️ Stockage cloud (Go)"
                  type="number"
                  value={habits.cloudUsageGB}
                  onChange={(e) => handleHabitChange('cloudUsageGB', parseInt(e.target.value) || 0)}
                  hint={`Moyenne française: ${DIGITAL_IMPACT_STATS.CLOUD_STORAGE_AVERAGE} Go`}
                  leftIcon={<Cloud className="w-4 h-4" />}
                />

                <Input
                  label="📱 Nombre d'appareils"
                  type="number"
                  value={habits.devicesCount}
                  onChange={(e) => handleHabitChange('devicesCount', parseInt(e.target.value) || 0)}
                  hint="Smartphones, tablettes, ordinateurs..."
                  leftIcon={<Smartphone className="w-4 h-4" />}
                />

                <Select
                  label="📱 Appareil principal"
                  value={selectedDevice}
                  onChange={(e) => setSelectedDevice(e.target.value)}
                  options={deviceOptions}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Résultats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle level={3}>
                {isCalculating ? 'Calcul en cours...' : 'Votre empreinte carbone'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isCalculating ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : results ? (
                <div className="space-y-6">
                  {/* Impact quotidien */}
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                      className="inline-block bg-gradient-to-r from-forest-100 to-success/10 rounded-lg p-4 mb-4"
                    >
                      <div className="text-3xl font-bold text-forest-600 mb-1">
                        {results.daily.total.toFixed(1)} g
                      </div>
                      <div className="text-sm text-gray-600">
                        CO2 par jour
                      </div>
                    </motion.div>
                    
                    <div className="text-center mb-4">
                      <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                        Profil: {results.userType}
                      </span>
                    </div>
                  </div>

                  {/* Répartition */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Répartition par usage:</h4>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">📧 Emails</span>
                        <span className="text-sm font-medium">{results.daily.breakdown.emails.toFixed(1)}g</span>
                      </div>
                      <ProgressBar
                        value={results.daily.breakdown.emails}
                        max={results.daily.total}
                        variant="eco"
                        size="sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">⏱️ Écran</span>
                        <span className="text-sm font-medium">{results.daily.breakdown.screenTime.toFixed(1)}g</span>
                      </div>
                      <ProgressBar
                        value={results.daily.breakdown.screenTime}
                        max={results.daily.total}
                        variant="warning"
                        size="sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">🎬 Streaming</span>
                        <span className="text-sm font-medium">{results.daily.breakdown.streaming.toFixed(1)}g</span>
                      </div>
                      <ProgressBar
                        value={results.daily.breakdown.streaming}
                        max={results.daily.total}
                        variant="danger"
                        size="sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">☁️ Cloud</span>
                        <span className="text-sm font-medium">{results.daily.breakdown.cloud.toFixed(1)}g</span>
                      </div>
                      <ProgressBar
                        value={results.daily.breakdown.cloud}
                        max={results.daily.total}
                        variant="success"
                        size="sm"
                      />
                    </div>
                  </div>

                  {/* Comparaison à la moyenne */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Comparaison à la moyenne:</h4>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">📧 Emails</span>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(results.comparisonToAverage.emails)}
                          <span className={cn('text-sm font-medium', getTrendColor(results.comparisonToAverage.emails))}>
                            {Math.round(results.comparisonToAverage.emails)}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">🎬 Streaming</span>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(results.comparisonToAverage.streaming)}
                          <span className={cn('text-sm font-medium', getTrendColor(results.comparisonToAverage.streaming))}>
                            {Math.round(results.comparisonToAverage.streaming)}%
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">☁️ Cloud</span>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(results.comparisonToAverage.cloud)}
                          <span className={cn('text-sm font-medium', getTrendColor(results.comparisonToAverage.cloud))}>
                            {Math.round(results.comparisonToAverage.cloud)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Équivalents */}
                                      <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Équivalents concrets:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>🚗 Voiture:</span>
                          <span className="font-medium">{(results.equivalents.carKilometers * 1000).toFixed(0)} m</span>
                        </div>
                        <div className="flex justify-between">
                          <span>🌳 Arbres:</span>
                          <span className="font-medium">{results.equivalents.treesEquivalent.toFixed(4)} arbre/jour</span>
                        </div>
                        <div className="flex justify-between">
                          <span>💡 LED:</span>
                          <span className="font-medium">{results.equivalents.ledHours.toFixed(1)} h</span>
                        </div>
                        <div className="flex justify-between">
                          <span>📱 Charges:</span>
                          <span className="font-medium">{results.equivalents.phoneCharges.toFixed(1)} téléphones</span>
                        </div>
                      </div>
                    </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  Remplissez le formulaire pour calculer votre empreinte
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Actions */}
      {results && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              // Ici on pourrait déclencher l'onboarding ou rediriger vers les défis
              console.log('Commencer les défis avec:', results);
            }}
          >
            🎯 Commencer les défis éco-responsables
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default CarbonCalculator; 