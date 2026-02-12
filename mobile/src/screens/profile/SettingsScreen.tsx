import React, { useState } from 'react';
import { View, Image as RNImage } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Box, HStack, VStack, Text, Pressable, ScrollView } from '../../components/ui';
import { ChevronBackIcon } from '../../components/icons/NavIcons';
import { useAuthStore } from '../../store/authStore';
import { useFiveYearPlan } from '../../store/goalsStore';
import { EditProfileModal } from '../../components/settings/EditProfileModal';
import { NotificationsModal } from '../../components/settings/NotificationsModal';
import Svg, { Path } from 'react-native-svg';

// ─── Icons ───────────────────────────────────────────────────────────────────

const PersonIcon = ({ size = 22, color = '#33CFFF' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
            stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
        />
        <Path
            d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
            stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
        />
    </Svg>
);

const CreditCardIcon = ({ size = 22, color = '#33CFFF' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z"
            stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
        />
        <Path d="M1 10H23" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const ClockIcon = ({ size = 22, color = '#33CFFF' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
        />
        <Path d="M12 6V12L16 14" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const BellIcon = ({ size = 22, color = '#33CFFF' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
            stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
        />
        <Path
            d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
            stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
        />
    </Svg>
);

const HelpIcon = ({ size = 22, color = '#33CFFF' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
        />
        <Path
            d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13"
            stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
        />
        <Path d="M12 17H12.01" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const ChevronRightIcon = ({ size = 20, color = '#6B7280' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M9 18L15 12L9 6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const UserPlaceholder = ({ size = 50 }: { size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
            fill="#6B7280"
        />
    </Svg>
);

// ─── Menu Row Component ──────────────────────────────────────────────────────

interface MenuRowProps {
    icon: React.ReactNode;
    label: string;
    subtitle?: string;
    onPress: () => void;
    isFirst?: boolean;
    isLast?: boolean;
    rightElement?: React.ReactNode;
}

const MenuRow: React.FC<MenuRowProps> = ({
    icon,
    label,
    subtitle,
    onPress,
    isFirst = false,
    isLast = false,
    rightElement,
}) => (
    <Pressable onPress={onPress} _pressed={{ opacity: 0.7 }}>
        <View
            style={{
                backgroundColor: '#1A1A1A',
                paddingHorizontal: 16,
                paddingVertical: 16,
                borderTopLeftRadius: isFirst ? 16 : 0,
                borderTopRightRadius: isFirst ? 16 : 0,
                borderBottomLeftRadius: isLast ? 16 : 0,
                borderBottomRightRadius: isLast ? 16 : 0,
                borderBottomWidth: isLast ? 0 : 1,
                borderBottomColor: '#2A2A2A',
            }}
        >
            <HStack alignItems="center" justifyContent="space-between">
                <HStack alignItems="center" space={3}>
                    <View
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            backgroundColor: 'rgba(51, 207, 255, 0.1)',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {icon}
                    </View>
                    <VStack>
                        <Text color="#FFFFFF" fontSize="md" fontWeight="500">
                            {label}
                        </Text>
                        {subtitle && (
                            <Text color="#33CFFF" fontSize="xs">
                                {subtitle}
                            </Text>
                        )}
                    </VStack>
                </HStack>
                {rightElement || <ChevronRightIcon />}
            </HStack>
        </View>
    </Pressable>
);

// ─── Section Header ──────────────────────────────────────────────────────────

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <Text color="#6B7280" fontSize="sm" fontWeight="500" ml={1} mb={2}>
        {title}
    </Text>
);

// ─── Settings Screen ─────────────────────────────────────────────────────────

export function SettingsScreen() {
    const navigation = useNavigation();
    const { user, profile } = useAuthStore();
    const { isPlanGenerated } = useFiveYearPlan();

    const [editProfileVisible, setEditProfileVisible] = useState(false);
    const [notificationsVisible, setNotificationsVisible] = useState(false);

    const avatarSize = 80;
    const displayName = profile?.fullName || user?.fullName || 'Usuário';
    const displayRole = isPlanGenerated ? 'Membro ativo' : 'Novo membro';

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
                    Configurações
                </Text>

                <Box w={40} />
            </HStack>

            <ScrollView
                flex={1}
                bg="background.primary"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {/* Profile Summary */}
                <View style={{ alignItems: 'center', marginTop: 8, marginBottom: 28 }}>
                    <View
                        style={{
                            width: avatarSize,
                            height: avatarSize,
                            borderRadius: avatarSize / 2,
                            borderWidth: 2,
                            borderColor: '#33CFFF',
                            overflow: 'hidden',
                            backgroundColor: '#1A1A1A',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {profile?.avatarUrl ? (
                            <RNImage
                                source={{ uri: profile.avatarUrl }}
                                style={{
                                    width: avatarSize - 4,
                                    height: avatarSize - 4,
                                    borderRadius: (avatarSize - 4) / 2,
                                }}
                                resizeMode="cover"
                            />
                        ) : (
                            <UserPlaceholder size={44} />
                        )}
                    </View>
                    <Text color="#FFFFFF" fontSize={18} fontWeight="bold" mt={2}>
                        {displayName}
                    </Text>
                    <Text color="#33CFFF" fontSize="sm">
                        {displayRole}
                    </Text>
                </View>

                <VStack px={4} space={5}>
                    {/* ── Conta ─── */}
                    <VStack>
                        <SectionHeader title="Conta" />
                        <MenuRow
                            icon={<PersonIcon />}
                            label="Informações Pessoais"
                            onPress={() => setEditProfileVisible(true)}
                            isFirst
                        />
                        <MenuRow
                            icon={<CreditCardIcon />}
                            label="Gerenciar Assinatura"
                            onPress={() => console.log('Subscription')}
                            isLast
                        />
                    </VStack>

                    {/* ── Preferências ─── */}
                    <VStack>
                        <SectionHeader title="Preferências" />
                        <MenuRow
                            icon={<BellIcon />}
                            label="Notificações"
                            onPress={() => setNotificationsVisible(true)}
                            isFirst
                            isLast
                        />
                    </VStack>

                    {/* ── Ajuda ─── */}
                    <VStack>
                        <SectionHeader title="Ajuda" />
                        <MenuRow
                            icon={<HelpIcon />}
                            label="Ajuda/FAQ"
                            onPress={() => console.log('Help')}
                            isFirst
                            isLast
                        />
                    </VStack>
                </VStack>
            </ScrollView>

            {/* Modals */}
            <EditProfileModal
                visible={editProfileVisible}
                onClose={() => setEditProfileVisible(false)}
            />
            <NotificationsModal
                visible={notificationsVisible}
                onClose={() => setNotificationsVisible(false)}
            />
        </SafeAreaView>
    );
}
