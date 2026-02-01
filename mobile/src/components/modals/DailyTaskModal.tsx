import React from 'react';
import { Modal, StyleSheet, Dimensions } from 'react-native';
import { Box, VStack, HStack, Text, ScrollView, Pressable } from '../ui';
import Svg, { Path, Circle } from 'react-native-svg';
import { DailyTask } from '../../types/planning';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface DailyTaskModalProps {
    visible: boolean;
    onClose: () => void;
    dayName: string;
    dayNumber: number;
    tasks: DailyTask[];
    date: string;
}

// Close icon
const CloseIcon = ({ color = '#FFFFFF', size = 24 }: { color?: string; size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M18 6L6 18M6 6L18 18"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

// Task icon based on category
const getCategoryIcon = (category: string) => {
    const iconColor = '#00C3FF';
    switch (category.toLowerCase()) {
        case 'estratégia':
            return (
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                    <Path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={iconColor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    <Path d="M2 17L12 22L22 17" stroke={iconColor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    <Path d="M2 12L12 17L22 12" stroke={iconColor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
            );
        case 'marketing':
            return (
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                    <Path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke={iconColor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
            );
        case 'vendas':
            return (
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                    <Circle cx="9" cy="21" r="1" stroke={iconColor} strokeWidth={2} />
                    <Circle cx="20" cy="21" r="1" stroke={iconColor} strokeWidth={2} />
                    <Path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke={iconColor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
            );
        case 'produto':
            return (
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                    <Path d="M21 16V8.00002C20.9996 7.6493 20.9071 7.30483 20.7315 7.00119C20.556 6.69754 20.3037 6.44539 20 6.27002L13 2.27002C12.696 2.09449 12.3511 2.00208 12 2.00208C11.6489 2.00208 11.304 2.09449 11 2.27002L4 6.27002C3.69626 6.44539 3.44398 6.69754 3.26846 7.00119C3.09294 7.30483 3.00036 7.6493 3 8.00002V16C3.00036 16.3508 3.09294 16.6952 3.26846 16.9989C3.44398 17.3025 3.69626 17.5547 4 17.73L11 21.73C11.304 21.9056 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9056 13 21.73L20 17.73C20.3037 17.5547 20.556 17.3025 20.7315 16.9989C20.9071 16.6952 20.9996 16.3508 21 16Z" stroke={iconColor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    <Path d="M3.27002 6.96002L12 12.01L20.73 6.96002" stroke={iconColor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    <Path d="M12 22.08V12" stroke={iconColor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
            );
        default:
            return (
                <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                    <Path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={iconColor} strokeWidth={2} />
                    <Path d="M12 6V12L16 14" stroke={iconColor} strokeWidth={2} strokeLinecap="round" />
                </Svg>
            );
    }
};

export function DailyTaskModal({ visible, onClose, dayName, dayNumber, tasks, date }: DailyTaskModalProps) {
    const totalXP = tasks.reduce((sum, task) => sum + (task.xpReward || 0), 0);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <Box style={styles.overlay}>
                <Box style={styles.container}>
                    {/* Header */}
                    <HStack
                        justifyContent="space-between"
                        alignItems="center"
                        px={4}
                        py={3}
                        borderBottomWidth={1}
                        borderBottomColor="rgba(255,255,255,0.1)"
                    >
                        <VStack>
                            <Text color="text.primary" fontSize="lg" fontWeight="bold">
                                {dayName}, {dayNumber}
                            </Text>
                            <Text color="text.tertiary" fontSize="xs">
                                {date} • {tasks.length} tarefas • {totalXP} XP
                            </Text>
                        </VStack>
                        <Pressable
                            onPress={onClose}
                            p={2}
                            borderRadius="full"
                            bg="rgba(255,255,255,0.1)"
                        >
                            <CloseIcon size={20} color="#FFFFFF" />
                        </Pressable>
                    </HStack>

                    {/* Tasks List */}
                    <ScrollView
                        style={{ maxHeight: SCREEN_HEIGHT * 0.5 }}
                        contentContainerStyle={{ padding: 16 }}
                        showsVerticalScrollIndicator={false}
                    >
                        <VStack space={3}>
                            {tasks.length > 0 ? (
                                tasks.map((task, index) => (
                                    <Box
                                        key={task.id || index}
                                        bg="background.secondary"
                                        borderRadius="xl"
                                        p={4}
                                        borderLeftWidth={3}
                                        borderLeftColor={task.completed ? '#10B981' : '#00C3FF'}
                                    >
                                        <HStack space={3} alignItems="flex-start">
                                            <Box pt={1}>
                                                {getCategoryIcon(task.category)}
                                            </Box>
                                            <VStack flex={1} space={1}>
                                                <Text
                                                    color="text.primary"
                                                    fontSize="md"
                                                    fontWeight="semibold"
                                                    style={task.completed ? { textDecorationLine: 'line-through', opacity: 0.6 } : {}}
                                                >
                                                    {task.title}
                                                </Text>
                                                {task.description ? (
                                                    <Text color="text.tertiary" fontSize="sm">
                                                        {task.description}
                                                    </Text>
                                                ) : null}
                                                <HStack space={2} mt={2}>
                                                    <Box bg="rgba(0,195,255,0.1)" borderRadius="full" px={2} py={1}>
                                                        <Text color="accent.400" fontSize="xs">
                                                            {task.category}
                                                        </Text>
                                                    </Box>
                                                    <Box bg="rgba(16,185,129,0.1)" borderRadius="full" px={2} py={1}>
                                                        <Text color="#10B981" fontSize="xs">
                                                            +{task.xpReward} XP
                                                        </Text>
                                                    </Box>
                                                </HStack>
                                            </VStack>
                                        </HStack>
                                    </Box>
                                ))
                            ) : (
                                <Box
                                    bg="background.secondary"
                                    borderRadius="xl"
                                    p={6}
                                    alignItems="center"
                                >
                                    <Text color="text.tertiary" fontSize="md" textAlign="center">
                                        Nenhuma tarefa planejada para este dia.
                                    </Text>
                                </Box>
                            )}
                        </VStack>
                    </ScrollView>

                    {/* Footer */}
                    <Box px={4} py={4} borderTopWidth={1} borderTopColor="rgba(255,255,255,0.1)">
                        <Pressable
                            onPress={onClose}
                            bg="accent.400"
                            borderRadius="xl"
                            py={3}
                            alignItems="center"
                            _pressed={{ opacity: 0.8 }}
                        >
                            <Text color="background.primary" fontSize="md" fontWeight="bold">
                                Fechar
                            </Text>
                        </Pressable>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: '#1A1A1A',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: SCREEN_HEIGHT * 0.8,
    },
});
