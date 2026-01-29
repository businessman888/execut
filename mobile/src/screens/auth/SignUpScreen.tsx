import React, { useState } from 'react';
import { Box, VStack, Text, Button, Center, Pressable, Input, Heading, useToast } from '../../components/ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useAuthStore } from '../../store/authStore';

type SignUpScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'SignUp'>;

export function SignUpScreen() {
    const navigation = useNavigation<SignUpScreenNavigationProp>();
    const { signUp } = useAuthStore();
    const toast = useToast();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = async () => {
        if (!fullName || !email || !password) {
            toast.show({ description: 'Preencha todos os campos', variant: 'error' });
            return;
        }

        if (password.length < 8) {
            toast.show({ description: 'Senha deve ter no mínimo 8 caracteres', variant: 'error' });
            return;
        }

        setIsLoading(true);
        try {
            await signUp(email, password, fullName);
            navigation.navigate('OnboardingQuiz');
        } catch (error: any) {
            toast.show({ description: error.message || 'Erro ao criar conta', variant: 'error' });
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
                            Criar Conta
                        </Heading>
                        <Text color="white" opacity={0.9} mt={2} textAlign="center">
                            Comece sua jornada de sucesso
                        </Text>
                    </Center>

                    <VStack space={4} bg="white" p={6} borderRadius="2xl">
                        <Input
                            placeholder="Nome completo"
                            value={fullName}
                            onChangeText={setFullName}
                            size="lg"
                        />

                        <Input
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            size="lg"
                        />

                        <Input
                            placeholder="Senha (mínimo 8 caracteres)"
                            value={password}
                            onChangeText={setPassword}
                            type="password"
                            size="lg"
                        />

                        <Button
                            onPress={handleSignUp}
                            isLoading={isLoading}
                            size="lg"
                            bg="brand.500"
                            _pressed={{ bg: 'brand.600' }}
                        >
                            Criar Conta
                        </Button>

                        <Pressable onPress={() => navigation.navigate('Login')}>
                            <Text color="brand.600" textAlign="center">
                                Já tem conta? <Text fontWeight="bold">Fazer login</Text>
                            </Text>
                        </Pressable>
                    </VStack>
                </VStack>
            </Box>
        </SafeAreaView>
    );
}
