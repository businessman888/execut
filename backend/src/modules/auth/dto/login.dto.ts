import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'usuario@email.com' })
    @IsEmail({}, { message: 'Email inválido' })
    email: string;

    @ApiProperty({ example: 'senha123' })
    @IsString()
    @MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
    password: string;
}
