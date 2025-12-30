import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

export enum DecisionCategory {
  LOVE = 'love',
  CAREER = 'career',
  MONEY = 'money',
  MOVE = 'move',
  HEALTH = 'health',
  OTHER = 'other',
}

export enum RecommendedOption {
  A = 'A',
  B = 'B',
  WAIT = 'wait',
  NEUTRAL = 'neutral',
}

@Entity('decisions')
export class Decision {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'varchar',
    length: 50,
  })
  category: string;

  @Column({ type: 'text' })
  question: string;

  @Column({ length: 200, nullable: true })
  option_a: string;

  @Column({ length: 200, nullable: true })
  option_b: string;

  @Column({ type: 'text', nullable: true })
  combined_guidance_vector: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  recommended_option: string;

  @Column({ type: 'float', nullable: true })
  confidence_score: number;

  @Column({ type: 'text', nullable: true })
  combined_summary_text: string;

  @Column({ type: 'text', nullable: true })
  technique_readings: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  user_choice: string;

  @Column({ type: 'int', nullable: true })
  user_rating: number;

  @Column({ type: 'text', nullable: true })
  user_feedback: string;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
