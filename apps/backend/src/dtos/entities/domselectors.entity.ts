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

type MultipleStrategy = 'first' | 'last' | 'all';

@Entity({ name: 'domselectors' })
@Check(
  'CHK_selectors_multiple_strategy',
  "multiple_strategy IN ('first','last','all')",
)
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

  @IsArray()
  @IsString({ each: true })
  @Column({ type: 'text', array: true, default: '{}' })
  fallbacks: string[];

  @IsString()
  @IsIn(['first', 'last', 'all'])
  @Column({
    name: 'multiple_strategy',
    type: 'varchar',
    length: 20,
    default: 'first',
  })
  multipleStrategy: MultipleStrategy;

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
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @IsDate()
  @Column({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
