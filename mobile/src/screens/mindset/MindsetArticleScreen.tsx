import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { VStack, Text, Box, ScrollView, Pressable, HStack } from '../../components/ui';
import { ProfileStackParamList } from '../../navigation/MainNavigator';

type MindsetArticleScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'MindsetArticle'>;

export function MindsetArticleScreen() {
    const navigation = useNavigation<MindsetArticleScreenNavigationProp>();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
            <VStack flex={1}>
                {/* Header */}
                <HStack alignItems="center" px={4} py={4} space={4}>
                    <Pressable onPress={() => navigation.navigate('ProfileMain')} p={2}>
                        <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
                    </Pressable>
                    <Text color="#FFFFFF" fontSize="lg" fontWeight="semibold">
                        Artigo de Performance
                    </Text>
                </HStack>

                {/* Content */}
                <ScrollView flex={1} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}>
                    <VStack space={6} mt={2}>
                        {/* Main Title */}
                        <Text color="#FFFFFF" fontSize="xl" fontWeight="bold" lineHeight={32}>
                            A Matemática dos Resultados: O Ciclo de Feedback Cognitivo
                        </Text>

                        {/* Section I */}
                        <VStack space={2}>
                            <Text color="#00C3FF" fontSize="lg" fontWeight="bold">
                                I. A Origem: O Frame de Pensamento
                            </Text>
                            <Text color="#FFFFFF" fontSize="md" lineHeight={24}>
                                Seus pensamentos não são "sentimentos", são comandos químicos. Quando você aceita uma barreira mental, o seu cérebro prioriza a economia de energia (procrastinação biológica). O pensamento é o input do sistema. Se o input é ruidoso ou fraco, o processamento será falho.
                            </Text>
                        </VStack>

                        {/* Section II */}
                        <VStack space={2}>
                            <Text color="#00C3FF" fontSize="lg" fontWeight="bold">
                                II. A Transmissão: Pensamentos criam Ações
                            </Text>
                            <Text color="#FFFFFF" fontSize="md" lineHeight={24}>
                                A ação é o processamento físico do pensamento. Um cérebro focado em "92% de risco de desistência" gera ações de fuga. Para mudar a ação, você não muda a vontade, você muda o dado de entrada (o pensamento lógico). Ações consistentes são subprodutos de pensamentos blindados.
                            </Text>
                        </VStack>

                        {/* Section III */}
                        <VStack space={2}>
                            <Text color="#00C3FF" fontSize="lg" fontWeight="bold">
                                III. O Output: Ações criam Resultados
                            </Text>
                            <Text color="#FFFFFF" fontSize="md" lineHeight={24}>
                                Resultados são apenas dados. Eles não definem quem você é, eles apenas mostram se a sua execução foi eficiente. Se o resultado é negativo, o erro está na ação ou no pensamento inicial. Não há espaço para frustração, apenas para recalibragem lógica do sistema. {'\n'}
                                <Text fontWeight="bold">Pensamentos criam ações, ações criam resultados, se falhar na mente o resultado é comprometido.</Text>
                            </Text>
                        </VStack>

                        {/* Section IV */}
                        <VStack space={2}>
                            <Text color="#00C3FF" fontSize="lg" fontWeight="bold">
                                IV. O Hack de Execução
                            </Text>
                            <VStack space={2} pl={2}>
                                <HStack space={2} alignItems="flex-start">
                                    <Box mt={1.5} w={1.5} h={1.5} borderRadius="full" bg="#00C3FF" />
                                    <Text color="#FFFFFF" fontSize="md" lineHeight={24}>
                                        Identifique o pensamento limitante (Bug).
                                    </Text>
                                </HStack>
                                <HStack space={2} alignItems="flex-start">
                                    <Box mt={1.5} w={1.5} h={1.5} borderRadius="full" bg="#00C3FF" />
                                    <Text color="#FFFFFF" fontSize="md" lineHeight={24}>
                                        Substitua pelo comando de ação imediata (Patch).
                                    </Text>
                                </HStack>
                                <HStack space={2} alignItems="flex-start">
                                    <Box mt={1.5} w={1.5} h={1.5} borderRadius="full" bg="#00C3FF" />
                                    <Text color="#FFFFFF" fontSize="md" lineHeight={24}>
                                        Analise o resultado sem viés emocional (Data Analysis).
                                    </Text>
                                </HStack>
                            </VStack>
                        </VStack>
                    </VStack>
                </ScrollView>
            </VStack>
        </SafeAreaView>
    );
}
