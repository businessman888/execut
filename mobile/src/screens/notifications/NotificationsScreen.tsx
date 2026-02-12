import React from 'react';
import { View, Image as RNImage } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Box, HStack, VStack, Text, Pressable, ScrollView } from '../../components/ui';
import { ChevronBackIcon } from '../../components/icons/NavIcons';
import Svg, { Path, Circle } from 'react-native-svg';

// ─── Icons ───────────────────────────────────────────────────────────────────

const TrophyIcon = ({ size = 20, color = '#F59E0B' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M8 21H16M12 17V21M17 4V2H7V4M17 4H20C20.5 4 21 4.5 21 5V7C21 9.21 19.21 11 17 11M17 4H7M7 4H4C3.5 4 3 4.5 3 5V7C3 9.21 4.79 11 7 11M12 15C9.24 15 7 12.76 7 10V4H17V10C17 12.76 14.76 15 12 15Z"
            stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
        />
    </Svg>
);

const FlashIcon = ({ size = 20, color = '#33CFFF' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
            stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
        />
    </Svg>
);

const CheckCircleIcon = ({ size = 20, color = '#10B981' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85782 7.69279 2.71537 9.79619 2.24014C11.8996 1.7649 14.1003 1.98232 16.07 2.85999"
            stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
        />
        <Path d="M22 4L12 14.01L9 11.01" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const FireIcon = ({ size = 20, color = '#FF6B35' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 22C16.4183 22 20 18.4183 20 14C20 8 12 2 12 2C12 2 4 8 4 14C4 18.4183 7.58172 22 12 22Z"
            stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
        />
        <Path
            d="M12 22C14.2091 22 16 20.2091 16 18C16 14 12 10 12 10C12 10 8 14 8 18C8 20.2091 9.79086 22 12 22Z"
            stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
        />
    </Svg>
);

const MegaphoneIcon = ({ size = 20, color = '#A78BFA' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M21 15C21 15 22 13 22 10C22 7 21 5 21 5M18 12.5C18 12.5 18.5 11.5 18.5 10C18.5 8.5 18 7.5 18 7.5"
            stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
        />
        <Path
            d="M3 10V14C3 14.5304 3.21071 15.0391 3.58579 15.4142C3.96086 15.7893 4.46957 16 5 16H6L9 21H11L9 16H12L15 18V2L12 4H5C4.46957 4 3.96086 4.21071 3.58579 4.58579C3.21071 4.96086 3 5.46957 3 6V10Z"
            stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
        />
    </Svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────

type NotificationType = 'achievement' | 'task' | 'streak' | 'system' | 'community';

interface MockNotification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    time: string;
    isRead: boolean;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_NOTIFICATIONS: MockNotification[] = [
    {
        id: '1',
        type: 'achievement',
        title: 'Nova Conquista Desbloqueada! 🏆',
        message: 'Você completou 7 dias consecutivos de tarefas. Parabéns!',
        time: '2 min atrás',
        isRead: false,
    },
    {
        id: '2',
        type: 'task',
        title: 'Tarefas do dia',
        message: 'Você tem 4 tarefas pendentes para hoje. Comece agora!',
        time: '15 min atrás',
        isRead: false,
    },
    {
        id: '3',
        type: 'streak',
        title: 'Streak em risco! 🔥',
        message: 'Complete pelo menos uma tarefa hoje para manter sua sequência de 12 dias.',
        time: '1h atrás',
        isRead: false,
    },
    {
        id: '4',
        type: 'system',
        title: 'Novo mês disponível',
        message: 'O planejamento de Março já está disponível. Confira seus objetivos!',
        time: '3h atrás',
        isRead: true,
    },
    {
        id: '5',
        type: 'community',
        title: 'Atualização do ranking',
        message: 'Você subiu para a posição #15 no Hall da Fama. Continue assim!',
        time: '5h atrás',
        isRead: true,
    },
    {
        id: '6',
        type: 'achievement',
        title: 'Nível 3 alcançado! ⚡',
        message: 'Você acumulou XP suficiente para subir de nível. +50 XP bônus!',
        time: '1 dia atrás',
        isRead: true,
    },
    {
        id: '7',
        type: 'task',
        title: 'Semana completa',
        message: 'Você completou todas as tarefas da semana passada. Resultado excelente!',
        time: '2 dias atrás',
        isRead: true,
    },
    {
        id: '8',
        type: 'system',
        title: 'Bem-vindo ao Execut!',
        message: 'Seu plano de 5 anos foi criado com sucesso. Vamos começar!',
        time: '3 dias atrás',
        isRead: true,
    },
];

// ─── Notification Card ────────────────────────────────────────────────────────

const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
        case 'achievement': return <TrophyIcon />;
        case 'task': return <CheckCircleIcon />;
        case 'streak': return <FireIcon />;
        case 'system': return <FlashIcon />;
        case 'community': return <MegaphoneIcon />;
    }
};

const getNotificationColor = (type: NotificationType) => {
    switch (type) {
        case 'achievement': return 'rgba(245, 158, 11, 0.15)';
        case 'task': return 'rgba(16, 185, 129, 0.15)';
        case 'streak': return 'rgba(255, 107, 53, 0.15)';
        case 'system': return 'rgba(51, 207, 255, 0.15)';
        case 'community': return 'rgba(167, 139, 250, 0.15)';
    }
};

interface NotificationCardProps {
    notification: MockNotification;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => (
    <Pressable _pressed={{ opacity: 0.7 }} onPress={() => console.log('Notification tap', notification.id)}>
        <HStack
            space={3}
            alignItems="flex-start"
            p={4}
            bg="#1A1A1A"
            borderRadius={16}
            style={{
                borderLeftWidth: notification.isRead ? 0 : 3,
                borderLeftColor: '#33CFFF',
            }}
        >
            {/* Icon */}
            <View
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    backgroundColor: getNotificationColor(notification.type),
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 2,
                }}
            >
                {getNotificationIcon(notification.type)}
            </View>

            {/* Content */}
            <VStack style={{ flex: 1 }}>
                <HStack justifyContent="space-between" alignItems="flex-start">
                    <Text
                        color={notification.isRead ? '#9CA3AF' : '#FFFFFF'}
                        fontSize="md"
                        fontWeight={notification.isRead ? '400' : '600'}
                        style={{ flex: 1, marginRight: 8 }}
                    >
                        {notification.title}
                    </Text>
                    {!notification.isRead && (
                        <View
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: '#33CFFF',
                                marginTop: 6,
                            }}
                        />
                    )}
                </HStack>
                <Text
                    color={notification.isRead ? '#6B7280' : '#9CA3AF'}
                    fontSize="sm"
                    style={{ marginTop: 2 }}
                >
                    {notification.message}
                </Text>
                <Text color="#6B7280" fontSize="xs" style={{ marginTop: 6 }}>
                    {notification.time}
                </Text>
            </VStack>
        </HStack>
    </Pressable>
);

// ─── Notifications Screen ─────────────────────────────────────────────────────

export function NotificationsScreen() {
    const navigation = useNavigation();

    const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.isRead).length;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0D0D0D' }}>
            <StatusBar style="light" />

            {/* Header */}
            <HStack
                alignItems="center"
                justifyContent="space-between"
                px={4}
                py={3}
                w="100%"
            >
                <Pressable
                    onPress={() => navigation.goBack()}
                    p={2}
                    borderRadius="full"
                    _pressed={{ opacity: 0.7 }}
                >
                    <ChevronBackIcon size={24} color="#F9FAFB" />
                </Pressable>

                <Text color="#FFFFFF" fontSize="lg" fontWeight="600">
                    Notificações
                </Text>

                <Box w={40} />
            </HStack>

            {/* Unread Badge */}
            {unreadCount > 0 && (
                <HStack px={5} mb={3} alignItems="center" space={2}>
                    <View
                        style={{
                            backgroundColor: '#33CFFF',
                            borderRadius: 12,
                            paddingHorizontal: 10,
                            paddingVertical: 4,
                        }}
                    >
                        <Text color="#0D0D0D" fontSize="xs" fontWeight="bold">
                            {unreadCount} nova{unreadCount > 1 ? 's' : ''}
                        </Text>
                    </View>
                    <Pressable _pressed={{ opacity: 0.7 }} onPress={() => console.log('Mark all read')}>
                        <Text color="#33CFFF" fontSize="xs">
                            Marcar todas como lidas
                        </Text>
                    </Pressable>
                </HStack>
            )}

            <ScrollView
                flex={1}
                bg="background.primary"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16 }}
            >
                <VStack space={3}>
                    {MOCK_NOTIFICATIONS.map((notification) => (
                        <NotificationCard
                            key={notification.id}
                            notification={notification}
                        />
                    ))}
                </VStack>
            </ScrollView>
        </SafeAreaView>
    );
}
