"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envSchema = void 0;
const zod_1 = require("zod");
exports.envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'test', 'production']),
    PORT: zod_1.z.coerce.number(),
    DATABASE_URL: zod_1.z.string().url(),
});
