import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('consumption')
export class Consumption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sourceId: string;

  @Column()
  timestamp: Date;

  @Column()
  value: number;
}
