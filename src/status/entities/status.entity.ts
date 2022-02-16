import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type StatusType = 'watch' | 'watched' | 'toWatch';

@Entity('status')
export class Status extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  @Index('user_index_status')
  userId: string;

  @Column()
  imdbId: string;

  @Column({
    type: 'enum',
    enum: ['watch', 'watched', 'toWatch'],
  })
  value: StatusType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
