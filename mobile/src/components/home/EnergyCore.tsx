import React from 'react';
import { Box, HStack, VStack, Text } from '../ui';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

interface EnergyCoreProps {
    currentXP: number;
    maxXP: number;
    efficiency: number;
}

export const EnergyCore: React.FC<EnergyCoreProps> = ({
    currentXP,
    maxXP,
    efficiency,
}) => {
    const progressPercentage = (currentXP / maxXP) * 100;

    return (
        <VStack space={2} w="100%">
            {/* Energy Core Row */}
            <HStack justifyContent="space-between" alignItems="center">
                <Text color="text.secondary" fontSize="xs" fontWeight="medium" letterSpacing={2}>
                    ENERGY CORE
                </Text>
                <Text color="text.secondary" fontSize="xs">
                    {currentXP} / {maxXP} XP
                </Text>
            </HStack>

            {/* Progress Bar */}
            <Box w="100%" h={8} bg="surface.secondary" borderRadius="full" overflow="hidden">
                <View style={[styles.progressBar, { width: `${progressPercentage}%` }]}>
                    <LinearGradient
                        colors={['#33CFFF', '#475FAF']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradient}
                    />
                </View>
            </Box>

            {/* Charging Progress Row */}
            <HStack justifyContent="space-between" alignItems="center" mt={1}>
                <Text color="accent.400" fontSize="xs" fontWeight="medium" letterSpacing={1}>
                    CHARGING PROGRESS
                </Text>
                <Text color="text.secondary" fontSize="xs">
                    {efficiency}% EFICIENTE
                </Text>
            </HStack>
        </VStack>
    );
};

const styles = StyleSheet.create({
    progressBar: {
        height: '100%',
        borderRadius: 999,
        overflow: 'hidden',
    },
    gradient: {
        flex: 1,
    },
});
