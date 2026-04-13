import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PolarSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  oat: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  webhookUrl: string;

  @Column({ default: false })
  enabled: boolean;

  @Column({ type: 'varchar', length: 10, default: 'test' })
  environment: string;

  @Column({ type: 'simple-json', nullable: true })
  webhookEvents: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
