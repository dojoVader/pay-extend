import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
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

  @CreateDateColumn()
  createdAt: Date;
}
