import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ConfigurationSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  key: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  value: string;

}
