import React from 'react';
import { Box, HStack, VStack, Text } from '../ui';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import { useGamificationStore } from '../../store/gamificationStore';

interface EnergyCoreProps {
    currentXP?: number;
    maxXP?: number;
    efficiency: number;
}

export const EnergyCore: React.FC<EnergyCoreProps> = ({
    efficiency,
}) => {
    const { currentXP, currentLevel, xpForCurrentLevel, xpRequiredCurrent, xpProgress } =
        useGamificationStore();

    const displayCurrentXP = xpForCurrentLevel;
    const displayMaxXP = xpRequiredCurrent;
    const progressPercentage = xpProgress;

    return (
        <VStack space={2} w="100%">
            {/* Energy Core Row */}
            <HStack justifyContent="space-between" alignItems="center">
                <HStack space={2} alignItems="center">
                    <Text color="text.secondary" fontSize="xs" fontWeight="medium" letterSpacing={2}>
                        ENERGY CORE
                    </Text>
                    <Box
                        bg="rgba(51, 207, 255, 0.15)"
                        borderRadius={8}
                        px={2}
                        py={0.5}
                    >
                        <Text color="#33CFFF" fontSize={10} fontWeight="bold">
                            LV {currentLevel}
                        </Text>
                    </Box>
                </HStack>
                <Text color="text.secondary" fontSize="xs">
                    {displayCurrentXP} / {displayMaxXP} XP
                </Text>
            </HStack>

            {/* Progress Bar */}
            <Box w="100%" h={8} bg="surface.secondary" borderRadius="full" overflow="hidden">
                <View style={[styles.progressBar, { width: `${Math.min(progressPercentage, 100)}%` }]}>
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
