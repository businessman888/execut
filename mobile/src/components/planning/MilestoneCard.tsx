import React from 'react';
import { Box, HStack, VStack, Text, Pressable } from 'native-base';
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
                return <MoneyBagIcon size={24} color="#33CFFF" />;
            case 'celebration':
                return <CelebrationIcon size={24} color="#F59E0B" />;
            default:
                return null;
        }
    };

    return (
        <VStack space={2}>
            {/* Year badge and phase */}
            <HStack space={2} alignItems="center">
                <Box
                    bg={isActive ? 'accent.400' : 'transparent'}
                    borderRadius="full"
                    w={3}
                    h={3}
                />
                <Text color="text.tertiary" fontSize="2xs" letterSpacing="lg">
                    ANO {String(yearNumber).padStart(2, '0')} - {phase}
                </Text>
            </HStack>

            {/* Title with icon */}
            <HStack alignItems="center" space={2} ml={5}>
                <Text color="text.primary" fontSize="md" fontWeight="semibold">
                    {title}
                </Text>
                {icon && (
                    <Box>
                        {renderIcon()}
                    </Box>
                )}
            </HStack>

            {/* Revenue Card */}
            <Pressable onPress={onPress}>
                <Box
                    bg="surface.primary"
                    borderRadius="2xl"
                    borderWidth={1}
                    borderColor="border.default"
                    p={4}
                    ml={5}
                >
                    <VStack space={showQuarters ? 4 : 0}>
                        {/* Revenue Display */}
                        <Text color="text.secondary" fontSize="2xl" fontWeight="semibold">
                            <Text color="text.secondary" fontSize="2xl">R$ </Text>
                            <Text color="text.primary" fontSize="3xl" fontWeight="bold">
                                {revenue.split('/')[0].replace('R$ ', '')}
                            </Text>
                            <Text color="text.secondary" fontSize="lg">/mês</Text>
                        </Text>

                        {/* Quarter Grid (only for Year 1) */}
                        {showQuarters && quarters && (
                            <QuarterGrid quarters={quarters} progress={progress} />
                        )}
                    </VStack>
                </Box>
            </Pressable>
        </VStack>
    );
};
