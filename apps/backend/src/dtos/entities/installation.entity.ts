import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber } from 'class-validator';

@Entity({ name: 'installations' })
export class Installation {
  @PrimaryGeneratedColumn()
  id: number;

  @IsBoolean()
  @Column({ default: false })
  activated: boolean;

  @IsDate()
  @CreateDateColumn()
  date_create: Date;

  @IsDate()
  @UpdateDateColumn()
  date_updated: Date;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
