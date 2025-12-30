/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(5);
const auth_module_1 = __webpack_require__(6);
const user_module_1 = __webpack_require__(26);
const divination_module_1 = __webpack_require__(29);
const decision_module_1 = __webpack_require__(38);
const content_module_1 = __webpack_require__(49);
const ritual_module_1 = __webpack_require__(51);
const deepseek_module_1 = __webpack_require__(50);
const chat_module_1 = __webpack_require__(55);
const subscription_module_1 = __webpack_require__(60);
const user_entity_1 = __webpack_require__(13);
const user_profile_entity_1 = __webpack_require__(14);
const decision_entity_1 = __webpack_require__(40);
const daily_reading_entity_1 = __webpack_require__(41);
const chat_message_entity_1 = __webpack_require__(57);
const subscription_entity_1 = __webpack_require__(62);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    url: configService.get('DATABASE_URL'),
                    host: configService.get('DATABASE_HOST'),
                    port: configService.get('DATABASE_PORT', 5432),
                    username: configService.get('DATABASE_USER'),
                    password: configService.get('DATABASE_PASSWORD'),
                    database: configService.get('DATABASE_NAME'),
                    entities: [user_entity_1.User, user_profile_entity_1.UserProfile, decision_entity_1.Decision, daily_reading_entity_1.DailyReading, chat_message_entity_1.ChatMessage, subscription_entity_1.Subscription],
                    synchronize: true,
                    logging: configService.get('NODE_ENV') === 'development',
                    ssl: {
                        rejectUnauthorized: false,
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            divination_module_1.DivinationModule,
            decision_module_1.DecisionModule,
            content_module_1.ContentModule,
            ritual_module_1.RitualModule,
            deepseek_module_1.DeepSeekModule,
            chat_module_1.ChatModule,
            subscription_module_1.SubscriptionModule,
        ],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(7);
const passport_1 = __webpack_require__(8);
const config_1 = __webpack_require__(4);
const auth_service_1 = __webpack_require__(9);
const auth_controller_1 = __webpack_require__(15);
const jwt_strategy_1 = __webpack_require__(22);
const local_strategy_1 = __webpack_require__(24);
const user_module_1 = __webpack_require__(26);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    secret: configService.get('JWT_SECRET', 'your-secret-key'),
                    signOptions: {
                        expiresIn: configService.get('JWT_EXPIRATION', '15m'),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, local_strategy_1.LocalStrategy],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(7);
const config_1 = __webpack_require__(4);
const bcrypt = __webpack_require__(10);
const user_service_1 = __webpack_require__(11);
let AuthService = class AuthService {
    constructor(userService, jwtService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async validateUser(email, password) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            return null;
        }
        if (!user.password_hash) {
            console.error(`User ${email} exists but has no password_hash`);
            return null;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return null;
        }
        const { password_hash, ...result } = user;
        return result;
    }
    async register(registerDto) {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = await this.userService.create({
            ...registerDto,
            password_hash: hashedPassword,
        });
        const tokens = await this.generateTokens(user);
        await this.userService.updateRefreshToken(user.id, tokens.refresh_token);
        return {
            user,
            ...tokens,
        };
    }
    async login(user) {
        const tokens = await this.generateTokens(user);
        await this.userService.updateRefreshToken(user.id, tokens.refresh_token);
        return {
            user,
            ...tokens,
        };
    }
    async refreshToken(userId, refreshToken) {
        const user = await this.userService.findOne(userId);
        if (!user || !user.refresh_token) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const isValid = await bcrypt.compare(refreshToken, user.refresh_token);
        if (!isValid) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const tokens = await this.generateTokens(user);
        await this.userService.updateRefreshToken(user.id, tokens.refresh_token);
        return tokens;
    }
    async logout(userId) {
        await this.userService.updateRefreshToken(userId, null);
        return { message: 'Logged out successfully' };
    }
    async generateTokens(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            tier: user.subscription_tier,
        };
        const access_token = this.jwtService.sign(payload);
        const refresh_token = this.jwtService.sign(payload, {
            expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRATION', '30d'),
        });
        return {
            access_token,
            refresh_token,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], AuthService);


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(12);
const bcrypt = __webpack_require__(10);
const user_entity_1 = __webpack_require__(13);
const user_profile_entity_1 = __webpack_require__(14);
let UserService = class UserService {
    constructor(userRepository, profileRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }
    async create(createUserDto) {
        const existing = await this.userRepository.findOne({
            where: { email: createUserDto.email },
        });
        if (existing) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        const user = this.userRepository.create({
            auth_provider: user_entity_1.AuthProvider.EMAIL,
            auth_sub: createUserDto.email,
            email: createUserDto.email,
            password_hash: createUserDto.password_hash,
            locale: createUserDto.locale || 'en-US',
            timezone: createUserDto.timezone || 'UTC',
        });
        const savedUser = await this.userRepository.save(user);
        const profile = this.profileRepository.create({
            user_id: savedUser.id,
        });
        await this.profileRepository.save(profile);
        return savedUser;
    }
    async findOne(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['profile'],
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async findByEmail(email) {
        return this.userRepository
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .addSelect('user.password_hash')
            .getOne();
    }
    async updateRefreshToken(userId, refreshToken) {
        const hashedToken = refreshToken
            ? await bcrypt.hash(refreshToken, 10)
            : null;
        await this.userRepository.update(userId, {
            refresh_token: hashedToken,
        });
    }
    async getProfile(userId) {
        const profile = await this.profileRepository.findOne({
            where: { user_id: userId },
        });
        if (!profile) {
            throw new common_1.NotFoundException('Profile not found');
        }
        if (profile.preference_weights) {
            profile.preference_weights = JSON.parse(profile.preference_weights);
        }
        if (profile.enabled_techniques) {
            profile.enabled_techniques = JSON.parse(profile.enabled_techniques);
        }
        return profile;
    }
    async updateProfile(userId, updateProfileDto) {
        const profile = await this.getProfile(userId);
        const dataToUpdate = { ...updateProfileDto };
        if (dataToUpdate.preference_weights) {
            dataToUpdate.preference_weights = JSON.stringify(dataToUpdate.preference_weights);
        }
        if (dataToUpdate.enabled_techniques) {
            dataToUpdate.enabled_techniques = JSON.stringify(dataToUpdate.enabled_techniques);
        }
        Object.assign(profile, dataToUpdate);
        const saved = await this.profileRepository.save(profile);
        if (saved.preference_weights) {
            saved.preference_weights = JSON.parse(saved.preference_weights);
        }
        if (saved.enabled_techniques) {
            saved.enabled_techniques = JSON.parse(saved.enabled_techniques);
        }
        return saved;
    }
    async updateSubscriptionTier(userId, tier) {
        await this.userRepository.update(userId, {
            subscription_tier: tier,
        });
    }
    async updateSubscriptionTierByUserId(userId, tier) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (user) {
            await this.userRepository.update(user.id, {
                subscription_tier: tier,
            });
        }
        else {
            console.warn(`User not found for subscription update: ${userId}`);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(user_profile_entity_1.UserProfile)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], UserService);


/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = exports.SubscriptionTier = exports.AuthProvider = void 0;
const typeorm_1 = __webpack_require__(12);
const user_profile_entity_1 = __webpack_require__(14);
var AuthProvider;
(function (AuthProvider) {
    AuthProvider["EMAIL"] = "email";
    AuthProvider["WECHAT"] = "wechat";
    AuthProvider["APPLE"] = "apple";
    AuthProvider["GOOGLE"] = "google";
})(AuthProvider || (exports.AuthProvider = AuthProvider = {}));
var SubscriptionTier;
(function (SubscriptionTier) {
    SubscriptionTier["FREE"] = "free";
    SubscriptionTier["PREMIUM"] = "premium";
    SubscriptionTier["ADMIN"] = "admin";
})(SubscriptionTier || (exports.SubscriptionTier = SubscriptionTier = {}));
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: 'email',
    }),
    __metadata("design:type", String)
], User.prototype, "auth_provider", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], User.prototype, "auth_sub", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, select: false }),
    __metadata("design:type", String)
], User.prototype, "password_hash", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, default: 'en-US' }),
    __metadata("design:type", String)
], User.prototype, "locale", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, default: 'UTC' }),
    __metadata("design:type", String)
], User.prototype, "timezone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: 'free',
    }),
    __metadata("design:type", String)
], User.prototype, "subscription_tier", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "refresh_token", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], User.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], User.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_profile_entity_1.UserProfile, (profile) => profile.user),
    __metadata("design:type", typeof (_c = typeof user_profile_entity_1.UserProfile !== "undefined" && user_profile_entity_1.UserProfile) === "function" ? _c : Object)
], User.prototype, "profile", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);


/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserProfile = exports.PrimaryTradition = void 0;
const typeorm_1 = __webpack_require__(12);
const user_entity_1 = __webpack_require__(13);
var PrimaryTradition;
(function (PrimaryTradition) {
    PrimaryTradition["WESTERN"] = "western";
    PrimaryTradition["CHINESE"] = "chinese";
    PrimaryTradition["MIXED"] = "mixed";
})(PrimaryTradition || (exports.PrimaryTradition = PrimaryTradition = {}));
let UserProfile = class UserProfile {
};
exports.UserProfile = UserProfile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserProfile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], UserProfile.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.profile),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", typeof (_a = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _a : Object)
], UserProfile.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "display_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "birth_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "birth_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200, nullable: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "birth_place", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], UserProfile.prototype, "birth_latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], UserProfile.prototype, "birth_longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, nullable: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: 'mixed',
    }),
    __metadata("design:type", String)
], UserProfile.prototype, "primary_tradition", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "preference_weights", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "enabled_techniques", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UserProfile.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], UserProfile.prototype, "updated_at", void 0);
exports.UserProfile = UserProfile = __decorate([
    (0, typeorm_1.Entity)('user_profiles')
], UserProfile);


/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(2);
const auth_service_1 = __webpack_require__(9);
const register_dto_1 = __webpack_require__(16);
const login_dto_1 = __webpack_require__(18);
const refresh_token_dto_1 = __webpack_require__(19);
const local_auth_guard_1 = __webpack_require__(20);
const jwt_auth_guard_1 = __webpack_require__(21);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(registerDto) {
        return this.authService.register(registerDto);
    }
    async login(req, loginDto) {
        return this.authService.login(req.user);
    }
    async refresh(refreshTokenDto) {
        return this.authService.refreshToken(refreshTokenDto.userId, refreshTokenDto.refreshToken);
    }
    async logout(req) {
        return this.authService.logout(req.user.id);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof register_dto_1.RegisterDto !== "undefined" && register_dto_1.RegisterDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_c = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof refresh_token_dto_1.RefreshTokenDto !== "undefined" && refresh_token_dto_1.RefreshTokenDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterDto = void 0;
const class_validator_1 = __webpack_require__(17);
class RegisterDto {
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "locale", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "timezone", void 0);


/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginDto = void 0;
const class_validator_1 = __webpack_require__(17);
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);


/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RefreshTokenDto = void 0;
const class_validator_1 = __webpack_require__(17);
class RefreshTokenDto {
}
exports.RefreshTokenDto = RefreshTokenDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RefreshTokenDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RefreshTokenDto.prototype, "refreshToken", void 0);


/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalAuthGuard = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(8);
let LocalAuthGuard = class LocalAuthGuard extends (0, passport_1.AuthGuard)('local') {
};
exports.LocalAuthGuard = LocalAuthGuard;
exports.LocalAuthGuard = LocalAuthGuard = __decorate([
    (0, common_1.Injectable)()
], LocalAuthGuard);


/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(8);
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);


/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(8);
const passport_jwt_1 = __webpack_require__(23);
const config_1 = __webpack_require__(4);
const user_service_1 = __webpack_require__(11);
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configService, userService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET', 'your-secret-key'),
        });
        this.configService = configService;
        this.userService = userService;
    }
    async validate(payload) {
        const user = await this.userService.findOne(payload.sub);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return { id: user.id, email: user.email, tier: user.subscription_tier };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _b : Object])
], JwtStrategy);


/***/ }),
/* 23 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(8);
const passport_local_1 = __webpack_require__(25);
const auth_service_1 = __webpack_require__(9);
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authService) {
        super({ usernameField: 'email' });
        this.authService = authService;
    }
    async validate(email, password) {
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return user;
    }
};
exports.LocalStrategy = LocalStrategy;
exports.LocalStrategy = LocalStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalStrategy);


/***/ }),
/* 25 */
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const user_service_1 = __webpack_require__(11);
const user_controller_1 = __webpack_require__(27);
const user_entity_1 = __webpack_require__(13);
const user_profile_entity_1 = __webpack_require__(14);
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, user_profile_entity_1.UserProfile])],
        providers: [user_service_1.UserService],
        controllers: [user_controller_1.UserController],
        exports: [user_service_1.UserService],
    })
], UserModule);


