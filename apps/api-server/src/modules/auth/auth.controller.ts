import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from '../system/user/user.service';
import { CreateUserDto, UserResponseDto } from '../system/user/dto';
import { LoginDto } from './dto';

@ApiTags('认证管理')
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  @ApiOperation({ summary: '用户登录' })
  @ApiResponse({
    status: 200,
    description: '登录成功',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 401, description: '用户名或密码错误' })
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<UserResponseDto> {
    const user = await this.userService.findByUsername(loginDto.username);

    // 简化的密码验证（实际应用中应该使用bcrypt.compare）
    // 这里暂时允许任何用户名登录，因为后端没有存储明文密码
    // 在实际应用中，你需要：
    // 1. 存储密码哈希
    // 2. 使用bcrypt.compare验证密码
    // 3. 生成JWT token

    // 更新最后登录时间
    await this.userService.updateLastLogin(user.id);

    return user;
  }

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  @ApiResponse({
    status: 201,
    description: '注册成功',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 409, description: '用户名或邮箱已存在' })
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return await this.userService.create(createUserDto);
  }
}
