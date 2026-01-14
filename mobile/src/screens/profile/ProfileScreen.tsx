import React from 'react';
import { Box, VStack, HStack, Heading, Text, ScrollView, Avatar, Pressable, Icon, Switch, Divider, Button } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';

export function ProfileScreen() {
    const { user, logout } = useAuthStore();

    const mockProfile = {
        level: 1,
        totalXp: 150,
        tasksCompleted: 12,
        streak: 5,
        isPublic: false,
    };

    const menuItems = [
        { icon: 'person-outline', label: 'Editar Perfil', screen: 'EditProfile' },
        { icon: 'notifications-outline', label: 'Notificações', screen: 'Notifications' },
        { icon: 'heart-outline', label: 'Bem-Estar', screen: 'Wellness' },
        { icon: 'bulb-outline', label: 'Mindset', screen: 'Mindset' },
        { icon: 'settings-outline', label: 'Configurações', screen: 'Settings' },
        { icon: 'help-circle-outline', label: 'Ajuda', screen: 'Help' },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFBFC' }}>
            <ScrollView flex={1} bg="background.secondary">
                {/* Profile Header */}
                <Box bg="brand.500" px={5} pt={4} pb={8}>
                    <VStack alignItems="center">
                        <Avatar bg="white" size="xl">
                            <Text color="brand.500" fontSize="2xl" fontWeight="bold">
                                {user?.fullName?.[0] || 'E'}
                            </Text>
                        </Avatar>

                        <Heading color="white" size="lg" mt={4}>
                            {user?.fullName || 'Empreendedor'}
                        </Heading>
                        <Text color="brand.100" mt={1}>
                            {user?.email}
                        </Text>

                        <HStack space={8} mt={6}>
                            <VStack alignItems="center">
                                <Text color="white" fontWeight="bold" fontSize="2xl">
                                    {mockProfile.level}
                                </Text>
                                <Text color="brand.100" fontSize="xs">
                                    Nível
                                </Text>
                            </VStack>

                            <VStack alignItems="center">
                                <Text color="white" fontWeight="bold" fontSize="2xl">
                                    {mockProfile.totalXp}
                                </Text>
                                <Text color="brand.100" fontSize="xs">
                                    XP
                                </Text>
                            </VStack>

                            <VStack alignItems="center">
                                <Text color="white" fontWeight="bold" fontSize="2xl">
                                    {mockProfile.streak}
                                </Text>
                                <Text color="brand.100" fontSize="xs">
                                    Streak
                                </Text>
                            </VStack>
                        </HStack>
                    </VStack>
                </Box>

                {/* Public Profile Toggle */}
                <Box bg="white" mx={5} mt={-4} borderRadius="xl" p={4}>
                    <HStack justifyContent="space-between" alignItems="center">
                        <VStack>
                            <Text color="text.primary" fontWeight="medium">
                                Perfil Público
                            </Text>
                            <Text color="text.secondary" fontSize="xs">
                                Apareça no Hall da Fama
                            </Text>
                        </VStack>
                        <Switch colorScheme="brand" isChecked={mockProfile.isPublic} />
                    </HStack>
                </Box>

                {/* Menu Items */}
                <Box bg="white" mx={5} mt={4} borderRadius="xl" overflow="hidden">
                    {menuItems.map((item, index) => (
                        <React.Fragment key={item.screen}>
                            <Pressable>
                                <HStack px={4} py={4} alignItems="center" justifyContent="space-between">
                                    <HStack space={3} alignItems="center">
                                        <Icon as={Ionicons} name={item.icon as any} color="text.secondary" size="md" />
                                        <Text color="text.primary">{item.label}</Text>
                                    </HStack>
                                    <Icon as={Ionicons} name="chevron-forward" color="gray.400" size="sm" />
                                </HStack>
                            </Pressable>
                            {index < menuItems.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </Box>

                {/* Logout Button */}
                <Box px={5} mt={6} mb={8}>
                    <Button
                        variant="outline"
                        colorScheme="red"
                        leftIcon={<Icon as={Ionicons} name="log-out-outline" />}
                        onPress={logout}
                    >
                        Sair da Conta
                    </Button>
                </Box>
            </ScrollView>
        </SafeAreaView>
    );
}
