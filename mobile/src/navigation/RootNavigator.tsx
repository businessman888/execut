import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator } from './MainNavigator';

export function RootNavigator() {
    // TODO: Add onboarding and login flow later
    // For now, go directly to the main app
    return (
        <NavigationContainer>
            <MainNavigator />
        </NavigationContainer>
    );
}
