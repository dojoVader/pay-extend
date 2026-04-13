import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PolarPaymentRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  eventType: string;

  @Column({ type: 'text' })
  payload: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  environment: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  extensionId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
