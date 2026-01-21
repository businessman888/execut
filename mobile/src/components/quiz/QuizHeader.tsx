import React from 'react';
import { HStack, Text, Box } from '../ui';

interface QuizHeaderProps {
    xpAmount?: number;
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({ xpAmount = 50 }) => {
    return (
        <HStack justifyContent="space-between" alignItems="center" w="100%">
            {/* Title */}
            <Text color="text.primary" fontSize="md" fontWeight="500">
                Pontuação
            </Text>

            {/* XP Badge */}
            <Box
                bg="#1A3A3A"
                borderRadius={20}
                px={3}
                py={1}
                borderWidth={1}
                borderColor="accent.400"
            >
                <HStack space={1} alignItems="center">
                    {/* Lightning icon as text symbol */}
                    <Text color="accent.400" fontSize="sm">
                        ⚡
                    </Text>
                    <Text color="accent.400" fontSize="sm" fontWeight="600">
                        {xpAmount}XP
                    </Text>
                </HStack>
            </Box>
        </HStack>
    );
};
