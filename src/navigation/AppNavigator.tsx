import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PortfolioScreen } from '../screens/PortfolioScreen';

const Stack = createStackNavigator();

export const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{ title: 'My Portfolio' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
