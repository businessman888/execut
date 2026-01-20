import React from 'react';
import { Box, VStack, HStack, Text, Input, Pressable } from '../ui';
import Svg, { Path } from 'react-native-svg';

type StoryStatus = 'executado' | 'planejado' | 'reflexão';

interface StoryEntry {
    id: string;
    time: string;
    content: string;
    status: StoryStatus;
}

interface MyHistoryProps {
    entries: StoryEntry[];
    onPost?: (text: string) => void;
}

// Edit/Pen icon
const PenIcon = ({ size = 24, color = '#6B7280' }: { size?: number; color?: string }) => (
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
        executado: { label: 'Executado', bg: '#33CFFF', text: '#0D0D0D' },
        planejado: { label: 'Planejado', bg: '#33CFFF', text: '#0D0D0D' },
        reflexão: { label: 'Reflexão', bg: '#33CFFF', text: '#0D0D0D' },
    };

    const { label, bg, text } = config[status];

    return (
        <Box
            bg={bg}
            borderRadius={20}
            px={3}
            py={1}
        >
            <Text color={text} fontSize={11} fontWeight="bold">
                {label}
            </Text>
        </Box>
    );
};

export const MyHistory: React.FC<MyHistoryProps> = ({
    entries,
    onPost,
}) => {
    const [inputText, setInputText] = React.useState('');

    return (
        <VStack space={4}>
            <Text color="#FFFFFF" fontSize={16} fontWeight="semibold">
                Minha história
            </Text>

            {/* Input Row - Pen icon + Input + Post button */}
            <HStack space={3} alignItems="center">
                <Box
                    w={44}
                    h={44}
                    borderRadius={22}
                    bg="#1F1F1F"
                    alignItems="center"
                    justifyContent="center"
                >
                    <PenIcon size={22} color="#6B7280" />
                </Box>
                <Input
                    flex={1}
                    placeholder="progresso de hoje..."
                    placeholderTextColor="#6B7280"
                    value={inputText}
                    onChangeText={setInputText}
                    bg="#1F1F1F"
                    borderWidth={0}
                    borderRadius={22}
                    px={4}
                    py={3}
                    color="#FFFFFF"
                />
                <Pressable
                    onPress={() => {
                        if (inputText.trim()) {
                            onPost?.(inputText);
                            setInputText('');
                        }
                    }}
                    bg="#33CFFF"
                    borderRadius={12}
                    px={5}
                    py={3}
                >
                    <Text color="#0D0D0D" fontSize={14} fontWeight="bold">
                        Post
                    </Text>
                </Pressable>
            </HStack>

            {/* Entries */}
            <VStack space={3}>
                {entries.map((entry) => {
                    // Border color based on status: cyan for executado, gray for others
                    const borderColor = entry.status === 'executado'
                        ? '#33CFFF'
                        : 'rgba(75, 85, 99, 0.5)'; // gray-600 with opacity

                    return (
                        <Box
                            key={entry.id}
                            bg="#1A1A1A"
                            borderRadius={16}
                            borderWidth={1}
                            borderColor={borderColor}
                            p={4}
                        >
                            <VStack space={2}>
                                <HStack justifyContent="space-between" alignItems="center">
                                    <Text color="#FFFFFF" fontSize={14} fontWeight="bold">
                                        {entry.time}
                                    </Text>
                                    <StatusBadge status={entry.status} />
                                </HStack>
                                <Text color="#9CA3AF" fontSize={13} lineHeight={20}>
                                    {entry.content}
                                </Text>
                            </VStack>
                        </Box>
                    );
                })}
            </VStack>
        </VStack>
    );
};
