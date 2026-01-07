// notifications.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  notification_type: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'boolean', default: false })
  viewed: boolean;

  @Column({ type: 'timestamp', nullable: true })
  viewed_at: Date | null;

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status: string;
}
