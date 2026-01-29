import React from 'react';
import { Box, Text, VStack, HStack } from '../ui';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;

// X Logo Component
const XLogo = ({ size = 50 }: { size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 50 50">
        <Path
            d="M10 10L25 25M25 25L40 10M25 25L10 40M25 25L40 40"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
        />
    </Svg>
);

// Laurel/Leaf decoration component
const LaurelLeaf = ({ flipped = false }: { flipped?: boolean }) => (
    <Text
        color="#00C3FF"
        fontSize={20}
        style={{ transform: flipped ? [{ scaleX: -1 }] : [] }}
    >
        🌿
    </Text>
);

const TESTIMONIALS = [
    {
        id: '1',
        name: 'Fábio Ricardo',
        age: '28 anos',
        quote: '"A melhor coisa da minha vida foi ter descoberto a Execut, consegui alcançar todos os meus objetivos profissionais em menos de 4 meses. 10M de patrimônio"',
        backgroundImage: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // City bar/restaurant
        avatarImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', // Person
        verified: true,
    },
    {
        id: '2',
        name: 'Mariana Silva',
        age: '32 anos',
        quote: '"Graças ao Execut, consegui transformar minha vida e agora tenho liberdade geográfica. M de dóis que antes só sonhava"',
        backgroundImage: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // City buildings
        avatarImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', // Person
        verified: true,
    },
];

export const Testimonials: React.FC = () => {
    return (
        <ScrollView
            style={{ flex: 1, width: '100%' }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        >
            <VStack flex={1} w="100%" alignItems="center">

                {/* X Logo */}
                <Box mt={4} mb={6}>
                    <XLogo size={50} />
                </Box>

                {/* Header Text */}
                <VStack alignItems="center" space={0} mb={4}>
                    <Text color="#FFFFFF" fontSize={22} fontWeight="600" textAlign="center">
                        Quem já domina a
                    </Text>
                    <Text color="#00C3FF" fontSize={22} fontWeight="600" textAlign="center">
                        execução
                    </Text>
                </VStack>

                {/* Stats with laurels */}
                <VStack alignItems="center" space={1} mb={6}>
                    <HStack alignItems="center" space={2}>
                        <MaterialCommunityIcons name="leaf" size={20} color="#00C3FF" style={{ transform: [{ scaleX: -1 }, { rotate: '-45deg' }] }} />
                        <Text color="#FFFFFF" fontSize={14} fontWeight="bold">
                            +12.000 empreendedores
                        </Text>
                        <MaterialCommunityIcons name="leaf" size={20} color="#00C3FF" style={{ transform: [{ rotate: '45deg' }] }} />
                    </HStack>
                    <HStack alignItems="center" space={1}>
                        <Text color="#FFFFFF" fontSize={14}>
                            escalando com o modo
                        </Text>
                        <Text color="#00C3FF" fontSize={14} fontWeight="bold">
                            Execut
                        </Text>
                    </HStack>
                </VStack>

                {/* Testimonial Cards - Horizontal Scroll */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 10 }}
                    snapToInterval={CARD_WIDTH + 12}
                    snapToStart={true}
                    decelerationRate="fast"
                    style={{ flexGrow: 0, marginBottom: 30 }}
                    contentOffset={{ x: 0, y: 0 }}
                >
                    {TESTIMONIALS.map((item, index) => (
                        <Box
                            key={item.id}
                            w={CARD_WIDTH}
                            h={280}
                            mr={3}
                            borderRadius={20}
                            overflow="hidden"
                            position="relative"
                            borderWidth={1}
                            borderColor="rgba(0, 195, 255, 0.3)"
                        >
                            {/* Background Image - City/Location */}
                            <Image
                                source={{ uri: item.backgroundImage }}
                                style={{ width: '100%', height: '100%' }}
                                contentFit="cover"
                            />

                            {/* Gradient Overlay */}
                            <LinearGradient
                                colors={['transparent', 'rgba(0,0,0,0.85)']}
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    height: '70%',
                                }}
                            />

                            {/* Content Overlay */}
                            <VStack
                                position="absolute"
                                bottom={0}
                                left={0}
                                right={0}
                                p={4}
                                space={3}
                            >
                                {/* Profile Info */}
                                <HStack alignItems="center" space={2}>
                                    <Image
                                        source={{ uri: item.avatarImage }}
                                        style={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: 18,
                                            borderWidth: 2,
                                            borderColor: '#00C3FF'
                                        }}
                                    />
                                    <VStack space={0}>
                                        <HStack alignItems="center" space={1}>
                                            <Text color="#00C3FF" fontWeight="bold" fontSize={14}>
                                                {item.name}
                                            </Text>
                                            {item.verified && (
                                                <Ionicons name="checkmark-circle" size={14} color="#00C3FF" />
                                            )}
                                        </HStack>
                                        <Text color="#9CA3AF" fontSize={11}>
                                            {item.age}
                                        </Text>
                                    </VStack>
                                </HStack>

                                {/* Quote Box */}
                                <Box
                                    bg="rgba(0, 195, 255, 0.15)"
                                    p={3}
                                    borderRadius={12}
                                    borderWidth={1}
                                    borderColor="rgba(0, 195, 255, 0.25)"
                                >
                                    <Text color="#E5E7EB" fontSize={12} lineHeight={18}>
                                        {item.quote}
                                    </Text>
                                </Box>
                            </VStack>
                        </Box>
                    ))}
                </ScrollView>

            </VStack>
        </ScrollView>
    );
};
