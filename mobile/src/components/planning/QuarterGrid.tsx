import React from 'react';
import { Box, HStack, VStack, Text } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

interface QuarterGridProps {
    quarters: {
        label: string;
        title: string;
    }[];
    progress: number;
}

export const QuarterGrid: React.FC<QuarterGridProps> = ({ quarters, progress }) => {
    return (
        <VStack space={3}>
            {/* Quarters Grid */}
            <HStack space={2}>
                {/* Left column */}
                <VStack flex={1} space={2}>
                    {quarters.slice(0, 2).map((quarter, index) => (
                        <Box
                            key={index}
                            bg="surface.secondary"
                            borderRadius="lg"
                            p={3}
                            borderWidth={1}
                            borderColor="border.default"
                        >
                            <Text color="text.tertiary" fontSize="2xs" mb={1}>
                                {quarter.label}
                            </Text>
                            <Text color="text.primary" fontSize="xs" fontWeight="medium">
                                {quarter.title}
                            </Text>
                        </Box>
                    ))}
                </VStack>

                {/* Right column */}
                <VStack flex={1} space={2}>
                    {quarters.slice(2, 4).map((quarter, index) => (
                        <Box
                            key={index}
                            bg="surface.secondary"
                            borderRadius="lg"
                            p={3}
                            borderWidth={1}
                            borderColor="border.default"
                        >
                            <Text color="text.tertiary" fontSize="2xs" mb={1}>
                                {quarter.label}
                            </Text>
                            <Text color="text.primary" fontSize="xs" fontWeight="medium">
                                {quarter.title}
                            </Text>
                        </Box>
                    ))}
                </VStack>
            </HStack>

            {/* Progress Bar */}
            <VStack space={1}>
                <Box w="100%" h={2} bg="surface.tertiary" borderRadius="full" overflow="hidden">
                    <View style={[styles.progressBar, { width: `${progress}%` }]}>
                        <LinearGradient
                            colors={['#33CFFF', '#00A3CC']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradient}
                        />
                    </View>
                </Box>
                <Text color="accent.400" fontSize="xs" textAlign="right">
                    {progress}%
                </Text>
            </VStack>
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
