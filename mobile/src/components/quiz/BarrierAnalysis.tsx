import React from 'react';
import { Box, Text, VStack, HStack, ScrollView } from '../ui';
import { Ionicons } from '@expo/vector-icons';

export const BarrierAnalysis: React.FC = () => {
    return (
        <VStack
            flex={1}
            w="100%"
            pt={15}
            pb={10}
            justifyContent="flex-start"
        >
            <VStack space={4} alignItems="center" w="100%">
                {/* Header Section */}
                <VStack alignItems="center" space={4}>
                    {/* Checkmark Circle */}
                    <Box
                        w={100}
                        h={100}
                        borderRadius={50}
                        borderWidth={2}
                        borderColor="#00C3FF"
                        alignItems="center"
                        justifyContent="center"
                        style={{
                            shadowColor: "#00C3FF",
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.5,
                            shadowRadius: 20,
                            elevation: 10
                        }}
                    >
                        <Ionicons name="checkmark" size={50} color="#00C3FF" />
                    </Box>

                    {/* Title */}
                    <VStack alignItems="center">
                        <Text color="#FFFFFF" fontSize="2xl" fontWeight="bold">
                            Mapeamento de
                        </Text>
                        <Text color="#00C3FF" fontSize="2xl" fontWeight="bold">
                            Barreiras Concluído
                        </Text>
                    </VStack>
                </VStack>

                {/* Main Insight Card */}
                <Box
                    w="100%"
                    bg="#0D0D0D"
                    borderRadius={24}
                    p={6}
                    borderWidth={1}
                    borderColor="#00C3FF"
                    style={{
                        shadowColor: "#00C3FF",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.2,
                        shadowRadius: 16,
                        elevation: 5
                    }}
                >
                    <HStack alignItems="center" space={2} mb={4}>
                        <Text color="#00C3FF" fontSize="5xl" fontWeight="bold">
                            92%
                        </Text>
                        <Text color="#6B7280" fontSize="lg" style={{ maxWidth: 120 }}>
                            Risco de Desistência
                        </Text>
                    </HStack>

                    <Box w="2px" h="40px" bg="#1A1A1A" position="absolute" left={6} top={100} />

                    <Text color="#6B7280" fontSize="sm" lineHeight={22}>
                        92% dos empreendedores desistem por causa dessas mesmas barreiras que você enfrenta agora. O sistema Execut foi desenhado para blindar sua mente contra a procastinação biológica.
                    </Text>
                </Box>

                {/* Metrics Row */}
                <HStack w="100%" mt={5} space={3}>
                    {/* Cognitive Load Card */}
                    <Box
                        flex={1}
                        bg="#1A1A1A"
                        borderRadius={16}
                        p={4}
                        borderWidth={1}
                        borderColor="#333"
                    >
                        <Text color="#9CA3AF" fontSize="xs" mb={3}>
                            Carga Cognitiva
                        </Text>

                        <Box w="100%" h={1} bg="#333" borderRadius={2} mb={2}>
                            <Box w="75%" h="100%" bg="#00C3FF" borderRadius={2} />
                        </Box>

                        <Text color="#FFFFFF" fontSize="sm" fontWeight="bold" textAlign="right">
                            75%
                        </Text>
                    </Box>

                    {/* Active Shielding Card */}
                    <Box
                        flex={1}
                        bg="#1A1A1A"
                        borderRadius={16}
                        p={4}
                        borderWidth={1}
                        borderColor="#333"
                    >
                        <Text color="#9CA3AF" fontSize="xs" mb={3}>
                            Blindagem Ativa
                        </Text>

                        <Box w="100%" h={1} bg="#333" borderRadius={2} mb={2}>
                            <Box w="40%" h="100%" bg="#00C3FF" borderRadius={2} />
                        </Box>

                        <Text color="#FFFFFF" fontSize="sm" fontWeight="bold" textAlign="right">
                            40%
                        </Text>
                    </Box>
                </HStack>
            </VStack>
        </VStack>
    );
};
