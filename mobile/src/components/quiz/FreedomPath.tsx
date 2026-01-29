import React from 'react';
import { Box, Text, VStack, HStack, ScrollView } from '../ui';

export const FreedomPath: React.FC = () => {
    return (
        <ScrollView
            flex={1}
            w="100%"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        >
            <VStack flex={1} space={0} alignItems="center" w="100%">
                {/* Header Section - smaller text */}
                <VStack alignItems="center" space={0} mt={4} mb={8}>
                    <Text color="#FFFFFF" fontSize={22} fontWeight="500">
                        Caminho para a
                    </Text>
                    <Text color="#00C3FF" fontSize={22} fontWeight="500">
                        Liberdade
                    </Text>
                </VStack>

                {/* Path Visualization - Timeline from Estado 01 to Estado 05 */}
                <Box w="100%" px={4} mb={6}>
                    {/* Main container for the path */}
                    <Box position="relative" h={80}>
                        {/* Horizontal line connecting the states */}
                        <Box
                            position="absolute"
                            top={8}
                            left={8}
                            right={8}
                            h={2}
                            bg="#00C3FF"
                            borderRadius={1}
                        />

                        {/* Left Circle - Estado 01 */}
                        <Box position="absolute" top={0} left={0}>
                            <Box
                                w={18}
                                h={18}
                                borderRadius={9}
                                bg="#00C3FF"
                            />
                        </Box>

                        {/* Right Circle - Estado 05 */}
                        <Box position="absolute" top={0} right={0}>
                            <Box
                                w={18}
                                h={18}
                                borderRadius={9}
                                bg="#00C3FF"
                            />
                        </Box>

                        {/* Labels below the line */}
                        <HStack
                            position="absolute"
                            top={28}
                            left={0}
                            right={0}
                            justifyContent="space-between"
                        >
                            {/* Estado 01 Label */}
                            <VStack alignItems="flex-start">
                                <Text color="#6B7280" fontSize={11}>
                                    Estado 01
                                </Text>
                                <Text color="#FFFFFF" fontSize={14} fontWeight="600">
                                    Caos Atual
                                </Text>
                            </VStack>

                            {/* Estado 05 Label */}
                            <VStack alignItems="flex-end">
                                <Text color="#6B7280" fontSize={11} textAlign="right">
                                    Estado 05
                                </Text>
                                <Text color="#FFFFFF" fontSize={14} fontWeight="600" textAlign="right">
                                    Liberdade
                                </Text>
                                <Text color="#FFFFFF" fontSize={14} fontWeight="600" textAlign="right">
                                    Geográfica
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>
                </Box>

                {/* Insight Description with vertical cyan line */}
                <HStack w="100%" px={4} mb={6}>
                    {/* Vertical cyan line */}
                    <Box
                        w={3}
                        bg="#00C3FF"
                        borderRadius={2}
                        mr={4}
                        style={{ minHeight: 80 }}
                    />
                    {/* Description text */}
                    <Text
                        color="#9CA3AF"
                        fontSize={14}
                        lineHeight={22}
                        style={{ flex: 1 }}
                    >
                        Cada tarefa no app é um  degrau{'\n'}
                        calculado para atingir sua visão de 5{'\n'}
                        anos. Transformando seus sonhos em{'\n'}
                        um plano de ação artemático.
                    </Text>
                </HStack>

                {/* Metrics Cards */}
                <HStack space={3} w="100%" px={0}>
                    {/* Route Precision Card */}
                    <Box
                        flex={1}
                        bg="#111111"
                        borderRadius={16}
                        p={4}
                        borderWidth={1}
                        borderColor="#222222"
                    >
                        <Text color="#6B7280" fontSize={11} mb={3}>
                            Precisão de Rota
                        </Text>
                        <Text color="#00C3FF" fontSize={28} fontWeight="bold">
                            99.8%
                        </Text>
                    </Box>

                    {/* Risk Factor Card */}
                    <Box
                        flex={1}
                        bg="#111111"
                        borderRadius={16}
                        p={4}
                        borderWidth={1}
                        borderColor="#222222"
                    >
                        <Text color="#6B7280" fontSize={11} mb={3}>
                            Fator de Risco
                        </Text>
                        <Text color="#FFFFFF" fontSize={28} fontWeight="bold">
                            Mínimo
                        </Text>
                    </Box>
                </HStack>

            </VStack>
        </ScrollView>
    );
};
