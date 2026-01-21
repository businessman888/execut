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
}

export const QuizContainer: React.FC<QuizContainerProps> = ({
    titleLines,
    children,
    buttonLabel = 'Continuar',
    onContinue,
    isButtonDisabled = false,
    showBack = false,
    onBack,
}) => {
    return (
        <VStack flex={1} justifyContent="space-between">
            {/* Question Section */}
            <VStack space={1} mt={10}>
                {titleLines.map((line, index) => (
                    <Text
                        key={index}
                        color={line.color === 'accent' ? 'accent.400' : 'text.primary'}
                        fontSize="2xl"
                        fontWeight="500"
                        lineHeight={32}
                    >
                        {line.text}
                    </Text>
                ))}
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
                            borderRadius={12}
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
                            bg={isButtonDisabled ? 'surface.tertiary' : 'transparent'}
                            borderRadius={12}
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
                    <Button
                        onPress={onContinue}
                        isDisabled={isButtonDisabled}
                        rounded="xl"
                        py={4}
                        w="100%"
                    >
                        {buttonLabel}
                    </Button>
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
        backgroundColor: '#404040',
        width: '100%',
    },
});
