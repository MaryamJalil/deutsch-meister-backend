"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.levelNameEnum = exports.roleEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.roleEnum = (0, pg_core_1.pgEnum)('role', ['ADMIN', 'STUDENT', 'TEACHER']);
exports.levelNameEnum = (0, pg_core_1.pgEnum)('level_name', [
    'A1',
    'A2',
    'B1',
    'B2',
    'C1',
    'C2',
]);
