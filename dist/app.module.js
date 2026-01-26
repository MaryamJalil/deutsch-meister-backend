"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const path_1 = require("path");
const users_module_js_1 = require("./modules/users/users.module.js");
const index_js_1 = require("@nestjs/config/index.js");
const auth_module_js_1 = require("./modules/auth/auth.module.js");
const courses_module_js_1 = require("./modules/courses/courses.module.js");
const level_module_js_1 = require("./modules/levels/level.module.js");
const lesson_module_js_1 = require("./modules/lessons/lesson.module.js");
const configuration_js_1 = require("./config/configuration.js");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            index_js_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_js_1.configuration],
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'schema.gql'),
                sortSchema: true,
                playground: true,
                context: ({ req }) => ({ req }),
            }),
            auth_module_js_1.AuthModule,
            users_module_js_1.UsersModule,
            courses_module_js_1.CoursesModule,
            level_module_js_1.LevelModule,
            lesson_module_js_1.LessonModule,
        ],
    })
], AppModule);
