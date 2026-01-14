import { IsString, IsNumber, IsEnum, IsUUID, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum ProfessionalSituation {
    CLT = 'clt',
    FREELANCER = 'freelancer',
    EARLY_ENTREPRENEUR = 'early_entrepreneur',
    ESTABLISHED_ENTREPRENEUR = 'established_entrepreneur',
    STUDENT = 'student',
}

export enum ExperienceLevel {
    NONE = 'none',
    BEGINNER = 'beginner',
    INTERMEDIATE = 'intermediate',
    ADVANCED = 'advanced',
}

export enum BusinessArea {
    INFOPRODUCTS = 'infoproducts',
    ECOMMERCE = 'ecommerce',
    DIGITAL_SERVICES = 'digital_services',
    SAAS = 'saas',
    CONSULTING = 'consulting',
    CONTENT_CREATION = 'content_creation',
    OTHER = 'other',
}

export class QuizResponseDto {
    @ApiProperty()
    @IsUUID()
    userId: string;

    @ApiProperty({ enum: ProfessionalSituation })
    @IsEnum(ProfessionalSituation)
    professionalSituation: ProfessionalSituation;

    @ApiProperty({ example: 50000 })
    @IsNumber()
    @Min(1000)
    financialGoal5Years: number;

    @ApiProperty({ example: 5000 })
    @IsNumber()
    @Min(0)
    currentIncome: number;

    @ApiProperty({ example: '3-4h' })
    @IsString()
    availableTime: string;

    @ApiProperty({ enum: ExperienceLevel })
    @IsEnum(ExperienceLevel)
    experienceLevel: ExperienceLevel;

    @ApiProperty({ enum: BusinessArea })
    @IsEnum(BusinessArea)
    businessArea: BusinessArea;

    @ApiProperty({ example: '1k-5k' })
    @IsString()
    initialInvestment: string;

    @ApiProperty({ example: 'lack_of_focus' })
    @IsString()
    biggestChallenge: string;

    @ApiProperty({ example: 'inconsistent' })
    @IsString()
    currentHabits: string;

    @ApiProperty({ example: 'financial_freedom' })
    @IsString()
    mainMotivation: string;
}
