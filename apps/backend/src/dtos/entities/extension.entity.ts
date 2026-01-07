import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class ExtensionContext {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  extensionItemId: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  extensionName: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  extensionDescription: string;

  @IsString()
  @Column({ type: 'varchar', length: 30 })
  status: string;

  @IsString()
  publicKey: string;

  @IsDate()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @IsDate()
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ default: true })
  @IsBoolean()
  active: boolean;
}
