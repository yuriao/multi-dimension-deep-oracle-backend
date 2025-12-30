import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, AuthProvider } from './entities/user.entity';
import { UserProfile } from './entities/user-profile.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private profileRepository: Repository<UserProfile>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if user already exists
    const existing = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existing) {
      throw new ConflictException('User with this email already exists');
    }

    const user = this.userRepository.create({
      auth_provider: AuthProvider.EMAIL,
      auth_sub: createUserDto.email,
      email: createUserDto.email,
      password_hash: createUserDto.password_hash,
      locale: createUserDto.locale || 'en-US',
      timezone: createUserDto.timezone || 'UTC',
    });

    const savedUser = await this.userRepository.save(user);

    // Create empty profile
    const profile = this.profileRepository.create({
      user_id: savedUser.id,
    });
    await this.profileRepository.save(profile);

    return savedUser;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password_hash')
      .getOne();
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string | null,
  ): Promise<void> {
    const hashedToken = refreshToken
      ? await bcrypt.hash(refreshToken, 10)
      : null;

    await this.userRepository.update(userId, {
      refresh_token: hashedToken,
    });
  }

  async getProfile(userId: string): Promise<UserProfile> {
    const profile = await this.profileRepository.findOne({
      where: { user_id: userId },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    // Parse JSON fields
    if (profile.preference_weights) {
      (profile as any).preference_weights = JSON.parse(profile.preference_weights);
    }
    if (profile.enabled_techniques) {
      (profile as any).enabled_techniques = JSON.parse(profile.enabled_techniques);
    }

    return profile;
  }

  async updateProfile(
    userId: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<UserProfile> {
    const profile = await this.getProfile(userId);

    // Stringify JSON fields if they exist in the DTO
    const dataToUpdate = { ...updateProfileDto };
    if (dataToUpdate.preference_weights) {
      (dataToUpdate as any).preference_weights = JSON.stringify(dataToUpdate.preference_weights);
    }
    if (dataToUpdate.enabled_techniques) {
      (dataToUpdate as any).enabled_techniques = JSON.stringify(dataToUpdate.enabled_techniques);
    }

    Object.assign(profile, dataToUpdate);

    const saved = await this.profileRepository.save(profile);

    // Parse back for return
    if (saved.preference_weights) {
      (saved as any).preference_weights = JSON.parse(saved.preference_weights);
    }
    if (saved.enabled_techniques) {
      (saved as any).enabled_techniques = JSON.parse(saved.enabled_techniques);
    }

    return saved;
  }

  async updateSubscriptionTier(
    userId: string,
    tier: 'free' | 'premium' | 'admin',
  ): Promise<void> {
    await this.userRepository.update(userId, {
      subscription_tier: tier,
    });
  }

  async updateSubscriptionTierByUserId(
    userId: string,
    tier: 'free' | 'premium' | 'admin',
  ): Promise<void> {
    // Find user by ID and update their subscription tier
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user) {
      await this.userRepository.update(user.id, {
        subscription_tier: tier,
      });
    } else {
      console.warn(`User not found for subscription update: ${userId}`);
    }
  }
}
