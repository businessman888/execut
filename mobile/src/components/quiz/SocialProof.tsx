import React from 'react';
import { Box, Text, VStack, HStack, ScrollView } from '../ui';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Path, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Image } from 'react-native';

// Trophy Icon Component
const TrophyIcon = ({ size = 40 }: { size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 40 40">
        <Defs>
            <LinearGradient id="trophyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#00C3FF" />
                <Stop offset="100%" stopColor="#0088AA" />
            </LinearGradient>
        </Defs>
        {/* Trophy cup */}
        <Path
            d="M12 8h16v4c0 6-3 10-8 12-5-2-8-6-8-12V8z"
            fill="url(#trophyGrad)"
        />
        {/* Trophy handles */}
        <Path
            d="M12 10H8c0 4 2 6 4 6v-6zM28 10h4c0 4-2 6-4 6v-6z"
            fill="url(#trophyGrad)"
            opacity={0.8}
        />
        {/* Trophy base */}
        <Rect x="16" y="24" width="8" height="4" fill="url(#trophyGrad)" />
        <Rect x="13" y="28" width="14" height="4" rx="2" fill="url(#trophyGrad)" />
    </Svg>
);

// Avatar component for member icons (circular with person icon or mascot)
const MemberAvatar = ({ variant, showBadge, badgeText }: { variant: 'mascot' | 'person'; showBadge?: boolean; badgeText?: string }) => (
    <Box
        w={10}
        h={10}
        borderRadius={20}
        bg={showBadge ? '#00C3FF' : '#1A1A1A'}
        borderWidth={2}
        borderColor="#0A0A0A"
        alignItems="center"
        justifyContent="center"
    >
        {showBadge ? (
            <Text color="#000000" fontSize={10} fontWeight="bold">{badgeText}</Text>
        ) : variant === 'mascot' ? (
            <MaterialCommunityIcons name="robot" size={20} color="#00C3FF" />
        ) : (
            <Ionicons name="person" size={18} color="#6B7280" />
        )}
    </Box>
);

export const SocialProof: React.FC = () => {
    return (
        <ScrollView
            flex={1}
            w="100%"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        >
            <VStack flex={1} space={0} alignItems="center" w="100%">
                {/* Header Text */}
                <VStack alignItems="center" space={2} px={4} mt={4} mb={6}>
                    <HStack space={1} alignItems="center">
                        <Text color="#FFFFFF" fontSize={22} fontWeight="500">
                            Você não está
                        </Text>
                        <Text color="#00C3FF" fontSize={22} fontWeight="500">
                            sozinho
                        </Text>
                    </HStack>

                    <Text color="#9CA3AF" fontSize="sm" textAlign="center" lineHeight={20}>
                        Ao ativar seu plano, você entra no ranking{'\n'}
                        dos maiores executores do país. Ganhe XP{'\n'}
                        por cada meta batida e suba de nível.
                    </Text>
                </VStack>

                {/* Hall da Fama Card */}
                <Box
                    w="100%"
                    bg="#111111"
                    borderRadius={20}
                    p={5}
                    borderWidth={1}
                    borderColor="#222222"
                    mb={4}
                >
                    {/* Card Header */}
                    <HStack justifyContent="space-between" alignItems="center" mb={5}>
                        <Text color="#FFFFFF" fontSize="lg" fontWeight="bold">
                            Hall da Fama
                        </Text>
                        <TrophyIcon size={36} />
                    </HStack>

                    {/* Members Count Box */}
                    <Box
                        bg="#0A0A0A"
                        borderRadius={16}
                        p={4}
                        borderWidth={1}
                        borderColor="#1A1A1A"
                    >
                        <HStack alignItems="center" justifyContent="space-between">
                            {/* Overlapping Member Avatars - circular people icons */}
                            <HStack alignItems="center">
                                <Box
                                    w={10}
                                    h={10}
                                    borderRadius={20}
                                    bg="#1A1A1A"
                                    borderWidth={2}
                                    borderColor="#0A0A0A"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <MaterialCommunityIcons name="robot" size={22} color="#00C3FF" />
                                </Box>
                                <Box
                                    w={10}
                                    h={10}
                                    borderRadius={20}
                                    bg="#1A1A1A"
                                    borderWidth={2}
                                    borderColor="#0A0A0A"
                                    alignItems="center"
                                    justifyContent="center"
                                    ml={-4}
                                >
                                    <MaterialCommunityIcons name="robot" size={22} color="#00C3FF" />
                                </Box>
                                <Box
                                    w={10}
                                    h={10}
                                    borderRadius={20}
                                    bg="#00C3FF"
                                    borderWidth={2}
                                    borderColor="#0A0A0A"
                                    alignItems="center"
                                    justifyContent="center"
                                    ml={-4}
                                >
                                    <Text color="#000000" fontSize={10} fontWeight="bold">+12</Text>
                                </Box>
                            </HStack>

                            <VStack alignItems="flex-end">
                                <Text color="#FFFFFF" fontSize="xl" fontWeight="bold">
                                    +12.400
                                </Text>
                                <Text color="#6B7280" fontSize="xs">
                                    Membros Ativos
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>
                </Box>

                {/* Ranking List */}
                <Box
                    w="100%"
                    borderRadius={20}
                    borderWidth={1}
                    borderColor="#00C3FF"
                    overflow="hidden"
                    bg="#0D0D0D"
                >
                    {/* Executor Alpha - Wolf Icon */}
                    <Box p={4} bg="#0D0D0D">
                        <HStack alignItems="center" justifyContent="space-between">
                            <HStack space={3} alignItems="center">
                                <Box
                                    w={12}
                                    h={12}
                                    bg="#1A1A1A"
                                    borderRadius={10}
                                    alignItems="center"
                                    justifyContent="center"
                                    borderWidth={1}
                                    borderColor="#333"
                                >
                                    <MaterialCommunityIcons name="wolf" size={28} color="#00C3FF" />
                                </Box>
                                <Text color="#FFFFFF" fontSize="md" fontWeight="600">
                                    Executor Alpha
                                </Text>
                            </HStack>
                            <VStack alignItems="flex-end">
                                <Text color="#00C3FF" fontSize="md" fontWeight="bold">
                                    12.450
                                </Text>
                                <Text color="#6B7280" fontSize={10}>
                                    XP
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>

                    {/* Divider */}
                    <Box h={1} bg="rgba(0, 195, 255, 0.15)" w="100%" />

                    {/* Executor Beta - 3D Cube Icon */}
                    <Box p={4} bg="#0D0D0D">
                        <HStack alignItems="center" justifyContent="space-between">
                            <HStack space={3} alignItems="center">
                                <Box
                                    w={12}
                                    h={12}
                                    bg="#1A1A1A"
                                    borderRadius={10}
                                    alignItems="center"
                                    justifyContent="center"
                                    borderWidth={1}
                                    borderColor="#333"
                                >
                                    <MaterialCommunityIcons name="cube-outline" size={28} color="#6B7280" />
                                </Box>
                                <Text color="#FFFFFF" fontSize="md" fontWeight="600">
                                    Executor Beta
                                </Text>
                            </HStack>
                            <VStack alignItems="flex-end">
                                <Text color="#FFFFFF" fontSize="md" fontWeight="bold">
                                    10.200
                                </Text>
                                <Text color="#6B7280" fontSize={10}>
                                    XP
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>

                    {/* Divider */}
                    <Box h={1} bg="rgba(0, 195, 255, 0.15)" w="100%" />

                    {/* Você (Pendente) - Profile Icon */}
                    <Box p={4} bg="#0D0D0D">
                        <HStack alignItems="center" justifyContent="space-between">
                            <HStack space={3} alignItems="center">
                                <Box
                                    w={12}
                                    h={12}
                                    bg="transparent"
                                    borderRadius={10}
                                    alignItems="center"
                                    justifyContent="center"
                                    borderWidth={1}
                                    borderColor="#444"
                                    style={{ borderStyle: 'dashed' }}
                                >
                                    <Ionicons name="person" size={22} color="#6B7280" />
                                </Box>
                                <Text color="#6B7280" fontSize="md" fontWeight="600">
                                    Você (Pendente)
                                </Text>
                            </HStack>
                            <VStack alignItems="flex-end">
                                <Text color="#6B7280" fontSize="md" fontWeight="bold">
                                    ---
                                </Text>
                                <Text color="#6B7280" fontSize={10}>
                                    XP
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>
                </Box>

            </VStack>
        </ScrollView>
    );
};
