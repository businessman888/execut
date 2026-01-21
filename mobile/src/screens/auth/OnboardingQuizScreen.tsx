import React, { useState } from 'react';
import { Box, VStack, ScrollView, Text, Pressable } from '../../components/ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { QuizHeader, QuizProgressIndicator, QuizContainer, QuizInput, AgePicker, QuizRadioGroup } from '../../components/quiz';

// Quiz step definitions
const QUIZ_STEPS = [
    {
        id: 'name',
        titleLines: [
            { text: 'Antes de traçarmos', color: 'primary' as const },
            { text: 'seu plano:', color: 'accent' as const },
            { text: 'Como devemos te chamar?', color: 'primary' as const },
        ],
        type: 'text',
        placeholder: 'Digite seu nome ou codinome...',
    },
    {
        id: 'age',
        titleLines: [
            { text: 'Quantos anos você', color: 'primary' as const },
            { text: 'tem hoje?', color: 'primary' as const },
        ],
        type: 'age',
    },
    {
        id: 'professionalSituation',
        titleLines: [
            { text: 'Qual é a sua', color: 'primary' as const },
            { text: 'situação', color: 'accent' as const },
            { text: 'Profissional atual?', color: 'primary' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'clt', label: 'Empregado / CLT', description: 'Regime corporativo fixo', icon: 'briefcase' as const },
            { value: 'transition', label: 'Transição de carreira', description: 'Buscando novos horizontes e pivotagem.', icon: 'arrows' as const },
            { value: 'founder', label: 'Empreendedor/Founder', description: 'Construindo e gerindo negócio próprio', icon: 'rocket' as const },
            { value: 'freelancer', label: 'Autônomo/Freelancer', description: 'Operando como unidade independente', icon: 'person' as const },
            { value: 'executive', label: 'Executivo/C-Level', description: 'Liderança estratégica e alta gestão', icon: 'chart' as const },
        ],
    },
    {
        id: 'financialGoal5Years',
        titleLines: [
            { text: 'Qual sua meta de', color: 'primary' as const },
            { text: 'renda mensal', color: 'accent' as const },
            { text: 'em 5 anos?', color: 'primary' as const },
        ],
        type: 'number',
        placeholder: 'Ex: 50000',
    },
    {
        id: 'currentIncome',
        titleLines: [
            { text: 'Qual sua', color: 'primary' as const },
            { text: 'renda mensal', color: 'accent' as const },
            { text: 'atual?', color: 'primary' as const },
        ],
        type: 'number',
        placeholder: 'Ex: 5000',
    },
    {
        id: 'availableTime',
        titleLines: [
            { text: 'Quantas horas por dia', color: 'primary' as const },
            { text: 'você pode dedicar', color: 'accent' as const },
            { text: 'ao seu desenvolvimento?', color: 'primary' as const },
        ],
        type: 'radio',
        options: [
            { value: '1-2h', label: '1-2 horas' },
            { value: '3-4h', label: '3-4 horas' },
            { value: '5-6h', label: '5-6 horas' },
            { value: '7-8h', label: '7-8 horas' },
            { value: 'full-time', label: 'Tempo integral' },
        ],
    },
    {
        id: 'experienceLevel',
        titleLines: [
            { text: 'Qual seu nível de', color: 'primary' as const },
            { text: 'experiência', color: 'accent' as const },
            { text: 'em empreendedorismo?', color: 'primary' as const },
        ],
        type: 'radio',
        options: [
            { value: 'none', label: 'Nenhuma experiência' },
            { value: 'beginner', label: 'Iniciante' },
            { value: 'intermediate', label: 'Intermediário' },
            { value: 'advanced', label: 'Avançado' },
        ],
    },
    {
        id: 'businessArea',
        titleLines: [
            { text: 'Em qual área você', color: 'primary' as const },
            { text: 'quer empreender?', color: 'accent' as const },
        ],
        type: 'radio',
        options: [
            { value: 'infoproducts', label: 'Infoprodutos' },
            { value: 'ecommerce', label: 'E-commerce' },
            { value: 'digital_services', label: 'Serviços Digitais' },
            { value: 'saas', label: 'SaaS' },
            { value: 'consulting', label: 'Consultoria' },
            { value: 'content_creation', label: 'Criação de Conteúdo' },
        ],
    },
    {
        id: 'mainMotivation',
        titleLines: [
            { text: 'O que mais te', color: 'primary' as const },
            { text: 'motiva', color: 'accent' as const },
            { text: 'a empreender?', color: 'primary' as const },
        ],
        type: 'radio',
        options: [
            { value: 'financial_freedom', label: 'Liberdade financeira' },
            { value: 'autonomy', label: 'Autonomia e liberdade' },
            { value: 'impact', label: 'Impacto social' },
            { value: 'personal_achievement', label: 'Realização pessoal' },
            { value: 'legacy', label: 'Deixar um legado' },
        ],
    },
];

