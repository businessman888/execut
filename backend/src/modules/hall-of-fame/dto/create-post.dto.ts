import { IsString, IsUUID, IsEnum, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum PostType {
    MILESTONE = 'milestone',
    REFLECTION = 'reflection',
    ACHIEVEMENT = 'achievement',
}

export class CreatePostDto {
    @ApiProperty()
    @IsUUID()
    userId: string;

    @ApiProperty({ example: 'Completei minha primeira semana de tarefas!' })
    @IsString()
    @MaxLength(1000)
    content: string;

    @ApiProperty({ enum: PostType })
    @IsEnum(PostType)
    postType: PostType;
}
