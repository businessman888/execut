import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, theme } from './src/components/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';
import { useAuthStore } from './src/store/authStore';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 2,
        },
    },
});

function AppContent() {
    const initialize = useAuthStore((state) => state.initialize);

    useEffect(() => {
        initialize();
    }, [initialize]);

    return (
        <>
            <StatusBar style="light" />
            <RootNavigator />
        </>
    );
}

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <QueryClientProvider client={queryClient}>
                    <NativeBaseProvider theme={theme}>
                        <AppContent />
                    </NativeBaseProvider>
                </QueryClientProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
