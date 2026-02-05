import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { MainNavigator } from './MainNavigator';
import { OnboardingQuizScreen } from '../screens/auth/OnboardingQuizScreen';
import PlanningSuccessScreen from '../screens/goals/PlanningSuccessScreen';
import { GeneratedPlan } from '../types/planning';
import { useAuthStore } from '../store/authStore';
import 'react-native-get-random-values';

// For testing - set to true to skip quiz and go directly to main app
const SKIP_ONBOARDING = false;

export type RootStackParamList = {
    OnboardingQuiz: undefined;
    PlanningSuccess: {
        planId: string;
        plan: GeneratedPlan;
    };
    Main: undefined;
    MainTabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
    // State to track if onboarding is completed
    // In production, this would check AsyncStorage or auth state
    const [hasCompletedOnboarding] = useState(SKIP_ONBOARDING);
    const [isInitializingAuth, setIsInitializingAuth] = useState(true);

    const { signInAnonymously, isAuthenticated, initialize } = useAuthStore();

    // Initialize auth and ensure anonymous session for quiz
    useEffect(() => {
        const initAuth = async () => {
            try {
                // First initialize existing session
                await initialize();

                // If not skipping onboarding and not authenticated, sign in anonymously
                if (!SKIP_ONBOARDING && !useAuthStore.getState().isAuthenticated) {
                    try {
                        await signInAnonymously();
                    } catch (anonError) {
                        // Fallback: generate local UUID if Supabase is having issues
                        console.warn('Anonymous sign-in failed, using local UUID fallback:', anonError);
                        const { v4: uuidv4 } = await import('uuid');
                        const fallbackId = uuidv4();
                        useAuthStore.setState({
                            user: { id: fallbackId, email: '' },
                            isAuthenticated: true,
                            isAnonymous: true,
                        });
                    }
                }
            } catch (error) {
                console.error('Auth initialization failed:', error);
            } finally {
                setIsInitializingAuth(false);
            }
        };

        initAuth();
    }, []);

    // Show loading while initializing auth
    if (isInitializingAuth) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D0D0D' }}>
                <ActivityIndicator size="large" color="#00C3FF" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {hasCompletedOnboarding ? (
                    <Stack.Screen name="Main" component={MainNavigator} />
                ) : (
                    <>
                        <Stack.Screen name="OnboardingQuiz" component={OnboardingQuizScreen} />
                        <Stack.Screen name="PlanningSuccess" component={PlanningSuccessScreen} />
                        <Stack.Screen name="Main" component={MainNavigator} />
                        <Stack.Screen name="MainTabs" component={MainNavigator} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

