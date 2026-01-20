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
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.16603 2.62103V3.47903C4.1307 3.6277 3.10703 3.8087 2.09503 4.02203C1.90564 4.06216 1.7391 4.17397 1.63026 4.33407C1.52141 4.49417 1.47869 4.69016 1.51103 4.88103C1.7631 6.36527 2.50414 7.72265 3.61631 8.73734C4.72848 9.75203 6.14795 10.3658 7.64903 10.481C8.44749 11.135 9.38623 11.5956 10.392 11.827C10.2968 12.9621 9.91372 14.0542 9.27903 15H8.54003C7.50403 15 6.66503 15.84 6.66503 16.875V19.5H5.91503C5.31829 19.5 4.746 19.7371 4.32404 20.159C3.90208 20.581 3.66503 21.1533 3.66503 21.75C3.66503 22.164 4.00103 22.5 4.41503 22.5H19.415C19.6139 22.5 19.8047 22.421 19.9454 22.2804C20.086 22.1397 20.165 21.9489 20.165 21.75C20.165 21.1533 19.928 20.581 19.506 20.159C19.0841 19.7371 18.5118 19.5 17.915 19.5H17.165V16.875C17.165 15.839 16.325 15 15.29 15H14.551C13.9167 14.0541 13.534 12.962 13.439 11.827C14.4449 11.5953 15.3837 11.1343 16.182 10.48C17.6833 10.365 19.103 9.75134 20.2154 8.73663C21.3277 7.72192 22.0689 6.36443 22.321 4.88003C22.3531 4.68917 22.3101 4.49331 22.201 4.33341C22.092 4.17351 21.9254 4.06194 21.736 4.02203C20.719 3.80713 19.6951 3.62603 18.666 3.47903V2.62003C18.665 2.43711 18.599 2.26052 18.4778 2.1235C18.3567 1.98648 18.1896 1.89847 18.008 1.87603C15.9868 1.62385 13.9519 1.49794 11.915 1.49903C9.85103 1.50036 7.82003 1.62603 5.82203 1.87603C5.64067 1.89869 5.47383 1.9868 5.35285 2.1238C5.23187 2.2608 5.16508 2.43726 5.16503 2.62003M5.16503 5.24903C5.16503 6.44503 5.47703 7.56903 6.02203 8.54303C5.34652 8.2397 4.74251 7.79743 4.24938 7.24502C3.75625 6.69262 3.38507 6.0425 3.16003 5.33703C3.82609 5.20792 4.49492 5.09356 5.16603 4.99403L5.16503 5.24903ZM18.665 5.24903V4.99303C19.339 5.09303 20.0077 5.20736 20.671 5.33603C20.446 6.04177 20.0747 6.69215 19.5814 7.24474C19.0881 7.79733 18.4838 8.23971 17.808 8.54303C18.3725 7.53711 18.6677 6.4025 18.665 5.24903Z"
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
