import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, HStack } from '../ui';
import { View, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

interface BalanceSliderProps {
    value: number; // 0-100 where 0 = só consumo, 100 = só execução
    onChange: (value: number) => void;
}

export const BalanceSlider: React.FC<BalanceSliderProps> = ({
    value,
    onChange,
}) => {
    const [balance, setBalance] = useState(value || 50);

    useEffect(() => {
        if (value !== undefined) {
            setBalance(value);
        }
    }, [value]);

    const handleValueChange = (val: number) => {
        const roundedValue = Math.round(val);
        setBalance(roundedValue);
        onChange(roundedValue);
    };

    const consumo = 100 - balance;
    const execucao = balance;

    return (
        <VStack space={4} alignItems="center" w="100%">
            {/* Main display card */}
            <Box
                w="100%"
                bg="#1A1A1A"
                borderRadius={20}
                py={6}
                px={6}
                alignItems="center"
            >
                {/* Percentage displays */}
                <HStack w="100%" justifyContent="space-between" mb={4}>
                    <VStack alignItems="center" flex={1}>
                        <Text color="#6B7280" fontSize="sm">
                            Consumo
                        </Text>
                        <Text color="#FFFFFF" fontSize={36} fontWeight="700">
                            {consumo}%
                        </Text>
                    </VStack>
                    <VStack alignItems="center" flex={1}>
                        <Text color="#00C3FF" fontSize="sm">
                            Execução
                        </Text>
                        <Text color="#00C3FF" fontSize={36} fontWeight="700">
                            {execucao}%
                        </Text>
                    </VStack>
                </HStack>

                {/* Slider */}
                <View style={styles.sliderContainer}>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={100}
                        step={5}
                        value={balance}
                        onValueChange={handleValueChange}
                        minimumTrackTintColor="#404040"
                        maximumTrackTintColor="#00C3FF"
                        thumbTintColor="#00C3FF"
                    />
                </View>
            </Box>

            {/* Labels */}
            <HStack w="100%" justifyContent="space-between" px={2}>
                <VStack flex={1} space={1}>
                    <Text color="#FFFFFF" fontSize="md" fontWeight="600">
                        Só consumo
                    </Text>
                    <Text color="#6B7280" fontSize="xs" lineHeight={16}>
                        Consuma, livros, podcasts e vídeos sem aplicação imediata
                    </Text>
                </VStack>
                <VStack flex={1} alignItems="flex-end" space={1}>
                    <Text color="#00C3FF" fontSize="md" fontWeight="600">
                        Só execução
                    </Text>
                    <Text color="#6B7280" fontSize="xs" textAlign="right" lineHeight={16}>
                        Vendas, produção, reuniões e construção de ativos
                    </Text>
                </VStack>
            </HStack>
        </VStack>
    );
};

const styles = StyleSheet.create({
    sliderContainer: {
        width: '100%',
    },
    slider: {
        width: '100%',
        height: 40,
    },
});
