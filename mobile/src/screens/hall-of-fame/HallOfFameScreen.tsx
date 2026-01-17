import React, { useState } from 'react';
import { Box, VStack, HStack, Text, ScrollView, Pressable } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { BellIcon } from '../../components/icons/NavIcons';
import { TopPodium, LeaderboardRow, CurrentUserCard } from '../../components/hall-of-fame';
import Svg, { Path } from 'react-native-svg';

// Trophy icon
const TrophyIcon = ({ color = '#33CFFF', size = 24 }: { color?: string; size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M8 21H16M12 17V21M6 4H18M6 4C6 4 4 4 4 6C4 8 4 10 6 10M6 4V10M18 4C18 4 20 4 20 6C20 8 20 10 18 10M18 4V10M6 10C6 10 6 14 12 17M6 10H18M18 10C18 10 18 14 12 17"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={color}
        />
    </Svg>
);

// Arrow down icon
const ArrowDownIcon = ({ color = '#33CFFF', size = 16 }: { color?: string; size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M6 9L12 15L18 9"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export function HallOfFameScreen() {
    const [showMore, setShowMore] = useState(false);

    // Mock data - will be replaced with API calls
    const mockTopUsers = [
        {
            id: '1',
            name: 'Matheus',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            level: 50,
            rank: 1 as const,
            title: 'ELITE LVL 50',
        },
        {
            id: '2',
            name: 'Lucas M.',
            avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
            level: 42,
            rank: 2 as const,
        },
        {
            id: '3',
            name: 'Márcio P.',
            avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
            level: 38,
            rank: 3 as const,
        },
    ];

    const mockLeaderboard = [
        {
            id: '4',
            rank: 4,
            name: 'Ricardo Silva',
            avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
            streakDays: 12,
            xp: 12450,
        },
        {
            id: '5',
            rank: 5,
            name: 'Ana Clara',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            streakDays: 8,
            xp: 12450,
        },
        {
            id: '6',
            rank: 6,
            name: 'Pedro Henrique',
            avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
            streakDays: 0,
            xp: 12450,
        },
        {
            id: '7',
            rank: 7,
            name: 'Juliana G.',
            avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
            streakDays: 24,
            xp: 12450,
        },
    ];

    const mockCurrentUser = {
        rank: 7,
        name: 'Você',
        avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
        streakDays: 24,
        xp: 12450,
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0D0D0D' }}>
            <StatusBar style="light" />

            {/* Header */}
            <HStack
                alignItems="center"
                justifyContent="space-between"
                px={4}
                py={3}
                w="100%"
            >
                {/* Trophy Icon */}
                <Box p={2}>
                    <TrophyIcon size={24} color="#33CFFF" />
                </Box>

                {/* Title */}
                <Text color="text.primary" fontSize="lg" fontWeight="semibold">
                    Hall da Fama
                </Text>

                {/* Bell Button */}
                <Pressable
                    onPress={() => console.log('Notifications pressed')}
                    p={2}
                    borderRadius="full"
                    _pressed={{ opacity: 0.7 }}
                >
                    <BellIcon size={24} color="#33CFFF" />
                </Pressable>
            </HStack>

            <ScrollView
                flex={1}
                bg="background.primary"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 140 }}
            >
                <VStack px={4} space={5}>
                    {/* Top 3 Podium */}
                    <Box mt={4}>
                        <TopPodium users={mockTopUsers} />
                    </Box>

                    {/* Leaderboard */}
                    <VStack space={3}>
                        {mockLeaderboard.map((user) => (
                            <LeaderboardRow
                                key={user.id}
                                user={user}
                                onPress={() => console.log(`User ${user.id} pressed`)}
                            />
                        ))}
                    </VStack>

                    {/* Ver mais button */}
                    <Pressable onPress={() => setShowMore(!showMore)}>
                        <HStack justifyContent="center" alignItems="center" space={1} py={2}>
                            <Text color="accent.400" fontSize="sm" fontWeight="medium">
                                Ver mais
                            </Text>
                            <ArrowDownIcon size={16} color="#33CFFF" />
                        </HStack>
                    </Pressable>
                </VStack>
            </ScrollView>

            {/* Current User Card - Sticky Bottom */}
            <Box
                position="absolute"
                bottom={80}
                left={0}
                right={0}
            >
                <CurrentUserCard
                    rank={mockCurrentUser.rank}
                    name={mockCurrentUser.name}
                    avatar={mockCurrentUser.avatar}
                    streakDays={mockCurrentUser.streakDays}
                    xp={mockCurrentUser.xp}
                />
            </Box>
        </SafeAreaView>
    );
}
