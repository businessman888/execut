import React from 'react';
import { Box, HStack, VStack, Text, Pressable } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

import { Week3Icon, Week4Icon, CheckBlueIcon } from '../icons/NavIcons';

export type WeekStatus = 'completed' | 'current' | 'pending';

interface WeekCardProps {
    weekNumber: number;
    dateRange: string;
    title: string;
    description: string;
    status: WeekStatus;
    progress: number;
    isCurrent?: boolean;
    onPress?: () => void;
}

const getStatusLabel = (status: WeekStatus): string => {
    switch (status) {
        case 'completed':
            return 'Concluído';
        case 'current':
            return 'Em andamento';
        case 'pending':
            return 'Pendente';
        default:
            return '';
    }
};

const getStatusColor = (status: WeekStatus): string => {
    switch (status) {
        case 'completed':
            return '#33CFFF'; // Blue for completed text
        case 'current':
            return '#33CFFF'; // Blue for current status
        case 'pending':
            return '#9CA3AF'; // Gray for pending status
        default:
            return '#6B7280';
    }
};

export const WeekCard: React.FC<WeekCardProps> = ({
    weekNumber,
    dateRange,
    title,
    description,
    status,
    progress,
    isCurrent = false,
    onPress,
}) => {
    const isCompleted = status === 'completed';

    // Background colors based on design image
    // Current week seems slightly lighter/bluish or just distinct
    // Others are very dark
    const cardBg = isCurrent ? '#1A1A1A' : '#111111'; // Using slightly different darks

    // Blue border for current card only
    const borderColor = isCurrent ? '#33CFFF' : 'transparent';
    const borderWidth = isCurrent ? 1 : 0;

    const renderBadge = () => {
        if (weekNumber === 3) {
            return <Week3Icon size={39} />;
        }
        if (weekNumber === 4) {
            return <Week4Icon size={39} />;
        }

        // For Week 1 (and 2 if not current, though 2 is current in example)
        if (isCurrent) {
            return (
                <LinearGradient
                    colors={['#33CFFF', '#475FAF']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ borderRadius: 9.5, padding: 1, width: 39, height: 39, alignItems: 'center', justifyContent: 'center' }}
                >
                    <Text color="white" fontSize="sm" fontWeight="bold">
                        {String(weekNumber).padStart(2, '0')}
                    </Text>
                </LinearGradient>
            );
        }

        // Default style for generic weeks (like Week 1)
        // If completed, use the blue style from the reference image
        if (isCompleted) {
            return (
                <Box
                    width={39}
                    height={39}
                    borderRadius={9.5}
                    borderWidth={1}
                    borderColor="#33CFFF"
                    bg="rgba(51, 207, 255, 0.15)"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Text color="#33CFFF" fontSize="sm" fontWeight="bold">
                        {String(weekNumber).padStart(2, '0')}
                    </Text>
                </Box>
            );
        }

        // Default style (Not completed) - Glass/Gray style
        return (
            <Box
                width={39}
                height={39}
                borderRadius={9.5}
                borderWidth={1}
                borderColor="#404040"
                bg="rgba(255, 255, 255, 0.1)"
                alignItems="center"
                justifyContent="center"
            >
                <Text color="white" fontSize="sm" fontWeight="bold">
                    {String(weekNumber).padStart(2, '0')}
                </Text>
            </Box>
        );
    };

    return (
        <Pressable onPress={onPress}>
            <Box
                bg={cardBg}
                borderRadius="xl"
                borderWidth={borderWidth}
                borderColor={borderColor}
                overflow="hidden"
            >
                {/* Week Header - Transparent BG */}
                <HStack
                    bg="transparent"
                    px={4}
                    pt={4}
                    pb={1}
                    alignItems="center"
                    space={3}
                >
                    {/* Badge Number */}
                    {renderBadge()}

                    <Text
                        color={isCurrent ? '#33CFFF' : 'text.primary'}
                        fontSize="sm"
                        fontWeight="semibold"
                    >
                        {/* Format: 
                            Current: "Semana atual - DATE" 
                            Others: "Semana X - DATE"
                             
                            But image shows:
                            Week 1: "Semana 1 - DATE"
                            Week 2 (Current): "Semana atual - DATE"
                         */}
                        {isCurrent ? `Semana atual - ${dateRange}` : `Semana ${weekNumber} - ${dateRange}`}
                    </Text>

                    {isCompleted && (
                        <Box ml="auto">
                            <CheckBlueIcon size={20} color="#33CFFF" />
                        </Box>
                    )}
                </HStack>

                {/* Week Content */}
                <VStack px={4} pb={4} pt={2} space={3}>
                    {/* Title and Description */}
                    <VStack space={1}>
                        <Text color="text.primary" fontSize="lg" fontWeight="bold">
                            {title}
                        </Text>
                        <Text color="text.secondary" fontSize="sm">
                            {description}
                        </Text>
                    </VStack>

                    {/* Status and Progress */}
                    <VStack space={2}>
                        <HStack justifyContent="space-between" alignItems="center">
                            <Text color={getStatusColor(status)} fontSize="xs" fontWeight="medium">
                                {getStatusLabel(status)}
                            </Text>
                            <Text
                                color={isCompleted || isCurrent ? '#33CFFF' : 'text.secondary'}
                                fontSize="xs"
                                fontWeight="bold"
                            >
                                {progress}%
                            </Text>
                        </HStack>

                        {/* Progress Bar */}
                        <Box
                            w="100%"
                            h={7}
                            bg="surface.tertiary"
                            borderRadius="full"
                            overflow="hidden"
                        >
                            {progress > 0 ? (
                                <View style={{ width: `${progress}%`, height: '100%' }}>
                                    <LinearGradient
                                        colors={['#33CFFF', '#475FAF']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={{ flex: 1 }}
                                    />
                                </View>
                            ) : null}
                        </Box>
                    </VStack>
                </VStack>
            </Box>
        </Pressable>
    );
};
