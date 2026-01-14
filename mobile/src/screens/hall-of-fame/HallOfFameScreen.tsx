import React from 'react';
import { Box, VStack, HStack, Heading, Text, ScrollView, Pressable, Avatar, Icon, Fab } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export function HallOfFameScreen() {
    const mockPosts = [
        {
            id: '1',
            user: { name: 'João Silva', level: 3, avatar: null },
            type: 'milestone',
            content: 'Consegui meus primeiros 10 clientes! 🎉 Muito feliz com o progresso dessa semana.',
            likes: 24,
            createdAt: '2h atrás',
        },
        {
            id: '2',
            user: { name: 'Maria Santos', level: 5, avatar: null },
            type: 'reflection',
            content: 'Aprendizado da semana: consistência é mais importante que perfeição. Comecei a acordar 5h todos os dias e minha produtividade triplicou.',
            likes: 45,
            createdAt: '5h atrás',
        },
        {
            id: '3',
            user: { name: 'Pedro Costa', level: 2, avatar: null },
            type: 'achievement',
            content: 'Desbloqueei o achievement "Guerreiro Semanal"! 7 dias de streak 🔥',
            likes: 18,
            createdAt: '1d atrás',
        },
    ];

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'milestone': return 'flag';
            case 'reflection': return 'bulb';
            case 'achievement': return 'trophy';
            default: return 'chatbubble';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'milestone': return 'brand.500';
            case 'reflection': return 'purple.500';
            case 'achievement': return 'amber.500';
            default: return 'gray.500';
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFBFC' }}>
            <Box flex={1} bg="background.secondary">
                <Box px={5} pt={4} pb={4}>
                    <Heading size="xl" color="text.primary">
                        Hall da Fama
                    </Heading>
                    <Text color="text.secondary" mt={1}>
                        Inspire-se com outros empreendedores
                    </Text>
                </Box>

                <ScrollView flex={1} px={5}>
                    <VStack space={4} mb={20}>
                        {mockPosts.map((post) => (
                            <Box
                                key={post.id}
                                bg="white"
                                p={5}
                                borderRadius="2xl"
                                borderLeftWidth={4}
                                borderLeftColor={getTypeColor(post.type)}
                            >
                                <HStack space={3} alignItems="center" mb={3}>
                                    <Avatar bg="brand.500" size="sm">
                                        {post.user.name[0]}
                                    </Avatar>
                                    <VStack flex={1}>
                                        <Text color="text.primary" fontWeight="bold">
                                            {post.user.name}
                                        </Text>
                                        <HStack space={1} alignItems="center">
                                            <Icon as={Ionicons} name="star" color="amber.500" size="xs" />
                                            <Text color="text.secondary" fontSize="xs">
                                                Nível {post.user.level} • {post.createdAt}
                                            </Text>
                                        </HStack>
                                    </VStack>
                                    <Icon as={Ionicons} name={getTypeIcon(post.type)} color={getTypeColor(post.type)} size="sm" />
                                </HStack>

                                <Text color="text.primary" lineHeight="lg">
                                    {post.content}
                                </Text>

                                <HStack mt={4} alignItems="center">
                                    <Pressable>
                                        <HStack space={2} alignItems="center">
                                            <Icon as={Ionicons} name="heart-outline" color="gray.400" size="sm" />
                                            <Text color="text.secondary" fontSize="sm">
                                                {post.likes}
                                            </Text>
                                        </HStack>
                                    </Pressable>
                                </HStack>
                            </Box>
                        ))}
                    </VStack>
                </ScrollView>

                <Fab
                    renderInPortal={false}
                    shadow={4}
                    size="lg"
                    bg="brand.500"
                    icon={<Icon as={Ionicons} name="add" color="white" size="lg" />}
                    onPress={() => console.log('Create post')}
                />
            </Box>
        </SafeAreaView>
    );
}
