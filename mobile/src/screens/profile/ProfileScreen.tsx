import React, { useState } from 'react';
import { Box, VStack, HStack, Text, ScrollView, Pressable } from '../../components/ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BellIcon } from '../../components/icons/NavIcons';
import { MentalEdgeCard, HabitItem, BrainIcon, PuzzleIcon } from '../../components/mindset';
import { LogicIcon, MemoryIcon, FrameworksIcon, PracticeIcon } from '../../components/mindset/MindsetIcons';
import { ProfileStackParamList } from '../../navigation/MainNavigator';

type ProfileScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'ProfileMain'>;

export function ProfileScreen() {
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const [habits, setHabits] = useState([
        { id: '1', title: 'Dormir 6h 45m', completed: false, image: require('../../assets/images/habit/sleep.webp') },
        { id: '2', title: 'Correr 2km', completed: false, image: require('../../assets/images/habit/run.webp') },
        { id: '3', title: 'Beber 2L de água', completed: false, image: require('../../assets/images/habit/water.webp') },
        { id: '4', title: 'Ler 15 páginas de livro', completed: false, image: require('../../assets/images/habit/read.webp') },
    ]);

    const mockMentalCards = [
        {
            id: '1',
            title: 'Praticas de Mindset',
            subtitle: 'Modulo: Decision Velocity',
            status: 'active' as const,
            icon: <PracticeIcon />,
        },
        {
            id: '2',
            title: 'Frameworks Mentais',
            subtitle: undefined,
            status: 'available' as const,
            icon: <FrameworksIcon />,
        },
        {
            id: '3',
            title: 'Materialização',
            subtitle: undefined,
            status: 'locked' as const,
            unlockPoints: 3000,
            icon: <MemoryIcon />,
        },
        {
            id: '4',
            title: 'Lógica do sucesso',
            subtitle: undefined,
            status: 'locked' as const,
            unlockPoints: 10000,
            icon: <LogicIcon />,
        },
    ];

    const toggleHabit = (id: string) => {
        setHabits(prev =>
            prev.map(h => h.id === id ? { ...h, completed: !h.completed } : h)
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0D0D0D' }}>
            <StatusBar style="light" />

            <ScrollView
                flex={1}
                bg="background.primary"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <VStack px={4} space={5}>
                    {/* Header with Bell */}
                    <HStack justifyContent="space-between" alignItems="center" pt={2}>
                        <Text color="text.primary" fontSize="lg" fontWeight="semibold">
                            Mental Edge
                        </Text>
                        <HStack space={3} alignItems="center">
                            <Box
                                borderWidth={1}
                                borderColor="border.default"
                                borderRadius="full"
                                px={3}
                                py={1}
                            >
                                <Text color="text.tertiary" fontSize="xs">
                                    Foco da semana
                                </Text>
                            </Box>
                            <Pressable
                                onPress={() => navigation.navigate('Notifications')}
                                p={2}
                                borderRadius="full"
                                _pressed={{ opacity: 0.7 }}
                            >
                                <BellIcon size={24} color="#33CFFF" />
                            </Pressable>
                        </HStack>
                    </HStack>

                    {/* Mental Edge Cards */}
                    <VStack space={3}>
                        {mockMentalCards.map((card) => (
                            <MentalEdgeCard
                                key={card.id}
                                title={card.title}
                                subtitle={card.subtitle}
                                status={card.status}
                                icon={card.icon}
                                unlockPoints={card.unlockPoints}
                                onPress={() => {
                                    if (card.title === 'Praticas de Mindset') {
                                        navigation.navigate('MindsetIntro', { category: 'practices' });
                                    } else if (card.title === 'Frameworks Mentais') {
                                        navigation.navigate('MindsetIntro', { category: 'frameworks' });
                                    } else {
                                        console.log(`Card ${card.id} pressed`);
                                    }
                                }}
                            />
                        ))}
                    </VStack>

                    {/* Body Optimization Section */}
                    <VStack space={3}>
                        <Text color="text.primary" fontSize="lg" fontWeight="semibold">
                            Body Optimization
                        </Text>

                        {/* Habit Items */}
                        <VStack space={2}>
                            {habits.map((habit) => (
                                <HabitItem
                                    key={habit.id}
                                    title={habit.title}
                                    image={habit.image}
                                    isCompleted={habit.completed}
                                    onToggle={() => toggleHabit(habit.id)}
                                />
                            ))}
                        </VStack>
                    </VStack>
                </VStack>
            </ScrollView>
        </SafeAreaView>
    );
}
