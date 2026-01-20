import React from 'react';
import { Box, HStack, VStack, Text } from 'native-base';
import { IdeaIcon } from '../icons/TaskIcons';

interface AIInsightProps {
    message: string;
}

export const AIInsight: React.FC<AIInsightProps> = ({ message }) => {
    return (
        <Box
            bg="surface.primary"
            borderRadius="2xl"
            borderWidth={1}
            borderColor="accent.400"
            borderLeftWidth={4}
            p={4}
        >
            <HStack space={3} alignItems="flex-start">
                {/* Icon */}
                <Box mt={1}>
                    <IdeaIcon size={24} color="#33CFFF" />
                </Box>

                {/* Content */}
                <VStack flex={1} space={2}>
                    <Text color="accent.400" fontSize="md" fontWeight="bold" letterSpacing={1}>
                        AI INSIGHT
                    </Text>
                    <Text color="text.secondary" fontSize="sm" lineHeight={20}>
                        "{message}"
                    </Text>
                </VStack>
            </HStack>
        </Box>
    );
};
