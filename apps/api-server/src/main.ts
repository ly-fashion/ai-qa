import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });

  // Swagger配置
  const config = new DocumentBuilder()
    .setTitle('API Server')
    .setDescription('API Server Description')
    .setVersion('1.0.0')
    .addTag('ai-qa')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: 'swagger/json', // JSON文档URL
  });

  await app.listen(process.env.PORT ?? 9000);
}
void bootstrap();
