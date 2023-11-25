import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsOptional } from 'class-validator';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class CommonIntPKEntity {
  @ApiProperty({
    example: 1,
    description: 'id',
    required: true,
  })
  @IsInt()
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({
    example: new Date().toISOString(),
    description: '생성 일자',
    required: true,
  })
  @IsDateString()
  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @ApiProperty({
    example: new Date().toISOString(),
    description: '수정 일자',
    required: true,
  })
  @IsDateString()
  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: Date;

  @ApiProperty({
    example: new Date().toISOString(),
    description: '삭제 일자',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}

export class CommonBigIntPKEntity {
  @ApiProperty({
    example: '1',
    description: 'id(bigint)',
    required: true,
  })
  @Type(() => Number)
  @IsInt()
  @Type(() => String)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @ApiProperty({
    example: new Date().toISOString(),
    description: '생성 일자',
    required: true,
  })
  @IsDateString()
  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @ApiProperty({
    example: new Date().toISOString(),
    description: '수정 일자',
    required: true,
  })
  @IsDateString()
  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: Date;

  @ApiProperty({
    example: new Date().toISOString(),
    description: '삭제 일자',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
