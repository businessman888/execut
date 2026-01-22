import React, { useState } from 'react';
import { Box, VStack, ScrollView, Text, Pressable } from '../../components/ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { QuizHeader, QuizProgressIndicator, QuizContainer, QuizInput, AgePicker, QuizRadioGroup, HoursSlider, FeatureShowcase, BalanceSlider } from '../../components/quiz';

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
        id: 'currentSituation',
        titleLines: [
            { text: 'Sendo bem direto: Você', color: 'primary' as const },
            { text: 'está hoje em qual dessas', color: 'primary' as const },
            { text: 'situações?', color: 'accent' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'lost', label: 'Me sinto perdido', description: 'Estado Estagnado', icon: 'helpCircle' as const },
            { value: 'no_execution', label: 'Tenho ideias/não executo', description: 'Estado de procrastinação', icon: 'close' as const },
            { value: 'chaos', label: 'Algo rodando/caos', description: 'Estado de escala', icon: 'pulse' as const },
            { value: 'burnout', label: 'Escravo do negócio', description: 'Estado do Burnout', icon: 'flame' as const },
        ],
    },
    {
        id: 'hoursPerDay',
        titleLines: [
            { text: 'Quantas horas por dia', color: 'primary' as const },
            { text: 'Você Realmente', color: 'accent' as const },
            { text: 'dedica ao seu negócio?', color: 'primary' as const },
        ],
        type: 'hoursSlider',
    },
    {
        id: 'workEngineering',
        titleLines: [
            { text: 'Sua Nova', color: 'primary' as const },
            { text: 'Engenharia', color: 'accent' as const },
            { text: 'de trabalho', color: 'primary' as const },
        ],
        type: 'featureShowcase',
    },
    {
        id: 'organizationLevel',
        titleLines: [
            { text: 'Como você define o seu', color: 'primary' as const },
            { text: 'nível de organização', color: 'accent' as const },
            { text: 'pessoal hoje?', color: 'primary' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'chaos', label: 'Caos Total', description: 'Sinto que estou sempre apagando incêndios', icon: 'fireTruck' as const },
            { value: 'mental', label: 'Organização Mental', description: 'Confio na memória, mas gera ansiedade', icon: 'brain' as const },
            { value: 'tools_inconsistent', label: 'Uso ferramentas mas perco-me', description: 'Falta consistência', icon: 'construct' as const },
            { value: 'highly_organized', label: 'Altamente organizado', description: 'Processos claros e rotina otimizada', icon: 'checkmarkDone' as const },
        ],
    },
    {
        id: 'timeThief',
        titleLines: [
            { text: 'Qual é o seu maior', color: 'primary' as const },
            { text: '"ladrão de tempo"', color: 'accent' as const },
            { text: 'atualmente?', color: 'primary' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'social_media', label: 'Redes Sociais', description: 'Scrolling Infinito', icon: 'phonePortrait' as const },
            { value: 'procrastination', label: 'Procastinação', description: 'Adiar o vital', icon: 'hourglass' as const },
            { value: 'interruptions', label: 'Interrupções', description: 'Foco fragmentado', icon: 'notifications' as const },
            { value: 'meetings', label: 'Excesso de reuniões', description: 'Teoria vs Prático', icon: 'people' as const },
        ],
    },
    {
        id: 'managementTool',
        titleLines: [
            { text: 'Você utiliza alguma', color: 'primary' as const },
            { text: 'ferramenta de gestão', color: 'accent' as const },
            { text: 'hoje?', color: 'primary' as const },
        ],
        type: 'radioGroup',
        options: [
            { value: 'yes', label: 'Sim', description: '', icon: 'thumbsUp' as const },
            { value: 'no', label: 'Não', description: '', icon: 'thumbsDown' as const },
        ],
    },
    {
        id: 'consumptionVsExecution',
        titleLines: [
            { text: 'Na última semana,', color: 'primary' as const },
            { text: 'quanto tempo passou a', color: 'primary' as const },
            { text: 'consumir', color: 'accent' as const },
            { text: 'conteúdo vs a executar?', color: 'accent' as const },
        ],
        type: 'balanceSlider',
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
        // Age picker, hours slider, feature showcase and balance slider have default values, so they're always valid
        if (step.type === 'age' || step.type === 'hoursSlider' || step.type === 'featureShowcase' || step.type === 'balanceSlider') return true;

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
            case 'hoursSlider':
                return (
                    <HoursSlider
                        value={answers[step.id] || 12.5}
                        onChange={handleAnswer}
                    />
                );
            case 'featureShowcase':
                return <FeatureShowcase />;
            case 'balanceSlider':
                return (
                    <BalanceSlider
                        value={answers[step.id] || 50}
                        onChange={handleAnswer}
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
                    buttonLabel="Continuar"
                    onContinue={handleContinue}
                    isButtonDisabled={!isCurrentAnswerValid()}
                    showBack={currentStep > 0}
                    onBack={handleBack}
                    largeTitleSize={step.type === 'featureShowcase'}
                >
                    {renderStepContent()}
                </QuizContainer>
            </Box>
        </SafeAreaView>
    );
}
