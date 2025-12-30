import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('chat_messages')
@Index(['reading_id', 'created_at'])
@Index(['user_id', 'created_at'])
export class ChatMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @Column('uuid', { nullable: true })
  reading_id: string; // Reference to daily_reading or decision

  @Column({ type: 'varchar', length: 20 })
  reading_type: 'DAILY' | 'DECISION'; // Type of reading

  @Column({ type: 'varchar', length: 20 })
  role: 'user' | 'assistant' | 'system';

  @Column('text')
  content: string;

  @CreateDateColumn()
  created_at: Date;
}
