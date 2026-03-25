import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ description: '用户ID', example: 1 })
  id: number;

  @ApiProperty({ description: '用户名', example: 'john_doe' })
  username: string;

  @ApiProperty({ description: '邮箱', example: 'john@example.com' })
  email: string;

  @ApiProperty({ description: '名字', example: 'John', required: false })
  firstName?: string;

  @ApiProperty({ description: '姓氏', example: 'Doe', required: false })
  lastName?: string;

  @ApiProperty({
    description: '电话号码',
    example: '13800138000',
    required: false,
  })
  phone?: string;

  @ApiProperty({ description: '是否激活', example: true })
  isActive: boolean;

  @ApiProperty({ description: '角色', example: 'user' })
  role: string;

  @ApiProperty({ description: '最后登录时间', required: false })
  lastLoginAt?: Date;

  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;
}
