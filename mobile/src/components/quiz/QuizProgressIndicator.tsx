import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HStack, Text, Box } from '../ui';

interface QuizProgressIndicatorProps {
    currentStep: number;
    totalSteps: number;
}

export const QuizProgressIndicator: React.FC<QuizProgressIndicatorProps> = ({
    currentStep,
    totalSteps,
}) => {
    const progressPercentage = Math.round((currentStep / totalSteps) * 100);

    return (
        <Box w="100%">
            {/* Text indicator */}
            <HStack space={1} alignItems="center" mb={2}>
                <Text color="text.tertiary" fontSize="sm">
                    Progresso:
                </Text>
                <Text color="accent.400" fontSize="sm" fontWeight="600">
                    {progressPercentage}%
                </Text>
            </HStack>

            {/* Progress bar container */}
            <View style={styles.progressBarContainer}>
                {/* Background track */}
                <View style={styles.progressTrack} />

                {/* Progress fill with gradient */}
                <View style={[styles.progressFill, { width: `${progressPercentage}%` }]}>
                    <LinearGradient
                        colors={['#00C3FF', '#33CFFF', '#00A3D9']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradient}
                    />
                </View>
            </View>
        </Box>
    );
};

const styles = StyleSheet.create({
    progressBarContainer: {
        width: '100%',
        height: 6,
        borderRadius: 3,
        overflow: 'hidden',
        position: 'relative',
    },
    progressTrack: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 3,
    },
    progressFill: {
        height: '100%',
        borderRadius: 3,
        overflow: 'hidden',
    },
    gradient: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});
