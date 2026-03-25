import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemModule } from './modules/system/system.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    CatsModule,
    SystemModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      host: '192.168.122.129',
      port: 3306,
      username: 'root',
      password: '112358@Ly',
      database: 'ai-qa',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 自动加载实体
      synchronize: true, // 开发环境：自动同步数据库结构（生产环境禁用！）
      logging: true, // 打印 SQL 日志
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
