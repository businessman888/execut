import React from 'react';
import { Box, VStack, Heading, Text, ScrollView, Pressable, Icon, HStack } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export function GoalsScreen() {
    const mockYearlyGoals = [
        { year: 1, title: 'Fundação e Validação', target: 'R$ 5.000/mês', progress: 25, current: true },
        { year: 2, title: 'Crescimento Inicial', target: 'R$ 15.000/mês', progress: 0 },
        { year: 3, title: 'Escala', target: 'R$ 30.000/mês', progress: 0 },
        { year: 4, title: 'Consolidação', target: 'R$ 40.000/mês', progress: 0 },
        { year: 5, title: 'Liderança', target: 'R$ 50.000/mês', progress: 0 },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFBFC' }}>
            <ScrollView flex={1} bg="background.secondary">
                <Box px={5} pt={4} pb={6}>
                    <Heading size="xl" color="text.primary">
                        Seu Plano de 5 Anos
                    </Heading>
                    <Text color="text.secondary" mt={1}>
                        Acompanhe sua evolução rumo ao sucesso
                    </Text>
                </Box>

                <VStack space={4} px={5} mb={8}>
                    {mockYearlyGoals.map((goal) => (
                        <Pressable key={goal.year}>
                            <Box
                                bg={goal.current ? 'brand.500' : 'white'}
                                p={5}
                                borderRadius="2xl"
                                borderWidth={goal.current ? 0 : 1}
                                borderColor="border.default"
                            >
                                <HStack justifyContent="space-between" alignItems="center">
                                    <VStack flex={1}>
                                        <HStack space={2} alignItems="center">
                                            <Box
                                                bg={goal.current ? 'white' : 'brand.100'}
                                                px={3}
                                                py={1}
                                                borderRadius="full"
                                            >
                                                <Text
                                                    color={goal.current ? 'brand.500' : 'brand.600'}
                                                    fontWeight="bold"
                                                    fontSize="xs"
                                                >
                                                    ANO {goal.year}
                                                </Text>
                                            </Box>
                                            {goal.current && (
                                                <Text color="white" fontSize="xs" opacity={0.8}>
                                                    • Você está aqui
                                                </Text>
                                            )}
                                        </HStack>

                                        <Heading
                                            size="md"
                                            color={goal.current ? 'white' : 'text.primary'}
                                            mt={2}
                                        >
                                            {goal.title}
                                        </Heading>
                                        <Text
                                            color={goal.current ? 'brand.100' : 'text.secondary'}
                                            fontSize="sm"
                                            mt={1}
                                        >
                                            Meta: {goal.target}
                                        </Text>
                                    </VStack>

                                    <Icon
                                        as={Ionicons}
                                        name="chevron-forward"
                                        color={goal.current ? 'white' : 'gray.400'}
                                        size="md"
                                    />
                                </HStack>

                                {goal.current && goal.progress > 0 && (
                                    <Box mt={4}>
                                        <HStack justifyContent="space-between" mb={1}>
                                            <Text color="white" fontSize="xs" opacity={0.8}>
                                                Progresso
                                            </Text>
                                            <Text color="white" fontSize="xs" fontWeight="bold">
                                                {goal.progress}%
                                            </Text>
                                        </HStack>
                                        <Box bg="brand.400" h={2} borderRadius="full">
                                            <Box
                                                bg="white"
                                                h={2}
                                                borderRadius="full"
                                                w={`${goal.progress}%`}
                                            />
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        </Pressable>
                    ))}
                </VStack>
            </ScrollView>
        </SafeAreaView>
    );
}
