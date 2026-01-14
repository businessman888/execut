import { Controller, Post, Body, Get, UseGuards, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    @ApiOperation({ summary: 'Criar nova conta' })
    @ApiResponse({ status: 201, description: 'Conta criada com sucesso' })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    async signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Fazer login' })
    @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
    @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('logout')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Fazer logout' })
    async logout(@Headers('authorization') authHeader: string) {
        const token = authHeader?.replace('Bearer ', '');
        return this.authService.logout(token);
    }

    @Get('me')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Obter usuário autenticado' })
    async getMe(@Headers('authorization') authHeader: string) {
        const token = authHeader?.replace('Bearer ', '');
        return this.authService.getUser(token);
    }
}
