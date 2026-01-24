import React from 'react';
import { Box, Text, VStack, HStack } from '../ui';

export const FreedomPath: React.FC = () => {
    return (
        <VStack
            flex={1}
            w="100%"
            pt={15}
            pb={20}
            justifyContent="flex-start"
        >
            <VStack space={10} alignItems="center" w="100%">

                {/* Header Section */}
                <VStack alignItems="center" space={2}>
                    <Text color="#FFFFFF" fontSize="4xl" fontWeight="bold">
                        Caminho para a
                    </Text>
                    <Text color="#00C3FF" fontSize="4xl" fontWeight="bold">
                        Liberdade
                    </Text>
                </VStack>

                {/* Path Visualization */}
                <VStack w="100%" space={4} px={2} mt={4}>
                    <HStack w="100%" alignItems="center" position="relative" h={40}>
                        {/* The horizontal line */}
                        <Box h="2px" bg="#1A1A1A" w="100%" position="absolute" top={20} />
                        <Box h="2px" bg="#00C3FF" w="100%" position="absolute" top={20} />

                        {/* Checkpoints */}
                        <HStack w="100%" justifyContent="space-between">
                            <Box w={4} h={4} borderRadius={8} bg="#00C3FF" zIndex={1} />
                            <Box w={4} h={4} borderRadius={8} bg="#00C3FF" zIndex={1} />
                        </HStack>
                    </HStack>

                    <HStack w="100%" justifyContent="space-between">
                        <VStack>
                            <Text color="#6B7280" fontSize="xs">Estado 01</Text>
                            <Text color="#FFFFFF" fontSize="sm" fontWeight="bold">Caos Atual</Text>
                        </VStack>
                        <VStack alignItems="flex-end">
                            <Text color="#6B7280" fontSize="xs" textAlign="right">Estado 05</Text>
                            <Text color="#FFFFFF" fontSize="sm" fontWeight="bold" textAlign="right">
                                Liberdade{'\n'}Geográfica
                            </Text>
                        </VStack>
                    </HStack>
                </VStack>

                {/* Insight Description */}
                <HStack space={4} px={4} mt={4}>
                    <Box w="1px" h="100%" bg="#00C3FF" opacity={0.5} />
                    <Text color="#9CA3AF" fontSize="md" lineHeight={24} style={{ flex: 1 }}>
                        Cada tarefa no app é um degrau calculado para atingir sua visão de 5 anos. Transformando seus sonhos em um plano de ação matemático.
                    </Text>
                </HStack>

                {/* Metrics Cards */}
                <HStack space={4} w="100%" mt={4}>
                    {/* Route Precision Card */}
                    <Box
                        flex={1}
                        bg="#111111"
                        borderRadius={16}
                        p={5}
                        borderWidth={1}
                        borderColor="#222222"
                    >
                        <Text color="#6B7280" fontSize="xs" mb={4}>
                            Precisão de Rota
                        </Text>
                        <Text color="#FFFFFF" fontSize="3xl" fontWeight="bold">
                            99.8%
                        </Text>
                    </Box>

                    {/* Risk Factor Card */}
                    <Box
                        flex={1}
                        bg="#111111"
                        borderRadius={16}
                        p={5}
                        borderWidth={1}
                        borderColor="#222222"
                    >
                        <Text color="#6B7280" fontSize="xs" mb={4}>
                            Fator de Risco
                        </Text>
                        <Text color="#FFFFFF" fontSize="3xl" fontWeight="bold">
                            Mínimo
                        </Text>
                    </Box>
                </HStack>

            </VStack>
        </VStack>
    );
};
