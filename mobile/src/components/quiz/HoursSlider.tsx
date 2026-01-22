import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, HStack } from '../ui';
import { View, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

interface HoursSliderProps {
    value: number;
    onChange: (hours: number) => void;
}

export const HoursSlider: React.FC<HoursSliderProps> = ({
    value,
    onChange,
}) => {
    const [hours, setHours] = useState(value || 12.5);

    useEffect(() => {
        if (value !== undefined) {
            setHours(value);
        }
    }, [value]);

    const handleValueChange = (val: number) => {
        const roundedValue = Math.round(val * 2) / 2; // Round to nearest 0.5
        setHours(roundedValue);
        onChange(roundedValue);
    };

    // Calculate weekly focus (hours * 7)
    const weeklyFocus = (hours * 7).toFixed(1);

    // Calculate intensity level
    const getIntensityLevel = (h: number): string => {
        if (h < 4) return 'BAIXA';
        if (h < 8) return 'MÉDIA';
        if (h < 12) return 'ALTA';
        return 'EXTREMA';
    };

    const intensityLevel = getIntensityLevel(hours);

    return (
        <VStack space={4} alignItems="center" w="100%">
            {/* Main display card */}
            <Box
                w={280}
                bg="#1A1A1A"
                borderRadius={20}
                borderWidth={1}
                borderColor="#00C3FF"
                py={6}
                px={4}
                alignItems="center"
            >
                {/* Hours display */}
                <Text color="#00C3FF" fontSize={48} fontWeight="700">
                    {hours.toFixed(1)}
                </Text>
                <Text color="#6B7280" fontSize="md" mb={4}>
                    Horas / Dia
                </Text>

                {/* Slider */}
                <View style={styles.sliderContainer}>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={24}
                        step={0.5}
                        value={hours}
                        onValueChange={handleValueChange}
                        minimumTrackTintColor="#00C3FF"
                        maximumTrackTintColor="#404040"
                        thumbTintColor="#00C3FF"
                    />
                    <HStack justifyContent="space-between" w="100%" px={1}>
                        <Text color="#6B7280" fontSize="xs">0h</Text>
                        <Text color="#6B7280" fontSize="xs">12h</Text>
                        <Text color="#6B7280" fontSize="xs">24h</Text>
                    </HStack>
                </View>
            </Box>

            {/* Info cards */}
            <HStack space={3}>
                {/* Weekly Focus Card */}
                <Box
                    bg="#1A1A1A"
                    borderRadius={12}
                    borderWidth={1}
                    borderColor="#00C3FF"
                    px={4}
                    py={3}
                    alignItems="center"
                >
                    <Text color="#6B7280" fontSize="xs">
                        Foco Semanal
                    </Text>
                    <Text color="#00C3FF" fontSize="lg" fontWeight="700">
                        {weeklyFocus} hrs
                    </Text>
                </Box>

                {/* Intensity Level Card */}
                <Box
                    bg="#1A1A1A"
                    borderRadius={12}
                    borderWidth={1}
                    borderColor="#00C3FF"
                    px={4}
                    py={3}
                    alignItems="center"
                >
                    <Text color="#6B7280" fontSize="xs">
                        Nível de Intensidade
                    </Text>
                    <Text color="#00C3FF" fontSize="lg" fontWeight="700">
                        {intensityLevel}
                    </Text>
                </Box>
            </HStack>
        </VStack>
    );
};

const styles = StyleSheet.create({
    sliderContainer: {
        width: '100%',
        paddingHorizontal: 10,
    },
    slider: {
        width: '100%',
        height: 40,
    },
});
