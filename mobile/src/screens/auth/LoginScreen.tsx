import React, { useState } from 'react';
import { Box, VStack, Text, Button, Center, Pressable, Input, Heading, useToast } from '../../components/ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useAuthStore } from '../../store/authStore';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export function LoginScreen() {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const { login } = useAuthStore();
    const toast = useToast();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            toast.show({ description: 'Preencha todos os campos', variant: 'error' });
            return;
        }

        setIsLoading(true);
        try {
            await login(email, password);
        } catch (error: any) {
            toast.show({ description: error.message || 'Erro ao fazer login', variant: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#131F54' }}>
            <Box flex={1} bg="brand.500" px={6} py={10}>
                <VStack space={8} flex={1} justifyContent="center">
                    <Center>
                        <Heading color="white" size="2xl" fontWeight="bold">
                            Execut
                        </Heading>
                        <Text color="white" opacity={0.9} mt={2} textAlign="center">
                            Transforme seus objetivos em ação
                        </Text>
                    </Center>

                    <VStack space={4} bg="white" p={6} borderRadius="2xl">
                        <Heading size="lg" color="brand.600">
                            Login
                        </Heading>

                        <Input
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            size="lg"
                        />

                        <Input
                            placeholder="Senha"
                            value={password}
                            onChangeText={setPassword}
                            type="password"
                            size="lg"
                        />

                        <Button
                            onPress={handleLogin}
                            isLoading={isLoading}
                            size="lg"
                            bg="brand.500"
                            _pressed={{ bg: 'brand.600' }}
                        >
                            Entrar
                        </Button>

                        <Pressable onPress={() => navigation.navigate('SignUp')}>
                            <Text color="brand.600" textAlign="center">
                                Não tem conta? <Text fontWeight="bold">Cadastre-se</Text>
                            </Text>
                        </Pressable>
                    </VStack>
                </VStack>
            </Box>
        </SafeAreaView>
    );
}
