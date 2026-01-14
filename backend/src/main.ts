import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    // Security
    app.use(helmet());

    // CORS
    app.enableCors({
        origin: true,
        credentials: true,
    });

    // Global validation pipe
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );

    // API prefix
    app.setGlobalPrefix('api/v1');

    // Swagger documentation
    const config = new DocumentBuilder()
        .setTitle('Execut API')
        .setDescription('API para App de Gestão de Objetivos para Empreendedores Digitais')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('auth', 'Autenticação e autorização')
        .addTag('users', 'Gestão de usuários')
        .addTag('goals', 'Gestão de metas e objetivos')
        .addTag('planning', 'Planejamento de 5 anos')
        .addTag('gamification', 'Sistema de XP, níveis e conquistas')
        .addTag('hall-of-fame', 'Feed social público')
        .addTag('wellness', 'Tracking de bem-estar')
        .addTag('mindset', 'Visão do futuro eu')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    // Start server
    const port = configService.get<number>('PORT', 3000);
    await app.listen(port);

    console.log(`🚀 Execut API running on: http://localhost:${port}`);
    console.log(`📚 Swagger docs: http://localhost:${port}/docs`);
}

bootstrap();
