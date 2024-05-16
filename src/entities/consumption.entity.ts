import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('consumption')
export class Consumption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  source_id: string;

  @Column()
  value: number;
  
  @Column()
  description: string;
  
  @Column()
  timestamp: Date;
}
