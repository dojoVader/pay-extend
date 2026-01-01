import { Column, Entity, PrimaryGeneratedColumn, Check } from 'typeorm';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';


@Entity({ name: 'domselectors' })
export class DomSelector {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @IsInt()
  @Column({ name: 'extension_context_id', type: 'int' })
  extensionContextId: number;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 100, name: 'key' })
  key: string;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'text' })
  selector: string;

  @IsString()
  @Column({
    name: 'multiple_strategy',
    type: 'varchar',
    length: 20,
    default: 'first',
  })
  multipleStrategy: string;

  @IsOptional()
  @IsString()
  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @IsBoolean()
  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @IsDate()
  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @IsDate()
  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
