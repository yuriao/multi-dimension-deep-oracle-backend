import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('daily_readings')
@Index(['user_id', 'reading_date'], { unique: true })
export class DailyReading {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar' })
  @Index()
  reading_date: string;

  @Column({ type: 'text' })
  combined_vector: string;

  @Column({ type: 'float' })
  overall_score: number;

  @Column({ length: 50 })
  dominant_dimension: string;

  @Column({ type: 'text' })
  narrative_text: string;

  @Column({ type: 'text' })
  technique_contributions: string;

  @Column({ type: 'text', nullable: true })
  lucky_times: string;

  @Column({ type: 'text', nullable: true })
  deepseek_reading: string;

  @CreateDateColumn()
  created_at: Date;
}
