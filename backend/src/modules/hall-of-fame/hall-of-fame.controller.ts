import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { HallOfFameService } from './hall-of-fame.service';
import { CreatePostDto } from './dto/create-post.dto';

@ApiTags('hall-of-fame')
@ApiBearerAuth()
@Controller('hall-of-fame')
export class HallOfFameController {
    constructor(private readonly hallOfFameService: HallOfFameService) { }

    @Get('posts')
    @ApiOperation({ summary: 'Listar posts públicos' })
    async getPosts(@Query('page') page = 1, @Query('limit') limit = 20) {
        return this.hallOfFameService.getPosts(page, limit);
    }

    @Post('posts')
    @ApiOperation({ summary: 'Criar novo post' })
    async createPost(@Body() dto: CreatePostDto) {
        return this.hallOfFameService.createPost(dto);
    }

    @Post('posts/:id/like')
    @ApiOperation({ summary: 'Curtir post' })
    async likePost(@Param('id') postId: string, @Body('userId') userId: string) {
        return this.hallOfFameService.toggleLike(postId, userId);
    }

    @Get('users/:id')
    @ApiOperation({ summary: 'Ver perfil público de usuário' })
    async getUserProfile(@Param('id') userId: string) {
        return this.hallOfFameService.getPublicProfile(userId);
    }
}
