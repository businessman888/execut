import React, { useState } from 'react';
import { Box, VStack, HStack, Text, ScrollView, Pressable } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BellIcon } from '../../components/icons/NavIcons';
import { MindsetHeader, MentalEdgeCard, HabitItem, BrainIcon, PuzzleIcon } from '../../components/mindset';
import { ProfileStackParamList } from '../../navigation/MainNavigator';

type ProfileScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'ProfileMain'>;

export function ProfileScreen() {
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const [habits, setHabits] = useState([
        { id: '1', title: 'Dormir 6h 45m', completed: false, image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400' },
        { id: '2', title: 'Correr 2km', completed: false, image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400' },
        { id: '3', title: 'Beber 2L de água', completed: false, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400' },
        { id: '4', title: 'Ler 15 páginas de livro', completed: false, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400' },
    ]);

    // Mock data
    const mockHeader = {
        avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
        status: 'Status',
        level: 5,
        title: 'Founder',
        currentXP: 1250,
        maxXP: 2000,
    };

    const mockMentalCards = [
        {
            id: '1',
            title: 'Praticas de Mindset',
            subtitle: 'Modulo: Decision Velocity',
            status: 'active' as const,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        },
        {
            id: '2',
            title: 'Frameworks Mentais',
            subtitle: undefined,
            status: 'available' as const,
            icon: <PuzzleIcon size={32} color="#9CA3AF" />,
        },
        {
            id: '3',
            title: 'Materialização',
            subtitle: undefined,
            status: 'locked' as const,
            unlockPoints: 3000,
            image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400',
        },
        {
            id: '4',
            title: 'Lógica do sucesso',
            subtitle: undefined,
            status: 'locked' as const,
            unlockPoints: 10000,
            image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
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
                    <HStack justifyContent="flex-end" pt={2}>
                        <Pressable
                            onPress={() => console.log('Notifications pressed')}
                            p={2}
                            borderRadius="full"
                            _pressed={{ opacity: 0.7 }}
                        >
                            <BellIcon size={24} color="#33CFFF" />
                        </Pressable>
                    </HStack>

                    {/* Mindset Header */}
                    <MindsetHeader
                        avatar={mockHeader.avatar}
                        status={mockHeader.status}
                        level={mockHeader.level}
                        title={mockHeader.title}
                        currentXP={mockHeader.currentXP}
                        maxXP={mockHeader.maxXP}
                        onAvatarPress={() => navigation.navigate('UserProfile')}
                    />

                    {/* Mental Edge Section */}
                    <VStack space={3}>
                        <HStack justifyContent="space-between" alignItems="center">
                            <Text color="text.primary" fontSize="lg" fontWeight="semibold">
                                Mental Edge
                            </Text>
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
                        </HStack>

                        {/* Mental Edge Cards */}
                        <VStack space={3}>
                            {mockMentalCards.map((card) => (
                                <MentalEdgeCard
                                    key={card.id}
                                    title={card.title}
                                    subtitle={card.subtitle}
                                    status={card.status}
                                    image={card.image}
                                    icon={card.icon}
                                    unlockPoints={card.unlockPoints}
                                    onPress={() => console.log(`Card ${card.id} pressed`)}
                                />
                            ))}
                        </VStack>
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
