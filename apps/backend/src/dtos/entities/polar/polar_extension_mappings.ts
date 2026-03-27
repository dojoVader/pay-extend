import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@Entity()
export class PolarExtensionMapping {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  extensionId: number;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  productId: string | null;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  discountId: string | null;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  checkSessionId: string | null;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  subscriptionId: string | null;
}
