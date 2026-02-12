import React, { useState, useCallback, useRef } from 'react';
import { StyleSheet, Dimensions, PanResponder, Animated, View } from 'react-native';
import { Box, VStack, HStack, Text } from '../ui';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

interface MoneySliderProps {
    value: any;
    onChange: (value: string) => void;
    min?: number;
    max?: number;
    step?: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SLIDER_PADDING = 32;
const SLIDER_WIDTH = SCREEN_WIDTH - SLIDER_PADDING * 2 - 32; // with px padding from parent
const THUMB_SIZE = 32;

// Money icon
const WalletIcon = ({ size = 20, color = '#33CFFF' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M21 7H3C2.44772 7 2 7.44772 2 8V19C2 19.5523 2.44772 20 3 20H21C21.5523 20 22 19.5523 22 19V8C22 7.44772 21.5523 7 21 7Z"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M16 14C16 14.5523 15.5523 15 15 15C14.4477 15 14 14.5523 14 14C14 13.4477 14.4477 13 15 13C15.5523 13 16 13.4477 16 14Z"
            fill={color}
        />
        <Path
            d="M5 7V5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V7"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

// Predefined snap points with labels
const SNAP_POINTS = [
    { value: 0, label: 'R$ 0', shortLabel: 'Zero' },
    { value: 100, label: 'R$ 100', shortLabel: '100' },
    { value: 500, label: 'R$ 500', shortLabel: '500' },
    { value: 1000, label: 'R$ 1.000', shortLabel: '1k' },
    { value: 2000, label: 'R$ 2.000', shortLabel: '2k' },
    { value: 5000, label: 'R$ 5.000', shortLabel: '5k' },
    { value: 10000, label: 'R$ 10.000+', shortLabel: '10k+' },
];

// Map value to category string (for quiz answer compatibility)
function getCategory(value: number): string {
    if (value === 0) return 'zero';
    if (value <= 500) return '100_500';
    if (value <= 2000) return '500_2000';
    if (value <= 5000) return '2000_5000';
    return 'more_5000';
}

function getDescription(value: number): string {
    if (value === 0) return 'Sem capital disponível';
    if (value <= 500) return 'Capital limitado';
    if (value <= 2000) return 'Algum capital';
    if (value <= 5000) return 'Capital razoável';
    return 'Capital disponível';
}

export const MoneySlider: React.FC<MoneySliderProps> = ({
    value = 0,
    onChange,
}) => {
    const [currentSnapIndex, setCurrentSnapIndex] = useState(() => {
        const idx = SNAP_POINTS.findIndex((sp) => sp.value >= value);
        return idx >= 0 ? idx : 0;
    });

    // Ref to track current index for PanResponder (avoids stale closure)
    const snapIndexRef = useRef(currentSnapIndex);

    const displayValue = SNAP_POINTS[currentSnapIndex].value;
    const displayLabel = SNAP_POINTS[currentSnapIndex].label;

    // Animation
    const animatedPosition = useRef(
        new Animated.Value((currentSnapIndex / (SNAP_POINTS.length - 1)) * SLIDER_WIDTH)
    ).current;

    const snapToIndex = useCallback(
        (index: number) => {
            const clampedIndex = Math.max(0, Math.min(SNAP_POINTS.length - 1, index));
            setCurrentSnapIndex(clampedIndex);
            snapIndexRef.current = clampedIndex;

            Animated.spring(animatedPosition, {
                toValue: (clampedIndex / (SNAP_POINTS.length - 1)) * SLIDER_WIDTH,
                friction: 8,
                tension: 100,
                useNativeDriver: false,
            }).start();

            const snapValue = SNAP_POINTS[clampedIndex].value;
            onChange(getCategory(snapValue));
        },
        [onChange]
    );

    // Use refs for snapToIndex too so PanResponder always calls latest version
    const snapToIndexRef = useRef(snapToIndex);
    snapToIndexRef.current = snapToIndex;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                // Stop any animation
            },
            onPanResponderMove: (_, gestureState) => {
                const startPos = (snapIndexRef.current / (SNAP_POINTS.length - 1)) * SLIDER_WIDTH;
                const rawPosition = Math.max(
                    0,
                    Math.min(SLIDER_WIDTH, startPos + gestureState.dx)
                );
                animatedPosition.setValue(rawPosition);
            },
            onPanResponderRelease: (_, gestureState) => {
                const startPos = (snapIndexRef.current / (SNAP_POINTS.length - 1)) * SLIDER_WIDTH;
                const rawPosition = startPos + gestureState.dx;
                const fraction = Math.max(0, Math.min(1, rawPosition / SLIDER_WIDTH));
                const nearestIndex = Math.round(fraction * (SNAP_POINTS.length - 1));
                snapToIndexRef.current(nearestIndex);
            },
        })
    ).current;

    const progressWidth = animatedPosition.interpolate({
        inputRange: [0, SLIDER_WIDTH],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
    });

    return (
        <VStack space={6} alignItems="center" w="100%" px={4}>
            {/* Current Value Display */}
            <Box
                bg="rgba(51, 207, 255, 0.08)"
                borderRadius={20}
                borderWidth={1}
                borderColor="rgba(51, 207, 255, 0.25)"
                px={6}
                py={4}
                alignItems="center"
                w="100%"
            >
                <HStack space={3} alignItems="center">
                    <Box
                        w={44}
                        h={44}
                        borderRadius={22}
                        bg="rgba(51, 207, 255, 0.15)"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <WalletIcon size={22} />
                    </Box>
                    <VStack>
                        <Text color="#9CA3AF" fontSize={11} letterSpacing={1}>
                            CAPITAL DISPONÍVEL
                        </Text>
                        <Text color="#33CFFF" fontSize={28} fontWeight="bold">
                            {displayLabel}
                        </Text>
                        <Text color="#6B7280" fontSize={12}>
                            {getDescription(displayValue)}
                        </Text>
                    </VStack>
                </HStack>
            </Box>

            {/* Slider Track */}
            <Box w="100%" px={2}>
                <View
                    style={styles.trackContainer}
                    {...panResponder.panHandlers}
                >
                    {/* Background Track */}
                    <View style={styles.track}>
                        {/* Progress Fill */}
                        <Animated.View style={[styles.trackFill, { width: progressWidth }]}>
                            <LinearGradient
                                colors={['#33CFFF', '#1A8FBF']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={StyleSheet.absoluteFillObject}
                            />
                        </Animated.View>
                    </View>

                    {/* Snap point dots */}
                    {SNAP_POINTS.map((sp, i) => {
                        const dotLeft = (i / (SNAP_POINTS.length - 1)) * SLIDER_WIDTH;
                        const isActive = i <= currentSnapIndex;
                        return (
                            <View
                                key={sp.value}
                                style={[
                                    styles.snapDot,
                                    {
                                        left: dotLeft - 4,
                                        backgroundColor: isActive
                                            ? '#33CFFF'
                                            : 'rgba(107, 114, 128, 0.4)',
                                    },
                                ]}
                            />
                        );
                    })}

                    {/* Thumb */}
                    <Animated.View
                        style={[
                            styles.thumb,
                            {
                                transform: [
                                    {
                                        translateX: animatedPosition.interpolate({
                                            inputRange: [0, SLIDER_WIDTH],
                                            outputRange: [
                                                -THUMB_SIZE / 2,
                                                SLIDER_WIDTH - THUMB_SIZE / 2,
                                            ],
                                            extrapolate: 'clamp',
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        <LinearGradient
                            colors={['#33CFFF', '#1A8FBF']}
                            style={styles.thumbGradient}
                        />
                    </Animated.View>
                </View>

                {/* Scale Labels */}
                <HStack justifyContent="space-between" mt={3} px={0}>
                    {SNAP_POINTS.map((sp) => (
                        <Text
                            key={sp.value}
                            color={
                                sp.value === displayValue ? '#33CFFF' : '#6B728050'
                            }
                            fontSize={9}
                            fontWeight={sp.value === displayValue ? 'bold' : 'normal'}
                            textAlign="center"
                            style={{ width: SLIDER_WIDTH / (SNAP_POINTS.length - 1) }}
                        >
                            {sp.shortLabel}
                        </Text>
                    ))}
                </HStack>
            </Box>
        </VStack>
    );
};

const styles = StyleSheet.create({
    trackContainer: {
        height: 48,
        justifyContent: 'center',
        position: 'relative',
    },
    track: {
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(107, 114, 128, 0.2)',
        overflow: 'hidden',
    },
    trackFill: {
        height: '100%',
        borderRadius: 3,
        overflow: 'hidden',
    },
    snapDot: {
        position: 'absolute',
        top: '50%',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginTop: -4,
    },
    thumb: {
        position: 'absolute',
        top: '50%',
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        borderRadius: THUMB_SIZE / 2,
        marginTop: -THUMB_SIZE / 2,
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: '#FFFFFF',
        elevation: 5,
        shadowColor: '#33CFFF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
    },
    thumbGradient: {
        flex: 1,
    },
});