/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const common_1 = __webpack_require__(2);
const user_service_1 = __webpack_require__(11);
const update_profile_dto_1 = __webpack_require__(28);
const jwt_auth_guard_1 = __webpack_require__(21);
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getMe(req) {
        return this.userService.findOne(req.user.id);
    }
    async getProfile(req) {
        return this.userService.getProfile(req.user.id);
    }
    async updateProfile(req, updateProfileDto) {
        return this.userService.updateProfile(req.user.id, updateProfileDto);
    }
    async getEntitlements(req) {
        const user = await this.userService.findOne(req.user.id);
        const isPremium = user.subscription_tier === 'premium' || user.subscription_tier === 'admin';
        return {
            user_id: user.id,
            tier: user.subscription_tier,
            is_premium: isPremium,
            entitlements: {
                chat: isPremium,
            },
        };
    }
    async syncSubscription(req, body) {
        const userId = req.user.id;
        const hasPremium = body.has_premium;
        const newTier = hasPremium ? 'premium' : 'free';
        await this.userService.updateSubscriptionTier(userId, newTier);
        return {
            success: true,
            subscription_tier: newTier,
        };
    }
    async handleRevenueCatWebhook(authHeader, body) {
        const event = body.event;
        const appUserId = event?.app_user_id;
        if (!appUserId) {
            return { received: true };
        }
        switch (event.type) {
            case 'INITIAL_PURCHASE':
            case 'RENEWAL':
            case 'UNCANCELLATION':
                await this.userService.updateSubscriptionTierByUserId(appUserId, 'premium');
                break;
            case 'CANCELLATION':
            case 'EXPIRATION':
            case 'BILLING_ISSUE':
                await this.userService.updateSubscriptionTierByUserId(appUserId, 'free');
                break;
            case 'PRODUCT_CHANGE':
                await this.userService.updateSubscriptionTierByUserId(appUserId, 'premium');
                break;
            default:
                console.log(`Unhandled RevenueCat event type: ${event.type}`);
        }
        return { received: true };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMe", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('profile'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof update_profile_dto_1.UpdateProfileDto !== "undefined" && update_profile_dto_1.UpdateProfileDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me/entitlements'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getEntitlements", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('sync-subscription'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "syncSubscription", null);
__decorate([
    (0, common_1.Post)('revenuecat-webhook'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handleRevenueCatWebhook", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], UserController);


/***/ }),
/* 28 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateProfileDto = void 0;
const class_validator_1 = __webpack_require__(17);
const user_profile_entity_1 = __webpack_require__(14);
class UpdateProfileDto {
}
exports.UpdateProfileDto = UpdateProfileDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "display_name", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "birth_date", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "birth_time", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "birth_place", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProfileDto.prototype, "birth_latitude", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProfileDto.prototype, "birth_longitude", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(user_profile_entity_1.PrimaryTradition),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof user_profile_entity_1.PrimaryTradition !== "undefined" && user_profile_entity_1.PrimaryTradition) === "function" ? _a : Object)
], UpdateProfileDto.prototype, "primary_tradition", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_b = typeof Record !== "undefined" && Record) === "function" ? _b : Object)
], UpdateProfileDto.prototype, "preference_weights", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateProfileDto.prototype, "enabled_techniques", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "locale", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "timezone", void 0);


/***/ }),
/* 29 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DivinationModule = void 0;
const common_1 = __webpack_require__(2);
const divination_service_1 = __webpack_require__(30);
const tarot_module_impl_1 = __webpack_require__(31);
const astrology_module_impl_1 = __webpack_require__(33);
const numerology_module_impl_1 = __webpack_require__(34);
const iching_module_impl_1 = __webpack_require__(35);
const bazi_module_impl_1 = __webpack_require__(36);
const ziwei_module_impl_1 = __webpack_require__(37);
let DivinationModule = class DivinationModule {
};
exports.DivinationModule = DivinationModule;
exports.DivinationModule = DivinationModule = __decorate([
    (0, common_1.Module)({
        providers: [
            divination_service_1.DivinationService,
            tarot_module_impl_1.TarotModule,
            astrology_module_impl_1.AstrologyModule,
            numerology_module_impl_1.NumerologyModule,
            iching_module_impl_1.IChingModule,
            bazi_module_impl_1.BaZiModule,
            ziwei_module_impl_1.ZiWeiModule,
        ],
        exports: [divination_service_1.DivinationService],
    })
], DivinationModule);


/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DivinationService = void 0;
const common_1 = __webpack_require__(2);
const tarot_module_impl_1 = __webpack_require__(31);
const astrology_module_impl_1 = __webpack_require__(33);
const numerology_module_impl_1 = __webpack_require__(34);
const iching_module_impl_1 = __webpack_require__(35);
const bazi_module_impl_1 = __webpack_require__(36);
const ziwei_module_impl_1 = __webpack_require__(37);
let DivinationService = class DivinationService {
    constructor(tarotModule, astrologyModule, numerologyModule, ichingModule, baziModule, ziweiModule) {
        this.tarotModule = tarotModule;
        this.astrologyModule = astrologyModule;
        this.numerologyModule = numerologyModule;
        this.ichingModule = ichingModule;
        this.baziModule = baziModule;
        this.ziweiModule = ziweiModule;
        this.modules = new Map();
        this.modules.set('tarot', tarotModule);
        this.modules.set('astrology', astrologyModule);
        this.modules.set('numerology', numerologyModule);
        this.modules.set('iching', ichingModule);
        this.modules.set('bazi', baziModule);
        this.modules.set('ziwei', ziweiModule);
    }
    async computeCombinedDailyReading(userProfile, date, enabledTechniques) {
        const defaultTechniques = [
            'tarot',
            'astrology',
            'numerology',
            'iching',
            'bazi',
            'ziwei',
        ];
        let profileTechniques = defaultTechniques;
        if (userProfile.enabled_techniques) {
            profileTechniques = typeof userProfile.enabled_techniques === 'string'
                ? JSON.parse(userProfile.enabled_techniques)
                : userProfile.enabled_techniques;
        }
        const techniques = enabledTechniques || profileTechniques;
        const readings = {};
        const vectors = [];
        const weights = [];
        for (const technique of techniques) {
            const module = this.modules.get(technique);
            if (module) {
                const reading = await module.computeDailyReading(userProfile, date);
                readings[technique] = reading;
                vectors.push(reading.vector);
                weights.push(reading.confidence);
            }
        }
        const combined_vector = this.aggregateVectors(vectors, weights);
        const userWeights = (typeof userProfile.preference_weights === 'string'
            ? JSON.parse(userProfile.preference_weights)
            : userProfile.preference_weights) || this.getDefaultWeights();
        const overall_score = this.calculateOverallScore(combined_vector, userWeights);
        const dominant_dimension = this.getDominantDimension(combined_vector);
        return {
            combined_vector,
            overall_score,
            dominant_dimension,
            technique_contributions: readings,
        };
    }
    async computeCombinedDecisionReading(userProfile, question, optionA, optionB, enabledTechniques) {
        const defaultTechniques = [
            'tarot',
            'astrology',
            'numerology',
            'iching',
            'bazi',
            'ziwei',
        ];
        let profileTechniques = defaultTechniques;
        if (userProfile.enabled_techniques) {
            profileTechniques = typeof userProfile.enabled_techniques === 'string'
                ? JSON.parse(userProfile.enabled_techniques)
                : userProfile.enabled_techniques;
        }
        const techniques = enabledTechniques || profileTechniques;
        const readings = {};
        const vectorsA = [];
        const vectorsB = [];
        const weights = [];
        for (const technique of techniques) {
            const module = this.modules.get(technique);
            if (module) {
                const reading = await module.computeDecisionReading(userProfile, question, optionA, optionB);
                readings[technique] = reading;
                vectorsA.push(reading.optionA.vector);
                vectorsB.push(reading.optionB.vector);
                weights.push((reading.optionA.confidence + reading.optionB.confidence) / 2);
            }
        }
        const optionA_vector = this.aggregateVectors(vectorsA, weights);
        const optionB_vector = this.aggregateVectors(vectorsB, weights);
        const userWeights = (typeof userProfile.preference_weights === 'string'
            ? JSON.parse(userProfile.preference_weights)
            : userProfile.preference_weights) || this.getDefaultWeights();
        const scoreA = this.calculateOverallScore(optionA_vector, userWeights);
        const scoreB = this.calculateOverallScore(optionB_vector, userWeights);
        const { recommendation, confidence } = this.determineRecommendation(scoreA, scoreB);
        return {
            optionA_vector,
            optionB_vector,
            recommendation,
            confidence,
            technique_readings: readings,
        };
    }
    aggregateVectors(vectors, weights) {
        if (vectors.length === 0) {
            return this.getEmptyVector();
        }
        const totalWeight = weights.reduce((a, b) => a + b, 0);
        const result = this.getEmptyVector();
        vectors.forEach((vector, index) => {
            const weight = weights[index] / totalWeight;
            Object.keys(vector).forEach((key) => {
                result[key] += vector[key] * weight;
            });
        });
        Object.keys(result).forEach((key) => {
            result[key] = Math.max(0, Math.min(1, result[key]));
        });
        return result;
    }
    calculateOverallScore(vector, userWeights) {
        let score = 0;
        let totalWeight = 0;
        Object.keys(vector).forEach((key) => {
            const weight = userWeights[key] || 0.5;
            score += vector[key] * weight;
            totalWeight += weight;
        });
        return (score / totalWeight) * 100;
    }
    getDominantDimension(vector) {
        let maxValue = 0;
        let maxKey = 'stability';
        Object.keys(vector).forEach((key) => {
            if (vector[key] > maxValue) {
                maxValue = vector[key];
                maxKey = key;
            }
        });
        return maxKey;
    }
    determineRecommendation(scoreA, scoreB) {
        const diff = Math.abs(scoreA - scoreB);
        const threshold = 10;
        if (diff < threshold) {
            return { recommendation: 'neutral', confidence: 50 };
        }
        if (scoreA > scoreB) {
            return { recommendation: 'A', confidence: Math.min(95, 50 + diff) };
        }
        else {
            return { recommendation: 'B', confidence: Math.min(95, 50 + diff) };
        }
    }
    getEmptyVector() {
        return {
            stability: 0,
            change: 0,
            risk: 0,
            safety: 0,
            innerGrowth: 0,
            externalReward: 0,
            emotionalIntensity: 0,
            socialConnection: 0,
        };
    }
    getDefaultWeights() {
        return {
            stability: 0.5,
            change: 0.5,
            risk: 0.3,
            safety: 0.7,
            innerGrowth: 0.6,
            externalReward: 0.6,
            emotionalIntensity: 0.5,
            socialConnection: 0.6,
        };
    }
};
exports.DivinationService = DivinationService;
exports.DivinationService = DivinationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof tarot_module_impl_1.TarotModule !== "undefined" && tarot_module_impl_1.TarotModule) === "function" ? _a : Object, typeof (_b = typeof astrology_module_impl_1.AstrologyModule !== "undefined" && astrology_module_impl_1.AstrologyModule) === "function" ? _b : Object, typeof (_c = typeof numerology_module_impl_1.NumerologyModule !== "undefined" && numerology_module_impl_1.NumerologyModule) === "function" ? _c : Object, typeof (_d = typeof iching_module_impl_1.IChingModule !== "undefined" && iching_module_impl_1.IChingModule) === "function" ? _d : Object, typeof (_e = typeof bazi_module_impl_1.BaZiModule !== "undefined" && bazi_module_impl_1.BaZiModule) === "function" ? _e : Object, typeof (_f = typeof ziwei_module_impl_1.ZiWeiModule !== "undefined" && ziwei_module_impl_1.ZiWeiModule) === "function" ? _f : Object])
], DivinationService);


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TarotModule = void 0;
const common_1 = __webpack_require__(2);
const tarot_deck_1 = __webpack_require__(32);
let TarotModule = class TarotModule {
    getName() {
        return 'tarot';
    }
    async computeDailyReading(userProfile, date) {
        const seed = date.toISOString().split('T')[0] + userProfile.user_id;
        const card = this.drawCards(1, seed)[0];
        return {
            vector: this.cardToVector(card, false),
            confidence: 0.75,
            explanation: `Today's card is ${card.name}${card.reversed ? ' (Reversed)' : ''}: ${card.reversed ? card.reversedMeaning : card.uprightMeaning}`,
            details: {
                card: card.name,
                suit: card.suit,
                reversed: card.reversed,
                meaning: card.reversed ? card.reversedMeaning : card.uprightMeaning,
            },
        };
    }
    async computeDecisionReading(userProfile, question, optionA, optionB) {
        const masterSeed = question + optionA + optionB + userProfile.user_id;
        const allCards = this.drawCards(6, masterSeed);
        const cardsA = allCards.slice(0, 3);
        const cardsB = allCards.slice(3, 6);
        const vectorA = this.combineVectors(cardsA.map((c, i) => this.cardToVector(c, i === 1)));
        const vectorB = this.combineVectors(cardsB.map((c, i) => this.cardToVector(c, i === 1)));
        return {
            optionA: {
                vector: vectorA,
                confidence: 0.8,
                explanation: `${optionA}: ${cardsA.map((c) => c.name).join(', ')}`,
                details: { cards: cardsA },
            },
            optionB: {
                vector: vectorB,
                confidence: 0.8,
                explanation: `${optionB}: ${cardsB.map((c) => c.name).join(', ')}`,
                details: { cards: cardsB },
            },
            comparison: this.compareOptions(cardsA, cardsB),
        };
    }
    drawCards(count, seed) {
        const deckIndices = Array.from({ length: tarot_deck_1.TAROT_DECK.length }, (_, i) => i);
        const rng = this.seededRandom(seed);
        for (let i = deckIndices.length - 1; i > 0; i--) {
            const j = Math.floor(rng() * (i + 1));
            [deckIndices[i], deckIndices[j]] = [deckIndices[j], deckIndices[i]];
        }
        const drawnIndices = deckIndices.slice(0, count);
        return drawnIndices.map(index => {
            const isReversed = rng() > 0.5;
            return {
                ...tarot_deck_1.TAROT_DECK[index],
                reversed: isReversed
            };
        });
    }
    drawCard(seed) {
        return this.drawCards(1, seed)[0];
    }
    cardToVector(card, isChallenge) {
        const base = card.reversed ? card.reversedVector : card.uprightVector;
        const multiplier = isChallenge ? 0.7 : 1.0;
        return {
            stability: base.stability * multiplier,
            change: base.change * multiplier,
            risk: base.risk * multiplier,
            safety: base.safety * multiplier,
            innerGrowth: base.innerGrowth * multiplier,
            externalReward: base.externalReward * multiplier,
            emotionalIntensity: base.emotionalIntensity * multiplier,
            socialConnection: base.socialConnection * multiplier,
        };
    }
    combineVectors(vectors) {
        const result = {
            stability: 0, change: 0, risk: 0, safety: 0,
            innerGrowth: 0, externalReward: 0, emotionalIntensity: 0, socialConnection: 0,
        };
        vectors.forEach(v => {
            Object.keys(result).forEach(key => {
                result[key] += v[key];
            });
        });
        Object.keys(result).forEach(key => {
            result[key] /= vectors.length;
        });
        return result;
    }
    compareOptions(cardsA, cardsB) {
        const majorA = cardsA.filter(c => c.arcana === 'major').length;
        const majorB = cardsB.filter(c => c.arcana === 'major').length;
        if (majorA > majorB) {
            return 'Option A shows stronger cosmic significance (more Major Arcana cards).';
        }
        else if (majorB > majorA) {
            return 'Option B shows stronger cosmic significance (more Major Arcana cards).';
        }
        return 'Both options carry similar weight in the cosmic balance.';
    }
    seededRandom(seed) {
        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
            hash = (hash << 5) - hash + seed.charCodeAt(i);
            hash |= 0;
        }
        return () => {
            hash = (hash * 1664525 + 1013904223) | 0;
            return Math.abs(hash) / 2147483647;
        };
    }
};
exports.TarotModule = TarotModule;
exports.TarotModule = TarotModule = __decorate([
    (0, common_1.Injectable)()
], TarotModule);


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TAROT_DECK = void 0;
exports.TAROT_DECK = [
    {
        id: 0,
        name: 'The Fool',
        arcana: 'major',
        uprightMeaning: 'New beginnings, innocence, spontaneity, free spirit',
        reversedMeaning: 'Recklessness, taken advantage of, inconsideration',
        uprightVector: { stability: 0.2, change: 0.9, risk: 0.7, safety: 0.3, innerGrowth: 0.8, externalReward: 0.4, emotionalIntensity: 0.7, socialConnection: 0.5 },
        reversedVector: { stability: 0.1, change: 0.5, risk: 0.9, safety: 0.1, innerGrowth: 0.3, externalReward: 0.2, emotionalIntensity: 0.6, socialConnection: 0.3 },
    },
    {
        id: 1,
        name: 'The Magician',
        arcana: 'major',
        uprightMeaning: 'Manifestation, resourcefulness, power, inspired action',
        reversedMeaning: 'Manipulation, poor planning, untapped talents',
        uprightVector: { stability: 0.5, change: 0.8, risk: 0.4, safety: 0.6, innerGrowth: 0.7, externalReward: 0.9, emotionalIntensity: 0.6, socialConnection: 0.6 },
        reversedVector: { stability: 0.3, change: 0.4, risk: 0.7, safety: 0.3, innerGrowth: 0.4, externalReward: 0.3, emotionalIntensity: 0.7, socialConnection: 0.4 },
    },
    {
        id: 2,
        name: 'The High Priestess',
        arcana: 'major',
        uprightMeaning: 'Intuition, sacred knowledge, divine feminine, subconscious',
        reversedMeaning: 'Secrets, disconnected from intuition, withdrawal',
        uprightVector: { stability: 0.6, change: 0.4, risk: 0.3, safety: 0.7, innerGrowth: 0.9, externalReward: 0.4, emotionalIntensity: 0.7, socialConnection: 0.5 },
        reversedVector: { stability: 0.4, change: 0.3, risk: 0.6, safety: 0.4, innerGrowth: 0.5, externalReward: 0.3, emotionalIntensity: 0.8, socialConnection: 0.3 },
    },
    {
        id: 3,
        name: 'The Empress',
        arcana: 'major',
        uprightMeaning: 'Femininity, beauty, nature, nurturing, abundance',
        reversedMeaning: 'Creative block, dependence on others',
        uprightVector: { stability: 0.7, change: 0.5, risk: 0.2, safety: 0.8, innerGrowth: 0.6, externalReward: 0.8, emotionalIntensity: 0.8, socialConnection: 0.9 },
        reversedVector: { stability: 0.3, change: 0.3, risk: 0.5, safety: 0.4, innerGrowth: 0.4, externalReward: 0.4, emotionalIntensity: 0.7, socialConnection: 0.5 },
    },
    {
        id: 4,
        name: 'The Emperor',
        arcana: 'major',
        uprightMeaning: 'Authority, establishment, structure, father figure',
        reversedMeaning: 'Domination, excessive control, lack of discipline',
        uprightVector: { stability: 0.9, change: 0.3, risk: 0.3, safety: 0.8, innerGrowth: 0.5, externalReward: 0.9, emotionalIntensity: 0.4, socialConnection: 0.7 },
        reversedVector: { stability: 0.4, change: 0.5, risk: 0.7, safety: 0.3, innerGrowth: 0.3, externalReward: 0.5, emotionalIntensity: 0.7, socialConnection: 0.4 },
    },
    {
        id: 5,
        name: 'The Lovers',
        arcana: 'major',
        uprightMeaning: 'Love, harmony, relationships, values alignment',
        reversedMeaning: 'Self-love, disharmony, imbalance, misalignment',
        uprightVector: { stability: 0.6, change: 0.6, risk: 0.3, safety: 0.7, innerGrowth: 0.7, externalReward: 0.6, emotionalIntensity: 0.9, socialConnection: 0.9 },
        reversedVector: { stability: 0.3, change: 0.5, risk: 0.6, safety: 0.4, innerGrowth: 0.6, externalReward: 0.3, emotionalIntensity: 0.7, socialConnection: 0.4 },
    },
    {
        id: 6,
        name: 'The Chariot',
        arcana: 'major',
        uprightMeaning: 'Control, willpower, success, determination',
        reversedMeaning: 'Self-discipline, opposition, lack of direction',
        uprightVector: { stability: 0.5, change: 0.8, risk: 0.5, safety: 0.5, innerGrowth: 0.7, externalReward: 0.9, emotionalIntensity: 0.7, socialConnection: 0.5 },
        reversedVector: { stability: 0.2, change: 0.4, risk: 0.8, safety: 0.2, innerGrowth: 0.4, externalReward: 0.3, emotionalIntensity: 0.6, socialConnection: 0.3 },
    },
    {
        id: 7,
        name: 'Strength',
        arcana: 'major',
        uprightMeaning: 'Courage, persuasion, influence, compassion',
        reversedMeaning: 'Inner strength, self-doubt, low energy, raw emotion',
        uprightVector: { stability: 0.7, change: 0.6, risk: 0.3, safety: 0.7, innerGrowth: 0.8, externalReward: 0.7, emotionalIntensity: 0.8, socialConnection: 0.7 },
        reversedVector: { stability: 0.4, change: 0.4, risk: 0.6, safety: 0.4, innerGrowth: 0.6, externalReward: 0.4, emotionalIntensity: 0.7, socialConnection: 0.5 },
    },
    {
        id: 8,
        name: 'The Hermit',
        arcana: 'major',
        uprightMeaning: 'Soul searching, introspection, inner guidance',
        reversedMeaning: 'Isolation, loneliness, withdrawal',
        uprightVector: { stability: 0.6, change: 0.4, risk: 0.2, safety: 0.7, innerGrowth: 0.9, externalReward: 0.3, emotionalIntensity: 0.6, socialConnection: 0.2 },
        reversedVector: { stability: 0.3, change: 0.3, risk: 0.5, safety: 0.4, innerGrowth: 0.5, externalReward: 0.2, emotionalIntensity: 0.7, socialConnection: 0.1 },
    },
    {
        id: 9,
        name: 'Wheel of Fortune',
        arcana: 'major',
        uprightMeaning: 'Good luck, karma, life cycles, destiny',
        reversedMeaning: 'Bad luck, resistance to change, breaking cycles',
        uprightVector: { stability: 0.4, change: 0.9, risk: 0.5, safety: 0.5, innerGrowth: 0.7, externalReward: 0.8, emotionalIntensity: 0.6, socialConnection: 0.6 },
        reversedVector: { stability: 0.3, change: 0.6, risk: 0.7, safety: 0.3, innerGrowth: 0.5, externalReward: 0.3, emotionalIntensity: 0.6, socialConnection: 0.4 },
    },
    {
        id: 22,
        name: 'Ace of Wands',
        arcana: 'minor',
        suit: 'wands',
        uprightMeaning: 'Inspiration, new opportunities, growth, potential',
        reversedMeaning: 'Emerging idea, lack of direction, distractions',
        uprightVector: { stability: 0.4, change: 0.8, risk: 0.4, safety: 0.6, innerGrowth: 0.7, externalReward: 0.7, emotionalIntensity: 0.7, socialConnection: 0.5 },
        reversedVector: { stability: 0.3, change: 0.4, risk: 0.5, safety: 0.4, innerGrowth: 0.4, externalReward: 0.3, emotionalIntensity: 0.5, socialConnection: 0.3 },
    },
    {
        id: 23,
        name: 'Ace of Cups',
        arcana: 'minor',
        suit: 'cups',
        uprightMeaning: 'Love, new relationships, compassion, creativity',
        reversedMeaning: 'Self-love, intuition, repressed emotions',
        uprightVector: { stability: 0.5, change: 0.7, risk: 0.3, safety: 0.7, innerGrowth: 0.7, externalReward: 0.5, emotionalIntensity: 0.9, socialConnection: 0.8 },
        reversedVector: { stability: 0.4, change: 0.4, risk: 0.4, safety: 0.5, innerGrowth: 0.6, externalReward: 0.3, emotionalIntensity: 0.7, socialConnection: 0.4 },
    },
    {
        id: 24,
        name: 'Ace of Swords',
        arcana: 'minor',
        suit: 'swords',
        uprightMeaning: 'Breakthroughs, new ideas, mental clarity, success',
        reversedMeaning: 'Inner clarity, re-thinking an idea, clouded judgment',
        uprightVector: { stability: 0.3, change: 0.8, risk: 0.6, safety: 0.4, innerGrowth: 0.8, externalReward: 0.7, emotionalIntensity: 0.5, socialConnection: 0.5 },
        reversedVector: { stability: 0.3, change: 0.5, risk: 0.6, safety: 0.4, innerGrowth: 0.6, externalReward: 0.4, emotionalIntensity: 0.6, socialConnection: 0.4 },
    },
    {
        id: 25,
        name: 'Ace of Pentacles',
        arcana: 'minor',
        suit: 'pentacles',
        uprightMeaning: 'Opportunity, prosperity, new venture',
        reversedMeaning: 'Lost opportunity, missed chance, bad investment',
        uprightVector: { stability: 0.7, change: 0.6, risk: 0.3, safety: 0.7, innerGrowth: 0.5, externalReward: 0.9, emotionalIntensity: 0.4, socialConnection: 0.6 },
        reversedVector: { stability: 0.3, change: 0.3, risk: 0.7, safety: 0.3, innerGrowth: 0.3, externalReward: 0.2, emotionalIntensity: 0.5, socialConnection: 0.4 },
    },
    {
        id: 10,
        name: 'The Hierophant',
        arcana: 'major',
        uprightMeaning: 'Spiritual wisdom, religious beliefs, conformity, tradition',
        reversedMeaning: 'Personal beliefs, freedom, challenging the status quo',
        uprightVector: { stability: 0.9, change: 0.2, risk: 0.2, safety: 0.8, innerGrowth: 0.7, externalReward: 0.5, emotionalIntensity: 0.4, socialConnection: 0.9 },
        reversedVector: { stability: 0.4, change: 0.7, risk: 0.6, safety: 0.3, innerGrowth: 0.8, externalReward: 0.2, emotionalIntensity: 0.5, socialConnection: 0.3 },
    },
    {
        id: 11,
        name: 'Justice',
        arcana: 'major',
        uprightMeaning: 'Justice, fairness, truth, cause and effect, law',
        reversedMeaning: 'Unfairness, lack of accountability, dishonesty',
        uprightVector: { stability: 0.8, change: 0.5, risk: 0.3, safety: 0.6, innerGrowth: 0.6, externalReward: 0.5, emotionalIntensity: 0.4, socialConnection: 0.5 },
        reversedVector: { stability: 0.3, change: 0.4, risk: 0.7, safety: 0.2, innerGrowth: 0.2, externalReward: 0.1, emotionalIntensity: 0.6, socialConnection: 0.2 },
    },
    {
        id: 12,
        name: 'The Hanged Man',
        arcana: 'major',
        uprightMeaning: 'Pause, surrender, letting go, new perspective',
        reversedMeaning: 'Delays, resistance, stalling, indecision',
        uprightVector: { stability: 0.4, change: 0.6, risk: 0.5, safety: 0.4, innerGrowth: 0.9, externalReward: 0.1, emotionalIntensity: 0.5, socialConnection: 0.2 },
        reversedVector: { stability: 0.2, change: 0.3, risk: 0.6, safety: 0.2, innerGrowth: 0.3, externalReward: 0.1, emotionalIntensity: 0.6, socialConnection: 0.2 },
    },
    {
        id: 13,
        name: 'Death',
        arcana: 'major',
        uprightMeaning: 'Endings, change, transformation, transition',
        reversedMeaning: 'Resistance to change, personal transformation, inability to move on',
        uprightVector: { stability: 0.1, change: 1.0, risk: 0.8, safety: 0.1, innerGrowth: 0.8, externalReward: 0.2, emotionalIntensity: 0.9, socialConnection: 0.3 },
        reversedVector: { stability: 0.5, change: 0.2, risk: 0.4, safety: 0.4, innerGrowth: 0.4, externalReward: 0.2, emotionalIntensity: 0.7, socialConnection: 0.3 },
    },
    {
        id: 14,
        name: 'Temperance',
        arcana: 'major',
        uprightMeaning: 'Balance, moderation, patience, purpose',
        reversedMeaning: 'Imbalance, excess, self-healing, re-alignment',
        uprightVector: { stability: 0.8, change: 0.4, risk: 0.2, safety: 0.8, innerGrowth: 0.8, externalReward: 0.5, emotionalIntensity: 0.3, socialConnection: 0.6 },
        reversedVector: { stability: 0.3, change: 0.6, risk: 0.5, safety: 0.3, innerGrowth: 0.4, externalReward: 0.3, emotionalIntensity: 0.6, socialConnection: 0.4 },
    },
    {
        id: 15,
        name: 'The Devil',
        arcana: 'major',
        uprightMeaning: 'Shadow self, attachment, addiction, restriction, sexuality',
        reversedMeaning: 'Releasing limiting beliefs, exploring dark thoughts, detachment',
        uprightVector: { stability: 0.3, change: 0.4, risk: 0.9, safety: 0.1, innerGrowth: 0.3, externalReward: 0.7, emotionalIntensity: 0.9, socialConnection: 0.4 },
        reversedVector: { stability: 0.4, change: 0.7, risk: 0.5, safety: 0.5, innerGrowth: 0.7, externalReward: 0.3, emotionalIntensity: 0.6, socialConnection: 0.3 },
    },
    {
        id: 16,
        name: 'The Tower',
        arcana: 'major',
        uprightMeaning: 'Sudden change, upheaval, chaos, revelation, awakening',
        reversedMeaning: 'Personal transformation, fear of change, averting disaster',
        uprightVector: { stability: 0.0, change: 1.0, risk: 1.0, safety: 0.0, innerGrowth: 0.6, externalReward: 0.1, emotionalIntensity: 1.0, socialConnection: 0.3 },
        reversedVector: { stability: 0.2, change: 0.5, risk: 0.7, safety: 0.2, innerGrowth: 0.5, externalReward: 0.2, emotionalIntensity: 0.8, socialConnection: 0.3 },
    },
    {
        id: 17,
        name: 'The Star',
        arcana: 'major',
        uprightMeaning: 'Hope, faith, purpose, renewal, spirituality',
        reversedMeaning: 'Lack of faith, despair, self-trust, disconnection',
        uprightVector: { stability: 0.6, change: 0.5, risk: 0.2, safety: 0.7, innerGrowth: 0.9, externalReward: 0.4, emotionalIntensity: 0.6, socialConnection: 0.5 },
        reversedVector: { stability: 0.3, change: 0.3, risk: 0.5, safety: 0.2, innerGrowth: 0.3, externalReward: 0.1, emotionalIntensity: 0.7, socialConnection: 0.2 },
    },
    {
        id: 18,
        name: 'The Moon',
        arcana: 'major',
        uprightMeaning: 'Illusion, fear, anxiety, subconscious, intuition',
        reversedMeaning: 'Release of fear, repressed emotion, inner confusion',
        uprightVector: { stability: 0.3, change: 0.6, risk: 0.7, safety: 0.2, innerGrowth: 0.7, externalReward: 0.2, emotionalIntensity: 0.8, socialConnection: 0.3 },
        reversedVector: { stability: 0.4, change: 0.4, risk: 0.5, safety: 0.4, innerGrowth: 0.5, externalReward: 0.3, emotionalIntensity: 0.6, socialConnection: 0.3 },
    },
    {
        id: 19,
        name: 'The Sun',
        arcana: 'major',
        uprightMeaning: 'Positivity, fun, warmth, success, vitality',
        reversedMeaning: 'Inner child, feeling down, overly optimistic',
        uprightVector: { stability: 0.8, change: 0.4, risk: 0.1, safety: 0.9, innerGrowth: 0.7, externalReward: 1.0, emotionalIntensity: 0.7, socialConnection: 0.8 },
        reversedVector: { stability: 0.5, change: 0.3, risk: 0.4, safety: 0.5, innerGrowth: 0.5, externalReward: 0.4, emotionalIntensity: 0.5, socialConnection: 0.5 },
    },
    {
        id: 20,
        name: 'Judgement',
        arcana: 'major',
        uprightMeaning: 'Judgement, rebirth, inner calling, absolution',
        reversedMeaning: 'Self-doubt, inner critic, ignoring the call',
        uprightVector: { stability: 0.5, change: 0.9, risk: 0.6, safety: 0.5, innerGrowth: 1.0, externalReward: 0.5, emotionalIntensity: 0.8, socialConnection: 0.6 },
        reversedVector: { stability: 0.3, change: 0.2, risk: 0.5, safety: 0.3, innerGrowth: 0.3, externalReward: 0.2, emotionalIntensity: 0.7, socialConnection: 0.2 },
    },
    {
        id: 21,
        name: 'The World',
        arcana: 'major',
        uprightMeaning: 'Completion, integration, accomplishment, travel',
        reversedMeaning: 'Seeking personal closure, short-cuts, delays',
        uprightVector: { stability: 0.9, change: 0.3, risk: 0.1, safety: 0.9, innerGrowth: 0.9, externalReward: 1.0, emotionalIntensity: 0.6, socialConnection: 0.8 },
        reversedVector: { stability: 0.5, change: 0.4, risk: 0.4, safety: 0.5, innerGrowth: 0.5, externalReward: 0.4, emotionalIntensity: 0.6, socialConnection: 0.4 },
    },
    {
        id: 26,
        name: '10 of Wands',
        arcana: 'minor',
        suit: 'wands',
        uprightMeaning: 'Burden, extra responsibility, hard work, completion',
        reversedMeaning: 'Doing it all, carrying the burden, delegation',
        uprightVector: { stability: 0.4, change: 0.3, risk: 0.6, safety: 0.3, innerGrowth: 0.5, externalReward: 0.6, emotionalIntensity: 0.8, socialConnection: 0.3 },
        reversedVector: { stability: 0.5, change: 0.4, risk: 0.4, safety: 0.5, innerGrowth: 0.4, externalReward: 0.3, emotionalIntensity: 0.6, socialConnection: 0.5 },
    },
    {
        id: 27,
        name: 'Page of Wands',
        arcana: 'minor',
        suit: 'wands',
        uprightMeaning: 'Inspiration, ideas, discovery, limitless potential',
        reversedMeaning: 'Newly formed ideas, redirecting energy, self-limiting beliefs',
        uprightVector: { stability: 0.3, change: 0.8, risk: 0.6, safety: 0.4, innerGrowth: 0.7, externalReward: 0.4, emotionalIntensity: 0.7, socialConnection: 0.6 },
        reversedVector: { stability: 0.2, change: 0.4, risk: 0.7, safety: 0.2, innerGrowth: 0.4, externalReward: 0.2, emotionalIntensity: 0.5, socialConnection: 0.3 },
    },
    {
        id: 28,
        name: 'Knight of Wands',
        arcana: 'minor',
        suit: 'wands',
        uprightMeaning: 'Energy, passion, inspired action, adventure, impulsiveness',
        reversedMeaning: 'Passion project, haste, scattered energy, delays',
        uprightVector: { stability: 0.2, change: 0.9, risk: 0.8, safety: 0.2, innerGrowth: 0.5, externalReward: 0.6, emotionalIntensity: 0.8, socialConnection: 0.5 },
        reversedVector: { stability: 0.1, change: 0.5, risk: 0.9, safety: 0.1, innerGrowth: 0.3, externalReward: 0.3, emotionalIntensity: 0.7, socialConnection: 0.3 },
    },
    {
        id: 29,
        name: 'Queen of Wands',
        arcana: 'minor',
        suit: 'wands',
        uprightMeaning: 'Courage, confidence, independence, social butterfly, determination',
        reversedMeaning: 'Self-respect, self-confidence, introverted, re-establishing sense of self',
        uprightVector: { stability: 0.6, change: 0.6, risk: 0.4, safety: 0.6, innerGrowth: 0.7, externalReward: 0.7, emotionalIntensity: 0.7, socialConnection: 0.9 },
        reversedVector: { stability: 0.4, change: 0.4, risk: 0.5, safety: 0.4, innerGrowth: 0.6, externalReward: 0.4, emotionalIntensity: 0.6, socialConnection: 0.4 },
    },
    {
        id: 30,
        name: 'King of Wands',
        arcana: 'minor',
        suit: 'wands',
        uprightMeaning: 'Natural-born leader, vision, entrepreneur, honor',
        reversedMeaning: 'Impulsiveness, haste, ruthless, high expectations',
        uprightVector: { stability: 0.7, change: 0.7, risk: 0.5, safety: 0.6, innerGrowth: 0.6, externalReward: 0.9, emotionalIntensity: 0.6, socialConnection: 0.8 },
        reversedVector: { stability: 0.4, change: 0.5, risk: 0.7, safety: 0.3, innerGrowth: 0.4, externalReward: 0.5, emotionalIntensity: 0.7, socialConnection: 0.5 },
    },
    {
        id: 31,
        name: '10 of Cups',
        arcana: 'minor',
        suit: 'cups',
        uprightMeaning: 'Divine love, blissful relationships, harmony, alignment',
        reversedMeaning: 'Disconnection, misaligned values, struggling relationships',
        uprightVector: { stability: 0.8, change: 0.2, risk: 0.1, safety: 0.9, innerGrowth: 0.7, externalReward: 0.8, emotionalIntensity: 0.9, socialConnection: 1.0 },
        reversedVector: { stability: 0.4, change: 0.4, risk: 0.4, safety: 0.3, innerGrowth: 0.5, externalReward: 0.3, emotionalIntensity: 0.7, socialConnection: 0.3 },
    },
    {
        id: 32,
        name: 'Page of Cups',
        arcana: 'minor',
        suit: 'cups',
        uprightMeaning: 'Creative opportunity, intuitive messages, curiosity',
        reversedMeaning: 'New ideas, doubting intuition, creative blocks',
        uprightVector: { stability: 0.4, change: 0.6, risk: 0.3, safety: 0.6, innerGrowth: 0.7, externalReward: 0.3, emotionalIntensity: 0.8, socialConnection: 0.6 },
        reversedVector: { stability: 0.3, change: 0.3, risk: 0.4, safety: 0.4, innerGrowth: 0.4, externalReward: 0.2, emotionalIntensity: 0.6, socialConnection: 0.3 },
    },
    {
        id: 33,
        name: 'Knight of Cups',
        arcana: 'minor',
        suit: 'cups',
        uprightMeaning: 'Creativity, romance, charm, imagination, beauty',
        reversedMeaning: 'Overactive imagination, unrealistic, jealous, moody',
        uprightVector: { stability: 0.4, change: 0.6, risk: 0.4, safety: 0.5, innerGrowth: 0.6, externalReward: 0.5, emotionalIntensity: 0.9, socialConnection: 0.7 },
        reversedVector: { stability: 0.2, change: 0.4, risk: 0.5, safety: 0.2, innerGrowth: 0.4, externalReward: 0.2, emotionalIntensity: 0.8, socialConnection: 0.4 },
    },
    {
        id: 34,
        name: 'Queen of Cups',
        arcana: 'minor',
        suit: 'cups',
        uprightMeaning: 'Compassionate, caring, emotionally stable, intuitive',
        reversedMeaning: 'Inner feelings, self-care, self-love, co-dependency',
        uprightVector: { stability: 0.7, change: 0.3, risk: 0.2, safety: 0.8, innerGrowth: 0.8, externalReward: 0.4, emotionalIntensity: 0.8, socialConnection: 0.9 },
        reversedVector: { stability: 0.4, change: 0.4, risk: 0.4, safety: 0.4, innerGrowth: 0.6, externalReward: 0.2, emotionalIntensity: 0.9, socialConnection: 0.5 },
    },
    {
        id: 35,
        name: 'King of Cups',
        arcana: 'minor',
        suit: 'cups',
        uprightMeaning: 'Emotionally balanced, compassionate, diplomatic',
        reversedMeaning: 'Self-compassion, inner feelings, moodiness, emotionally manipulative',
        uprightVector: { stability: 0.8, change: 0.3, risk: 0.2, safety: 0.8, innerGrowth: 0.8, externalReward: 0.7, emotionalIntensity: 0.6, socialConnection: 0.8 },
        reversedVector: { stability: 0.4, change: 0.5, risk: 0.5, safety: 0.3, innerGrowth: 0.5, externalReward: 0.3, emotionalIntensity: 0.8, socialConnection: 0.4 },
    },
    {
        id: 36,
        name: '10 of Swords',
        arcana: 'minor',
        suit: 'swords',
        uprightMeaning: 'Painful endings, deep wounds, betrayal, loss, crisis',
        reversedMeaning: 'Recovery, regeneration, resisting an inevitable end',
        uprightVector: { stability: 0.1, change: 0.9, risk: 0.9, safety: 0.0, innerGrowth: 0.5, externalReward: 0.0, emotionalIntensity: 1.0, socialConnection: 0.2 },
        reversedVector: { stability: 0.3, change: 0.5, risk: 0.6, safety: 0.3, innerGrowth: 0.6, externalReward: 0.2, emotionalIntensity: 0.7, socialConnection: 0.3 },
    },
    {
        id: 37,
        name: 'Page of Swords',
        arcana: 'minor',
        suit: 'swords',
        uprightMeaning: 'New ideas, curiosity, thirst for knowledge, new ways of communicating',
        reversedMeaning: 'Self-expression, all talk and no action, haphazard action',
        uprightVector: { stability: 0.3, change: 0.7, risk: 0.6, safety: 0.4, innerGrowth: 0.6, externalReward: 0.4, emotionalIntensity: 0.5, socialConnection: 0.5 },
        reversedVector: { stability: 0.2, change: 0.4, risk: 0.7, safety: 0.2, innerGrowth: 0.4, externalReward: 0.2, emotionalIntensity: 0.6, socialConnection: 0.2 },
    },
    {
        id: 38,
        name: 'Knight of Swords',
        arcana: 'minor',
        suit: 'swords',
        uprightMeaning: 'Ambitious, action-oriented, driven to succeed, fast-thinking',
        reversedMeaning: 'Restless, unfocused, impulsive, burn-out',
        uprightVector: { stability: 0.3, change: 0.9, risk: 0.8, safety: 0.3, innerGrowth: 0.5, externalReward: 0.7, emotionalIntensity: 0.6, socialConnection: 0.4 },
        reversedVector: { stability: 0.2, change: 0.5, risk: 0.8, safety: 0.2, innerGrowth: 0.3, externalReward: 0.3, emotionalIntensity: 0.7, socialConnection: 0.2 },
    },
    {
        id: 39,
        name: 'Queen of Swords',
        arcana: 'minor',
        suit: 'swords',
        uprightMeaning: 'Independent, unbiased judgement, clear boundaries, direct communication',
        reversedMeaning: 'Overly-emotional, easily influenced, bitchy, cold',
        uprightVector: { stability: 0.7, change: 0.4, risk: 0.4, safety: 0.6, innerGrowth: 0.7, externalReward: 0.6, emotionalIntensity: 0.4, socialConnection: 0.5 },
        reversedVector: { stability: 0.4, change: 0.4, risk: 0.5, safety: 0.3, innerGrowth: 0.4, externalReward: 0.3, emotionalIntensity: 0.8, socialConnection: 0.3 },
    },
    {
        id: 40,
        name: 'King of Swords',
        arcana: 'minor',
        suit: 'swords',
        uprightMeaning: 'Mental clarity, intellectual power, authority, truth',
        reversedMeaning: 'Quiet power, inner truth, misuse of power, manipulation',
        uprightVector: { stability: 0.8, change: 0.4, risk: 0.3, safety: 0.7, innerGrowth: 0.7, externalReward: 0.8, emotionalIntensity: 0.3, socialConnection: 0.6 },
        reversedVector: { stability: 0.5, change: 0.5, risk: 0.6, safety: 0.4, innerGrowth: 0.5, externalReward: 0.5, emotionalIntensity: 0.5, socialConnection: 0.3 },
    },
    {
        id: 41,
        name: '10 of Pentacles',
        arcana: 'minor',
        suit: 'pentacles',
        uprightMeaning: 'Wealth, financial security, family, long-term success, contribution',
        reversedMeaning: 'The dark side of wealth, financial failure or loss',
        uprightVector: { stability: 1.0, change: 0.1, risk: 0.1, safety: 1.0, innerGrowth: 0.5, externalReward: 1.0, emotionalIntensity: 0.4, socialConnection: 0.9 },
        reversedVector: { stability: 0.4, change: 0.5, risk: 0.7, safety: 0.3, innerGrowth: 0.3, externalReward: 0.3, emotionalIntensity: 0.6, socialConnection: 0.4 },
    },
    {
        id: 42,
        name: 'Page of Pentacles',
        arcana: 'minor',
        suit: 'pentacles',
        uprightMeaning: 'Manifestation, financial opportunity, skill development',
        reversedMeaning: 'Lack of progress, procrastination, learn from failure',
        uprightVector: { stability: 0.6, change: 0.4, risk: 0.2, safety: 0.7, innerGrowth: 0.6, externalReward: 0.5, emotionalIntensity: 0.4, socialConnection: 0.4 },
        reversedVector: { stability: 0.4, change: 0.3, risk: 0.4, safety: 0.4, innerGrowth: 0.4, externalReward: 0.2, emotionalIntensity: 0.5, socialConnection: 0.3 },
    },
    {
        id: 43,
        name: 'Knight of Pentacles',
        arcana: 'minor',
        suit: 'pentacles',
        uprightMeaning: 'Hard work, productivity, routine, conservatism',
        reversedMeaning: 'Self-discipline, boredom, feeling "stuck", perfectionism',
        uprightVector: { stability: 0.8, change: 0.1, risk: 0.1, safety: 0.8, innerGrowth: 0.4, externalReward: 0.6, emotionalIntensity: 0.3, socialConnection: 0.4 },
        reversedVector: { stability: 0.5, change: 0.2, risk: 0.3, safety: 0.5, innerGrowth: 0.3, externalReward: 0.3, emotionalIntensity: 0.4, socialConnection: 0.3 },
    },
    {
        id: 44,
        name: 'Queen of Pentacles',
        arcana: 'minor',
        suit: 'pentacles',
        uprightMeaning: 'Nurturing, practical, providing financially, a working parent',
        reversedMeaning: 'Financial independence, self-care, work-home conflict',
        uprightVector: { stability: 0.9, change: 0.2, risk: 0.1, safety: 0.9, innerGrowth: 0.6, externalReward: 0.8, emotionalIntensity: 0.6, socialConnection: 0.8 },
        reversedVector: { stability: 0.5, change: 0.4, risk: 0.4, safety: 0.5, innerGrowth: 0.5, externalReward: 0.4, emotionalIntensity: 0.6, socialConnection: 0.4 },
    },
    {
        id: 45,
        name: 'King of Pentacles',
        arcana: 'minor',
        suit: 'pentacles',
        uprightMeaning: 'Wealth, business, leadership, security, discipline, abundance',
        reversedMeaning: 'Financially inept, obsessed with wealth and status, stubborn',
        uprightVector: { stability: 1.0, change: 0.1, risk: 0.1, safety: 0.9, innerGrowth: 0.5, externalReward: 1.0, emotionalIntensity: 0.3, socialConnection: 0.7 },
        reversedVector: { stability: 0.6, change: 0.3, risk: 0.6, safety: 0.5, innerGrowth: 0.3, externalReward: 0.5, emotionalIntensity: 0.5, socialConnection: 0.4 },
    },
    {
        id: 46,
        name: '2 of Wands',
        arcana: 'minor',
        suit: 'wands',
        uprightMeaning: 'Future planning, progress, decisions, discovery',
        reversedMeaning: 'Fear of unknown, lack of planning',
        uprightVector: { stability: 0.5, change: 0.6, risk: 0.4, safety: 0.5, innerGrowth: 0.6, externalReward: 0.5, emotionalIntensity: 0.4, socialConnection: 0.3 },
        reversedVector: { stability: 0.3, change: 0.3, risk: 0.6, safety: 0.3, innerGrowth: 0.3, externalReward: 0.2, emotionalIntensity: 0.5, socialConnection: 0.2 },
    },
    {
        id: 47,
        name: '3 of Wands',
        arcana: 'minor',
        suit: 'wands',
        uprightMeaning: 'Expansion, foresight, overseas opportunities',
        reversedMeaning: 'Playing small, lack of foresight, unexpected delays',
        uprightVector: { stability: 0.4, change: 0.7, risk: 0.5, safety: 0.4, innerGrowth: 0.6, externalReward: 0.7, emotionalIntensity: 0.5, socialConnection: 0.4 },
        reversedVector: { stability: 0.3, change: 0.4, risk: 0.5, safety: 0.4, innerGrowth: 0.3, externalReward: 0.3, emotionalIntensity: 0.6, socialConnection: 0.3 },
    },
    {
        id: 48,
        name: '4 of Wands',
        arcana: 'minor',
        suit: 'wands',
        uprightMeaning: 'Celebration, joy, harmony, relaxation, homecoming',
        reversedMeaning: 'Personal celebration, inner harmony, conflict with family',
        uprightVector: { stability: 0.8, change: 0.2, risk: 0.1, safety: 0.9, innerGrowth: 0.5, externalReward: 0.6, emotionalIntensity: 0.7, socialConnection: 0.9 },
        reversedVector: { stability: 0.5, change: 0.4, risk: 0.4, safety: 0.5, innerGrowth: 0.4, externalReward: 0.3, emotionalIntensity: 0.6, socialConnection: 0.5 },
    },
    {
        id: 49,
        name: '5 of Wands',
        arcana: 'minor',
        suit: 'wands',
        uprightMeaning: 'Conflict, disagreements, competition, tension',
        reversedMeaning: 'Conflict avoidance, diversity of opinion, agreeing to disagree',
        uprightVector: { stability: 0.2, change: 0.7, risk: 0.6, safety: 0.3, innerGrowth: 0.4, externalReward: 0.3, emotionalIntensity: 0.8, socialConnection: 0.4 },
        reversedVector: { stability: 0.4, change: 0.4, risk: 0.4, safety: 0.5, innerGrowth: 0.5, externalReward: 0.2, emotionalIntensity: 0.5, socialConnection: 0.5 },
    },
    {
        id: 50,
        name: '6 of Wands',
        arcana: 'minor',
        suit: 'wands',
        uprightMeaning: 'Success, public recognition, progress, self-confidence',
        reversedMeaning: 'Egotism, fall from grace, lack of recognition',
        uprightVector: { stability: 0.6, change: 0.5, risk: 0.3, safety: 0.6, innerGrowth: 0.6, externalReward: 0.9, emotionalIntensity: 0.7, socialConnection: 0.8 },
        reversedVector: { stability: 0.3, change: 0.4, risk: 0.5, safety: 0.3, innerGrowth: 0.3, externalReward: 0.3, emotionalIntensity: 0.6, socialConnection: 0.4 },
    },
    {
        id: 51,
        name: '7 of Wands',
        arcana: 'minor',
        suit: 'wands',
        uprightMeaning: 'Challenge, competition, protection, perseverance',
        reversedMeaning: 'Giving up, overwhelmed, overly protective',
        uprightVector: { stability: 0.5, change: 0.6, risk: 0.7, safety: 0.4, innerGrowth: 0.7, externalReward: 0.5, emotionalIntensity: 0.8, socialConnection: 0.2 },
        reversedVector: { stability: 0.2, change: 0.4, risk: 0.8, safety: 0.2, innerGrowth: 0.4, externalReward: 0.2, emotionalIntensity: 0.7, socialConnection: 0.2 },
    },
    {
        id: 52,
        name: '8 of Wands',
        arcana: 'minor',
        suit: 'wands',
        uprightMeaning: 'Movement, fast paced change, action, alignment',
        reversedMeaning: 'Delays, frustration, resisting change, panic',
        uprightVector: { stability: 0.2, change: 0.9, risk: 0.6, safety: 0.3, innerGrowth: 0.4, externalReward: 0.6, emotionalIntensity: 0.6, socialConnection: 0.5 },
        reversedVector: { stability: 0.2, change: 0.3, risk: 0.7, safety: 0.2, innerGrowth: 0.3, externalReward: 0.2, emotionalIntensity: 0.8, socialConnection: 0.3 },
    },
    {
        id: 53,
        name: '9 of Wands',
        arcana: 'minor',
        suit: 'wands',
        uprightMeaning: 'Resilience, courage, persistence, test of faith',
        reversedMeaning: 'Inner struggles, overwhelm, defensive, paranoia',
        uprightVector: { stability: 0.6, change: 0.3, risk: 0.5, safety: 0.5, innerGrowth: 0.8, externalReward: 0.4, emotionalIntensity: 0.7, socialConnection: 0.2 },
        reversedVector: { stability: 0.3, change: 0.4, risk: 0.6, safety: 0.2, innerGrowth: 0.4, externalReward: 0.2, emotionalIntensity: 0.8, socialConnection: 0.1 },
    },
    {
        id: 54,
        name: '2 of Cups',
        arcana: 'minor',
        suit: 'cups',
        uprightMeaning: 'Unified love, partnership, mutual attraction',
        reversedMeaning: 'Self-love, break-ups, disharmony, distrust',
        uprightVector: { stability: 0.7, change: 0.4, risk: 0.2, safety: 0.8, innerGrowth: 0.6, externalReward: 0.5, emotionalIntensity: 0.9, socialConnection: 1.0 },
        reversedVector: { stability: 0.3, change: 0.6, risk: 0.5, safety: 0.3, innerGrowth: 0.5, externalReward: 0.2, emotionalIntensity: 0.8, socialConnection: 0.2 },
    },
    {
        id: 55,
        name: '3 of Cups',
        arcana: 'minor',
        suit: 'cups',
        uprightMeaning: 'Celebration, friendship, creativity, collaborations',
        reversedMeaning: 'Independence, alone time, gossip, isolation',
        uprightVector: { stability: 0.6, change: 0.3, risk: 0.2, safety: 0.7, innerGrowth: 0.4, externalReward: 0.4, emotionalIntensity: 0.8, socialConnection: 0.9 },
        reversedVector: { stability: 0.4, change: 0.4, risk: 0.3, safety: 0.4, innerGrowth: 0.5, externalReward: 0.2, emotionalIntensity: 0.6, socialConnection: 0.3 },
    },
    {
        id: 56,
        name: '4 of Cups',
        arcana: 'minor',
        suit: 'cups',
        uprightMeaning: 'Meditation, contemplation, apathy, re-evaluation',
        reversedMeaning: 'Retreat, withdrawal, checking in for alignment',
        uprightVector: { stability: 0.5, change: 0.1, risk: 0.1, safety: 0.6, innerGrowth: 0.7, externalReward: 0.2, emotionalIntensity: 0.4, socialConnection: 0.2 },
        reversedVector: { stability: 0.4, change: 0.3, risk: 0.2, safety: 0.4, innerGrowth: 0.6, externalReward: 0.2, emotionalIntensity: 0.5, socialConnection: 0.3 },
    },
    {
        id: 57,
        name: '5 of Cups',
        arcana: 'minor',
        suit: 'cups',
        uprightMeaning: 'Regret, failure, disappointment, pessimism',
        reversedMeaning: 'Personal setbacks, self-forgiveness, moving on',
        uprightVector: { stability: 0.2, change: 0.4, risk: 0.4, safety: 0.2, innerGrowth: 0.5, externalReward: 0.1, emotionalIntensity: 0.9, socialConnection: 0.3 },
        reversedVector: { stability: 0.3, change: 0.5, risk: 0.3, safety: 0.4, innerGrowth: 0.7, externalReward: 0.2, emotionalIntensity: 0.6, socialConnection: 0.4 },
    },
    {
        id: 58,
        name: '6 of Cups',
        arcana: 'minor',
        suit: 'cups',
        uprightMeaning: 'Revisiting the past, childhood memories, innocence, joy',
        reversedMeaning: 'Living in the past, forgiveness, lacking playfulness',
        uprightVector: { stability: 0.7, change: 0.2, risk: 0.1, safety: 0.8, innerGrowth: 0.5, externalReward: 0.3, emotionalIntensity: 0.7, socialConnection: 0.7 },
        reversedVector: { stability: 0.4, change: 0.4, risk: 0.3, safety: 0.4, innerGrowth: 0.4, externalReward: 0.2, emotionalIntensity: 0.5, socialConnection: 0.4 },
    },
    {
        id: 59,
        name: '7 of Cups',
        arcana: 'minor',
        suit: 'cups',
        uprightMeaning: 'Opportunities, choices, wishful thinking, illusion',
        reversedMeaning: 'Alignment, personal values, overwhelmed by choices',
        uprightVector: { stability: 0.3, change: 0.6, risk: 0.6, safety: 0.3, innerGrowth: 0.5, externalReward: 0.5, emotionalIntensity: 0.6, socialConnection: 0.4 },
        reversedVector: { stability: 0.5, change: 0.3, risk: 0.3, safety: 0.6, innerGrowth: 0.6, externalReward: 0.3, emotionalIntensity: 0.4, socialConnection: 0.3 },
    },
    {
        id: 60,
        name: '8 of Cups',
        arcana: 'minor',
        suit: 'cups',
        uprightMeaning: 'Disappointment, abandonment, withdrawal, escapism',
        reversedMeaning: 'Trying one more time, indecision, aimless drifting',
        uprightVector: { stability: 0.2, change: 0.8, risk: 0.6, safety: 0.1, innerGrowth: 0.8, externalReward: 0.1, emotionalIntensity: 0.7, socialConnection: 0.1 },
        reversedVector: { stability: 0.3, change: 0.3, risk: 0.5, safety: 0.3, innerGrowth: 0.4, externalReward: 0.2, emotionalIntensity: 0.6, socialConnection: 0.2 },
    },
    {
        id: 61,
        name: '9 of Cups',
        arcana: 'minor',
        suit: 'cups',
        uprightMeaning: 'Contentment, satisfaction, gratitude, wish come true',
        reversedMeaning: 'Inner happiness, materialism, dissatisfaction',
        uprightVector: { stability: 0.8, change: 0.2, risk: 0.1, safety: 0.8, innerGrowth: 0.6, externalReward: 0.9, emotionalIntensity: 0.7, socialConnection: 0.5 },
        reversedVector: { stability: 0.5, change: 0.3, risk: 0.3, safety: 0.5, innerGrowth: 0.5, externalReward: 0.4, emotionalIntensity: 0.5, socialConnection: 0.3 },
    },
    {
        id: 62,
        name: '2 of Swords',
        arcana: 'minor',
        suit: 'swords',
        uprightMeaning: 'Difficult decisions, weighing options, an impasse, avoidance',
        reversedMeaning: 'Indecision, confusion, information overload',
        uprightVector: { stability: 0.5, change: 0.2, risk: 0.4, safety: 0.4, innerGrowth: 0.5, externalReward: 0.2, emotionalIntensity: 0.4, socialConnection: 0.3 },
        reversedVector: { stability: 0.3, change: 0.5, risk: 0.5, safety: 0.3, innerGrowth: 0.4, externalReward: 0.1, emotionalIntensity: 0.6, socialConnection: 0.2 },
    },
    {
        id: 63,
        name: '3 of Swords',
        arcana: 'minor',
        suit: 'swords',
        uprightMeaning: 'Heartbreak, emotional pain, sorrow, grief, hurt',
        reversedMeaning: 'Negative self-talk, releasing pain, optimism, forgiveness',
        uprightVector: { stability: 0.2, change: 0.6, risk: 0.5, safety: 0.1, innerGrowth: 0.7, externalReward: 0.1, emotionalIntensity: 1.0, socialConnection: 0.2 },
        reversedVector: { stability: 0.4, change: 0.4, risk: 0.3, safety: 0.4, innerGrowth: 0.8, externalReward: 0.2, emotionalIntensity: 0.6, socialConnection: 0.3 },
    },
    {
        id: 64,
        name: '4 of Swords',
        arcana: 'minor',
        suit: 'swords',
        uprightMeaning: 'Rest, relaxation, meditation, contemplation, recuperation',
        reversedMeaning: 'Exhaustion, burn-out, deep contemplation',
        uprightVector: { stability: 0.8, change: 0.1, risk: 0.1, safety: 0.9, innerGrowth: 0.7, externalReward: 0.1, emotionalIntensity: 0.2, socialConnection: 0.1 },
        reversedVector: { stability: 0.4, change: 0.3, risk: 0.4, safety: 0.3, innerGrowth: 0.5, externalReward: 0.1, emotionalIntensity: 0.6, socialConnection: 0.2 },
    },
    {
        id: 65,
        name: '5 of Swords',
        arcana: 'minor',
        suit: 'swords',
        uprightMeaning: 'Conflict, disagreements, competition, defeat, winning at all costs',
        reversedMeaning: 'Reconciliation, making amends, past resentment',
        uprightVector: { stability: 0.2, change: 0.6, risk: 0.7, safety: 0.1, innerGrowth: 0.3, externalReward: 0.4, emotionalIntensity: 0.7, socialConnection: 0.2 },
        reversedVector: { stability: 0.4, change: 0.5, risk: 0.4, safety: 0.4, innerGrowth: 0.6, externalReward: 0.2, emotionalIntensity: 0.5, socialConnection: 0.5 },
    },
    {
        id: 66,
        name: '6 of Swords',
        arcana: 'minor',
        suit: 'swords',
        uprightMeaning: 'Transition, change, rite of passage, releasing baggage',
        reversedMeaning: 'Personal transition, resistance to change, unfinished business',
        uprightVector: { stability: 0.4, change: 0.8, risk: 0.5, safety: 0.4, innerGrowth: 0.6, externalReward: 0.3, emotionalIntensity: 0.5, socialConnection: 0.4 },
        reversedVector: { stability: 0.3, change: 0.3, risk: 0.6, safety: 0.3, innerGrowth: 0.4, externalReward: 0.2, emotionalIntensity: 0.7, socialConnection: 0.3 },
    },
    {
        id: 67,
        name: '7 of Swords',
        arcana: 'minor',
        suit: 'swords',
        uprightMeaning: 'Betrayal, deception, getting away with something, acting blindly',
        reversedMeaning: 'Imposter syndrome, self-deceit, keeping secrets',
        uprightVector: { stability: 0.3, change: 0.5, risk: 0.8, safety: 0.2, innerGrowth: 0.3, externalReward: 0.4, emotionalIntensity: 0.6, socialConnection: 0.2 },
        reversedVector: { stability: 0.4, change: 0.4, risk: 0.5, safety: 0.3, innerGrowth: 0.6, externalReward: 0.2, emotionalIntensity: 0.5, socialConnection: 0.2 },
    },
    {
        id: 68,
        name: '8 of Swords',
        arcana: 'minor',
        suit: 'swords',
        uprightMeaning: 'Negative thoughts, self-imposed restriction, imprisonment, victim mentality',
        reversedMeaning: 'Self-acceptance, new perspectives, freedom',
        uprightVector: { stability: 0.2, change: 0.1, risk: 0.7, safety: 0.1, innerGrowth: 0.2, externalReward: 0.1, emotionalIntensity: 0.8, socialConnection: 0.2 },
        reversedVector: { stability: 0.4, change: 0.6, risk: 0.4, safety: 0.5, innerGrowth: 0.8, externalReward: 0.2, emotionalIntensity: 0.5, socialConnection: 0.4 },
    },
    {
        id: 69,
        name: '9 of Swords',
        arcana: 'minor',
        suit: 'swords',
        uprightMeaning: 'Anxiety, worry, fear, depression, nightmares',
        reversedMeaning: 'Inner turmoil, deep-seated fears, secrets, releasing worry',
        uprightVector: { stability: 0.1, change: 0.2, risk: 0.6, safety: 0.1, innerGrowth: 0.4, externalReward: 0.1, emotionalIntensity: 0.9, socialConnection: 0.2 },
        reversedVector: { stability: 0.3, change: 0.4, risk: 0.4, safety: 0.3, innerGrowth: 0.7, externalReward: 0.2, emotionalIntensity: 0.7, socialConnection: 0.3 },
    },
    {
        id: 70,
        name: '2 of Pentacles',
        arcana: 'minor',
        suit: 'pentacles',
        uprightMeaning: 'Multiple priorities, time management, adaptability, flow',
        reversedMeaning: 'Over-committed, disorganization, reprioritization',
        uprightVector: { stability: 0.4, change: 0.7, risk: 0.4, safety: 0.4, innerGrowth: 0.5, externalReward: 0.6, emotionalIntensity: 0.4, socialConnection: 0.4 },
        reversedVector: { stability: 0.2, change: 0.5, risk: 0.6, safety: 0.2, innerGrowth: 0.3, externalReward: 0.3, emotionalIntensity: 0.6, socialConnection: 0.2 },
    },
    {
        id: 71,
        name: '3 of Pentacles',
        arcana: 'minor',
        suit: 'pentacles',
        uprightMeaning: 'Teamwork, collaboration, learning, implementation',
        reversedMeaning: 'Disharmony, misalignment, working alone',
        uprightVector: { stability: 0.7, change: 0.4, risk: 0.2, safety: 0.7, innerGrowth: 0.6, externalReward: 0.7, emotionalIntensity: 0.4, socialConnection: 0.8 },
        reversedVector: { stability: 0.4, change: 0.4, risk: 0.4, safety: 0.4, innerGrowth: 0.4, externalReward: 0.3, emotionalIntensity: 0.5, socialConnection: 0.3 },
    },
    {
        id: 72,
        name: '4 of Pentacles',
        arcana: 'minor',
        suit: 'pentacles',
        uprightMeaning: 'Saving money, security, conservatism, scarcity, control',
        reversedMeaning: 'Over-spending, greed, self-protection',
        uprightVector: { stability: 0.9, change: 0.1, risk: 0.1, safety: 0.8, innerGrowth: 0.3, externalReward: 0.7, emotionalIntensity: 0.4, socialConnection: 0.2 },
        reversedVector: { stability: 0.4, change: 0.4, risk: 0.6, safety: 0.3, innerGrowth: 0.4, externalReward: 0.4, emotionalIntensity: 0.5, socialConnection: 0.3 },
    },
    {
        id: 73,
        name: '5 of Pentacles',
        arcana: 'minor',
        suit: 'pentacles',
        uprightMeaning: 'Financial loss, poverty, lack mindset, isolation, worry',
        reversedMeaning: 'Recovery from financial loss, spiritual poverty',
        uprightVector: { stability: 0.1, change: 0.5, risk: 0.8, safety: 0.0, innerGrowth: 0.4, externalReward: 0.1, emotionalIntensity: 0.8, socialConnection: 0.2 },
        reversedVector: { stability: 0.3, change: 0.6, risk: 0.5, safety: 0.2, innerGrowth: 0.6, externalReward: 0.3, emotionalIntensity: 0.6, socialConnection: 0.4 },
    },
    {
        id: 74,
        name: '6 of Pentacles',
        arcana: 'minor',
        suit: 'pentacles',
        uprightMeaning: 'Giving, receiving, sharing wealth, generosity, charity',
        reversedMeaning: 'Self-care, unpaid debt, one-sided charity',
        uprightVector: { stability: 0.7, change: 0.3, risk: 0.2, safety: 0.7, innerGrowth: 0.6, externalReward: 0.6, emotionalIntensity: 0.5, socialConnection: 0.8 },
        reversedVector: { stability: 0.4, change: 0.4, risk: 0.4, safety: 0.4, innerGrowth: 0.4, externalReward: 0.3, emotionalIntensity: 0.6, socialConnection: 0.4 },
    },
    {
        id: 75,
        name: '7 of Pentacles',
        arcana: 'minor',
        suit: 'pentacles',
        uprightMeaning: 'Long-term view, sustainable results, perseverance, investment',
        reversedMeaning: 'Lack of long-term vision, limited success, impatience',
        uprightVector: { stability: 0.6, change: 0.2, risk: 0.3, safety: 0.6, innerGrowth: 0.5, externalReward: 0.6, emotionalIntensity: 0.4, socialConnection: 0.3 },
        reversedVector: { stability: 0.3, change: 0.5, risk: 0.5, safety: 0.3, innerGrowth: 0.3, externalReward: 0.2, emotionalIntensity: 0.6, socialConnection: 0.2 },
    },
    {
        id: 76,
        name: '8 of Pentacles',
        arcana: 'minor',
        suit: 'pentacles',
        uprightMeaning: 'Apprenticeship, repetitive tasks, mastery, skill development',
        reversedMeaning: 'Self-development, perfectionism, misdirected activity',
        uprightVector: { stability: 0.8, change: 0.2, risk: 0.1, safety: 0.7, innerGrowth: 0.7, externalReward: 0.6, emotionalIntensity: 0.3, socialConnection: 0.2 },
        reversedVector: { stability: 0.4, change: 0.4, risk: 0.3, safety: 0.4, innerGrowth: 0.5, externalReward: 0.3, emotionalIntensity: 0.5, socialConnection: 0.2 },
    },
    {
        id: 77,
        name: '9 of Pentacles',
        arcana: 'minor',
        suit: 'pentacles',
        uprightMeaning: 'Abundance, luxury, self-sufficiency, financial independence',
        reversedMeaning: 'Self-worth, over-investment in work, hustling',
        uprightVector: { stability: 0.9, change: 0.1, risk: 0.2, safety: 0.9, innerGrowth: 0.7, externalReward: 1.0, emotionalIntensity: 0.5, socialConnection: 0.4 },
        reversedVector: { stability: 0.5, change: 0.3, risk: 0.4, safety: 0.5, innerGrowth: 0.5, externalReward: 0.6, emotionalIntensity: 0.6, socialConnection: 0.3 },
    },
];


/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AstrologyModule = void 0;
const common_1 = __webpack_require__(2);
let AstrologyModule = class AstrologyModule {
    getName() {
        return 'astrology';
    }
    async computeDailyReading(userProfile, date) {
        const birthDate = userProfile.birth_date ? new Date(userProfile.birth_date) : null;
        const sunSign = this.getSunSign(birthDate);
        const vector = this.getTransitVector(date);
        return {
            vector,
            confidence: 0.8,
            explanation: `As a ${sunSign}, today's planetary transits favor introspection and planning.`,
            details: {
                sunSign,
                dominantPlanet: 'Mercury',
                aspects: ['Mercury trine Neptune'],
            },
        };
    }
    async computeDecisionReading(userProfile, question, optionA, optionB) {
        const baseVector = this.getTransitVector(new Date());
        return {
            optionA: {
                vector: { ...baseVector, change: baseVector.change * 1.2, externalReward: baseVector.externalReward * 1.1 },
                confidence: 0.75,
                explanation: 'Planetary alignments favor bold action',
                details: { favorableAspects: ['Sun sextile Jupiter'] },
            },
            optionB: {
                vector: { ...baseVector, stability: baseVector.stability * 1.2, safety: baseVector.safety * 1.1 },
                confidence: 0.75,
                explanation: 'The stars suggest caution and deliberation',
                details: { favorableAspects: ['Moon trine Saturn'] },
            },
            comparison: 'Consider timing - Mercury retrograde ends next week',
        };
    }
    getSunSign(birthDate) {
        if (!birthDate)
            return 'Aquarius';
        const month = new Date(birthDate).getMonth() + 1;
        const day = new Date(birthDate).getDate();
        if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
            return 'Aries';
        if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
            return 'Taurus';
        return 'Aquarius';
    }
    getTransitVector(date) {
        return {
            stability: 0.6,
            change: 0.5,
            risk: 0.4,
            safety: 0.6,
            innerGrowth: 0.7,
            externalReward: 0.6,
            emotionalIntensity: 0.6,
            socialConnection: 0.7,
        };
    }
};
exports.AstrologyModule = AstrologyModule;
exports.AstrologyModule = AstrologyModule = __decorate([
    (0, common_1.Injectable)()
], AstrologyModule);


/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NumerologyModule = void 0;
const common_1 = __webpack_require__(2);
let NumerologyModule = class NumerologyModule {
    getName() {
        return 'numerology';
    }
    async computeDailyReading(userProfile, date) {
        const birthDate = userProfile.birth_date ? new Date(userProfile.birth_date) : new Date();
        const personalDay = this.calculatePersonalDay(birthDate, date);
        const vector = this.numberToVector(personalDay);
        return {
            vector,
            confidence: 0.7,
            explanation: `Your Personal Day Number is ${personalDay}: ${this.getNumberMeaning(personalDay)}`,
            details: {
                personalDay,
                meaning: this.getNumberMeaning(personalDay),
            },
        };
    }
    async computeDecisionReading(userProfile, question, optionA, optionB) {
        const birthDate = userProfile.birth_date ? new Date(userProfile.birth_date) : new Date();
        const lifePathNumber = this.calculateLifePath(birthDate);
        const questionNumber = this.calculateNameNumber(question);
        const numberA = this.reduceNumber((lifePathNumber + this.calculateNameNumber(optionA) + questionNumber) % 10);
        const numberB = this.reduceNumber((lifePathNumber + this.calculateNameNumber(optionB) + questionNumber) % 10);
        return {
            optionA: {
                vector: this.numberToVector(numberA),
                confidence: 0.65,
                explanation: `Option A resonates with number ${numberA}`,
                details: { number: numberA, meaning: this.getNumberMeaning(numberA) },
            },
            optionB: {
                vector: this.numberToVector(numberB),
                confidence: 0.65,
                explanation: `Option B resonates with number ${numberB}`,
                details: { number: numberB, meaning: this.getNumberMeaning(numberB) },
            },
            comparison: `Your Life Path ${lifePathNumber} guides this choice`,
        };
    }
    calculateLifePath(birthDate) {
        if (!birthDate)
            return 5;
        const date = new Date(birthDate);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return this.reduceNumber(day + month + year);
    }
    calculatePersonalDay(birthDate, currentDate) {
        if (!birthDate)
            return 5;
        const lifePath = this.calculateLifePath(birthDate);
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const personalYear = this.reduceNumber(day + month + year);
        const currentDay = currentDate.getDate();
        return this.reduceNumber(lifePath + personalYear + currentDay);
    }
    calculateNameNumber(text) {
        const values = {
            a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
            j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
            s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
        };
        let sum = 0;
        for (const char of text.toLowerCase()) {
            if (values[char]) {
                sum += values[char];
            }
        }
        return this.reduceNumber(sum);
    }
    reduceNumber(num) {
        while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
            num = num
                .toString()
                .split('')
                .reduce((a, b) => a + parseInt(b), 0);
        }
        return num;
    }
    numberToVector(num) {
        const vectors = {
            1: { stability: 0.5, change: 0.8, risk: 0.6, safety: 0.4, innerGrowth: 0.7, externalReward: 0.8, emotionalIntensity: 0.7, socialConnection: 0.4 },
            2: { stability: 0.7, change: 0.4, risk: 0.3, safety: 0.7, innerGrowth: 0.6, externalReward: 0.5, emotionalIntensity: 0.8, socialConnection: 0.9 },
            3: { stability: 0.4, change: 0.8, risk: 0.4, safety: 0.6, innerGrowth: 0.7, externalReward: 0.7, emotionalIntensity: 0.9, socialConnection: 0.8 },
            4: { stability: 0.9, change: 0.3, risk: 0.2, safety: 0.8, innerGrowth: 0.5, externalReward: 0.7, emotionalIntensity: 0.4, socialConnection: 0.6 },
            5: { stability: 0.3, change: 0.9, risk: 0.7, safety: 0.3, innerGrowth: 0.8, externalReward: 0.6, emotionalIntensity: 0.7, socialConnection: 0.7 },
            6: { stability: 0.7, change: 0.4, risk: 0.3, safety: 0.8, innerGrowth: 0.6, externalReward: 0.6, emotionalIntensity: 0.8, socialConnection: 0.9 },
            7: { stability: 0.6, change: 0.5, risk: 0.3, safety: 0.7, innerGrowth: 0.9, externalReward: 0.4, emotionalIntensity: 0.6, socialConnection: 0.3 },
            8: { stability: 0.8, change: 0.6, risk: 0.5, safety: 0.5, innerGrowth: 0.6, externalReward: 0.9, emotionalIntensity: 0.6, socialConnection: 0.7 },
            9: { stability: 0.5, change: 0.7, risk: 0.4, safety: 0.6, innerGrowth: 0.9, externalReward: 0.5, emotionalIntensity: 0.8, socialConnection: 0.8 },
            11: { stability: 0.4, change: 0.8, risk: 0.5, safety: 0.5, innerGrowth: 0.9, externalReward: 0.7, emotionalIntensity: 0.9, socialConnection: 0.7 },
            22: { stability: 0.8, change: 0.8, risk: 0.4, safety: 0.6, innerGrowth: 0.8, externalReward: 0.9, emotionalIntensity: 0.7, socialConnection: 0.8 },
            33: { stability: 0.7, change: 0.7, risk: 0.3, safety: 0.7, innerGrowth: 0.9, externalReward: 0.6, emotionalIntensity: 0.9, socialConnection: 0.9 },
        };
        return vectors[num] || vectors[5];
    }
    getNumberMeaning(num) {
        const meanings = {
            1: 'Leadership, independence, new beginnings',
            2: 'Balance, partnership, diplomacy',
            3: 'Creativity, expression, joy',
            4: 'Stability, hard work, foundation',
            5: 'Freedom, change, adventure',
            6: 'Harmony, responsibility, nurturing',
            7: 'Spirituality, introspection, wisdom',
            8: 'Power, abundance, material success',
            9: 'Completion, humanitarianism, wisdom',
            11: 'Intuition, inspiration, spiritual insight',
            22: 'Master builder, manifesting dreams',
            33: 'Master teacher, compassion, healing',
        };
        return meanings[num] || meanings[5];
    }
};
exports.NumerologyModule = NumerologyModule;
exports.NumerologyModule = NumerologyModule = __decorate([
    (0, common_1.Injectable)()
], NumerologyModule);


/***/ }),
/* 35 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IChingModule = void 0;
const common_1 = __webpack_require__(2);
let IChingModule = class IChingModule {
    getName() {
        return 'iching';
    }
    async computeDailyReading(userProfile, date) {
        const hexagram = this.generateHexagram(date.toISOString() + userProfile.user_id);
        const vector = this.hexagramToVector(hexagram);
        return {
            vector,
            confidence: 0.75,
            explanation: `Hexagram ${hexagram}: ${this.getHexagramName(hexagram)} - ${this.getHexagramMeaning(hexagram)}`,
            details: {
                hexagram,
                name: this.getHexagramName(hexagram),
                judgment: this.getHexagramMeaning(hexagram),
            },
        };
    }
    async computeDecisionReading(userProfile, question, optionA, optionB) {
        const hexA = this.generateHexagram(question + optionA + userProfile.user_id);
        const hexB = this.generateHexagram(question + optionB + userProfile.user_id);
        return {
            optionA: {
                vector: this.hexagramToVector(hexA),
                confidence: 0.8,
                explanation: `Hexagram ${hexA}: ${this.getHexagramName(hexA)}`,
                details: { hexagram: hexA, name: this.getHexagramName(hexA) },
            },
            optionB: {
                vector: this.hexagramToVector(hexB),
                confidence: 0.8,
                explanation: `Hexagram ${hexB}: ${this.getHexagramName(hexB)}`,
                details: { hexagram: hexB, name: this.getHexagramName(hexB) },
            },
            comparison: 'Consult the changing lines for timing',
        };
    }
    generateHexagram(seed) {
        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
            hash = (hash << 5) - hash + seed.charCodeAt(i);
            hash |= 0;
        }
        return (Math.abs(hash) % 64) + 1;
    }
    hexagramToVector(hexagram) {
        const base = {
            stability: 0.5,
            change: 0.5,
            risk: 0.4,
            safety: 0.6,
            innerGrowth: 0.7,
            externalReward: 0.5,
            emotionalIntensity: 0.5,
            socialConnection: 0.6,
        };
        if (hexagram <= 16) {
            base.change += 0.2;
            base.stability -= 0.1;
        }
        else if (hexagram <= 32) {
            base.innerGrowth += 0.2;
        }
        else if (hexagram <= 48) {
            base.externalReward += 0.2;
        }
        else {
            base.stability += 0.2;
        }
        return base;
    }
    getHexagramName(hexagram) {
        const names = {
            1: 'The Creative',
            2: 'The Receptive',
            3: 'Difficulty at the Beginning',
            4: 'Youthful Folly',
        };
        return names[hexagram] || `Hexagram ${hexagram}`;
    }
    getHexagramMeaning(hexagram) {
        return 'Perseverance brings good fortune. Contemplate your path carefully.';
    }
};
exports.IChingModule = IChingModule;
exports.IChingModule = IChingModule = __decorate([
    (0, common_1.Injectable)()
], IChingModule);


/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaZiModule = void 0;
const common_1 = __webpack_require__(2);
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const STEM_ELEMENTS = {
    '甲': 'Wood', '乙': 'Wood',
    '丙': 'Fire', '丁': 'Fire',
    '戊': 'Earth', '己': 'Earth',
    '庚': 'Metal', '辛': 'Metal',
    '壬': 'Water', '癸': 'Water'
};
const ELEMENT_RELATIONSHIPS = {
    Wood: { generates: 'Fire', controls: 'Earth' },
    Fire: { generates: 'Earth', controls: 'Metal' },
    Earth: { generates: 'Metal', controls: 'Water' },
    Metal: { generates: 'Water', controls: 'Wood' },
    Water: { generates: 'Wood', controls: 'Fire' }
};
let BaZiModule = class BaZiModule {
    getName() {
        return 'bazi';
    }
    async computeDailyReading(userProfile, date) {
        const birthDate = userProfile.birth_date ? new Date(userProfile.birth_date) : new Date();
        const userDayPillar = this.calculatePillar(birthDate);
        const dayMasterStem = userDayPillar.charAt(0);
        const dayMasterElement = STEM_ELEMENTS[dayMasterStem];
        const currentDayPillar = this.calculatePillar(date);
        const currentStem = currentDayPillar.charAt(0);
        const currentElement = STEM_ELEMENTS[currentStem];
        const relationship = this.getTenGodRelationship(dayMasterElement, currentElement);
        const vector = this.getVectorFromRelationship(relationship);
        return {
            vector,
            confidence: 0.85,
            explanation: `Your Day Master is ${dayMasterElement} (${dayMasterStem}). Today is a ${currentElement} Day (${currentStem}). This creates a "${relationship}" energy structure.`,
            details: {
                dayPillar: currentDayPillar,
                element: currentElement,
                interaction: relationship,
                luckyColors: this.getLuckyColors(dayMasterElement),
            },
        };
    }
    async computeDecisionReading(userProfile, question, optionA, optionB) {
        const birthDate = userProfile.birth_date ? new Date(userProfile.birth_date) : new Date();
        const userPillar = this.calculatePillar(birthDate);
        const dayMasterElement = STEM_ELEMENTS[userPillar.charAt(0)];
        const optionAElement = 'Wood';
        const optionBElement = 'Metal';
        const relationA = this.getTenGodRelationship(dayMasterElement, optionAElement);
        const relationB = this.getTenGodRelationship(dayMasterElement, optionBElement);
        return {
            optionA: {
                vector: this.getVectorFromRelationship(relationA),
                confidence: 0.75,
                explanation: `This option carries Wood energy, acting as your ${relationA}. ${this.getRelationshipAdvice(relationA)}`,
                details: { element: optionAElement, interaction: relationA },
            },
            optionB: {
                vector: this.getVectorFromRelationship(relationB),
                confidence: 0.75,
                explanation: `This option carries Metal energy, acting as your ${relationB}. ${this.getRelationshipAdvice(relationB)}`,
                details: { element: optionBElement, interaction: relationB },
            },
            comparison: `As a ${dayMasterElement} person, you face a choice between ${relationA} (Growth) and ${relationB} (Structure).`,
        };
    }
    calculatePillar(date) {
        const refDate = new Date(1900, 0, 1);
        const timeDiff = date.getTime() - refDate.getTime();
        const dayOffset = Math.floor(timeDiff / 86400000);
        const stemIndex = (0 + dayOffset) % 10;
        const branchIndex = (10 + dayOffset) % 12;
        const normalizedStemIndex = stemIndex < 0 ? stemIndex + 10 : stemIndex;
        const normalizedBranchIndex = branchIndex < 0 ? branchIndex + 12 : branchIndex;
        return `${HEAVENLY_STEMS[normalizedStemIndex]}${EARTHLY_BRANCHES[normalizedBranchIndex]}`;
    }
    getTenGodRelationship(dayMaster, target) {
        if (dayMaster === target)
            return 'Friend';
        if (ELEMENT_RELATIONSHIPS[dayMaster].generates === target)
            return 'Output';
        if (ELEMENT_RELATIONSHIPS[target].generates === dayMaster)
            return 'Resource';
        if (ELEMENT_RELATIONSHIPS[dayMaster].controls === target)
            return 'Wealth';
        if (ELEMENT_RELATIONSHIPS[target].controls === dayMaster)
            return 'Officer';
        return 'Friend';
    }
    getVectorFromRelationship(relation) {
        switch (relation) {
            case 'Friend':
                return { stability: 0.6, change: 0.4, risk: 0.4, safety: 0.6, innerGrowth: 0.5, externalReward: 0.5, emotionalIntensity: 0.6, socialConnection: 0.9 };
            case 'Output':
                return { stability: 0.3, change: 0.9, risk: 0.7, safety: 0.2, innerGrowth: 0.8, externalReward: 0.6, emotionalIntensity: 0.8, socialConnection: 0.7 };
            case 'Wealth':
                return { stability: 0.5, change: 0.7, risk: 0.6, safety: 0.4, innerGrowth: 0.4, externalReward: 1.0, emotionalIntensity: 0.7, socialConnection: 0.5 };
            case 'Officer':
                return { stability: 0.8, change: 0.2, risk: 0.3, safety: 0.7, innerGrowth: 0.7, externalReward: 0.8, emotionalIntensity: 0.9, socialConnection: 0.4 };
            case 'Resource':
                return { stability: 0.9, change: 0.1, risk: 0.1, safety: 1.0, innerGrowth: 0.9, externalReward: 0.3, emotionalIntensity: 0.4, socialConnection: 0.5 };
        }
    }
    getRelationshipAdvice(relation) {
        const map = {
            'Friend': 'Connect with peers. A good time for networking but watch out for competition.',
            'Output': 'Express yourself. Your creativity is high, but avoid burnout.',
            'Wealth': 'Focus on results. Opportunities for gain are present if you take action.',
            'Officer': 'Follow the rules. Discipline brings rewards; chaos brings trouble.',
            'Resource': 'Rest and learn. Seek support from mentors and recharge your energy.',
        };
        return map[relation];
    }
    getLuckyColors(element) {
        const colors = {
            Wood: ['Green', 'Teal'],
            Fire: ['Red', 'Purple'],
            Earth: ['Yellow', 'Brown'],
            Metal: ['White', 'Gold'],
            Water: ['Black', 'Blue'],
        };
        return colors[element] || ['White'];
    }
};
exports.BaZiModule = BaZiModule;
exports.BaZiModule = BaZiModule = __decorate([
    (0, common_1.Injectable)()
], BaZiModule);


/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ZiWeiModule = void 0;
const common_1 = __webpack_require__(2);
let ZiWeiModule = class ZiWeiModule {
    getName() {
        return 'ziwei';
    }
    async computeDailyReading(userProfile, date) {
        const palace = this.getActivePalace(date);
        const vector = this.palaceToVector(palace);
        return {
            vector,
            confidence: 0.75,
            explanation: `Today, the ${palace} palace is activated. ${this.getPalaceAdvice(palace)}`,
            details: {
                activePalace: palace,
                stars: this.getStarsInPalace(palace),
            },
        };
    }
    async computeDecisionReading(userProfile, question, optionA, optionB) {
        return {
            optionA: {
                vector: this.palaceToVector('Career'),
                confidence: 0.7,
                explanation: 'The Career palace favors this path',
                details: { dominantPalace: 'Career', stars: ['紫微', '天府'] },
            },
            optionB: {
                vector: this.palaceToVector('Wealth'),
                confidence: 0.7,
                explanation: 'The Wealth palace illuminates this choice',
                details: { dominantPalace: 'Wealth', stars: ['天相', '武曲'] },
            },
            comparison: 'Consider which palace resonates with your true goals',
        };
    }
    getActivePalace(date) {
        const palaces = [
            'Life', 'Siblings', 'Spouse', 'Children',
            'Wealth', 'Health', 'Travel', 'Friends',
            'Career', 'Property', 'Fortune', 'Parents',
        ];
        return palaces[date.getDate() % 12];
    }
    palaceToVector(palace) {
        const vectors = {
            Life: { stability: 0.6, change: 0.6, risk: 0.4, safety: 0.6, innerGrowth: 0.8, externalReward: 0.6, emotionalIntensity: 0.7, socialConnection: 0.6 },
            Career: { stability: 0.6, change: 0.7, risk: 0.5, safety: 0.5, innerGrowth: 0.6, externalReward: 0.9, emotionalIntensity: 0.5, socialConnection: 0.7 },
            Wealth: { stability: 0.7, change: 0.6, risk: 0.5, safety: 0.5, innerGrowth: 0.5, externalReward: 0.9, emotionalIntensity: 0.4, socialConnection: 0.6 },
            Spouse: { stability: 0.7, change: 0.5, risk: 0.3, safety: 0.7, innerGrowth: 0.6, externalReward: 0.5, emotionalIntensity: 0.9, socialConnection: 0.9 },
            Health: { stability: 0.8, change: 0.4, risk: 0.3, safety: 0.7, innerGrowth: 0.7, externalReward: 0.5, emotionalIntensity: 0.6, socialConnection: 0.5 },
        };
        return vectors[palace] || vectors['Life'];
    }
    getPalaceAdvice(palace) {
        const advice = {
            Life: 'Focus on personal well-being and self-development',
            Career: 'Professional matters require your attention',
            Wealth: 'Financial opportunities may arise',
            Spouse: 'Relationships and partnerships are highlighted',
            Health: 'Pay attention to your physical and mental wellness',
        };
        return advice[palace] || 'Reflect on this area of life';
    }
    getStarsInPalace(palace) {
        return ['紫微', '天府'];
    }
};
exports.ZiWeiModule = ZiWeiModule;
exports.ZiWeiModule = ZiWeiModule = __decorate([
    (0, common_1.Injectable)()
], ZiWeiModule);


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DecisionModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const decision_service_1 = __webpack_require__(39);
const decision_controller_1 = __webpack_require__(45);
const daily_controller_1 = __webpack_require__(48);
const decision_entity_1 = __webpack_require__(40);
const daily_reading_entity_1 = __webpack_require__(41);
const divination_module_1 = __webpack_require__(29);
const user_module_1 = __webpack_require__(26);
const content_module_1 = __webpack_require__(49);
const deepseek_module_1 = __webpack_require__(50);
let DecisionModule = class DecisionModule {
};
exports.DecisionModule = DecisionModule;
exports.DecisionModule = DecisionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([decision_entity_1.Decision, daily_reading_entity_1.DailyReading]),
            divination_module_1.DivinationModule,
            user_module_1.UserModule,
            content_module_1.ContentModule,
            deepseek_module_1.DeepSeekModule,
        ],
        providers: [decision_service_1.DecisionService],
        controllers: [decision_controller_1.DecisionController, daily_controller_1.DailyController],
        exports: [decision_service_1.DecisionService],
    })
], DecisionModule);


/***/ }),
/* 39 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DecisionService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(12);
const decision_entity_1 = __webpack_require__(40);
const daily_reading_entity_1 = __webpack_require__(41);
const divination_service_1 = __webpack_require__(30);
const user_service_1 = __webpack_require__(11);
const content_service_1 = __webpack_require__(42);
const deepseek_service_1 = __webpack_require__(43);
let DecisionService = class DecisionService {
    constructor(decisionRepository, dailyReadingRepository, divinationService, userService, contentService, deepSeekService) {
        this.decisionRepository = decisionRepository;
        this.dailyReadingRepository = dailyReadingRepository;
        this.divinationService = divinationService;
        this.userService = userService;
        this.contentService = contentService;
        this.deepSeekService = deepSeekService;
    }
    async createDecision(userId, createDecisionDto) {
        const userProfile = await this.userService.getProfile(userId);
        const result = await this.divinationService.computeCombinedDecisionReading(userProfile, createDecisionDto.question, createDecisionDto.option_a, createDecisionDto.option_b, createDecisionDto.enabled_techniques);
        const narrative = await this.contentService.generateDecisionNarrative(createDecisionDto.question, createDecisionDto.option_a, createDecisionDto.option_b, result.recommendation, result.confidence, result.technique_readings);
        const decision = this.decisionRepository.create({
            user_id: userId,
            category: createDecisionDto.category,
            question: createDecisionDto.question,
            option_a: createDecisionDto.option_a,
            option_b: createDecisionDto.option_b,
            combined_guidance_vector: JSON.stringify({
                optionA: result.optionA_vector,
                optionB: result.optionB_vector,
            }),
            recommended_option: result.recommendation,
            confidence_score: result.confidence,
            combined_summary_text: narrative,
            technique_readings: JSON.stringify(result.technique_readings),
        });
        return this.decisionRepository.save(decision);
    }
    async getDecision(userId, decisionId) {
        const decision = await this.decisionRepository.findOne({
            where: { id: decisionId, user_id: userId, is_deleted: false },
        });
        if (!decision) {
            throw new common_1.NotFoundException('Decision not found');
        }
        if (decision.combined_guidance_vector && typeof decision.combined_guidance_vector === 'string') {
            decision.combined_guidance_vector = JSON.parse(decision.combined_guidance_vector);
        }
        if (decision.technique_readings && typeof decision.technique_readings === 'string') {
            decision.technique_readings = JSON.parse(decision.technique_readings);
        }
        return decision;
    }
    async getUserDecisions(userId, limit = 20, offset = 0) {
        const decisions = await this.decisionRepository.find({
            where: { user_id: userId, is_deleted: false },
            order: { created_at: 'DESC' },
            take: limit,
            skip: offset,
        });
        return decisions.map(decision => {
            if (decision.combined_guidance_vector && typeof decision.combined_guidance_vector === 'string') {
                decision.combined_guidance_vector = JSON.parse(decision.combined_guidance_vector);
            }
            if (decision.technique_readings && typeof decision.technique_readings === 'string') {
                decision.technique_readings = JSON.parse(decision.technique_readings);
            }
            return decision;
        });
    }
    async submitFeedback(userId, decisionId, feedbackDto) {
        const decision = await this.getDecision(userId, decisionId);
        decision.user_choice = feedbackDto.choice;
        decision.user_rating = feedbackDto.rating;
        decision.user_feedback = feedbackDto.feedback;
        return this.decisionRepository.save(decision);
    }
    async deleteDecision(userId, decisionId) {
        const decision = await this.getDecision(userId, decisionId);
        decision.is_deleted = true;
        await this.decisionRepository.save(decision);
    }
    async getTodayReading(userId, date) {
        const targetDate = date || new Date();
        targetDate.setHours(0, 0, 0, 0);
        let reading = await this.dailyReadingRepository.findOne({
            where: {
                user_id: userId,
                reading_date: targetDate.toISOString().split('T')[0],
            },
        });
        if (reading) {
            try {
                if (typeof reading.combined_vector === 'string') {
                    reading.combined_vector = JSON.parse(reading.combined_vector);
                }
            }
            catch (error) {
                console.error('Failed to parse combined_vector:', reading.combined_vector);
                throw new Error(`Invalid JSON in combined_vector: ${error.message}`);
            }
            try {
                if (typeof reading.technique_contributions === 'string') {
                    reading.technique_contributions = JSON.parse(reading.technique_contributions);
                }
            }
            catch (error) {
                console.error('Failed to parse technique_contributions:', reading.technique_contributions);
                throw new Error(`Invalid JSON in technique_contributions: ${error.message}`);
            }
            try {
                if (reading.lucky_times && typeof reading.lucky_times === 'string') {
                    let luckyTimesStr = reading.lucky_times;
                    if (luckyTimesStr.startsWith('{') && luckyTimesStr.endsWith('}')) {
                        luckyTimesStr = '[' + luckyTimesStr.slice(1, -1).split(',').map(s => `"${s}"`).join(',') + ']';
                    }
                    reading.lucky_times = JSON.parse(luckyTimesStr);
                }
            }
            catch (error) {
                console.error('Failed to parse lucky_times:', reading.lucky_times);
                throw new Error(`Invalid JSON in lucky_times: ${error.message}`);
            }
            if (!reading.deepseek_reading) {
                try {
                    const deepseekReading = await this.deepSeekService.generateEnhancedReading(reading.technique_contributions, reading.combined_vector);
                    reading.deepseek_reading = deepseekReading;
                    await this.dailyReadingRepository.save(reading);
                }
                catch (error) {
                    console.error('Failed to generate DeepSeek reading:', error);
                }
            }
            return reading;
        }
        const userProfile = await this.userService.getProfile(userId);
        const result = await this.divinationService.computeCombinedDailyReading(userProfile, targetDate);
        const narrative = await this.contentService.generateDailyNarrative(result.dominant_dimension, result.combined_vector, result.technique_contributions);
        const deepseekReading = await this.deepSeekService.generateEnhancedReading(result.technique_contributions, result.combined_vector);
        reading = this.dailyReadingRepository.create({
            user_id: userId,
            reading_date: targetDate.toISOString().split('T')[0],
            combined_vector: JSON.stringify(result.combined_vector),
            overall_score: result.overall_score,
            dominant_dimension: result.dominant_dimension,
            narrative_text: narrative,
            technique_contributions: JSON.stringify(result.technique_contributions),
            lucky_times: JSON.stringify(this.generateLuckyTimes(result.combined_vector)),
            deepseek_reading: deepseekReading,
        });
        return this.dailyReadingRepository.save(reading);
    }
    generateLuckyTimes(vector) {
        return ['09:00-11:00', '14:00-16:00', '19:00-21:00'];
    }
};
exports.DecisionService = DecisionService;
exports.DecisionService = DecisionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(decision_entity_1.Decision)),
    __param(1, (0, typeorm_1.InjectRepository)(daily_reading_entity_1.DailyReading)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof divination_service_1.DivinationService !== "undefined" && divination_service_1.DivinationService) === "function" ? _c : Object, typeof (_d = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _d : Object, typeof (_e = typeof content_service_1.ContentService !== "undefined" && content_service_1.ContentService) === "function" ? _e : Object, typeof (_f = typeof deepseek_service_1.DeepSeekService !== "undefined" && deepseek_service_1.DeepSeekService) === "function" ? _f : Object])
], DecisionService);


/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Decision = exports.RecommendedOption = exports.DecisionCategory = void 0;
const typeorm_1 = __webpack_require__(12);
const user_entity_1 = __webpack_require__(13);
var DecisionCategory;
(function (DecisionCategory) {
    DecisionCategory["LOVE"] = "love";
    DecisionCategory["CAREER"] = "career";
    DecisionCategory["MONEY"] = "money";
    DecisionCategory["MOVE"] = "move";
    DecisionCategory["HEALTH"] = "health";
    DecisionCategory["OTHER"] = "other";
})(DecisionCategory || (exports.DecisionCategory = DecisionCategory = {}));
var RecommendedOption;
(function (RecommendedOption) {
    RecommendedOption["A"] = "A";
    RecommendedOption["B"] = "B";
    RecommendedOption["WAIT"] = "wait";
    RecommendedOption["NEUTRAL"] = "neutral";
})(RecommendedOption || (exports.RecommendedOption = RecommendedOption = {}));
let Decision = class Decision {
};
exports.Decision = Decision;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Decision.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], Decision.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", typeof (_a = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _a : Object)
], Decision.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
    }),
    __metadata("design:type", String)
], Decision.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Decision.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200, nullable: true }),
    __metadata("design:type", String)
], Decision.prototype, "option_a", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200, nullable: true }),
    __metadata("design:type", String)
], Decision.prototype, "option_b", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Decision.prototype, "combined_guidance_vector", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], Decision.prototype, "recommended_option", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Decision.prototype, "confidence_score", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Decision.prototype, "combined_summary_text", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Decision.prototype, "technique_readings", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", String)
], Decision.prototype, "user_choice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Decision.prototype, "user_rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Decision.prototype, "user_feedback", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Decision.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Decision.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Decision.prototype, "updated_at", void 0);
exports.Decision = Decision = __decorate([
    (0, typeorm_1.Entity)('decisions')
], Decision);


/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DailyReading = void 0;
const typeorm_1 = __webpack_require__(12);
const user_entity_1 = __webpack_require__(13);
let DailyReading = class DailyReading {
};
exports.DailyReading = DailyReading;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DailyReading.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], DailyReading.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", typeof (_a = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _a : Object)
], DailyReading.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], DailyReading.prototype, "reading_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], DailyReading.prototype, "combined_vector", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], DailyReading.prototype, "overall_score", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], DailyReading.prototype, "dominant_dimension", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], DailyReading.prototype, "narrative_text", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], DailyReading.prototype, "technique_contributions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], DailyReading.prototype, "lucky_times", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], DailyReading.prototype, "deepseek_reading", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], DailyReading.prototype, "created_at", void 0);
exports.DailyReading = DailyReading = __decorate([
    (0, typeorm_1.Entity)('daily_readings'),
    (0, typeorm_1.Index)(['user_id', 'reading_date'], { unique: true })
], DailyReading);


/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContentService = void 0;
const common_1 = __webpack_require__(2);
let ContentService = class ContentService {
    async generateDailyNarrative(dominantDimension, vector, techniqueContributions) {
        const templates = {
            stability: 'Today is a day for maintaining balance and security. The energies suggest consolidating your resources and appreciating what you have built.',
            change: 'Transformation is in the air today. Be open to new possibilities and trust that change will lead you to growth.',
            risk: 'Exercise caution today, but do not let fear paralyze you. Calculated risks may lead to rewards.',
            safety: 'Protection and security are emphasized today. Take time to ensure your foundations are solid.',
            innerGrowth: 'This is an excellent day for introspection and personal development. What you learn about yourself today will serve you well.',
            externalReward: 'Your efforts are likely to be recognized today. Material success and acknowledgment are within reach.',
            emotionalIntensity: 'Emotions run deep today. Allow yourself to feel fully, but maintain your center.',
            socialConnection: 'Relationships and community are highlighted. Reach out, collaborate, and strengthen your bonds.',
        };
        let narrative = templates[dominantDimension] || 'Today brings balanced energies across all dimensions.';
        narrative += '\n\nThe oracles speak: ';
        const techniques = Object.keys(techniqueContributions).slice(0, 3);
        narrative += techniques.map((t) => techniqueContributions[t].explanation).join(' ');
        return narrative;
    }
    async generateDecisionNarrative(question, optionA, optionB, recommendation, confidence, techniqueReadings) {
        let narrative = `Regarding your question: "${question}"\n\n`;
        if (recommendation === 'A') {
            narrative += `The oracles lean towards ${optionA} with ${confidence.toFixed(0)}% confidence. `;
        }
        else if (recommendation === 'B') {
            narrative += `The oracles favor ${optionB} with ${confidence.toFixed(0)}% confidence. `;
        }
        else if (recommendation === 'neutral') {
            narrative += 'The energies between both options are balanced. ';
        }
        else {
            narrative += 'The oracles suggest waiting for a clearer moment. ';
        }
        narrative += '\n\nMultiple divination systems have been consulted:\n';
        Object.entries(techniqueReadings).forEach(([technique, reading]) => {
            narrative += `\n• ${technique.charAt(0).toUpperCase() + technique.slice(1)}: ${reading.comparison}`;
        });
        narrative +=
            '\n\nRemember that these readings are guidance, not commands. Your free will and wisdom are the ultimate authorities in your life.';
        return narrative;
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = __decorate([
    (0, common_1.Injectable)()
], ContentService);


/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeepSeekService = void 0;
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(4);
const openai_1 = __webpack_require__(44);
let DeepSeekService = class DeepSeekService {
    constructor(configService) {
        this.configService = configService;
        const apiKey = this.configService.get('DEEPSEEK_API_KEY');
        if (!apiKey) {
            console.warn('DEEPSEEK_API_KEY not configured. DeepSeek readings will be disabled.');
            return;
        }
        this.client = new openai_1.default({
            apiKey: apiKey,
            baseURL: 'https://api.deepseek.com',
        });
    }
    async generateEnhancedReading(technique_contributions, combined_vector, question) {
        if (!this.client) {
            return 'DeepSeek integration not configured. Please add DEEPSEEK_API_KEY to your .env file.';
        }
        try {
            const prompt = this.buildPrompt(technique_contributions, combined_vector, question);
            const completion = await this.client.chat.completions.create({
                model: 'deepseek-chat',
                messages: [
                    {
                        role: 'system',
                        content: `
Your role is to provide deep, meaningful, and personalized guidance by combining:
- Tarot symbolism and archetypes
- Western astrology planetary influences
- Numerology vibrational patterns
- I Ching wisdom and hexagrams
- BaZi (Four Pillars) elemental balance
- Zi Wei Dou Shu star influences

Provide a cohesive, insightful poem that weaves these traditions together into actionable wisdom.
The poem should be including the results of all the techniques.
it should have 8 lines, following an AABBCCDD rhyme scheme.`,
                    },
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
                temperature: 0.2,
                max_tokens: 200,
            });
            return completion.choices[0]?.message?.content || 'Unable to generate reading.';
        }
        catch (error) {
            console.error('DeepSeek API error:', error);
            console.error('Error details:', {
                message: error?.message,
                response: error?.response?.data,
                status: error?.response?.status,
            });
            return 'An error occurred while consulting the enhanced oracle. The traditional readings remain available.';
        }
    }
    buildPrompt(technique_contributions, combined_vector, question) {
        let prompt = '';
        if (question) {
            prompt += `The querent asks: "${question}"\n\n`;
        }
        else {
            prompt += `This is a daily reading for the querent.\n\n`;
        }
        prompt += `The six oracle traditions have spoken. Please synthesize their insights into a cohesive, meaningful reading:\n\n`;
        const techniques = ['tarot', 'astrology', 'numerology', 'iching', 'bazi', 'ziwei'];
        techniques.forEach(technique => {
            if (technique_contributions[technique]) {
                const contrib = technique_contributions[technique];
                prompt += `**${this.getTechniqueName(technique)}:**\n`;
                prompt += `${contrib.details}\n`;
                if (contrib.vector) {
                    const topDimension = this.getTopDimension(contrib.vector);
                    prompt += `(Primary influence: ${topDimension})\n`;
                }
                prompt += `\n`;
            }
        });
        if (combined_vector) {
            prompt += `**Overall Dimensional Analysis:**\n`;
            const dimensions = Object.entries(combined_vector)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 3);
            dimensions.forEach(([dim, value]) => {
                prompt += `- ${this.formatDimension(dim)}: ${Math.round(value * 100)}%\n`;
            });
        }
        prompt += `\nPlease provide a synthesized reading that honors all six traditions while offering clear, actionable wisdom.`;
        return prompt;
    }
    getTechniqueName(technique) {
        const names = {
            tarot: 'Tarot',
            astrology: 'Western Astrology',
            numerology: 'Numerology',
            iching: 'I Ching',
            bazi: 'BaZi (Four Pillars)',
            ziwei: 'Zi Wei Dou Shu',
        };
        return names[technique] || technique;
    }
    getTopDimension(vector) {
        const entries = Object.entries(vector);
        if (entries.length === 0)
            return 'Unknown';
        const [dimension] = entries.reduce((max, current) => current[1] > max[1] ? current : max);
        return this.formatDimension(dimension);
    }
    formatDimension(dimension) {
        const names = {
            stability: 'Stability',
            change: 'Change',
            risk: 'Risk Taking',
            safety: 'Safety',
            innerGrowth: 'Inner Growth',
            externalReward: 'External Reward',
            emotionalIntensity: 'Emotional Intensity',
            socialConnection: 'Social Connection',
        };
        return names[dimension] || dimension;
    }
    async chatCompletion(messages) {
        if (!this.client) {
            return 'DeepSeek integration not configured. Please add DEEPSEEK_API_KEY to your .env file.';
        }
        try {
            const completion = await this.client.chat.completions.create({
                model: 'deepseek-chat',
                messages: messages,
                temperature: 0.7,
                max_tokens: 1000,
            });
            return completion.choices[0]?.message?.content || 'Unable to generate response.';
        }
        catch (error) {
            console.error('DeepSeek chat API error:', error);
            return 'An error occurred while consulting the oracle. Please try again.';
        }
    }
};
exports.DeepSeekService = DeepSeekService;
exports.DeepSeekService = DeepSeekService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], DeepSeekService);


/***/ }),
/* 44 */
/***/ ((module) => {

module.exports = require("openai");

/***/ }),
/* 45 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DecisionController = void 0;
const common_1 = __webpack_require__(2);
const decision_service_1 = __webpack_require__(39);
const create_decision_dto_1 = __webpack_require__(46);
const feedback_dto_1 = __webpack_require__(47);
const jwt_auth_guard_1 = __webpack_require__(21);
let DecisionController = class DecisionController {
    constructor(decisionService) {
        this.decisionService = decisionService;
    }
    async create(req, createDecisionDto) {
        return this.decisionService.createDecision(req.user.id, createDecisionDto);
    }
    async getOne(req, id) {
        return this.decisionService.getDecision(req.user.id, id);
    }
    async getHistory(req, limit = 20, offset = 0) {
        return this.decisionService.getUserDecisions(req.user.id, limit, offset);
    }
    async submitFeedback(req, id, feedbackDto) {
        return this.decisionService.submitFeedback(req.user.id, id, feedbackDto);
    }
    async delete(req, id) {
        await this.decisionService.deleteDecision(req.user.id, id);
    }
};
exports.DecisionController = DecisionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof create_decision_dto_1.CreateDecisionDto !== "undefined" && create_decision_dto_1.CreateDecisionDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], DecisionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DecisionController.prototype, "getOne", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], DecisionController.prototype, "getHistory", null);
__decorate([
    (0, common_1.Post)(':id/feedback'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, typeof (_c = typeof feedback_dto_1.FeedbackDto !== "undefined" && feedback_dto_1.FeedbackDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], DecisionController.prototype, "submitFeedback", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DecisionController.prototype, "delete", null);
exports.DecisionController = DecisionController = __decorate([
    (0, common_1.Controller)('decisions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof decision_service_1.DecisionService !== "undefined" && decision_service_1.DecisionService) === "function" ? _a : Object])
], DecisionController);


/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateDecisionDto = void 0;
const class_validator_1 = __webpack_require__(17);
const decision_entity_1 = __webpack_require__(40);
class CreateDecisionDto {
}
exports.CreateDecisionDto = CreateDecisionDto;
__decorate([
    (0, class_validator_1.IsEnum)(decision_entity_1.DecisionCategory),
    __metadata("design:type", typeof (_a = typeof decision_entity_1.DecisionCategory !== "undefined" && decision_entity_1.DecisionCategory) === "function" ? _a : Object)
], CreateDecisionDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDecisionDto.prototype, "question", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDecisionDto.prototype, "option_a", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDecisionDto.prototype, "option_b", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateDecisionDto.prototype, "enabled_techniques", void 0);


/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeedbackDto = void 0;
const class_validator_1 = __webpack_require__(17);
class FeedbackDto {
}
exports.FeedbackDto = FeedbackDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FeedbackDto.prototype, "choice", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FeedbackDto.prototype, "rating", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FeedbackDto.prototype, "feedback", void 0);


/***/ }),
/* 48 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DailyController = void 0;
const common_1 = __webpack_require__(2);
const decision_service_1 = __webpack_require__(39);
const jwt_auth_guard_1 = __webpack_require__(21);
let DailyController = class DailyController {
    constructor(decisionService) {
        this.decisionService = decisionService;
    }
    async getToday(req) {
        return this.decisionService.getTodayReading(req.user.id);
    }
    async getByDate(req, dateString) {
        const date = dateString ? new Date(dateString) : new Date();
        return this.decisionService.getTodayReading(req.user.id, date);
    }
};
exports.DailyController = DailyController;
__decorate([
    (0, common_1.Get)('today'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DailyController.prototype, "getToday", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DailyController.prototype, "getByDate", null);
exports.DailyController = DailyController = __decorate([
    (0, common_1.Controller)('daily'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof decision_service_1.DecisionService !== "undefined" && decision_service_1.DecisionService) === "function" ? _a : Object])
], DailyController);


/***/ }),
/* 49 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContentModule = void 0;
const common_1 = __webpack_require__(2);
const content_service_1 = __webpack_require__(42);
let ContentModule = class ContentModule {
};
exports.ContentModule = ContentModule;
exports.ContentModule = ContentModule = __decorate([
    (0, common_1.Module)({
        providers: [content_service_1.ContentService],
        exports: [content_service_1.ContentService],
    })
], ContentModule);


/***/ }),
/* 50 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeepSeekModule = void 0;
const common_1 = __webpack_require__(2);
const deepseek_service_1 = __webpack_require__(43);
let DeepSeekModule = class DeepSeekModule {
};
exports.DeepSeekModule = DeepSeekModule;
exports.DeepSeekModule = DeepSeekModule = __decorate([
    (0, common_1.Module)({
        providers: [deepseek_service_1.DeepSeekService],
        exports: [deepseek_service_1.DeepSeekService],
    })
], DeepSeekModule);


/***/ }),
/* 51 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RitualModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const ritual_controller_1 = __webpack_require__(52);
const ritual_service_1 = __webpack_require__(53);
const decision_entity_1 = __webpack_require__(40);
const daily_reading_entity_1 = __webpack_require__(41);
const divination_module_1 = __webpack_require__(29);
const user_module_1 = __webpack_require__(26);
const content_module_1 = __webpack_require__(49);
const deepseek_module_1 = __webpack_require__(50);
let RitualModule = class RitualModule {
};
exports.RitualModule = RitualModule;
exports.RitualModule = RitualModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([decision_entity_1.Decision, daily_reading_entity_1.DailyReading]),
            divination_module_1.DivinationModule,
            user_module_1.UserModule,
            content_module_1.ContentModule,
            deepseek_module_1.DeepSeekModule,
        ],
        controllers: [ritual_controller_1.RitualController],
        providers: [ritual_service_1.RitualService],
        exports: [ritual_service_1.RitualService],
    })
], RitualModule);


/***/ }),
/* 52 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RitualController = void 0;
const common_1 = __webpack_require__(2);
const jwt_auth_guard_1 = __webpack_require__(21);
const ritual_service_1 = __webpack_require__(53);
const invoke_ritual_dto_1 = __webpack_require__(54);
let RitualController = class RitualController {
    constructor(ritualService) {
        this.ritualService = ritualService;
    }
    async invoke(req, invokeDto) {
        return this.ritualService.invoke(req.user.userId, invokeDto);
    }
};
exports.RitualController = RitualController;
__decorate([
    (0, common_1.Post)('invoke'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof invoke_ritual_dto_1.InvokeRitualDto !== "undefined" && invoke_ritual_dto_1.InvokeRitualDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], RitualController.prototype, "invoke", null);
exports.RitualController = RitualController = __decorate([
    (0, common_1.Controller)('ritual'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof ritual_service_1.RitualService !== "undefined" && ritual_service_1.RitualService) === "function" ? _a : Object])
], RitualController);


/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RitualService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(12);
const decision_entity_1 = __webpack_require__(40);
const daily_reading_entity_1 = __webpack_require__(41);
const divination_service_1 = __webpack_require__(30);
const user_service_1 = __webpack_require__(11);
const content_service_1 = __webpack_require__(42);
const deepseek_service_1 = __webpack_require__(43);
let RitualService = class RitualService {
    constructor(decisionRepository, dailyReadingRepository, divinationService, userService, contentService, deepSeekService) {
        this.decisionRepository = decisionRepository;
        this.dailyReadingRepository = dailyReadingRepository;
        this.divinationService = divinationService;
        this.userService = userService;
        this.contentService = contentService;
        this.deepSeekService = deepSeekService;
    }
    async invoke(userId, invokeDto) {
        const userProfile = await this.userService.getProfile(userId);
        if (invokeDto.type === 'DAILY') {
            return this.performDailyRitual(userId, userProfile, invokeDto.selected_modules);
        }
        else if (invokeDto.type === 'QUESTION') {
            if (!invokeDto.text?.trim()) {
                throw new common_1.BadRequestException('Question text is required for QUESTION type');
            }
            return this.performQuestionRitual(userId, userProfile, invokeDto.text, invokeDto.selected_modules);
        }
        throw new common_1.BadRequestException('Invalid ritual type');
    }
    async performDailyRitual(userId, userProfile, selectedModules) {
        console.log('performDailyRitual called with userId:', userId);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayStr = today.toISOString().split('T')[0];
        let reading = await this.dailyReadingRepository.findOne({
            where: { user_id: userId, reading_date: todayStr },
        });
        if (reading) {
            return { reading_id: reading.id, type: 'DAILY' };
        }
        const result = await this.divinationService.computeCombinedDailyReading(userProfile, today, selectedModules || ['tarot', 'astrology', 'numerology', 'iching', 'bazi', 'ziwei']);
        const narrative = await this.contentService.generateDailyNarrative(result.dominant_dimension, result.combined_vector, result.technique_contributions);
        const deepseekReading = await this.deepSeekService.generateEnhancedReading(result.technique_contributions, result.combined_vector);
        console.log('Creating daily reading with userId:', userId);
        reading = this.dailyReadingRepository.create({
            user_id: userId,
            reading_date: todayStr,
            combined_vector: JSON.stringify(result.combined_vector),
            overall_score: result.overall_score,
            dominant_dimension: result.dominant_dimension,
            narrative_text: narrative,
            technique_contributions: JSON.stringify(result.technique_contributions),
            lucky_times: JSON.stringify(this.generateLuckyTimes(result.combined_vector)),
            deepseek_reading: deepseekReading,
        });
        console.log('Created reading object:', { id: reading.id, user_id: reading.user_id, reading_date: reading.reading_date });
        const saved = await this.dailyReadingRepository.save(reading);
        return { reading_id: saved.id, type: 'DAILY' };
    }
    async performQuestionRitual(userId, userProfile, question, selectedModules) {
        const result = await this.divinationService.computeCombinedDecisionReading(userProfile, question, 'Proceed with this path', 'Wait or seek alternatives', selectedModules || ['tarot', 'astrology', 'numerology', 'iching', 'bazi', 'ziwei']);
        const narrative = await this.contentService.generateDecisionNarrative(question, 'Proceed with this path', 'Wait or seek alternatives', result.recommendation, result.confidence, result.technique_readings);
        const decision = this.decisionRepository.create({
            user_id: userId,
            category: 'other',
            question: question,
            option_a: 'Proceed with this path',
            option_b: 'Wait or seek alternatives',
            combined_guidance_vector: JSON.stringify({
                optionA: result.optionA_vector,
                optionB: result.optionB_vector,
            }),
            recommended_option: result.recommendation,
            confidence_score: result.confidence,
            combined_summary_text: narrative,
            technique_readings: JSON.stringify(result.technique_readings),
        });
        const saved = await this.decisionRepository.save(decision);
        return { reading_id: saved.id, type: 'QUESTION' };
    }
    generateLuckyTimes(vector) {
        return ['09:00-11:00', '14:00-16:00', '19:00-21:00'];
    }
};
exports.RitualService = RitualService;
exports.RitualService = RitualService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(decision_entity_1.Decision)),
    __param(1, (0, typeorm_1.InjectRepository)(daily_reading_entity_1.DailyReading)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof divination_service_1.DivinationService !== "undefined" && divination_service_1.DivinationService) === "function" ? _c : Object, typeof (_d = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _d : Object, typeof (_e = typeof content_service_1.ContentService !== "undefined" && content_service_1.ContentService) === "function" ? _e : Object, typeof (_f = typeof deepseek_service_1.DeepSeekService !== "undefined" && deepseek_service_1.DeepSeekService) === "function" ? _f : Object])
], RitualService);


/***/ }),
/* 54 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvokeRitualDto = void 0;
const class_validator_1 = __webpack_require__(17);
class InvokeRitualDto {
}
exports.InvokeRitualDto = InvokeRitualDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['DAILY', 'QUESTION']),
    __metadata("design:type", String)
], InvokeRitualDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InvokeRitualDto.prototype, "text", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], InvokeRitualDto.prototype, "selected_modules", void 0);


/***/ }),
/* 55 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const chat_service_1 = __webpack_require__(56);
const chat_controller_1 = __webpack_require__(58);
const chat_message_entity_1 = __webpack_require__(57);
const daily_reading_entity_1 = __webpack_require__(41);
const decision_entity_1 = __webpack_require__(40);
const deepseek_module_1 = __webpack_require__(50);
let ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule;
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([chat_message_entity_1.ChatMessage, daily_reading_entity_1.DailyReading, decision_entity_1.Decision]),
            deepseek_module_1.DeepSeekModule,
        ],
        controllers: [chat_controller_1.ChatController],
        providers: [chat_service_1.ChatService],
        exports: [chat_service_1.ChatService],
    })
], ChatModule);


/***/ }),
/* 56 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(12);
const chat_message_entity_1 = __webpack_require__(57);
const daily_reading_entity_1 = __webpack_require__(41);
const decision_entity_1 = __webpack_require__(40);
const deepseek_service_1 = __webpack_require__(43);
let ChatService = class ChatService {
    constructor(chatMessageRepository, dailyReadingRepository, decisionRepository, deepSeekService) {
        this.chatMessageRepository = chatMessageRepository;
        this.dailyReadingRepository = dailyReadingRepository;
        this.decisionRepository = decisionRepository;
        this.deepSeekService = deepSeekService;
    }
    async sendMessage(userId, readingId, readingType, message) {
        const userMessage = this.chatMessageRepository.create({
            user_id: userId,
            reading_id: readingId,
            reading_type: readingType,
            role: 'user',
            content: message,
        });
        await this.chatMessageRepository.save(userMessage);
        const readingContext = await this.getReadingContext(readingId, readingType);
        const history = await this.getChatHistory(userId, readingId);
        const messages = [
            {
                role: 'system',
                content: readingContext,
            },
        ];
        history.slice(0, -1).forEach((msg) => {
            messages.push({
                role: (msg.role === 'user' ? 'user' : 'assistant'),
                content: msg.content,
            });
        });
        messages.push({
            role: 'user',
            content: message,
        });
        const aiResponse = await this.deepSeekService.chatCompletion(messages);
        const assistantMessage = this.chatMessageRepository.create({
            user_id: userId,
            reading_id: readingId,
            reading_type: readingType,
            role: 'assistant',
            content: aiResponse,
        });
        await this.chatMessageRepository.save(assistantMessage);
        return { userMessage, assistantMessage };
    }
    async getChatHistory(userId, readingId) {
        return this.chatMessageRepository.find({
            where: {
                user_id: userId,
                reading_id: readingId,
            },
            order: {
                created_at: 'ASC',
            },
        });
    }
    async getReadingContext(readingId, readingType) {
        if (readingType === 'DAILY') {
            const reading = await this.dailyReadingRepository.findOne({
                where: { id: readingId },
            });
            if (!reading) {
                throw new common_1.NotFoundException('Reading not found');
            }
            const techniqueContributions = typeof reading.technique_contributions === 'string'
                ? JSON.parse(reading.technique_contributions)
                : reading.technique_contributions;
            const combinedVector = typeof reading.combined_vector === 'string'
                ? JSON.parse(reading.combined_vector)
                : reading.combined_vector;
            return `You are a mystical oracle who has just provided this daily reading:

**Date**: ${reading.reading_date}
**Overall Score**: ${reading.overall_score}/100
**Dominant Dimension**: ${reading.dominant_dimension}

**Enhanced Reading**:
${reading.deepseek_reading}

**Narrative**:
${reading.narrative_text}

**Oracle Contributions**:
${Object.entries(techniqueContributions)
                .map(([technique, data]) => `- ${technique.toUpperCase()}: ${data.explanation}`)
                .join('\n')}

**Energy Vector**:
${Object.entries(combinedVector)
                .map(([dim, val]) => `- ${dim}: ${Math.round(val * 100)}%`)
                .join('\n')}

Now the user wants to chat with you about this reading. Respond in a mystical, wise, and compassionate tone.
Help them understand the reading better, answer their questions, and provide guidance based on the divination results.
Remember all previous messages in the conversation and maintain context.`;
        }
        else {
            const decision = await this.decisionRepository.findOne({
                where: { id: readingId },
            });
            if (!decision) {
                throw new common_1.NotFoundException('Decision not found');
            }
            const techniqueReadings = typeof decision.technique_readings === 'string'
                ? JSON.parse(decision.technique_readings)
                : decision.technique_readings;
            return `You are a mystical oracle who has just helped with this decision:

**Question**: ${decision.question}
**Option A**: ${decision.option_a}
**Option B**: ${decision.option_b}

**Recommendation**: ${decision.recommended_option}
**Confidence**: ${Math.round(decision.confidence_score * 100)}%

**Guidance**:
${decision.combined_summary_text}

**Oracle Insights**:
${Object.entries(techniqueReadings)
                .map(([technique, data]) => `- ${technique.toUpperCase()}: ${data.explanation}`)
                .join('\n')}

Now the user wants to discuss this decision with you. Respond in a mystical, wise, and compassionate tone.
Help them understand the guidance better and explore their decision from different angles.
Remember all previous messages in the conversation and maintain context.`;
        }
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chat_message_entity_1.ChatMessage)),
    __param(1, (0, typeorm_1.InjectRepository)(daily_reading_entity_1.DailyReading)),
    __param(2, (0, typeorm_1.InjectRepository)(decision_entity_1.Decision)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof deepseek_service_1.DeepSeekService !== "undefined" && deepseek_service_1.DeepSeekService) === "function" ? _d : Object])
], ChatService);


/***/ }),
/* 57 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatMessage = void 0;
const typeorm_1 = __webpack_require__(12);
let ChatMessage = class ChatMessage {
};
exports.ChatMessage = ChatMessage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ChatMessage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], ChatMessage.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], ChatMessage.prototype, "reading_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], ChatMessage.prototype, "reading_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], ChatMessage.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], ChatMessage.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ChatMessage.prototype, "created_at", void 0);
exports.ChatMessage = ChatMessage = __decorate([
    (0, typeorm_1.Entity)('chat_messages'),
    (0, typeorm_1.Index)(['reading_id', 'created_at']),
    (0, typeorm_1.Index)(['user_id', 'created_at'])
], ChatMessage);


/***/ }),
/* 58 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatController = void 0;
const common_1 = __webpack_require__(2);
const chat_service_1 = __webpack_require__(56);
const send_message_dto_1 = __webpack_require__(59);
const jwt_auth_guard_1 = __webpack_require__(21);
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async sendMessage(req, sendMessageDto) {
        if (req.user.tier !== 'premium' && req.user.tier !== 'admin') {
            throw new common_1.ForbiddenException({
                message: 'This is a premium feature. Please upgrade to continue.',
                requiresUpgrade: true,
            });
        }
        const result = await this.chatService.sendMessage(req.user.id, sendMessageDto.reading_id, sendMessageDto.reading_type, sendMessageDto.message);
        return {
            message: result.assistantMessage.content,
            messageId: result.assistantMessage.id,
        };
    }
    async getChatHistory(req, readingId) {
        return this.chatService.getChatHistory(req.user.id, readingId);
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Post)('message'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof send_message_dto_1.SendMessageDto !== "undefined" && send_message_dto_1.SendMessageDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Get)('history/:readingId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('readingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getChatHistory", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.Controller)('chat'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof chat_service_1.ChatService !== "undefined" && chat_service_1.ChatService) === "function" ? _a : Object])
], ChatController);


/***/ }),
/* 59 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SendMessageDto = void 0;
const class_validator_1 = __webpack_require__(17);
class SendMessageDto {
}
exports.SendMessageDto = SendMessageDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SendMessageDto.prototype, "reading_id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['DAILY', 'DECISION']),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SendMessageDto.prototype, "reading_type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SendMessageDto.prototype, "message", void 0);


/***/ }),
/* 60 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SubscriptionModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const subscription_service_1 = __webpack_require__(61);
const subscription_controller_1 = __webpack_require__(65);
const subscription_entity_1 = __webpack_require__(62);
const user_module_1 = __webpack_require__(26);
let SubscriptionModule = class SubscriptionModule {
};
exports.SubscriptionModule = SubscriptionModule;
exports.SubscriptionModule = SubscriptionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([subscription_entity_1.Subscription]), user_module_1.UserModule],
        controllers: [subscription_controller_1.SubscriptionController],
        providers: [subscription_service_1.SubscriptionService],
        exports: [subscription_service_1.SubscriptionService],
    })
], SubscriptionModule);


/***/ }),
/* 61 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SubscriptionService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(12);
const subscription_entity_1 = __webpack_require__(62);
const user_service_1 = __webpack_require__(11);
const stripe_1 = __webpack_require__(63);
let SubscriptionService = class SubscriptionService {
    constructor(subscriptionRepository, userService) {
        this.subscriptionRepository = subscriptionRepository;
        this.userService = userService;
        const stripeKey = process.env.STRIPE_SECRET_KEY;
        if (stripeKey) {
            this.stripe = new stripe_1.default(stripeKey, {
                apiVersion: '2025-12-15.clover',
            });
        }
    }
    async verifyAppleReceipt(userId, receipt) {
        try {
            const isProduction = process.env.NODE_ENV === 'production';
            const verifyUrl = isProduction
                ? 'https://buy.itunes.apple.com/verifyReceipt'
                : 'https://sandbox.itunes.apple.com/verifyReceipt';
            const applePassword = process.env.APPLE_SHARED_SECRET;
            if (!applePassword) {
                throw new common_1.BadRequestException('Apple shared secret not configured');
            }
            const response = await fetch(verifyUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'receipt-data': receipt,
                    password: applePassword,
                    'exclude-old-transactions': true,
                }),
            });
            const data = await response.json();
            if (data.status !== 0) {
                if (data.status === 21007) {
                    const sandboxResponse = await fetch('https://sandbox.itunes.apple.com/verifyReceipt', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            'receipt-data': receipt,
                            password: applePassword,
                            'exclude-old-transactions': true,
                        }),
                    });
                    const sandboxData = await sandboxResponse.json();
                    if (sandboxData.status === 0) {
                        return this.processAppleReceipt(userId, sandboxData, receipt);
                    }
                }
                throw new common_1.BadRequestException(`Invalid receipt: ${data.status}`);
            }
            return this.processAppleReceipt(userId, data, receipt);
        }
        catch (error) {
            console.error('Apple receipt verification error:', error);
            throw new common_1.BadRequestException('Receipt verification failed');
        }
    }
    async processAppleReceipt(userId, receiptData, receipt) {
        const latestReceiptInfo = receiptData.latest_receipt_info?.[0];
        const pendingRenewalInfo = receiptData.pending_renewal_info?.[0];
        if (!latestReceiptInfo) {
            throw new common_1.BadRequestException('No subscription found in receipt');
        }
        const productId = latestReceiptInfo.product_id;
        const originalTransactionId = latestReceiptInfo.original_transaction_id;
        const expiresDate = new Date(parseInt(latestReceiptInfo.expires_date_ms));
        const isActive = expiresDate > new Date();
        const autoRenew = pendingRenewalInfo?.auto_renew_status === '1';
        const interval = productId.includes('yearly') ? 'year' : 'month';
        let subscription = await this.subscriptionRepository.findOne({
            where: {
                platform: 'ios',
                platform_subscription_id: originalTransactionId,
            },
        });
        if (subscription) {
            subscription.status = isActive ? 'active' : 'expired';
            subscription.expiry_date = expiresDate;
            subscription.auto_renew = autoRenew;
            subscription.receipt_data = receipt;
            subscription.metadata = { latest_receipt_info: latestReceiptInfo };
        }
        else {
            subscription = this.subscriptionRepository.create({
                user_id: userId,
                platform: 'ios',
                product_id: productId,
                platform_subscription_id: originalTransactionId,
                status: isActive ? 'active' : 'expired',
                interval,
                start_date: new Date(parseInt(latestReceiptInfo.purchase_date_ms)),
                expiry_date: expiresDate,
                auto_renew: autoRenew,
                receipt_data: receipt,
                metadata: { latest_receipt_info: latestReceiptInfo },
            });
        }
        await this.subscriptionRepository.save(subscription);
        await this.userService.updateSubscriptionTier(userId, isActive ? 'premium' : 'free');
        return {
            success: true,
            subscription_id: subscription.id,
            status: subscription.status,
            expiry_date: subscription.expiry_date,
        };
    }
    async verifyGoogleReceipt(userId, purchaseToken, productId) {
        try {
            const { OAuth2Client } = __webpack_require__(64);
            const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
            if (!serviceAccountKey) {
                throw new common_1.BadRequestException('Google service account not configured');
            }
            const serviceAccount = JSON.parse(serviceAccountKey);
            const client = new OAuth2Client();
            client.setCredentials({
                client_email: serviceAccount.client_email,
                private_key: serviceAccount.private_key,
            });
            const packageName = process.env.ANDROID_PACKAGE_NAME;
            const url = `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${packageName}/purchases/subscriptions/${productId}/tokens/${purchaseToken}`;
            const accessToken = await client.getAccessToken();
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${accessToken.token}`,
                },
            });
            if (!response.ok) {
                throw new common_1.BadRequestException('Invalid purchase token');
            }
            const data = await response.json();
            return this.processGooglePurchase(userId, data, purchaseToken, productId);
        }
        catch (error) {
            console.error('Google receipt verification error:', error);
            throw new common_1.BadRequestException('Receipt verification failed');
        }
    }
    async processGooglePurchase(userId, purchaseData, purchaseToken, productId) {
        const expiresDate = new Date(parseInt(purchaseData.expiryTimeMillis));
        const isActive = expiresDate > new Date();
        const autoRenew = purchaseData.autoRenewing === true;
        const interval = productId.includes('yearly') ? 'year' : 'month';
        let subscription = await this.subscriptionRepository.findOne({
            where: {
                platform: 'android',
                platform_subscription_id: purchaseData.orderId,
            },
        });
        if (subscription) {
            subscription.status = isActive ? 'active' : 'expired';
            subscription.expiry_date = expiresDate;
            subscription.auto_renew = autoRenew;
            subscription.receipt_data = purchaseToken;
            subscription.metadata = purchaseData;
        }
        else {
            subscription = this.subscriptionRepository.create({
                user_id: userId,
                platform: 'android',
                product_id: productId,
                platform_subscription_id: purchaseData.orderId,
                status: isActive ? 'active' : 'expired',
                interval,
                start_date: new Date(parseInt(purchaseData.startTimeMillis)),
                expiry_date: expiresDate,
                auto_renew: autoRenew,
                receipt_data: purchaseToken,
                metadata: purchaseData,
            });
        }
        await this.subscriptionRepository.save(subscription);
        await this.userService.updateSubscriptionTier(userId, isActive ? 'premium' : 'free');
        return {
            success: true,
            subscription_id: subscription.id,
            status: subscription.status,
            expiry_date: subscription.expiry_date,
        };
    }
    async createStripeCheckout(userId, priceId, productType) {
        if (!this.stripe) {
            throw new common_1.BadRequestException('Stripe not configured');
        }
        try {
            const user = await this.userService.findOne(userId);
            const session = await this.stripe.checkout.sessions.create({
                mode: 'subscription',
                payment_method_types: ['card'],
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                customer_email: user.email,
                client_reference_id: userId,
                metadata: {
                    user_id: userId,
                    product_type: productType,
                },
                success_url: `${process.env.FRONTEND_URL}/pages/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.FRONTEND_URL}/pages/subscription/index`,
            });
            return {
                checkout_url: session.url,
                session_id: session.id,
            };
        }
        catch (error) {
            console.error('Stripe checkout creation error:', error);
            throw new common_1.BadRequestException('Failed to create checkout session');
        }
    }
    async handleStripeWebhook(event) {
        switch (event.type) {
            case 'checkout.session.completed':
                await this.handleCheckoutCompleted(event.data.object);
                break;
            case 'customer.subscription.created':
            case 'customer.subscription.updated':
                await this.handleSubscriptionUpdated(event.data.object);
                break;
            case 'customer.subscription.deleted':
                await this.handleSubscriptionDeleted(event.data.object);
                break;
            case 'invoice.payment_succeeded':
                await this.handlePaymentSucceeded(event.data.object);
                break;
            case 'invoice.payment_failed':
                await this.handlePaymentFailed(event.data.object);
                break;
        }
    }
    async handleCheckoutCompleted(session) {
        const userId = session.client_reference_id || session.metadata?.user_id;
        if (!userId)
            return;
        console.log(`Checkout completed for user ${userId}`);
    }
    async handleSubscriptionUpdated(stripeSubscription) {
        const userId = stripeSubscription.metadata?.user_id;
        if (!userId)
            return;
        const isActive = stripeSubscription.status === 'active' || stripeSubscription.status === 'trialing';
        const priceId = stripeSubscription.items.data[0]?.price.id;
        const interval = stripeSubscription.items.data[0]?.price.recurring?.interval || 'month';
        let subscription = await this.subscriptionRepository.findOne({
            where: {
                platform: 'web',
                platform_subscription_id: stripeSubscription.id,
            },
        });
        if (subscription) {
            subscription.status = isActive ? 'active' : 'expired';
            subscription.expiry_date = new Date(stripeSubscription.current_period_end * 1000);
            subscription.auto_renew = !stripeSubscription.cancel_at_period_end;
            subscription.metadata = stripeSubscription;
        }
        else {
            subscription = this.subscriptionRepository.create({
                user_id: userId,
                platform: 'web',
                product_id: priceId,
                platform_subscription_id: stripeSubscription.id,
                status: isActive ? 'active' : 'expired',
                interval: interval,
                start_date: new Date(stripeSubscription.current_period_start * 1000),
                expiry_date: new Date(stripeSubscription.current_period_end * 1000),
                auto_renew: !stripeSubscription.cancel_at_period_end,
                metadata: stripeSubscription,
            });
        }
        await this.subscriptionRepository.save(subscription);
        await this.userService.updateSubscriptionTier(userId, isActive ? 'premium' : 'free');
    }
    async handleSubscriptionDeleted(stripeSubscription) {
        const subscription = await this.subscriptionRepository.findOne({
            where: {
                platform: 'web',
                platform_subscription_id: stripeSubscription.id,
            },
        });
        if (subscription) {
            subscription.status = 'cancelled';
            await this.subscriptionRepository.save(subscription);
            await this.userService.updateSubscriptionTier(subscription.user_id, 'free');
        }
    }
    async handlePaymentSucceeded(invoice) {
        console.log(`Payment succeeded for invoice ${invoice.id}`);
    }
    async handlePaymentFailed(invoice) {
        const subscriptionId = invoice.subscription;
        if (!subscriptionId)
            return;
        const subscription = await this.subscriptionRepository.findOne({
            where: {
                platform: 'web',
                platform_subscription_id: subscriptionId,
            },
        });
        if (subscription) {
            subscription.status = 'expired';
            await this.subscriptionRepository.save(subscription);
            await this.userService.updateSubscriptionTier(subscription.user_id, 'free');
        }
    }
    async getActiveSubscription(userId) {
        return this.subscriptionRepository.findOne({
            where: {
                user_id: userId,
                status: 'active',
            },
            order: {
                created_at: 'DESC',
            },
        });
    }
    async hasPremiumAccess(userId) {
        const subscription = await this.getActiveSubscription(userId);
        if (!subscription) {
            return false;
        }
        if (subscription.expiry_date && subscription.expiry_date > new Date()) {
            return true;
        }
        subscription.status = 'expired';
        await this.subscriptionRepository.save(subscription);
        await this.userService.updateSubscriptionTier(userId, 'free');
        return false;
    }
};
exports.SubscriptionService = SubscriptionService;
exports.SubscriptionService = SubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(subscription_entity_1.Subscription)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _b : Object])
], SubscriptionService);


/***/ }),
/* 62 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Subscription = void 0;
const typeorm_1 = __webpack_require__(12);
let Subscription = class Subscription {
};
exports.Subscription = Subscription;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Subscription.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], Subscription.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Subscription.prototype, "platform", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Subscription.prototype, "product_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Subscription.prototype, "platform_subscription_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Subscription.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Subscription.prototype, "interval", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Subscription.prototype, "start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Subscription.prototype, "expiry_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Subscription.prototype, "auto_renew", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Subscription.prototype, "receipt_data", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Subscription.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Subscription.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], Subscription.prototype, "updated_at", void 0);
exports.Subscription = Subscription = __decorate([
    (0, typeorm_1.Entity)('subscriptions'),
    (0, typeorm_1.Index)(['user_id']),
    (0, typeorm_1.Index)(['platform', 'platform_subscription_id'], { unique: true })
], Subscription);


/***/ }),
/* 63 */
/***/ ((module) => {

module.exports = require("stripe");

/***/ }),
/* 64 */
/***/ ((module) => {

module.exports = require("google-auth-library");

/***/ }),
/* 65 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SubscriptionController = void 0;
const common_1 = __webpack_require__(2);
const subscription_service_1 = __webpack_require__(61);
const jwt_auth_guard_1 = __webpack_require__(21);
const stripe_1 = __webpack_require__(63);
let SubscriptionController = class SubscriptionController {
    constructor(subscriptionService) {
        this.subscriptionService = subscriptionService;
        const stripeKey = process.env.STRIPE_SECRET_KEY;
        if (stripeKey) {
            this.stripe = new stripe_1.default(stripeKey, {
                apiVersion: '2025-12-15.clover',
            });
        }
    }
    async verifyApple(req, body) {
        const userId = req.user.id;
        const { receipt } = body;
        if (!receipt) {
            throw new common_1.BadRequestException('Receipt is required');
        }
        return this.subscriptionService.verifyAppleReceipt(userId, receipt);
    }
    async verifyGoogle(req, body) {
        const userId = req.user.id;
        const { purchase_token, product_id } = body;
        if (!purchase_token || !product_id) {
            throw new common_1.BadRequestException('Purchase token and product ID are required');
        }
        return this.subscriptionService.verifyGoogleReceipt(userId, purchase_token, product_id);
    }
    async createStripeCheckout(req, body) {
        const userId = req.user.id;
        const { price_id, product_type } = body;
        if (!price_id) {
            throw new common_1.BadRequestException('Price ID is required');
        }
        return this.subscriptionService.createStripeCheckout(userId, price_id, product_type);
    }
    async handleStripeWebhook(signature, req) {
        if (!this.stripe) {
            throw new common_1.BadRequestException('Stripe not configured');
        }
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        if (!webhookSecret) {
            throw new common_1.BadRequestException('Webhook secret not configured');
        }
        let event;
        try {
            let rawBody;
            if (req.rawBody) {
                rawBody = req.rawBody;
            }
            else {
                const chunks = [];
                const reader = req.body.getReader();
                let done = false;
                while (!done) {
                    const { value, done: streamDone } = await reader.read();
                    if (value)
                        chunks.push(value);
                    done = streamDone;
                }
                rawBody = Buffer.concat(chunks);
            }
            event = this.stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
        }
        catch (err) {
            console.error('Webhook signature verification failed:', err.message);
            throw new common_1.BadRequestException(`Webhook Error: ${err.message}`);
        }
        await this.subscriptionService.handleStripeWebhook(event);
        return { received: true };
    }
};
exports.SubscriptionController = SubscriptionController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('verify-apple'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "verifyApple", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('verify-google'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "verifyGoogle", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('create-stripe-checkout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "createStripeCheckout", null);
__decorate([
    (0, common_1.Post)('stripe-webhook'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Headers)('stripe-signature')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof common_1.RawBodyRequest !== "undefined" && common_1.RawBodyRequest) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "handleStripeWebhook", null);
exports.SubscriptionController = SubscriptionController = __decorate([
    (0, common_1.Controller)('subscription'),
    __metadata("design:paramtypes", [typeof (_a = typeof subscription_service_1.SubscriptionService !== "undefined" && subscription_service_1.SubscriptionService) === "function" ? _a : Object])
], SubscriptionController);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.CORS_ORIGIN || '*',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.setGlobalPrefix('api');
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🔮 Oracle Path API is running on: http://localhost:${port}/api`);
}
bootstrap();

})();

/******/ })()
;