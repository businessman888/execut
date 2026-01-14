import { IsEmail, IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
    @ApiProperty({ example: 'usuario@email.com' })
    @IsEmail({}, { message: 'Email inválido' })
    email: string;

    @ApiProperty({ example: 'senha123' })
    @IsString()
    @MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
        message: 'Senha deve conter letras e números',
    })
    password: string;

    @ApiProperty({ example: 'João Silva' })
    @IsString()
    @MinLength(2, { message: 'Nome deve ter no mínimo 2 caracteres' })
    @MaxLength(100, { message: 'Nome deve ter no máximo 100 caracteres' })
    fullName: string;
}
