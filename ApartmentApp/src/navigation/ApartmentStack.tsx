import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ApartmentList from '../screens/Apartments/ApartmentsList';
import ApartmentDetails from '../screens/Apartments/ApartmentDetails';
import Header from './Header';
const ApartmentStack = [
  {
    id: 'Apartments',
    component: ApartmentList,
    options: {
      header: () => <Header title="Apartments" />,
      headerShown: true,
    },
  },
  {
    id: 'ApartmentDetails',
    component: ApartmentDetails,
    options: {
      headerShown: true,
      title: () => null,
    },
  },
];
const Stack = createNativeStackNavigator();

export function ApartmentNavigator() {
  return (
    <Stack.Navigator>
      {ApartmentStack.map(s => (
        <Stack.Screen
          key={s.id}
          name={s.id}
          component={s.component}
          options={s.options}
        />
      ))}
    </Stack.Navigator>
  );
}
