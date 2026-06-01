import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigation } from './src/navigation/AppNavigation';
import { palette } from './src/theme';
import { WarningLevelProvider } from './src/context/WarningLevelContext';

function App() {
  return (
    <SafeAreaProvider>
      <WarningLevelProvider>
        <StatusBar barStyle="dark-content" backgroundColor={palette.page} />
        <AppNavigation />
      </WarningLevelProvider>
    </SafeAreaProvider>
  );
}

export default App;
