import React from 'react';
import { Box, VStack, HStack, Heading, Text, ScrollView, Pressable, Progress, Icon } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';

export function HomeScreen() {
    const { user } = useAuthStore();

    // Mock data - will be replaced with API calls
    const mockStats = {
        level: 1,
        xp: 150,
        xpToNext: 250,
        streak: 5,
        tasksToday: 3,
        tasksCompleted: 1,
    };

    const mockTasks = [
        { id: '1', title: 'Pesquisar 10 nichos de interesse', completed: true, xp: 10 },
        { id: '2', title: 'Analisar 3 concorrentes principais', completed: false, xp: 15 },
        { id: '3', title: 'Definir proposta de valor única', completed: false, xp: 20 },
    ];

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Bom dia';
        if (hour < 18) return 'Boa tarde';
        return 'Boa noite';
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFBFC' }}>
            <ScrollView flex={1} bg="background.secondary">
                {/* Header */}
                <Box px={5} pt={4} pb={6} bg="white">
                    <HStack justifyContent="space-between" alignItems="center">
                        <VStack>
                            <Text color="text.secondary" fontSize="sm">
                                {getGreeting()},
                            </Text>
                            <Heading size="lg" color="text.primary">
                                {user?.fullName?.split(' ')[0] || 'Empreendedor'}!
                            </Heading>
                        </VStack>

                        {/* Level Badge */}
                        <Box
                            bg="brand.500"
                            px={4}
                            py={2}
                            borderRadius="full"
                        >
                            <HStack space={2} alignItems="center">
                                <Icon as={Ionicons} name="star" color="yellow.400" size="sm" />
                                <Text color="white" fontWeight="bold">
                                    Nível {mockStats.level}
                                </Text>
                            </HStack>
                        </Box>
                    </HStack>

                    {/* XP Progress */}
                    <Box mt={4}>
                        <HStack justifyContent="space-between" mb={1}>
                            <Text fontSize="xs" color="text.secondary">
                                {mockStats.xp} / {mockStats.xpToNext} XP
                            </Text>
                            <HStack space={1} alignItems="center">
                                <Icon as={Ionicons} name="flame" color="orange.500" size="xs" />
                                <Text fontSize="xs" color="orange.500" fontWeight="bold">
                                    {mockStats.streak} dias
                                </Text>
                            </HStack>
                        </HStack>
                        <Progress
                            value={(mockStats.xp / mockStats.xpToNext) * 100}
                            colorScheme="amber"
                            bg="gray.200"
                        />
                    </Box>
                </Box>

                {/* Tasks Section */}
                <Box px={5} mt={4}>
                    <HStack justifyContent="space-between" alignItems="center" mb={3}>
                        <Heading size="md" color="text.primary">
                            Tarefas de Hoje
                        </Heading>
                        <Text color="brand.500" fontWeight="medium">
                            {mockStats.tasksCompleted}/{mockStats.tasksToday}
                        </Text>
                    </HStack>

                    <VStack space={3}>
                        {mockTasks.map((task) => (
                            <Pressable key={task.id}>
                                <Box
                                    bg="white"
                                    p={4}
                                    borderRadius="xl"
                                    borderWidth={task.completed ? 2 : 1}
                                    borderColor={task.completed ? 'success.primary' : 'border.default'}
                                >
                                    <HStack space={3} alignItems="center">
                                        <Box
                                            w={6}
                                            h={6}
                                            borderRadius="md"
                                            borderWidth={2}
                                            borderColor={task.completed ? 'success.primary' : 'gray.300'}
                                            bg={task.completed ? 'success.primary' : 'transparent'}
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            {task.completed && (
                                                <Icon as={Ionicons} name="checkmark" color="white" size="xs" />
                                            )}
                                        </Box>

                                        <VStack flex={1}>
                                            <Text
                                                color={task.completed ? 'text.tertiary' : 'text.primary'}
                                                strikeThrough={task.completed}
                                                fontWeight="medium"
                                            >
                                                {task.title}
                                            </Text>
                                        </VStack>

                                        <Box bg="amber.100" px={2} py={1} borderRadius="md">
                                            <Text fontSize="xs" color="amber.700" fontWeight="bold">
                                                +{task.xp} XP
                                            </Text>
                                        </Box>
                                    </HStack>
                                </Box>
                            </Pressable>
                        ))}
                    </VStack>
                </Box>

                {/* Quick Stats */}
                <Box px={5} mt={6} mb={8}>
                    <Heading size="md" color="text.primary" mb={3}>
                        Seu Progresso
                    </Heading>

                    <HStack space={3}>
                        <Box flex={1} bg="brand.50" p={4} borderRadius="xl" borderWidth={1} borderColor="brand.100">
                            <Icon as={Ionicons} name="checkmark-circle" color="brand.500" size="md" />
                            <Text color="brand.600" fontWeight="bold" fontSize="2xl" mt={2}>
                                {mockStats.tasksCompleted}
                            </Text>
                            <Text color="brand.500" fontSize="xs">
                                Tarefas hoje
                            </Text>
                        </Box>

                        <Box flex={1} bg="orange.50" p={4} borderRadius="xl" borderWidth={1} borderColor="orange.100">
                            <Icon as={Ionicons} name="flame" color="orange.500" size="md" />
                            <Text color="orange.600" fontWeight="bold" fontSize="2xl" mt={2}>
                                {mockStats.streak}
                            </Text>
                            <Text color="orange.500" fontSize="xs">
                                Dias de streak
                            </Text>
                        </Box>
                    </HStack>
                </Box>
            </ScrollView>
        </SafeAreaView>
    );
}
