import { IsString, IsNumber, IsEnum, IsUUID, IsOptional, IsObject, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================
// ENUMS
// ============================================

export enum ProfessionalSituation {
    CLT = 'clt',
    UNEMPLOYED = 'unemployed',
    FREELANCER = 'freelancer',
    DIGITAL_ENTREPRENEUR_DISORGANIZED = 'digital_entrepreneur_disorganized',
    ESTABLISHED_BUSINESS = 'established_business',
}

export enum StartingPoint {
    LOST = 'lost',
    NO_EXECUTION = 'no_execution',
    CHAOS = 'chaos',
    SLAVE = 'slave',
    TRANSITION = 'transition',
}

export enum QuizRoute {
    A = 'A', // Resgate de Clareza
    B = 'B', // Alinhamento de Performance
    HYBRID = 'hybrid',
}

// ============================================
// QUIZ RESPONSE DTO (30 perguntas)
// ============================================

export class QuizResponseDto {
    @ApiProperty({ description: 'User ID' })
    @IsUUID()
    userId: string;

    // === FASE 1: Identificação Básica ===

    @ApiProperty({ description: 'Nome do usuário' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Idade do usuário' })
    @IsNumber()
    @Min(18)
    @Max(99)
    age: number;

    @ApiProperty({ enum: ProfessionalSituation, description: 'Pergunta 3: Situação profissional' })
    @IsEnum(ProfessionalSituation)
    professionalSituation: ProfessionalSituation;

    // === PERGUNTA DIVISÓRIA DE ROTAS ===

    @ApiProperty({ enum: StartingPoint, description: 'Pergunta 4: Ponto de partida' })
    @IsEnum(StartingPoint)
    startingPoint: StartingPoint;

    @ApiProperty({ enum: QuizRoute, description: 'Rota determinada (A, B ou híbrida)' })
    @IsEnum(QuizRoute)
    route: QuizRoute;

    // === RESPOSTAS DAS ROTAS (5-12) ===

    @ApiProperty({
        description: 'Respostas das perguntas 5-12 da rota',
        example: {
            mainBlock: 'lack_of_method',
            consumptionTrap: '1h_2h',
            failureProjection: 'same_place',
            directionClarity: 'know_exactly',
            realAvailability: '2h_4h',
            initialCapital: '500_2000',
            naturalSkills: 'creativity',
            changeFuel: 'financial_situation',
        }
    })
    @IsObject()
    routeResponses: Record<string, string>;

    // === FASE 3: Auditoria Comportamental (13-18) ===

    @ApiProperty({
        description: 'Respostas da auditoria comportamental',
        example: {
            personalIntegrity: '1_2_times',
            screenTime: '1h_2h',
            abandonmentRate: '5_6',
            focusCapacity: 'with_effort',
            procrastinationRoot: 'fear_of_failure',
            realAmbition: '6_7',
        }
    })
    @IsObject()
    behavioralAudit: Record<string, string>;

    // === FASE 4: Biohacking e Energia (19-25) ===

    @ApiProperty({
        description: 'Respostas de biohacking',
        example: {
            energyLevel: 'medium',
            sleepQuality: '6h_7h_energy_6_7',
            sunExposure: 'sometimes',
            physicalActivity: '2_3_times',
            dopamineAddictions: 'one_occasionally',
            bodyCare: 'try_but_neglect',
            mentalState: 'generally_organized',
        }
    })
    @IsObject()
    biohackingResponses: Record<string, string>;

    // === FASE 5: Visão de 5 Anos (26-30) ===

    @ApiProperty({
        description: 'Respostas da visão de 5 anos',
        example: {
            arrivalMoment: 'high_standard_house',
            netWorthTarget: '1m_3m',
            monthlyIncomeTarget: '50k_100k',
            killerHabit: 'procrastination',
            planSpeed: 'balanced',
        }
    })
    @IsObject()
    vision5Years: Record<string, string>;

    // === CAMPOS CALCULADOS ===

    @ApiPropertyOptional({ description: 'Meta financeira em 5 anos (extraída de vision5Years)' })
    @IsNumber()
    @IsOptional()
    financialGoal5Years?: number;

    @ApiPropertyOptional({ description: 'Renda atual (extraída das respostas de rota B)' })
    @IsNumber()
    @IsOptional()
    currentIncome?: number;
}
