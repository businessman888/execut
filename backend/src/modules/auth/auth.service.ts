import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(private readonly supabase: SupabaseService) { }

    async signUp(signUpDto: SignUpDto) {
        const { email, password, fullName } = signUpDto;

        const { data, error } = await this.supabase.admin.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });

        if (error) {
            throw new BadRequestException(error.message);
        }

        // Create profile in profiles table
        if (data.user) {
            await this.supabase.admin.from('profiles').insert({
                id: data.user.id,
                email: data.user.email,
                full_name: fullName,
                current_level: 1,
                total_xp: 0,
                is_public: false,
            });
        }

        return {
            message: 'Conta criada com sucesso. Verifique seu email.',
            user: data.user,
        };
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const { data, error } = await this.supabase.client.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        return {
            user: data.user,
            session: data.session,
        };
    }

    async logout(token: string) {
        if (!token) {
            throw new UnauthorizedException('Token não fornecido');
        }

        const { error } = await this.supabase.client.auth.signOut();

        if (error) {
            throw new BadRequestException(error.message);
        }

        return { message: 'Logout realizado com sucesso' };
    }

    async getUser(token: string) {
        if (!token) {
            throw new UnauthorizedException('Token não fornecido');
        }

        const { data, error } = await this.supabase.client.auth.getUser(token);

        if (error) {
            throw new UnauthorizedException('Token inválido');
        }

        // Get profile data
        const { data: profile } = await this.supabase.admin
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

        return {
            user: data.user,
            profile,
        };
    }
}
