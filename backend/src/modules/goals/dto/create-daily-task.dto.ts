import { IsString, IsUUID, IsOptional, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDailyTaskDto {
    @ApiProperty()
    @IsUUID()
    userId: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    weeklyPlanId?: string;

    @ApiProperty({ example: 'Pesquisar 10 nichos de interesse' })
    @IsString()
    title: string;

    @ApiPropertyOptional({ example: 'Usar Google Trends e Ubersuggest' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: '2026-01-15' })
    @IsDateString()
    scheduledDate: string;

    @ApiPropertyOptional({ example: 10 })
    @IsOptional()
    @IsNumber()
    xpReward?: number;
}
