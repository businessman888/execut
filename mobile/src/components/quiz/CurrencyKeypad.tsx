import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Animated, Pressable as RNPressable, View } from 'react-native';
import { Box, VStack, HStack, Text } from '../ui';
import Svg, { Path, Circle } from 'react-native-svg';

interface CurrencyKeypadProps {
    value: string;
    onChange: (value: string) => void;
}

const MAX_DIGITS = 10; // up to R$ 9.999.999.999

// Chart / target icon
const TargetIcon = ({ size = 24, color = '#33CFFF' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={2} />
        <Circle cx="12" cy="12" r="5" stroke={color} strokeWidth={2} />
        <Circle cx="12" cy="12" r="1.5" fill={color} />
    </Svg>
);

// Backspace icon
const BackspaceIcon = ({ size = 24, color = '#9CA3AF' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M9 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20H9L3 12L9 4Z"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M16 9L12 13M12 9L16 13"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

function formatCurrency(rawDigits: string): string {
    if (!rawDigits || rawDigits === '0') return 'R$ 0';
    const num = parseInt(rawDigits, 10);
    if (isNaN(num)) return 'R$ 0';
    return 'R$ ' + num.toLocaleString('pt-BR');
}

function getMotivationalText(rawDigits: string): string {
    const num = parseInt(rawDigits || '0', 10);
    if (num === 0) return 'Digite o valor do seu objetivo';
    if (num < 100000) return 'Comece com passos firmes 💪';
    if (num < 500000) return 'Patrimônio inicial sólido';
    if (num < 1000000) return 'Rumo ao primeiro milhão 🚀';
    if (num < 3000000) return 'Mentalidade de alta performance 🔥';
    if (num < 10000000) return 'Pensamento de magnata 👑';
    return 'Visão de império 💎';
}

const KEYS = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', 'backspace'],
];

export const CurrencyKeypad: React.FC<CurrencyKeypadProps> = ({
    value = '',
    onChange,
}) => {
    // Raw digits (no formatting)
    const [digits, setDigits] = useState(() => {
        // If value is already a number string, use it
        const num = parseInt(value, 10);
        return !isNaN(num) && num > 0 ? num.toString() : '';
    });

    // Pulse animation for the value display
    const pulseAnim = useRef(new Animated.Value(1)).current;

    const triggerPulse = () => {
        Animated.sequence([
            Animated.timing(pulseAnim, {
                toValue: 1.05,
                duration: 80,
                useNativeDriver: true,
            }),
            Animated.spring(pulseAnim, {
                toValue: 1,
                friction: 4,
                tension: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleKeyPress = (key: string) => {
        if (key === 'backspace') {
            setDigits((prev) => {
                const newDigits = prev.slice(0, -1);
                onChange(newDigits || '0');
                return newDigits;
            });
            triggerPulse();
            return;
        }

        if (key === '') return;

        setDigits((prev) => {
            // Don't allow leading zeros
            if (prev === '' && key === '0') return prev;
            // Max digits
            if (prev.length >= MAX_DIGITS) return prev;

            const newDigits = prev + key;
            onChange(newDigits);
            return newDigits;
        });
        triggerPulse();
    };

    const displayValue = formatCurrency(digits);
    const motivational = getMotivationalText(digits);
    const hasValue = digits.length > 0;

    return (
        <VStack space={5} alignItems="center" w="100%" px={2}>
            {/* Value Display Card */}
            <Box
                bg="rgba(51, 207, 255, 0.06)"
                borderRadius={20}
                borderWidth={1}
                borderColor={hasValue ? 'rgba(51, 207, 255, 0.3)' : 'rgba(107, 114, 128, 0.2)'}
                px={5}
                py={5}
                alignItems="center"
                w="100%"
            >
                <HStack space={3} alignItems="center" mb={2}>
                    <Box
                        w={40}
                        h={40}
                        borderRadius={20}
                        bg="rgba(51, 207, 255, 0.15)"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <TargetIcon size={20} />
                    </Box>
                    <Text color="#9CA3AF" fontSize={11} fontWeight="600" letterSpacing={1.5}>
                        META DE PATRIMÔNIO
                    </Text>
                </HStack>

                <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                    <Text
                        color={hasValue ? '#33CFFF' : '#4B5563'}
                        fontSize={hasValue ? 32 : 24}
                        fontWeight="bold"
                        textAlign="center"
                    >
                        {displayValue}
                    </Text>
                </Animated.View>

                <Text color="#6B7280" fontSize={12} mt={1} textAlign="center">
                    {motivational}
                </Text>
            </Box>

            {/* Custom Numeric Keypad */}
            <Box
                bg="rgba(20, 20, 25, 0.6)"
                borderRadius={16}
                borderWidth={1}
                borderColor="rgba(107, 114, 128, 0.15)"
                p={3}
                w="100%"
            >
                {KEYS.map((row, rowIndex) => (
                    <HStack key={rowIndex} justifyContent="center" space={2} mb={rowIndex < 3 ? 2 : 0}>
                        {row.map((key, colIndex) => {
                            if (key === '') {
                                return <View key={`empty-${colIndex}`} style={styles.keyEmpty} />;
                            }

                            const isBackspace = key === 'backspace';

                            return (
                                <RNPressable
                                    key={key}
                                    onPress={() => handleKeyPress(key)}
                                    style={({ pressed }) => [
                                        styles.key,
                                        pressed && styles.keyPressed,
                                    ]}
                                >
                                    {isBackspace ? (
                                        <BackspaceIcon size={22} />
                                    ) : (
                                        <Text
                                            color="#E5E7EB"
                                            fontSize={22}
                                            fontWeight="600"
                                        >
                                            {key}
                                        </Text>
                                    )}
                                </RNPressable>
                            );
                        })}
                    </HStack>
                ))}
            </Box>
        </VStack>
    );
};

const styles = StyleSheet.create({
    key: {
        width: 80,
        height: 56,
        borderRadius: 12,
        backgroundColor: 'rgba(42, 42, 50, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    keyPressed: {
        backgroundColor: 'rgba(51, 207, 255, 0.15)',
        transform: [{ scale: 0.95 }],
    },
    keyEmpty: {
        width: 80,
        height: 56,
    },
});
