import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum StatusEnum {
  /** 静态 */
  STATIC = 0,
  /** 动态 */
  DYNAMIC = 1,
}

export class LoginDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  userName: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(10)
  password: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  uuid: string;
}

export class RegisterDto extends LoginDto {}
