import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get(':id')
    @ApiOperation({ summary: 'Obter perfil de usuário' })
    async getProfile(@Param('id') id: string) {
        return this.usersService.getProfile(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualizar perfil' })
    async updateProfile(
        @Param('id') id: string,
        @Body() updateProfileDto: UpdateProfileDto,
    ) {
        return this.usersService.updateProfile(id, updateProfileDto);
    }

    @Get(':id/stats')
    @ApiOperation({ summary: 'Obter estatísticas do usuário' })
    async getStats(@Param('id') id: string) {
        return this.usersService.getStats(id);
    }
}
