import React from 'react';
import { HStack, Text } from '../ui';

interface QuizProgressIndicatorProps {
    currentStep: number;
    totalSteps: number;
}

export const QuizProgressIndicator: React.FC<QuizProgressIndicatorProps> = ({
    currentStep,
    totalSteps,
}) => {
    const progressPercentage = Math.round((currentStep / totalSteps) * 100);

    return (
        <HStack space={1} alignItems="center">
            <Text color="text.tertiary" fontSize="sm">
                Progresso:
            </Text>
            <Text color="accent.400" fontSize="sm" fontWeight="600">
                {progressPercentage}%
            </Text>
        </HStack>
    );
};
