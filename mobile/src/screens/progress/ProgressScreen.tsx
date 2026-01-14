import React from 'react';
import { Box, VStack, HStack, Heading, Text, ScrollView, Center, Icon } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export function ProgressScreen() {
    const mockProgress = {
        level: 1,
        totalXp: 150,
        tasksCompleted: 12,
        streak: 5,
        weeklyCompletion: [80, 65, 90, 45],
        achievements: [
            { id: '1', title: 'Primeiro Passo', icon: 'footsteps', unlocked: true },
            { id: '2', title: 'Guerreiro Semanal', icon: 'shield', unlocked: true },
            { id: '3', title: 'Mestre do Mês', icon: 'trophy', unlocked: false },
        ],
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFBFC' }}>
            <ScrollView flex={1} bg="background.secondary">
                <Box px={5} pt={4} pb={6}>
                    <Heading size="xl" color="text.primary">
                        Seu Progresso
                    </Heading>
                    <Text color="text.secondary" mt={1}>
                        Acompanhe sua evolução
                    </Text>
                </Box>

                {/* Stats Cards */}
                <HStack space={3} px={5}>
                    <Box flex={1} bg="brand.500" p={4} borderRadius="xl">
                        <Center>
                            <Icon as={Ionicons} name="star" color="yellow.400" size="lg" />
                            <Text color="white" fontWeight="bold" fontSize="3xl" mt={2}>
                                {mockProgress.level}
                            </Text>
                            <Text color="brand.100" fontSize="xs">
                                Nível
                            </Text>
                        </Center>
                    </Box>

                    <Box flex={1} bg="amber.500" p={4} borderRadius="xl">
                        <Center>
                            <Icon as={Ionicons} name="flash" color="white" size="lg" />
                            <Text color="white" fontWeight="bold" fontSize="3xl" mt={2}>
                                {mockProgress.totalXp}
                            </Text>
                            <Text color="amber.100" fontSize="xs">
                                XP Total
                            </Text>
                        </Center>
                    </Box>

                    <Box flex={1} bg="green.500" p={4} borderRadius="xl">
                        <Center>
                            <Icon as={Ionicons} name="checkmark-circle" color="white" size="lg" />
                            <Text color="white" fontWeight="bold" fontSize="3xl" mt={2}>
                                {mockProgress.tasksCompleted}
                            </Text>
                            <Text color="green.100" fontSize="xs">
                                Tarefas
                            </Text>
                        </Center>
                    </Box>
                </HStack>

                {/* Weekly Performance */}
                <Box px={5} mt={6}>
                    <Heading size="md" color="text.primary" mb={4}>
                        Últimas 4 Semanas
                    </Heading>

                    <HStack space={3} justifyContent="space-between">
                        {mockProgress.weeklyCompletion.map((value, index) => (
                            <VStack key={index} flex={1} alignItems="center">
                                <Box
                                    bg="gray.200"
                                    w="100%"
                                    h={120}
                                    borderRadius="lg"
                                    justifyContent="flex-end"
                                    overflow="hidden"
                                >
                                    <Box
                                        bg={value >= 80 ? 'success.primary' : value >= 50 ? 'warning.primary' : 'error.primary'}
                                        h={`${value}%`}
                                        borderRadius="lg"
                                    />
                                </Box>
                                <Text color="text.secondary" fontSize="xs" mt={2}>
                                    Sem {index + 1}
                                </Text>
                                <Text color="text.primary" fontWeight="bold" fontSize="sm">
                                    {value}%
                                </Text>
                            </VStack>
                        ))}
                    </HStack>
                </Box>

                {/* Achievements */}
                <Box px={5} mt={6} mb={8}>
                    <HStack justifyContent="space-between" alignItems="center" mb={4}>
                        <Heading size="md" color="text.primary">
                            Conquistas
                        </Heading>
                        <Text color="brand.500" fontWeight="medium">
                            Ver todas
                        </Text>
                    </HStack>

                    <HStack space={4}>
                        {mockProgress.achievements.map((achievement) => (
                            <VStack key={achievement.id} alignItems="center" flex={1}>
                                <Box
                                    w={16}
                                    h={16}
                                    borderRadius="full"
                                    bg={achievement.unlocked ? 'brand.500' : 'gray.200'}
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Icon
                                        as={Ionicons}
                                        name={achievement.icon as any}
                                        color={achievement.unlocked ? 'white' : 'gray.400'}
                                        size="lg"
                                    />
                                </Box>
                                <Text
                                    color={achievement.unlocked ? 'text.primary' : 'text.tertiary'}
                                    fontSize="xs"
                                    textAlign="center"
                                    mt={2}
                                >
                                    {achievement.title}
                                </Text>
                            </VStack>
                        ))}
                    </HStack>
                </Box>
            </ScrollView>
        </SafeAreaView>
    );
}
