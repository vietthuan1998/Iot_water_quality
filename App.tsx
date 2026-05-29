import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigation } from './src/navigation/AppNavigation';
import { palette } from './src/theme';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={palette.page} />
      <AppNavigation />
    </SafeAreaProvider>
  );
}

export default App;
