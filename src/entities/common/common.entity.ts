import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class CommonIntPKEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}

export class CommonBigIntPKEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
