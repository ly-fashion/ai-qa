import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto';
import { UserService } from './user.service';

@ApiTags('用户管理')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '创建用户' })
  @ApiResponse({
    status: 201,
    description: '用户创建成功',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 409, description: '用户名或邮箱已存在' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有用户' })
  @ApiResponse({
    status: 200,
    description: '获取用户列表成功',
    type: [UserResponseDto],
  })
  async findAll(): Promise<UserResponseDto[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '根据ID获取用户' })
  @ApiParam({ name: 'id', description: '用户ID' })
  @ApiResponse({
    status: 200,
    description: '获取用户成功',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: '用户不存在' })
  async findOne(@Param('id') id: number): Promise<UserResponseDto> {
    return await this.userService.findOne(id);
  }

  @Get('username/:username')
  @ApiOperation({ summary: '根据用户名获取用户' })
  @ApiParam({ name: 'username', description: '用户名' })
  @ApiResponse({
    status: 200,
    description: '获取用户成功',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: '用户不存在' })
  async findByUsername(@Param('username') username: string): Promise<UserResponseDto> {
    return await this.userService.findByUsername(username);
  }

  @Get('email/:email')
  @ApiOperation({ summary: '根据邮箱获取用户' })
  @ApiParam({ name: 'email', description: '邮箱' })
  @ApiResponse({
    status: 200,
    description: '获取用户成功',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: '用户不存在' })
  async findByEmail(@Param('email') email: string): Promise<UserResponseDto> {
    return await this.userService.findByEmail(email);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新用户信息' })
  @ApiParam({ name: 'id', description: '用户ID' })
  @ApiResponse({
    status: 200,
    description: '用户更新成功',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: '用户不存在' })
  @ApiResponse({ status: 409, description: '用户名或邮箱已存在' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '删除用户' })
  @ApiParam({ name: 'id', description: '用户ID' })
  @ApiResponse({ status: 204, description: '用户删除成功' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  async remove(@Param('id') id: number): Promise<void> {
    await this.userService.remove(id);
  }
}
