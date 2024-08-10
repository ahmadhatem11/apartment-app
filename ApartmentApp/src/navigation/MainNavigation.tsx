// In App.js in a new project

import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {ApartmentNavigator} from './ApartmentStack';

function AppNavigator() {
  return (
    <NavigationContainer>
      <ApartmentNavigator />
    </NavigationContainer>
  );
}

export default AppNavigator;
