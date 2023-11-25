import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsOptional } from 'class-validator';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class CommonIntPKEntity {
  @IsInt()
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @IsDateString()
  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @IsDateString()
  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: Date;

  @IsDateString()
  @IsOptional()
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}

export class CommonBigIntPKEntity {
  @Type(() => Number)
  @IsInt()
  @Type(() => String)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @IsDateString()
  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @IsDateString()
  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: Date;

  @IsDateString()
  @IsOptional()
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
