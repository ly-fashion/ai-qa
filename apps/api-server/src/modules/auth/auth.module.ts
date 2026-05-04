import { Module } from '@nestjs/common';
import { UserModule } from '../system/user/user.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
})
export class AuthModule {}
