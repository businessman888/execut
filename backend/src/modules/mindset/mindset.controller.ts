import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MindsetService } from './mindset.service';

@ApiTags('mindset')
@ApiBearerAuth()
@Controller('mindset')
export class MindsetController {
    constructor(private readonly mindsetService: MindsetService) { }

    @Get('vision/:userId')
    @ApiOperation({ summary: 'Obter visão do futuro eu' })
    async getVision(@Param('userId') userId: string) {
        return this.mindsetService.getVision(userId);
    }

    @Post('vision/:userId')
    @ApiOperation({ summary: 'Criar/atualizar visão do futuro eu' })
    async saveVision(
        @Param('userId') userId: string,
        @Body() body: {
            futureDescription: string;
            lifestyle: string;
            achievements: string;
            habits: string[];
            values: string[];
            imageUrl?: string;
        },
    ) {
        return this.mindsetService.saveVision(userId, body);
    }
}
