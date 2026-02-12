import React, { useState } from 'react';
import { Modal, View, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box, HStack, VStack, Text, Pressable } from '../ui';
import Svg, { Path } from 'react-native-svg';

interface NotificationsModalProps {
    visible: boolean;
    onClose: () => void;
}

// Close icon
const CloseIcon = ({ size = 24, color = '#F9FAFB' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M18 6L6 18M6 6l12 12"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

interface NotificationOption {
    id: string;
    title: string;
    description: string;
    defaultValue: boolean;
}

const NOTIFICATION_OPTIONS: NotificationOption[] = [
    {
        id: 'daily_reminders',
        title: 'Lembretes diários',
        description: 'Receba lembretes para completar suas tarefas do dia',
        defaultValue: true,
    },
    {
        id: 'achievements',
        title: 'Conquistas',
        description: 'Notificações quando você desbloquear novas conquistas',
        defaultValue: true,
    },
    {
        id: 'community',
        title: 'Atualizações da comunidade',
        description: 'Novidades e atualizações do Hall da Fama',
        defaultValue: false,
    },
    {
        id: 'weekly_report',
        title: 'Relatório semanal',
        description: 'Resumo do seu progresso toda semana',
        defaultValue: true,
    },
];

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ visible, onClose }) => {
    const [preferences, setPreferences] = useState<Record<string, boolean>>(() => {
        const initial: Record<string, boolean> = {};
        NOTIFICATION_OPTIONS.forEach((opt) => {
            initial[opt.id] = opt.defaultValue;
        });
        return initial;
    });

    const togglePreference = (id: string) => {
        setPreferences((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
            <SafeAreaView style={{ flex: 1, backgroundColor: '#0D0D0D' }}>
                {/* Header */}
                <HStack
                    alignItems="center"
                    justifyContent="space-between"
                    px={4}
                    py={3}
                >
                    <Pressable onPress={onClose} p={2} _pressed={{ opacity: 0.7 }}>
                        <CloseIcon size={24} color="#F9FAFB" />
                    </Pressable>
                    <Text color="#FFFFFF" fontSize="lg" fontWeight="600">
                        Notificações
                    </Text>
                    <Box w={40} />
                </HStack>

                <VStack px={4} style={{ marginTop: 16 }} space={0}>
                    {NOTIFICATION_OPTIONS.map((option, index) => (
                        <View
                            key={option.id}
                            style={{
                                backgroundColor: '#1A1A1A',
                                paddingHorizontal: 16,
                                paddingVertical: 18,
                                borderTopLeftRadius: index === 0 ? 16 : 0,
                                borderTopRightRadius: index === 0 ? 16 : 0,
                                borderBottomLeftRadius: index === NOTIFICATION_OPTIONS.length - 1 ? 16 : 0,
                                borderBottomRightRadius: index === NOTIFICATION_OPTIONS.length - 1 ? 16 : 0,
                                borderBottomWidth: index < NOTIFICATION_OPTIONS.length - 1 ? 1 : 0,
                                borderBottomColor: '#2A2A2A',
                            }}
                        >
                            <HStack alignItems="center" justifyContent="space-between">
                                <VStack style={{ flex: 1, marginRight: 12 }}>
                                    <Text color="#FFFFFF" fontSize="md" fontWeight="500">
                                        {option.title}
                                    </Text>
                                    <Text color="#6B7280" fontSize="xs" style={{ marginTop: 2 }}>
                                        {option.description}
                                    </Text>
                                </VStack>
                                <Switch
                                    value={preferences[option.id]}
                                    onValueChange={() => togglePreference(option.id)}
                                    trackColor={{ false: '#404040', true: '#33CFFF' }}
                                    thumbColor="#FFFFFF"
                                    ios_backgroundColor="#404040"
                                />
                            </HStack>
                        </View>
                    ))}
                </VStack>
            </SafeAreaView>
        </Modal>
    );
};
