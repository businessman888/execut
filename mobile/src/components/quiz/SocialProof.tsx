import React from 'react';
import { Box, Text, VStack, HStack } from '../ui';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export const SocialProof: React.FC = () => {
    return (
        <VStack
            flex={1}
            w="100%"
            pt={15}
            pb={20}
            justifyContent="flex-start"
        >
            <VStack space={6} alignItems="center" w="100%">

                {/* Header Text */}
                <VStack alignItems="center" space={2} px={4}>
                    <HStack space={1} alignItems="center">
                        <Text color="#FFFFFF" fontSize="2xl" fontWeight="bold">
                            Você não está
                        </Text>
                        <Text color="#00C3FF" fontSize="2xl" fontWeight="bold">
                            sozinho
                        </Text>
                    </HStack>

                    <Text color="#9CA3AF" fontSize="sm" textAlign="center" lineHeight={20}>
                        Ao ativar seu plano, você entra no ranking dos{'\n'}
                        maiores executores do país. Ganhe XP{'\n'}
                        por cada meta batida e suba de nível.
                    </Text>
                </VStack>

                {/* Main Hall of Fame Card */}
                <Box
                    w="100%"
                    bg="#111111"
                    borderRadius={24}
                    p={6}
                    borderWidth={1}
                    borderColor="#222222"
                >
                    <HStack justifyContent="space-between" alignItems="center" mb={6}>
                        <Text color="#00C3FF" fontSize="xl" fontWeight="bold">
                            Hall da Fama
                        </Text>
                        {/* Medal icon replacement */}
                        <Box opacity={0.8}>
                            <Ionicons name="ribbon-sharp" size={40} color="#00C3FF" />
                        </Box>
                    </HStack>

                    <Box
                        bg="#080808"
                        borderRadius={16}
                        p={4}
                        borderWidth={1}
                        borderColor="#1A1A1A"
                    >
                        <HStack alignItems="center" justifyContent="space-between">
                            {/* Overlapping Avatars */}
                            <HStack space={-15} alignItems="center">
                                <Box w={10} h={10} borderRadius={20} bg="#333" borderWidth={2} borderColor="#080808" />
                                <Box w={10} h={10} borderRadius={20} bg="#555" borderWidth={2} borderColor="#080808" ml={-4} />
                                <Box
                                    w={10}
                                    h={10}
                                    borderRadius={20}
                                    bg="#00C3FF"
                                    borderWidth={2}
                                    borderColor="#080808"
                                    ml={-4}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Text color="#000000" fontSize="xs" fontWeight="bold">+12</Text>
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

                {/* Unified Ranking Container */}
                <Box
                    w="100%"
                    borderRadius={24}
                    borderWidth={1}
                    borderColor="#00C3FF"
                    overflow="hidden"
                >
                    {/* Executor Alpha */}
                    <Box p={4}>
                        <HStack alignItems="center" justifyContent="space-between">
                            <HStack space={4} alignItems="center">
                                <Box
                                    w={12}
                                    h={12}
                                    bg="#0D0D0D"
                                    borderRadius={8}
                                    alignItems="center"
                                    justifyContent="center"
                                    borderWidth={1}
                                    borderColor="#444444"
                                >
                                    <MaterialCommunityIcons name="wolf" size={24} color="#00C3FF" />
                                </Box>
                                <Text color="#FFFFFF" fontSize="md" fontWeight="bold">
                                    Executor Alpha
                                </Text>
                            </HStack>
                            <VStack alignItems="flex-end">
                                <Text color="#00C3FF" fontSize="md" fontWeight="bold">
                                    12.450
                                </Text>
                                <Text color="#6B7280" fontSize="xs">
                                    XP
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>

                    {/* Divider */}
                    <Box h="1px" bg="rgba(0, 195, 255, 0.2)" w="100%" />

                    {/* Executor Beta */}
                    <Box p={4}>
                        <HStack alignItems="center" justifyContent="space-between">
                            <HStack space={4} alignItems="center">
                                <Box
                                    w={12}
                                    h={12}
                                    bg="#1A1A1A"
                                    borderRadius={8}
                                    alignItems="center"
                                    justifyContent="center"
                                    borderWidth={1}
                                    borderColor="#333"
                                >
                                    <MaterialCommunityIcons name="cube-outline" size={24} color="#9CA3AF" />
                                </Box>
                                <Text color="#FFFFFF" fontSize="md" fontWeight="bold">
                                    Executor Beta
                                </Text>
                            </HStack>
                            <VStack alignItems="flex-end">
                                <Text color="#FFFFFF" fontSize="md" fontWeight="bold">
                                    10.200
                                </Text>
                                <Text color="#6B7280" fontSize="xs">
                                    XP
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>

                    {/* Divider */}
                    <Box h="1px" bg="rgba(0, 195, 255, 0.2)" w="100%" />

                    {/* Pending User */}
                    <Box p={4}>
                        <HStack alignItems="center" justifyContent="space-between">
                            <HStack space={4} alignItems="center">
                                <Box
                                    w={12}
                                    h={12}
                                    bg="transparent"
                                    borderRadius={8}
                                    alignItems="center"
                                    justifyContent="center"
                                    borderWidth={1}
                                    borderColor="#333"
                                    style={{ borderStyle: 'dashed' }}
                                >
                                    <Ionicons name="person" size={20} color="#6B7280" />
                                </Box>
                                <Text color="#9CA3AF" fontSize="md" fontWeight="bold">
                                    Você (Pendente)
                                </Text>
                            </HStack>
                            <VStack alignItems="flex-end">
                                <Text color="#6B7280" fontSize="md" fontWeight="bold">
                                    - - -
                                </Text>
                                <Text color="#6B7280" fontSize="xs">
                                    XP
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>
                </Box>

            </VStack>
        </VStack>
    );
};
