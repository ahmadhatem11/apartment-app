/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import AppNavigator from './src/navigation/MainNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{position: 'absolute'}} />
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;
