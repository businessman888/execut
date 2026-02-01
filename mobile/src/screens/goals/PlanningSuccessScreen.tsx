import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useGoalsStore } from '../../store/goalsStore';
import { GeneratedPlan } from '../../types/planning';

const { width } = Dimensions.get('window');

// Tipos de navegação
type PlanningSuccessParams = {
    planId: string;
    plan: GeneratedPlan;
};

type RootStackParamList = {
    PlanningSuccess: PlanningSuccessParams;
    MainTabs: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'PlanningSuccess'>;

export default function PlanningSuccessScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteProp<RootStackParamList, 'PlanningSuccess'>>();
    const { planId, plan } = route.params;

    const { setGeneratedPlan } = useGoalsStore();

    // Animações
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const chartAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Salvar plano no store
        setGeneratedPlan(planId, plan);

        // Animar entrada
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 8,
                useNativeDriver: true,
            }),
            Animated.timing(chartAnim, {
                toValue: 1,
                duration: 1000,
                delay: 400,
                useNativeDriver: false,
            }),
        ]).start();
    }, []);

    const handleStartJourney = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'MainTabs' }],
        });
    };

    // Dados para o gráfico de projeção
    const chartData = plan.vision_5_years.map((year) => ({
        year: year.year,
        revenue: year.revenue_target,
        phase: year.phase,
    }));

    const maxRevenue = Math.max(...chartData.map((d) => d.revenue));

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header com celebração */}
                <Animated.View
                    style={[
                        styles.header,
                        {
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}
                >
                    <View style={styles.iconContainer}>
                        <LinearGradient
                            colors={['#00C3FF', '#0066FF']}
                            style={styles.iconGradient}
                        >
                            <Ionicons name="rocket" size={48} color="#FFF" />
                        </LinearGradient>
                    </View>
                    <Text style={styles.title}>Plano Gerado!</Text>
                    <Text style={styles.subtitle}>
                        Sua jornada de 5 anos foi criada com sucesso
                    </Text>
                </Animated.View>

                {/* Visão Statement */}
                <Animated.View style={[styles.visionCard, { opacity: fadeAnim }]}>
                    <Text style={styles.visionLabel}>SUA VISÃO</Text>
                    <Text style={styles.visionText}>{plan.vision_statement}</Text>
                </Animated.View>

                {/* Gráfico de Projeção */}
                <Animated.View style={[styles.chartContainer, { opacity: chartAnim }]}>
                    <Text style={styles.sectionTitle}>Projeção de Faturamento</Text>
                    <View style={styles.chart}>
                        {chartData.map((data, index) => {
                            const barHeight = (data.revenue / maxRevenue) * 150;
                            return (
                                <Animated.View
                                    key={data.year}
                                    style={styles.chartBar}
                                >
                                    <Text style={styles.chartValue}>
                                        R$ {(data.revenue / 1000).toFixed(0)}k
                                    </Text>
                                    <Animated.View
                                        style={[
                                            styles.bar,
                                            {
                                                height: chartAnim.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [0, barHeight],
                                                }),
                                                backgroundColor:
                                                    index === 0 ? '#00C3FF' : '#1A4A5C',
                                            },
                                        ]}
                                    />
                                    <Text style={styles.chartLabel}>
                                        Ano {data.year}
                                    </Text>
                                    <Text style={styles.chartPhase}>{data.phase}</Text>
                                </Animated.View>
                            );
                        })}
                    </View>
                </Animated.View>

                {/* Resumo do Mês 01 */}
                <Animated.View style={[styles.monthSummary, { opacity: fadeAnim }]}>
                    <View style={styles.monthHeader}>
                        <Ionicons name="calendar" size={24} color="#00C3FF" />
                        <Text style={styles.monthTitle}>Fevereiro - Mês 01</Text>
                        <View style={styles.activeBadge}>
                            <Text style={styles.activeBadgeText}>ATIVO</Text>
                        </View>
                    </View>

                    <Text style={styles.monthFocus}>{plan.month_01_detail.focus}</Text>

                    <View style={styles.weeksContainer}>
                        {plan.month_01_detail.weeks.slice(0, 2).map((week) => (
                            <View key={week.week_number} style={styles.weekCard}>
                                <View style={styles.weekHeader}>
                                    <Text style={styles.weekNumber}>
                                        Semana {week.week_number}
                                    </Text>
                                    <Text style={styles.weekDate}>{week.date_range}</Text>
                                </View>
                                <Text style={styles.weekTitle}>{week.title}</Text>
                                <Text style={styles.taskCount}>
                                    {week.daily_tasks.reduce(
                                        (acc, day) => acc + day.tasks.length,
                                        0
                                    )}{' '}
                                    tarefas programadas
                                </Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.moreWeeks}>
                        <Text style={styles.moreWeeksText}>
                            + {plan.month_01_detail.weeks.length - 2} semanas restantes
                        </Text>
                    </View>
                </Animated.View>

                {/* Estatísticas rápidas */}
                <Animated.View style={[styles.statsContainer, { opacity: fadeAnim }]}>
                    <View style={styles.statCard}>
                        <Ionicons name="flag" size={24} color="#00C3FF" />
                        <Text style={styles.statValue}>5</Text>
                        <Text style={styles.statLabel}>Anos</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Ionicons name="calendar" size={24} color="#FFD700" />
                        <Text style={styles.statValue}>12</Text>
                        <Text style={styles.statLabel}>Meses (Ano 1)</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Ionicons name="checkmark-circle" size={24} color="#00FF88" />
                        <Text style={styles.statValue}>
                            {plan.month_01_detail.weeks.reduce(
                                (acc, week) =>
                                    acc +
                                    week.daily_tasks.reduce(
                                        (dayAcc, day) => dayAcc + day.tasks.length,
                                        0
                                    ),
                                0
                            )}
                        </Text>
                        <Text style={styles.statLabel}>Tarefas (Mês 1)</Text>
                    </View>
                </Animated.View>

                {/* Botão de ação */}
                <TouchableOpacity
                    style={styles.startButton}
                    onPress={handleStartJourney}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={['#00C3FF', '#0066FF']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.startButtonGradient}
                    >
                        <Text style={styles.startButtonText}>Começar Jornada</Text>
                        <Ionicons name="arrow-forward" size={24} color="#FFF" />
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0A0A',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    iconContainer: {
        marginBottom: 16,
    },
    iconGradient: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#8A8A8A',
        textAlign: 'center',
    },
    visionCard: {
        backgroundColor: '#1A1A1A',
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#00C3FF33',
    },
    visionLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#00C3FF',
        letterSpacing: 1.5,
        marginBottom: 12,
    },
    visionText: {
        fontSize: 18,
        color: '#FFFFFF',
        lineHeight: 26,
        fontWeight: '500',
    },
    chartContainer: {
        backgroundColor: '#1A1A1A',
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    chart: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        height: 200,
    },
    chartBar: {
        alignItems: 'center',
        flex: 1,
    },
    chartValue: {
        fontSize: 10,
        color: '#8A8A8A',
        marginBottom: 8,
    },
    bar: {
        width: 40,
        borderRadius: 8,
        minHeight: 20,
    },
    chartLabel: {
        fontSize: 12,
        color: '#FFFFFF',
        marginTop: 8,
        fontWeight: '600',
    },
    chartPhase: {
        fontSize: 8,
        color: '#8A8A8A',
        marginTop: 2,
        textTransform: 'uppercase',
    },
    monthSummary: {
        backgroundColor: '#1A1A1A',
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
    },
    monthHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    monthTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        marginLeft: 12,
        flex: 1,
    },
    activeBadge: {
        backgroundColor: '#00C3FF22',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    activeBadgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#00C3FF',
        letterSpacing: 1,
    },
    monthFocus: {
        fontSize: 14,
        color: '#8A8A8A',
        marginBottom: 16,
    },
    weeksContainer: {
        gap: 12,
    },
    weekCard: {
        backgroundColor: '#0A0A0A',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#2A2A2A',
    },
    weekHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    weekNumber: {
        fontSize: 12,
        fontWeight: '600',
        color: '#00C3FF',
    },
    weekDate: {
        fontSize: 12,
        color: '#8A8A8A',
    },
    weekTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    taskCount: {
        fontSize: 12,
        color: '#8A8A8A',
    },
    moreWeeks: {
        alignItems: 'center',
        marginTop: 12,
    },
    moreWeeksText: {
        fontSize: 12,
        color: '#00C3FF',
        fontWeight: '500',
    },
    statsContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 32,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 28,
        fontWeight: '700',
        color: '#FFFFFF',
        marginTop: 8,
    },
    statLabel: {
        fontSize: 10,
        color: '#8A8A8A',
        marginTop: 4,
        textAlign: 'center',
    },
    startButton: {
        borderRadius: 40,
        overflow: 'hidden',
    },
    startButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        paddingHorizontal: 32,
        gap: 12,
    },
    startButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
    },
});
