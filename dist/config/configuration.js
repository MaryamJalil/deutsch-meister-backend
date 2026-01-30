"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
const env_schema_1 = require("./env.schema");
const configuration = () => {
    const parsed = env_schema_1.envSchema.safeParse(process.env);
    if (!parsed.success) {
        console.error(parsed.error.format());
        throw new Error('Invalid environment variables');
    }
    return parsed.data;
};
exports.configuration = configuration;
