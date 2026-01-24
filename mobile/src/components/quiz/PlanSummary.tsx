import React from 'react';
import { Box, Text, VStack, HStack, ScrollView } from '../ui';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface PlanSummaryProps {
    userName?: string;
    goalAmount?: string;
}

export const PlanSummary: React.FC<PlanSummaryProps> = ({
    userName = "Patrik",
    goalAmount = "30k"
}) => {
    return (
        <ScrollView
            flex={1}
            w="100%"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 }}
        >
            <VStack space={6} alignItems="center" w="100%">

                {/* Header Section */}
                <VStack alignItems="flex-start" w="100%" space={1} px={2}>
                    <Text color="#FFFFFF" fontSize="3xl" fontWeight="bold">
                        Seu Plano para <Text color="#00C3FF">R$</Text>
                    </Text>
                    <Text color="#00C3FF" fontSize="3xl" fontWeight="bold">
                        {goalAmount}/mês <Text color="#FFFFFF">está pronto,</Text>
                    </Text>
                    <Text color="#FFFFFF" fontSize="3xl" fontWeight="bold">
                        {userName}
                    </Text>
                </VStack>

                {/* Route Badge */}
                <Box
                    bg="rgba(0, 195, 255, 0.1)"
                    px={4}
                    py={2}
                    borderRadius={20}
                    borderWidth={1}
                    borderColor="rgba(0, 195, 255, 0.3)"
                    alignSelf="flex-start"
                    ml={2}
                >
                    <HStack space={2} alignItems="center">
                        <Box w={2} h={2} borderRadius={4} bg="#00C3FF" />
                        <Text color="#00C3FF" fontSize="sm" fontWeight="600">
                            Rota: Alinhamento
                        </Text>
                    </HStack>
                </Box>

                {/* Projection Card */}
                <Box
                    w="100%"
                    bg="#0D0D0D"
                    borderRadius={24}
                    p={5}
                    borderWidth={1}
                    borderColor="#222"
                    h={300}
                >
                    <VStack alignItems="flex-start" mb={4}>
                        <Text color="#6B7280" fontSize="xs">
                            Projeção de escala
                        </Text>
                        <HStack alignItems="baseline" space={2}>
                            <Text color="#FFFFFF" fontSize="2xl" fontWeight="bold">
                                R$ 30.000<Text color="#FFFFFF" fontSize="sm" fontWeight="400">/mês</Text>
                            </Text>
                            <Text color="#00C3FF" fontSize="lg" fontWeight="bold">
                                +450%
                            </Text>
                        </HStack>
                        <Text color="#6B7280" fontSize="xs">
                            em 6 meses
                        </Text>
                    </VStack>

                    {/* Graph Area */}
                    <Box flex={1} w="100%" justifyContent="flex-end" pb={2} position="relative">
                        <Svg width="100%" height={150} viewBox="0 0 300 150">
                            <Defs>
                                <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                                    <Stop offset="0" stopColor="#00C3FF" stopOpacity="0.5" />
                                    <Stop offset="1" stopColor="#00C3FF" stopOpacity="0" />
                                </LinearGradient>
                            </Defs>
                            {/* Curve Line */}
                            <Path
                                d="M0,140 C100,140 150,100 300,20"
                                fill="none"
                                stroke="#00C3FF"
                                strokeWidth="2"
                            />
                            {/* Start Point */}
                            <Box position="absolute" left={-5} bottom={5} w={3} h={3} borderRadius={6} bg="#00C3FF" />
                            {/* End Point */}
                        </Svg>
                        {/* Manual dots positioning since SVG absolute mix is tricky, purely visual approximation */}
                        <Box position="absolute" left={0} bottom={10} w={2} h={2} borderRadius={4} bg="#00C3FF" />
                        <Box position="absolute" right={0} top={30} w={2} h={2} borderRadius={4} bg="#00C3FF" />
                    </Box>

                    <HStack w="100%" justifyContent="space-between" mt={2}>
                        <Text color="#6B7280" fontSize="xs">
                            Estado Atual
                        </Text>
                        <Text color="#00C3FF" fontSize="xs">
                            Meta Alcançada
                        </Text>
                    </HStack>
                </Box>

                {/* AI Insights Card */}
                <Box
                    w="100%"
                    bg="#0D0D0D"
                    borderRadius={24}
                    p={1}
                    borderWidth={1}
                    borderColor="#00C3FF"
                >
                    <Box bg="rgba(0, 195, 255, 0.05)" p={5} borderRadius={23}>
                        <HStack space={2} alignItems="center" mb={6}>
                            <Ionicons name="bulb" size={20} color="#00C3FF" />
                            <Text color="#00C3FF" fontSize="sm" fontWeight="bold">
                                AI INSIGHTS DE PERFORMANCE
                            </Text>
                        </HStack>

                        <VStack space={6}>
                            {/* Focus */}
                            <HStack space={4}>
                                <MaterialCommunityIcons name="target" size={24} color="#00C3FF" />
                                <VStack>
                                    <Text color="#6B7280" fontSize="xs">Foco Principal</Text>
                                    <Text color="#FFFFFF" fontSize="sm" fontWeight="bold">Exterminar Procrastinação</Text>
                                </VStack>
                            </HStack>

                            {/* Rhythm */}
                            <HStack space={4}>
                                <MaterialCommunityIcons name="lightning-bolt" size={24} color="#00C3FF" />
                                <VStack>
                                    <Text color="#6B7280" fontSize="xs">Ritmo Definido</Text>
                                    <Text color="#FFFFFF" fontSize="sm" fontWeight="bold">Modo Extremo</Text>
                                </VStack>
                            </HStack>

                            {/* Complexity */}
                            <HStack space={4}>
                                <Ionicons name="speedometer-outline" size={24} color="#00C3FF" />
                                <VStack>
                                    <Text color="#6B7280" fontSize="xs">Complexidade</Text>
                                    <Text color="#FFFFFF" fontSize="sm" fontWeight="bold">Alta Precisão Analítica</Text>
                                </VStack>
                            </HStack>
                        </VStack>
                    </Box>
                </Box>

                {/* Action Timeline */}
                <VStack w="100%" alignItems="flex-start" space={4}>
                    <Text color="#FFFFFF" fontSize="lg" fontWeight="bold" ml={2}>
                        Cronograma de Ação
                    </Text>

                    {/* Month 01 */}
                    <Box
                        w="100%"
                        bg="#0D0D0D"
                        borderRadius={16}
                        p={5}
                        borderWidth={1}
                        borderColor="#333"
                    >
                        <HStack justifyContent="space-between" alignItems="center" mb={6}>
                            <Text color="#00C3FF" fontSize="md" fontWeight="bold">
                                Mês 01: Fundamentos
                            </Text>
                            <Box bg="rgba(0, 195, 255, 0.2)" px={3} py={1} borderRadius={8}>
                                <Text color="#00C3FF" fontSize="xs" fontWeight="bold">Ativo</Text>
                            </Box>
                        </HStack>

                        <VStack space={4}>
                            <HStack space={3} alignItems="center">
                                <Ionicons name="checkmark-circle-outline" size={24} color="#00C3FF" />
                                <Text color="#FFFFFF" fontSize="sm">Primeira Alavancagem de Oferta</Text>
                            </HStack>
                            <HStack space={3} alignItems="center">
                                <Ionicons name="radio-button-off" size={24} color="#6B7280" />
                                <Text color="#FFFFFF" fontSize="sm">Ajuste de Fluxo de Caixa Operacional</Text>
                            </HStack>
                        </VStack>
                    </Box>

                    {/* Month 02 */}
                    <Box
                        w="100%"
                        bg="#0D0D0D"
                        borderRadius={16}
                        p={5}
                        borderWidth={1}
                        borderColor="#1A1A1A"
                        opacity={0.7}
                    >
                        <HStack justifyContent="space-between" alignItems="center" mb={4}>
                            <Text color="#9CA3AF" fontSize="md" fontWeight="bold">
                                Mês 02: Escala Acelerada
                            </Text>
                            <Ionicons name="lock-closed" size={16} color="#6B7280" />
                        </HStack>

                        {/* Skeleton loader lines */}
                        <VStack space={4}>
                            <HStack space={3} alignItems="center">
                                <Box w={5} h={5} borderRadius={10} borderWidth={1} borderColor="#333" />
                                <Box h={4} w="60%" bg="#1A1A1A" borderRadius={4} />
                            </HStack>
                            <HStack space={3} alignItems="center">
                                <Box w={5} h={5} borderRadius={10} borderWidth={1} borderColor="#333" />
                                <Box h={4} w="80%" bg="#1A1A1A" borderRadius={4} />
                            </HStack>
                        </VStack>
                    </Box>

                    {/* Month 03 */}
                    <Box
                        w="100%"
                        bg="#0D0D0D"
                        borderRadius={16}
                        p={5}
                        borderWidth={1}
                        borderColor="#1A1A1A"
                        opacity={0.7}
                    >
                        <HStack justifyContent="space-between" alignItems="center" mb={4}>
                            <Text color="#9CA3AF" fontSize="md" fontWeight="bold">
                                Mês 03: Domínio de Mercado
                            </Text>
                            <Ionicons name="lock-closed" size={16} color="#6B7280" />
                        </HStack>

                        <VStack space={4}>
                            <HStack space={3} alignItems="center">
                                <Box w={5} h={5} borderRadius={10} borderWidth={1} borderColor="#333" />
                                <Box h={4} w="65%" bg="#1A1A1A" borderRadius={4} />
                            </HStack>
                            <HStack space={3} alignItems="center">
                                <Box w={5} h={5} borderRadius={10} borderWidth={1} borderColor="#333" />
                                <Box h={4} w="75%" bg="#1A1A1A" borderRadius={4} />
                            </HStack>
                        </VStack>
                    </Box>

                </VStack>

            </VStack>
        </ScrollView>
    );
};
