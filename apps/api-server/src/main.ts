import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import 'tsconfig-paths/register';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });

  // 配置CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // 前端开发服务器端口
    credentials: true, // 允许携带cookie
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // 全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 过滤掉DTO中未定义的属性
      forbidNonWhitelisted: true, // 如果传入未定义属性则抛出错误
      transform: true, // 自动转换类型
    }),
  );

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
