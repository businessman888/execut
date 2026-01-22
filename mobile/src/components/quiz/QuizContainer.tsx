import React from 'react';
import { VStack, Text, Button, Box, HStack, Pressable } from '../ui';
import { TextInput, View, StyleSheet } from 'react-native';

interface QuizContainerProps {
    /** Title lines - each item is a line with optional color */
    titleLines: Array<{
        text: string;
        color?: 'primary' | 'accent';
    }>;
    /** Content to render (input fields, options, etc.) */
    children: React.ReactNode;
    /** Button label for continue */
    buttonLabel?: string;
    /** Button press handler for continue */
    onContinue: () => void;
    /** Whether the continue button is disabled */
    isButtonDisabled?: boolean;
    /** Whether to show back button */
    showBack?: boolean;
    /** Button press handler for back */
    onBack?: () => void;
    /** Use larger title font size (32px) */
    largeTitleSize?: boolean;
}

export const QuizContainer: React.FC<QuizContainerProps> = ({
    titleLines,
    children,
    buttonLabel = 'Continuar',
    onContinue,
    isButtonDisabled = false,
    showBack = false,
    onBack,
    largeTitleSize = false,
}) => {
    return (
        <VStack flex={1} justifyContent="space-between">
            {/* Question Section */}
            <VStack space={0} mt={10} alignItems="center">
                <VStack space={0} alignItems="flex-start">
                    {titleLines.map((line, index) => (
                        <Text
                            key={index}
                            color={line.color === 'accent' ? 'accent.400' : 'text.primary'}
                            fontSize={largeTitleSize ? 32 : 22}
                            fontWeight="500"
                            lineHeight={largeTitleSize ? 40 : 30}
                        >
                            {line.text}
                        </Text>
                    ))}
                </VStack>
            </VStack>

            {/* Content (inputs, options, etc.) */}
            <Box flex={1} justifyContent="center">
                {children}
            </Box>

            {/* Buttons */}
            <Box pb={8}>
                {showBack ? (
                    <HStack space={3} justifyContent="space-between">
                        {/* Back Button */}
                        <Pressable
                            onPress={onBack}
                            flex={1}
                            bg="surface.secondary"
                            borderRadius={40}
                            py={4}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Text color="text.primary" fontSize="md" fontWeight="600">
                                Voltar
                            </Text>
                        </Pressable>

                        {/* Continue Button */}
                        <Pressable
                            onPress={onContinue}
                            disabled={isButtonDisabled}
                            flex={1}
                            bg={isButtonDisabled ? 'surface.tertiary' : '#2A2A2A'}
                            borderRadius={40}
                            py={4}
                            alignItems="center"
                            justifyContent="center"
                            opacity={isButtonDisabled ? 0.5 : 1}
                        >
                            <Text
                                color={isButtonDisabled ? 'text.tertiary' : 'accent.400'}
                                fontSize="md"
                                fontWeight="600"
                            >
                                {buttonLabel}
                            </Text>
                        </Pressable>
                    </HStack>
                ) : (
                    <Pressable
                        onPress={onContinue}
                        disabled={isButtonDisabled}
                        bg={isButtonDisabled ? '#2A2A2A' : '#00C3FF'}
                        borderRadius={40}
                        py={4}
                        w="100%"
                        alignItems="center"
                        justifyContent="center"
                        opacity={isButtonDisabled ? 0.7 : 1}
                    >
                        <Text
                            color={isButtonDisabled ? '#6B7280' : '#000000'}
                            fontSize="md"
                            fontWeight="600"
                        >
                            {buttonLabel}
                        </Text>
                    </Pressable>
                )}
            </Box>
        </VStack>
    );
};

// Styled input for quiz questions
interface QuizInputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

export const QuizInput: React.FC<QuizInputProps> = ({
    value,
    onChangeText,
    placeholder = '',
}) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#6B7280"
                style={styles.input}
                autoCapitalize="words"
            />
            <View style={styles.inputLine} />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
    },
    input: {
        color: '#FFFFFF',
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 0,
    },
    inputLine: {
        height: 1,
        backgroundColor: '#00C3FF',
        width: '100%',
    },
});
