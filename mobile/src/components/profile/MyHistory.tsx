import React from 'react';
import { Box, VStack, HStack, Text, Input, Pressable, Image } from 'native-base';
import Svg, { Path, Circle } from 'react-native-svg';

type StoryStatus = 'executado' | 'planejado' | 'reflexão';

interface StoryEntry {
    id: string;
    time: string;
    content: string;
    status: StoryStatus;
}

interface MyHistoryProps {
    avatar?: string;
    entries: StoryEntry[];
    onPost?: (text: string) => void;
}

// Edit/Pen icon
const PenIcon = ({ size = 20, color = '#33CFFF' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

const StatusBadge: React.FC<{ status: StoryStatus }> = ({ status }) => {
    const config = {
        executado: { label: 'Executado', bg: 'transparent', border: 'accent.400', text: 'accent.400' },
        planejado: { label: 'Planejado', bg: 'accent.400', border: 'accent.400', text: 'background.primary' },
        reflexão: { label: 'Reflexão', bg: 'transparent', border: 'accent.400', text: 'accent.400' },
    };

    const { label, bg, border, text } = config[status];

    return (
        <Box
            bg={bg}
            borderWidth={1}
            borderColor={border}
            borderRadius="full"
            px={3}
            py={1}
        >
            <Text color={text} fontSize="xs" fontWeight="medium">
                {label}
            </Text>
        </Box>
    );
};

export const MyHistory: React.FC<MyHistoryProps> = ({
    avatar,
    entries,
    onPost,
}) => {
    const [inputText, setInputText] = React.useState('');

    return (
        <VStack space={4}>
            <Text color="text.primary" fontSize="md" fontWeight="semibold">
                Minha história
            </Text>

            {/* Input Row */}
            <HStack space={3} alignItems="center">
                <Image
                    source={{ uri: avatar }}
                    alt="Avatar"
                    size={10}
                    borderRadius="full"
                    bg="gray.600"
                />
                <Input
                    flex={1}
                    placeholder="progresso de hoje..."
                    placeholderTextColor="text.tertiary"
                    value={inputText}
                    onChangeText={setInputText}
                    bg="surface.primary"
                    borderWidth={0}
                    borderRadius="full"
                    px={4}
                    py={3}
                    color="text.primary"
                    _focus={{
                        bg: 'surface.primary',
                        borderWidth: 0,
                    }}
                />
                <Pressable
                    onPress={() => {
                        if (inputText.trim()) {
                            onPost?.(inputText);
                            setInputText('');
                        }
                    }}
                    bg="accent.400"
                    borderRadius="xl"
                    px={4}
                    py={3}
                >
                    <Text color="background.primary" fontWeight="bold">
                        Post
                    </Text>
                </Pressable>
            </HStack>

            {/* Entries */}
            <VStack space={3}>
                {entries.map((entry) => (
                    <Box
                        key={entry.id}
                        bg="surface.primary"
                        borderRadius="2xl"
                        borderWidth={1}
                        borderColor="border.default"
                        borderLeftWidth={3}
                        borderLeftColor="accent.400"
                        p={4}
                    >
                        <VStack space={2}>
                            <HStack justifyContent="space-between" alignItems="center">
                                <Text color="text.primary" fontSize="sm" fontWeight="semibold">
                                    {entry.time}
                                </Text>
                                <StatusBadge status={entry.status} />
                            </HStack>
                            <Text color="text.tertiary" fontSize="sm" lineHeight="lg">
                                {entry.content}
                            </Text>
                        </VStack>
                    </Box>
                ))}
            </VStack>
        </VStack>
    );
};
