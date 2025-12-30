import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('subscriptions')
@Index(['user_id'])
@Index(['platform', 'platform_subscription_id'], { unique: true })
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @Column({ type: 'varchar', length: 20 })
  platform: 'ios' | 'android' | 'web'; // ios, android, web (stripe)

  @Column({ type: 'varchar', length: 100 })
  product_id: string; // The product identifier

  @Column({ type: 'varchar', length: 255, nullable: true })
  platform_subscription_id: string; // Stripe subscription ID, Google subscription ID, Apple original_transaction_id

  @Column({ type: 'varchar', length: 20 })
  status: 'active' | 'expired' | 'cancelled' | 'trial'; // active, expired, cancelled, trial

  @Column({ type: 'varchar', length: 20 })
  interval: 'month' | 'year'; // month, year

  @Column({ type: 'timestamp', nullable: true })
  start_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiry_date: Date;

  @Column({ type: 'boolean', default: false })
  auto_renew: boolean;

  @Column({ type: 'text', nullable: true })
  receipt_data: string; // Store receipt/token for verification

  @Column({ type: 'jsonb', nullable: true })
  metadata: any; // Additional platform-specific data

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
