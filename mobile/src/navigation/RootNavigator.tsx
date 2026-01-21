import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainNavigator } from './MainNavigator';
import { OnboardingQuizScreen } from '../screens/auth/OnboardingQuizScreen';

// For testing - set to true to skip quiz and go directly to main app
const SKIP_ONBOARDING = false;

export type RootStackParamList = {
    OnboardingQuiz: undefined;
    Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
    // State to track if onboarding is completed
    // In production, this would check AsyncStorage or auth state
    const [hasCompletedOnboarding] = useState(SKIP_ONBOARDING);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {hasCompletedOnboarding ? (
                    <Stack.Screen name="Main" component={MainNavigator} />
                ) : (
                    <>
                        <Stack.Screen name="OnboardingQuiz" component={OnboardingQuizScreen} />
                        <Stack.Screen name="Main" component={MainNavigator} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
