import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cat', {
  comment: '猫咪表',
})
export class CatEntity {
  @ApiProperty({ type: String, description: '猫咪主键' })
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'code',
    comment: '猫咪主键',
  })
  public code: number;

  /**
   * The name of the Cat
   * @example Kitty
   */
  @Column({ type: 'varchar', length: 255, comment: '猫咪名称' })
  name: string;

  @ApiProperty({
    example: 1,
    description: 'The age of the Cat',
    nullable: true,
  })
  @Column({ type: 'int', comment: '猫咪年龄', default: 0 })
  age: number;

  @ApiProperty({
    example: 'Maine Coon',
    description: 'The breed of the Cat',
    nullable: false,
  })
  @Column({
    type: 'varchar',
    length: 255,
    comment: '猫咪品种',
    nullable: true,
  })
  breed?: string;

  @ApiProperty({
    example: '100',
    description: '猫咪金钱',
    nullable: false,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, comment: '猫咪金钱' })
  money: number;
}
