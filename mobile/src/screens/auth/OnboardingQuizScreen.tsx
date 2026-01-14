import React, { useState } from 'react';
import { Box, VStack, Heading, Text, Button, Progress, Radio, Input, Center, ScrollView } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

const QUIZ_QUESTIONS = [
    {
        id: 'professionalSituation',
        question: 'Qual sua situação profissional atual?',
        type: 'radio',
        options: [
            { value: 'clt', label: 'CLT (Empregado)' },
            { value: 'freelancer', label: 'Freelancer' },
            { value: 'early_entrepreneur', label: 'Empreendedor Iniciante' },
            { value: 'established_entrepreneur', label: 'Empreendedor com Negócio' },
            { value: 'student', label: 'Estudante' },
        ],
    },
    {
        id: 'financialGoal5Years',
        question: 'Qual sua meta de renda mensal em 5 anos?',
        type: 'number',
        placeholder: 'Ex: 50000',
    },
    {
        id: 'currentIncome',
        question: 'Qual sua renda mensal atual?',
        type: 'number',
        placeholder: 'Ex: 5000',
    },
    {
        id: 'availableTime',
        question: 'Quantas horas por dia você pode dedicar?',
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
        question: 'Qual seu nível de experiência em empreendedorismo?',
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
        question: 'Em qual área você quer empreender?',
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
        question: 'O que mais te motiva a empreender?',
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

    const question = QUIZ_QUESTIONS[currentStep];
    const progress = ((currentStep + 1) / QUIZ_QUESTIONS.length) * 100;

    const handleAnswer = (value: any) => {
        setAnswers((prev) => ({ ...prev, [question.id]: value }));
    };

    const handleNext = () => {
        if (currentStep < QUIZ_QUESTIONS.length - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            // Submit quiz
            console.log('Quiz answers:', answers);
            // TODO: Navigate to plan generation
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#131F54' }}>
            <Box flex={1} bg="brand.500">
                <VStack px={6} py={4}>
                    <Progress value={progress} colorScheme="cyan" bg="brand.400" />
                    <Text color="white" fontSize="sm" mt={2}>
                        Pergunta {currentStep + 1} de {QUIZ_QUESTIONS.length}
                    </Text>
                </VStack>

                <ScrollView flex={1}>
                    <Box bg="white" mx={4} borderRadius="2xl" p={6} mt={4}>
                        <Heading size="md" color="brand.600" mb={6}>
                            {question.question}
                        </Heading>

                        {question.type === 'radio' && (
                            <Radio.Group
                                name={question.id}
                                value={answers[question.id] || ''}
                                onChange={handleAnswer}
                            >
                                <VStack space={3}>
                                    {question.options?.map((opt) => (
                                        <Radio key={opt.value} value={opt.value} colorScheme="brand">
                                            {opt.label}
                                        </Radio>
                                    ))}
                                </VStack>
                            </Radio.Group>
                        )}

                        {question.type === 'number' && (
                            <Input
                                placeholder={question.placeholder}
                                value={answers[question.id]?.toString() || ''}
                                onChangeText={(val) => handleAnswer(Number(val))}
                                keyboardType="numeric"
                                size="lg"
                                leftElement={<Text pl={4} color="gray.500">R$</Text>}
                            />
                        )}

                        <VStack space={3} mt={8}>
                            <Button
                                onPress={handleNext}
                                bg="brand.500"
                                _pressed={{ bg: 'brand.600' }}
                                isDisabled={!answers[question.id]}
                            >
                                {currentStep === QUIZ_QUESTIONS.length - 1 ? 'Finalizar' : 'Próximo'}
                            </Button>

                            {currentStep > 0 && (
                                <Button variant="ghost" onPress={handleBack}>
                                    Voltar
                                </Button>
                            )}
                        </VStack>
                    </Box>
                </ScrollView>
            </Box>
        </SafeAreaView>
    );
}
