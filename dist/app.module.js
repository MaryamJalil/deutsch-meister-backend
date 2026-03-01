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
const users_module_1 = require("./modules/users/users.module");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./modules/auth/auth.module");
const courses_module_1 = require("./modules/courses/courses.module");
const level_module_1 = require("./modules/levels/level.module");
const lesson_module_1 = require("./modules/lessons/lesson.module");
const configuration_1 = require("./config/configuration");
const vocabulary_module_1 = require("./modules/vocabulary/vocabulary.module");
const example_module_1 = require("./modules/examples/example.module");
const modules_module_1 = require("./modules/modules/modules.module");
const cache_module_1 = require("./modules/cache/cache.module");
const events_module_1 = require("./modules/events/events.module");
const aiModule_1 = require("./modules/ai/aiModule");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const excercises_service_1 = require("./modules/excercises/excercises/excercises.service");
const excercises_module_1 = require("./modules/excercises/excercises/excercises.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.configuration],
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'schema.gql'),
                sortSchema: true,
                playground: true,
                context: ({ req }) => ({ req }),
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            courses_module_1.CoursesModule,
            level_module_1.LevelModule,
            lesson_module_1.LessonModule,
            modules_module_1.ModulesModule,
            vocabulary_module_1.VocabularyModule,
            example_module_1.ExampleModule,
            cache_module_1.CacheModule,
            events_module_1.EventsModule,
            aiModule_1.AIModule,
            excercises_module_1.ExcercisesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, excercises_service_1.ExcercisesService],
    })
], AppModule);
