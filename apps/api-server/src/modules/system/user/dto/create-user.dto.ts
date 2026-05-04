import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: 'john_doe' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是字符串' })
  @MinLength(3, { message: '用户名至少3个字符' })
  @MaxLength(50, { message: '用户名不能超过50个字符' })
  username: string;

  @ApiProperty({ description: '邮箱', example: 'john@example.com' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;

  @ApiProperty({ description: '密码', example: 'password123' })
  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是字符串' })
  @MinLength(6, { message: '密码至少6个字符' })
  @MaxLength(255, { message: '密码不能超过255个字符' })
  password: string;

  @ApiProperty({ description: '名字', example: 'John', required: false })
  @IsOptional()
  @IsString({ message: '名字必须是字符串' })
  @MaxLength(100, { message: '名字不能超过100个字符' })
  firstName?: string;

  @ApiProperty({ description: '姓氏', example: 'Doe', required: false })
  @IsOptional()
  @IsString({ message: '姓氏必须是字符串' })
  @MaxLength(100, { message: '姓氏不能超过100个字符' })
  lastName?: string;

  @ApiProperty({
    description: '电话号码',
    example: '13800138000',
    required: false,
  })
  @IsOptional()
  @IsString({ message: '电话号码必须是字符串' })
  @MaxLength(20, { message: '电话号码不能超过20个字符' })
  phone?: string;

  @ApiProperty({ description: '角色', example: 'user', required: false })
  @IsOptional()
  @IsString({ message: '角色必须是字符串' })
  role?: string;
}
