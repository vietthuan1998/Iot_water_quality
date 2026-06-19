import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigation } from './src/navigation/AppNavigation';
import { palette } from './src/theme';
import { WarningLevelProvider } from './src/context/WarningLevelContext';
import { Provider } from 'react-redux';
import { store } from './src/store';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <WarningLevelProvider>
          <StatusBar barStyle="dark-content" backgroundColor={palette.page} />
          <AppNavigation />
        </WarningLevelProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
