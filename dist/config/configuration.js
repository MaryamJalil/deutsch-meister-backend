"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
const env_schema_js_1 = require("./env.schema.js");
const configuration = () => {
    const parsed = env_schema_js_1.envSchema.safeParse(process.env);
    if (!parsed.success) {
        console.error(parsed.error.format());
        throw new Error('Invalid environment variables');
    }
    return parsed.data;
};
exports.configuration = configuration;
