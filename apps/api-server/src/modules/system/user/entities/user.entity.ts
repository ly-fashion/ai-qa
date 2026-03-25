import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '@api-server/common/entities/base';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '用户ID' })
  public id: number;

  @Column({ unique: true, length: 50, name: 'username', comment: '用户名' })
  public username: string;

  @Column({ unique: true, length: 255, name: 'email', comment: '邮箱' })
  public email: string;

  @Column({ length: 255, name: 'password', comment: '密码' })
  public password: string;

  @Column({ length: 100, nullable: true, name: 'first_name', comment: '名字' })
  public firstName: string;

  @Column({ length: 100, nullable: true, name: 'last_name', comment: '姓氏' })
  public lastName: string;

  @Column({ length: 20, nullable: true, name: 'phone', comment: '电话号码' })
  public phone: string;

  @Column({
    type: 'boolean',
    default: true,
    name: 'is_active',
    comment: '是否激活',
  })
  public isActive: boolean;

  @Column({ length: 50, default: 'user', name: 'role', comment: '角色' })
  public role: string;

  @Column({
    type: 'datetime',
    nullable: true,
    name: 'last_login_at',
    comment: '最后登录时间',
  })
  public lastLoginAt: Date;
}
