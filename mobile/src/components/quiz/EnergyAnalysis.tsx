import React from 'react';
import { Box, Text, VStack, HStack, ScrollView } from '../ui';
import { Ionicons } from '@expo/vector-icons';

interface BenefitItem {
    text: string;
}

const BENEFITS: BenefitItem[] = [
    { text: 'Fim das tarefas inúteis' },
    { text: 'Priorização Automática' },
    { text: 'Foco Laser' },
];

export const EnergyAnalysis: React.FC = () => {
    return (
        <ScrollView
            flex={1}
            w="100%"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        >
            <VStack flex={1} space={0} alignItems="center" w="100%">
                {/* Title Section - included in scroll */}
                <VStack space={0} alignItems="center" mt={4} mb={6}>
                    <Text color="#FFFFFF" fontSize={22} fontWeight="500" textAlign="center">
                        Análise de fuga
                    </Text>
                    <Text color="#00C3FF" fontSize={22} fontWeight="500" textAlign="center">
                        de Energia
                    </Text>
                </VStack>

                {/* Comparison Card */}
                <Box
                    w={320}
                    bg="#1A1A1A"
                    borderRadius={16}
                    p={5}
                    borderWidth={1}
                    borderColor="rgba(0, 195, 255, 0.2)"
                    mb={5}
                >
                    {/* Metrics Header */}
                    <HStack justifyContent="space-between" mb={4}>
                        <VStack alignItems="flex-start">
                            <Text color="#6B7280" fontSize="xs">
                                Potencial de Execução
                            </Text>
                            <Text color="#FF6B6B" fontSize="2xl" fontWeight="bold">
                                95%
                            </Text>
                        </VStack>
                        <VStack alignItems="flex-end">
                            <Text color="#6B7280" fontSize="xs">
                                Vantagem
                            </Text>
                            <Text color="#00C3FF" fontSize="2xl" fontWeight="bold">
                                +75%
                            </Text>
                        </VStack>
                    </HStack>

                    {/* Bar Chart */}
                    <HStack justifyContent="center" alignItems="flex-end" space={8} mt={2} mb={3}>
                        {/* Without Execut Bar */}
                        <VStack alignItems="center" space={2}>
                            <Box
                                w={60}
                                h={100}
                                bg="#FF6B6B"
                                borderRadius={8}
                            />
                            <Text color="#FF6B6B" fontSize="xs" fontWeight="500">
                                Sem Execut
                            </Text>
                        </VStack>

                        {/* With Execut Bar */}
                        <VStack alignItems="center" space={2}>
                            <Box
                                w={60}
                                h={150}
                                bg="#00C3FF"
                                borderRadius={8}
                            />
                            <Text color="#00C3FF" fontSize="xs" fontWeight="500">
                                Com Execut
                            </Text>
                        </VStack>
                    </HStack>
                </Box>

                {/* Description Text */}
                <Box px={4} mb={5}>
                    <Text color="#6B7280" fontSize="sm" textAlign="center" lineHeight={20}>
                        Detectamos gargalos na sua execução.{'\n'}
                        Vamos eliminá-los agora.
                    </Text>
                </Box>

                {/* Benefits List */}
                <VStack space={0} w="100%" style={{ gap: 12 }}>
                    {BENEFITS.map((benefit, index) => (
                        <Box
                            key={index}
                            w="100%"
                            h={56}
                            bg="#1A1A1A"
                            borderRadius={12}
                            px={4}
                            justifyContent="center"
                        >
                            <HStack alignItems="center" space={3}>
                                {/* Checkmark Icon */}
                                <Box
                                    w={24}
                                    h={24}
                                    borderRadius={12}
                                    bg="#00C3FF"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Ionicons name="checkmark" size={16} color="#000000" />
                                </Box>

                                {/* Benefit Text */}
                                <Text color="#FFFFFF" fontSize="md" fontWeight="400">
                                    {benefit.text}
                                </Text>
                            </HStack>
                        </Box>
                    ))}
                </VStack>
            </VStack>
        </ScrollView>
    );
};