export function OnboardingQuizScreen() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});

    const step = QUIZ_STEPS[currentStep];
    const totalSteps = QUIZ_STEPS.length;

    // Calculate XP earned (5 XP per completed step)
    const earnedXP = currentStep * 5 + 50; // Base 50 XP + 5 per step

    const handleAnswer = (value: any) => {
        setAnswers((prev) => ({ ...prev, [step.id]: value }));
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleContinue = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            // Quiz completed - submit answers
            console.log('Quiz completed:', answers);
            // TODO: Navigate to next screen (auth or home)
        }
    };

    const isCurrentAnswerValid = () => {
        // Age picker has a default value, so it's always valid
        if (step.type === 'age') return true;

        const answer = answers[step.id];
        if (!answer) return false;
        if (typeof answer === 'string' && answer.trim() === '') return false;
        return true;
    };

    const renderStepContent = () => {
        switch (step.type) {
            case 'text':
                return (
                    <QuizInput
                        value={answers[step.id] || ''}
                        onChangeText={handleAnswer}
                        placeholder={step.placeholder}
                    />
                );
            case 'number':
                return (
                    <QuizInput
                        value={answers[step.id]?.toString() || ''}
                        onChangeText={(val) => handleAnswer(val)}
                        placeholder={step.placeholder}
                    />
                );
            case 'radio':
                return (
                    <VStack space={2}>
                        {step.options?.map((option) => {
                            const isSelected = answers[step.id] === option.value;
                            return (
                                <Pressable
                                    key={option.value}
                                    onPress={() => handleAnswer(option.value)}
                                >
                                    <Box
                                        bg={isSelected ? 'surface.secondary' : 'transparent'}
                                        borderWidth={1}
                                        borderColor={isSelected ? 'accent.400' : 'border.default'}
                                        borderRadius={12}
                                        px={4}
                                        py={3}
                                    >
                                        <Box
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {/* Radio circle */}
                                            <Box
                                                w={20}
                                                h={20}
                                                borderRadius={10}
                                                borderWidth={2}
                                                borderColor={isSelected ? 'accent.400' : 'border.default'}
                                                alignItems="center"
                                                justifyContent="center"
                                                mr={3}
                                            >
                                                {isSelected && (
                                                    <Box
                                                        w={10}
                                                        h={10}
                                                        borderRadius={5}
                                                        bg="accent.400"
                                                    />
                                                )}
                                            </Box>
                                            {/* Option label */}
                                            <Text
                                                color={isSelected ? 'accent.400' : 'text.primary'}
                                                fontSize="md"
                                            >
                                                {option.label}
                                            </Text>
                                        </Box>
                                    </Box>
                                </Pressable>
                            );
                        })}
                    </VStack>
                );
            case 'radioGroup':
                return (
                    <QuizRadioGroup
                        options={step.options as any}
                        value={answers[step.id]}
                        onChange={handleAnswer}
                    />
                );
            case 'age':
                return (
                    <AgePicker
                        value={answers[step.id] || 26}
                        onChange={handleAnswer}
                        minAge={14}
                        maxAge={80}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0D0D0D' }}>
            <StatusBar style="light" />
            <Box flex={1} bg="background.primary" px={5}>
                {/* Header */}
                <VStack space={2} pt={2}>
                    <QuizHeader xpAmount={earnedXP} />
                    <QuizProgressIndicator
                        currentStep={currentStep + 1}
                        totalSteps={totalSteps}
                    />
                </VStack>

                {/* Quiz Content */}
                <QuizContainer
                    titleLines={step.titleLines}
                    buttonLabel={currentStep === totalSteps - 1 ? 'Finalizar' : 'Continuar'}
                    onContinue={handleContinue}
                    isButtonDisabled={!isCurrentAnswerValid()}
                    showBack={currentStep > 0}
                    onBack={handleBack}
                >
                    {renderStepContent()}
                </QuizContainer>
            </Box>
        </SafeAreaView>
    );
}
