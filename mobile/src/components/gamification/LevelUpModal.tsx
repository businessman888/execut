import React, { useEffect, useRef } from 'react';
import { Modal, Animated, StyleSheet, Dimensions } from 'react-native';
import { Box, VStack, Text } from '../ui';
import { LinearGradient } from 'expo-linear-gradient';

interface LevelUpModalProps {
    visible: boolean;
    newLevel: number;
    onDismiss: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
    visible,
    newLevel,
    onDismiss,
}) => {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const glowAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            // Entrance animation
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 5,
                    tension: 80,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();

            // Glow pulse
            Animated.loop(
                Animated.sequence([
                    Animated.timing(glowAnim, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(glowAnim, {
                        toValue: 0.5,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ])
            ).start();

            // Auto dismiss after 3.5s
            const timer = setTimeout(() => {
                Animated.parallel([
                    Animated.timing(scaleAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]).start(() => onDismiss());
            }, 3500);

            return () => clearTimeout(timer);
        } else {
            scaleAnim.setValue(0);
            opacityAnim.setValue(0);
        }
    }, [visible]);

    return (
        <Modal transparent animationType="none" visible={visible} onRequestClose={onDismiss}>
            <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
                <Animated.View
                    style={[
                        styles.container,
                        {
                            transform: [{ scale: scaleAnim }],
                            opacity: opacityAnim,
                        },
                    ]}
                >
                    <LinearGradient
                        colors={['#0A1628', '#0D2847', '#0A1628']}
                        style={styles.gradient}
                    >
                        {/* Glow ring */}
                        <Animated.View
                            style={[
                                styles.glowRing,
                                { opacity: glowAnim },
                            ]}
                        />

                        <VStack alignItems="center" space={4}>
                            {/* Level number */}
                            <Box
                                w={100}
                                h={100}
                                borderRadius={50}
                                borderWidth={3}
                                borderColor="#33CFFF"
                                alignItems="center"
                                justifyContent="center"
                                bg="rgba(51, 207, 255, 0.15)"
                            >
                                <Text color="#33CFFF" fontSize={40} fontWeight="bold">
                                    {newLevel}
                                </Text>
                            </Box>

                            {/* Title */}
                            <Text color="#FFFFFF" fontSize={24} fontWeight="bold" textAlign="center">
                                Nível {newLevel} Alcançado!
                            </Text>

                            {/* Subtitle */}
                            <Text color="#9CA3AF" fontSize={14} textAlign="center">
                                Continue evoluindo. Cada tarefa te leva mais longe.
                            </Text>
                        </VStack>
                    </LinearGradient>
                </Animated.View>
            </Animated.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: SCREEN_WIDTH * 0.85,
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(51, 207, 255, 0.3)',
    },
    gradient: {
        paddingVertical: 48,
        paddingHorizontal: 32,
        alignItems: 'center',
    },
    glowRing: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(51, 207, 255, 0.1)',
        marginTop: -100,
        marginLeft: -100,
    },
});
