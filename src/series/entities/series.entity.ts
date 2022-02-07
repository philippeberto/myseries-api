import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Serie {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;
}
