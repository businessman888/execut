import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { VStack, Text, Button, Box, Center } from '../../components/ui';
import { ProfileStackParamList } from '../../navigation/MainNavigator';

type MindsetIntroScreenRouteProp = RouteProp<ProfileStackParamList, 'MindsetIntro'>;
type MindsetIntroScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'MindsetIntro'>;

export function MindsetIntroScreen() {
    const navigation = useNavigation<MindsetIntroScreenNavigationProp>();
    const route = useRoute<MindsetIntroScreenRouteProp>();

    // We can use the category later to determine specific content if needed
    // const { category } = route.params;

    const handleContinue = () => {
        // Navigate to the article screen
        // We pass the same category, though currently the content is static for the task
        const category = route.params?.category || 'practices';
        navigation.navigate('MindsetArticle', { category });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
            <VStack flex={1} px={6} justifyContent="space-between" py={8}>

                {/* Content Central */}
                <Box flex={1} justifyContent="center" alignItems="center" px={4}>
                    <Box mb={8}>
                        <Ionicons name="bulb-outline" size={80} color="#00C3FF" />
                    </Box>

                    <Text
                        color="#FFFFFF"
                        fontSize="lg"
                        textAlign="center"
                        lineHeight={28}
                        mx={2}
                    >
                        A mentalidade alinhada supera qualquer obstáculo, não negligencie a mentalidade.
                        Aqui você terá conceitos e hacks diários de mentalidade para te ajudar a se desenvolver
                        e se manter alinhado aos seus objetivos.
                    </Text>
                </Box>

                {/* Botão de Ação */}
                <Button
                    onPress={handleContinue}
                    bg="#1A1A1A"
                    borderColor="#00C3FF"
                    variant="outline"
                    borderWidth={1}
                    rounded="full"
                    _text={{ color: "#FFFFFF", fontWeight: "600" }}
                    py={4}
                >
                    Continuar
                </Button>

            </VStack>
        </SafeAreaView>
    );
}
