import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { UserProfile } from './user-profile.entity';

export enum AuthProvider {
  EMAIL = 'email',
  WECHAT = 'wechat',
  APPLE = 'apple',
  GOOGLE = 'google',
}

export enum SubscriptionTier {
  FREE = 'free',
  PREMIUM = 'premium',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: 'email',
  })
  auth_provider: string;

  @Column({ length: 255 })
  auth_sub: string;

  @Column({ length: 255, nullable: true })
  email: string;

  @Column({ nullable: true, select: false })
  password_hash: string;

  @Column({ length: 10, default: 'en-US' })
  locale: string;

  @Column({ length: 50, default: 'UTC' })
  timezone: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: 'free',
  })
  subscription_tier: string;

  @Column({ type: 'text', nullable: true })
  refresh_token: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => UserProfile, (profile) => profile.user)
  profile: UserProfile;
}
