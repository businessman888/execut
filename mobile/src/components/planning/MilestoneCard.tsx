import React from 'react';
import { Box, HStack, VStack, Text, Pressable } from 'native-base';
import Svg, { Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import { MoneyBagIcon, CelebrationIcon } from '../icons/NavIcons';
import { QuarterGrid } from './QuarterGrid';

interface MilestoneCardProps {
    yearNumber: number;
    phase: string;
    title: string;
    revenue: string;
    isActive?: boolean;
    showQuarters?: boolean;
    quarters?: { label: string; title: string }[];
    progress?: number;
    icon?: 'money' | 'celebration' | null;
    onPress?: () => void;
}

// Custom Circle Icon with Gradient Stroke
const CircleIconWithGradient = ({ size = 25 }) => (
    <Box width={size} height={size} justifyContent="center" alignItems="center">
        <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
            <Defs>
                <LinearGradient id="circleGradient" x1="0" y1="12" x2="25" y2="12" gradientUnits="userSpaceOnUse">
                    <Stop offset="0" stopColor="#33CFFF" />
                    <Stop offset="1" stopColor="#475FAF" />
                </LinearGradient>
            </Defs>
            <Circle
                cx="12.5"
                cy="12.5"
                r="8"
                stroke="url(#circleGradient)"
                strokeWidth="5"
            />
            <Circle
                cx="12.5"
                cy="12.5"
                r="2"
                fill="#000000"
            />
        </Svg>
    </Box>
);

export const MilestoneCard: React.FC<MilestoneCardProps> = ({
    yearNumber,
    phase,
    title,
    revenue,
    isActive = false,
    showQuarters = false,
    quarters,
    progress = 0,
    icon = null,
    onPress,
}) => {
    const renderIcon = () => {
        switch (icon) {
            case 'money':
                return <MoneyBagIcon size={30} color="#33CFFF" />;
            case 'celebration':
                return <CelebrationIcon size={30} color="#F59E0B" />;
            default:
                return null;
        }
    };

    return (
        <VStack space={2}>
            {/* Header: Circle Icon, Year/Phase, Title and MoneyBag Icon */}
            <HStack alignItems="flex-start" space={3}>
                {/* Left Column: Circle Icon and Line */}
                <VStack alignItems="center" height="100%">
                    {isActive ? (
                        <CircleIconWithGradient size={32} />
                    ) : (
                        <Box
                            w={6}
                            h={6}
                            borderRadius="full"
                            bg="surface.tertiary"
                            borderWidth={2}
                            borderColor="text.tertiary"
                        />
                    )}
                    {/* Vertical Line would go here in parent container context */}
                </VStack>

                {/* Right Column: Text Content */}
                <VStack flex={1} space={1}>
                    <HStack justifyContent="space-between" alignItems="center" pr={2}>
                        <VStack>
                            <Text color={isActive ? "accent.400" : "text.tertiary"} fontSize="xs" letterSpacing={1} fontWeight="medium">
                                ANO {String(yearNumber).padStart(2, '0')} - {phase}
                            </Text>
                            <Text color="text.primary" fontSize="lg" fontWeight="bold">
                                {title}
                            </Text>
                        </VStack>

                        {icon && (
                            <Box opacity={isActive ? 1 : 0.5}>
                                {renderIcon()}
                            </Box>
                        )}
                    </HStack>

                    {/* Revenue Card */}
                    <Pressable onPress={onPress} mt={2}>
                        <Box
                            bg="surface.primary"
                            borderRadius={20}
                            borderWidth={1}
                            borderColor={isActive ? "accent.400" : "border.default"}
                            p={6}
                        >
                            <VStack space={showQuarters ? 6 : 0}>
                                {/* Revenue Display */}
                                <HStack alignItems="baseline">
                                    <Text color="accent.400" fontSize="2xl" fontWeight="bold">R$ </Text>
                                    <Text color="accent.400" fontSize="3xl" fontWeight="bold">
                                        {revenue.split('/')[0].replace('R$ ', '')}
                                    </Text>
                                    <Text color="text.secondary" fontSize="md" ml={1}>/mês</Text>
                                </HStack>

                                {/* Quarter Grid (only for Year 1) */}
                                {showQuarters && quarters && (
                                    <QuarterGrid quarters={quarters} progress={progress} />
                                )}
                            </VStack>
                        </Box>
                    </Pressable>
                </VStack>
            </HStack>
        </VStack>
    );
};
