import React from 'react';
import { Box, Text, VStack, HStack } from '../ui';
import { Ionicons } from '@expo/vector-icons';

interface FeatureItem {
    icon: 'analytics' | 'timer' | 'stats-chart';
    title: string;
    subtitle?: string;
}

const FEATURES: FeatureItem[] = [
    { icon: 'analytics', title: 'Priorização por IA' },
    { icon: 'timer', title: 'Ciclos de foco', subtitle: 'Assistido' },
    { icon: 'stats-chart', title: 'Dashboard de', subtitle: 'Progresso real' },
];

export const FeatureShowcase: React.FC = () => {
    return (
        <VStack space={0} alignItems="center" w="100%" style={{ gap: 15 }}>
            {/* Feature cards */}
            {FEATURES.map((feature, index) => (
                <Box
                    key={index}
                    w={332}
                    h={81}
                    bg="#1A1A1A"
                    borderRadius={12}
                    borderWidth={1}
                    borderColor="#00C3FF"
                    px={4}
                    justifyContent="center"
                >
                    <HStack alignItems="center" justifyContent="space-between">
                        <HStack space={3} alignItems="center" flex={1}>
                            {/* Icon */}
                            <Box
                                w={36}
                                h={36}
                                borderRadius={18}
                                bg="#00C3FF"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Ionicons name={feature.icon} size={18} color="#000000" />
                            </Box>

                            {/* Text */}
                            <VStack space={0}>
                                <Text color="#FFFFFF" fontSize="md" fontWeight="500">
                                    {feature.title}
                                </Text>
                                {feature.subtitle && (
                                    <Text color="#FFFFFF" fontSize="md" fontWeight="500">
                                        {feature.subtitle}
                                    </Text>
                                )}
                            </VStack>
                        </HStack>

                        {/* Checkmark */}
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
                    </HStack>
                </Box>
            ))}

            {/* Description text */}
            <Box px={2} mt={4}>
                <Text color="#6B7280" fontSize="sm" textAlign="center" lineHeight={20}>
                    Identificamos seus maiores ladrões de tempo. A Execut vai atuar como seu{' '}
                    <Text color="#FFFFFF" fontWeight="600">PMO pessoal</Text>
                    , garantindo que você execute apenas o que gera lucro.
                </Text>
            </Box>
        </VStack>
    );
};
