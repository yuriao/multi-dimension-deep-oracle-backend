import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum PrimaryTradition {
  WESTERN = 'western',
  CHINESE = 'chinese',
  MIXED = 'mixed',
}

@Entity('user_profiles')
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ length: 100, nullable: true })
  display_name: string;

  @Column({ type: 'varchar', nullable: true })
  birth_date: string;

  @Column({ type: 'varchar', nullable: true })
  birth_time: string;

  @Column({ length: 200, nullable: true })
  birth_place: string;

  @Column({ type: 'float', nullable: true })
  birth_latitude: number;

  @Column({ type: 'float', nullable: true })
  birth_longitude: number;

  @Column({ length: 10, nullable: true })
  gender: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: 'mixed',
  })
  primary_tradition: string;

  @Column({ type: 'text', nullable: true })
  preference_weights: string;

  @Column({ type: 'text', nullable: true })
  enabled_techniques: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
