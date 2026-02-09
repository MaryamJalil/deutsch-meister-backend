"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const graphql_upload_ts_1 = require("graphql-upload-ts");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    app.enableCors({
        origin: 'http://localhost:3000', // your Next.js app
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods: ['GET', 'POST', 'OPTIONS'],
    });
    app.use((0, graphql_upload_ts_1.graphqlUploadExpress)({ maxFileSize: 20_000_000, maxFiles: 5 }));
    await app.listen(4000);
    console.log('Server running on http://localhost:4000/graphql');
}
bootstrap();
