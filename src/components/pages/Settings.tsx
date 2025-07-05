import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Save } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

const Settings: React.FC = () => {
  const [profile, setProfile] = useState({
    name: 'Alex Martin',
    email: 'alex.martin@email.com',
    avatar: '🌱'
  });

  const [preferences, setPreferences] = useState({
    notifications: true,
    darkMode: false,
    language: 'fr',
    emailUpdates: true
  });

  const handleSave = () => {
    console.log('Sauvegarde des paramètres:', { profile, preferences });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ⚙️ Paramètres
        </h1>
        <p className="text-lg text-gray-600">
          Gérez votre profil et vos préférences
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Profil */}
        <Card>
          <CardHeader>
            <CardTitle level={3}>
              <User className="w-5 h-5 mr-2" />
              Profil utilisateur
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet
                </label>
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Préférences */}
        <Card>
          <CardHeader>
            <CardTitle level={3}>
              <Bell className="w-5 h-5 mr-2" />
              Préférences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Notifications push
                </span>
                <button
                  onClick={() => setPreferences({...preferences, notifications: !preferences.notifications})}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.notifications ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Mode sombre
                </span>
                <button
                  onClick={() => setPreferences({...preferences, darkMode: !preferences.darkMode})}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.darkMode ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end">
          <Button variant="primary" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Sauvegarder
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings; 