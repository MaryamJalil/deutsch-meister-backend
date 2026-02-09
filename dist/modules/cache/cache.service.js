"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CacheService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
const common_1 = require("@nestjs/common");
const redis_1 = require("redis");
let CacheService = CacheService_1 = class CacheService {
    constructor() {
        this.logger = new common_1.Logger(CacheService_1.name);
        this.connected = false;
        this.client = (0, redis_1.createClient)({
            url: process.env.REDIS_URL || 'redis://localhost:6379',
        });
        this.client.on('error', (err) => {
            this.logger.warn('Redis client error', err);
            this.connected = false;
        });
        this.client.on('connect', () => {
            this.logger.log('Redis connected');
            this.connected = true;
        });
    }
    async onModuleInit() {
        try {
            await this.client.connect();
        }
        catch (error) {
            this.logger.warn('Redis connection failed, caching disabled', error);
        }
    }
    async onModuleDestroy() {
        if (this.connected) {
            await this.client.quit();
        }
    }
    async get(key) {
        if (!this.connected)
            return null;
        try {
            const data = await this.client.get(key);
            return data ? JSON.parse(data) : null;
        }
        catch (error) {
            this.logger.warn(`Cache get failed for key: ${key}`, error);
            return null;
        }
    }
    async set(key, value, ttl = 3600) {
        if (!this.connected)
            return;
        try {
            await this.client.set(key, JSON.stringify(value), { EX: ttl });
        }
        catch (error) {
            this.logger.warn(`Cache set failed for key: ${key}`, error);
        }
    }
    async delete(key) {
        if (!this.connected)
            return;
        try {
            await this.client.del(key);
        }
        catch (error) {
            this.logger.warn(`Cache delete failed for key: ${key}`, error);
        }
    }
};
exports.CacheService = CacheService;
exports.CacheService = CacheService = CacheService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CacheService);
