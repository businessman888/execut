import React from 'react';
import { Box, Text, VStack, HStack, ScrollView } from '../ui';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

const TESTIMONIALS = [
    {
        id: '1',
        name: 'Fábio Ricardo',
        age: '28 anos',
        quote: '"A melhor coisa da minha vida foi ter descoberto a Execut, consegui alcançar todos os meus objetivos profissionais em menos de 4 meses, 10M de patrimônio"',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Placeholder
        verified: true,
    },
    {
        id: '2',
        name: 'Mariana Silva',
        age: '32 anos',
        quote: '"Graças a metodologia, dobrei meu faturamento e tenho mais tempo livre. Liberdade geográfica real!"',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Placeholder
        verified: true,
    },
];

export const Testimonials: React.FC = () => {
    return (
        <VStack flex={1} w="100%" pt={10} pb={4}>

            {/* Header */}
            <VStack alignItems="center" space={4} mb={8}>
                {/* Logo Placeholder - User requested "X" logo, simulating with text/icon for now if no asset */}
                <Ionicons name="hourglass-outline" size={60} color="white" />

                <VStack alignItems="center">
                    <Text color="#FFFFFF" fontSize="3xl" fontWeight="bold" textAlign="center">
                        Quem já domina a
                    </Text>
                    <Text color="#00C3FF" fontSize="3xl" fontWeight="bold" textAlign="center">
                        execução
                    </Text>
                </VStack>

                <HStack alignItems="center" space={2}>
                    <Ionicons name="leaf-outline" size={24} color="#00C3FF" style={{ transform: [{ scaleX: -1 }] }} />
                    <Text color="#FFFFFF" fontSize="sm" fontWeight="bold">
                        +12.000 empreendedores
                    </Text>
                    <Ionicons name="leaf-outline" size={24} color="#00C3FF" />
                </HStack>
                <Text color="#FFFFFF" fontSize="sm">
                    escalando com o modo <Text color="#00C3FF" fontWeight="bold">Execut</Text>
                </Text>
            </VStack>

            {/* Testimonial Scroll */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
                snapToInterval={CARD_WIDTH + 16}
                decelerationRate="fast"
            >
                {TESTIMONIALS.map((item) => (
                    <Box
                        key={item.id}
                        w={CARD_WIDTH}
                        h={400}
                        mr={4}
                        borderRadius={24}
                        overflow="hidden"
                        position="relative"
                        borderWidth={1}
                        borderColor="rgba(0, 195, 255, 0.3)"
                    >
                        <Image
                            source={{ uri: item.image }}
                            style={{ width: '100%', height: '100%' }}
                            contentFit="cover"
                        />
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.9)']}
                            style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                bottom: 0,
                                height: '60%',
                            }}
                        />

                        <VStack
                            position="absolute"
                            bottom={0}
                            left={0}
                            right={0}
                            p={6}
                            space={2}
                        >
                            <HStack alignItems="center" space={3}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={{ width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: '#00C3FF' }}
                                />
                                <VStack>
                                    <HStack alignItems="center" space={1}>
                                        <Text color="#00C3FF" fontWeight="bold" fontSize="md">
                                            {item.name}
                                        </Text>
                                        {item.verified && (
                                            <Ionicons name="checkmark-circle" size={16} color="#00C3FF" />
                                        )}
                                    </HStack>
                                    <Text color="#9CA3AF" fontSize="xs">
                                        {item.age}
                                    </Text>
                                </VStack>
                            </HStack>

                            <Box
                                bg="rgba(0, 195, 255, 0.1)"
                                p={3}
                                borderRadius={12}
                                borderWidth={1}
                                borderColor="rgba(0, 195, 255, 0.2)"
                            >
                                <Text color="#E5E7EB" fontSize="sm" fontStyle="italic">
                                    {item.quote}
                                </Text>
                            </Box>
                        </VStack>
                    </Box>
                ))}
            </ScrollView>

        </VStack>
    );
};
