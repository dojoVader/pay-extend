import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Entity()
export class PolarExtensionMapping {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  extensionId: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  productId: string | null;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  refundId: string | null;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  checkSessionId: string | null;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  benefitsId: string | null;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  subscriptionId: string | null;
}
