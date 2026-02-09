"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var VectorSearchService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorSearchService = void 0;
const common_1 = require("@nestjs/common");
const js_client_rest_1 = require("@qdrant/js-client-rest");
const cohere_1 = require("@langchain/cohere");
let VectorSearchService = VectorSearchService_1 = class VectorSearchService {
    constructor() {
        this.logger = new common_1.Logger(VectorSearchService_1.name);
        this.qdrant = null;
        this.embeddings = null;
        this.collectionName = 'language_lessons';
        this.initialized = false;
    }
    async onModuleInit() {
        try {
            await this.initialize();
        }
        catch (error) {
            this.logger.warn('Vector search initialization failed - service will be unavailable. ' +
                'Ensure QDRANT_URL and COHERE_API_KEY are set.', error);
        }
    }
    async initialize() {
        if (!process.env.QDRANT_URL || !process.env.COHERE_API_KEY) {
            this.logger.warn('QDRANT_URL or COHERE_API_KEY not set, vector search disabled');
            return;
        }
        this.qdrant = new js_client_rest_1.QdrantClient({ url: process.env.QDRANT_URL });
        this.embeddings = new cohere_1.CohereEmbeddings({
            apiKey: process.env.COHERE_API_KEY,
            model: 'embed-english-v3.0',
        });
        const collections = await this.qdrant.getCollections();
        const exists = collections.collections.some((c) => c.name === this.collectionName);
        if (!exists) {
            await this.qdrant.createCollection(this.collectionName, {
                vectors: {
                    size: 1024,
                    distance: 'Cosine',
                },
            });
            this.logger.log('Vector collection created');
        }
        this.initialized = true;
        this.logger.log('Vector search initialized');
    }
    async upsertLesson(lessonId, title, content, level) {
        if (!this.initialized || !this.qdrant || !this.embeddings) {
            this.logger.warn('Vector search not available, skipping upsert');
            return;
        }
        const embedding = await this.embeddings.embedQuery(`${title}\n\n${content}`);
        await this.qdrant.upsert(this.collectionName, {
            points: [
                {
                    id: lessonId,
                    vector: embedding,
                    payload: { lessonId, title, level },
                },
            ],
        });
        this.logger.log(`Embedded lesson ${lessonId}`);
    }
    async search(query, limit = 5) {
        if (!this.initialized || !this.qdrant || !this.embeddings) {
            return [];
        }
        const embedding = await this.embeddings.embedQuery(query);
        const results = await this.qdrant.search(this.collectionName, {
            vector: embedding,
            limit,
        });
        return results.map((r) => ({
            lessonId: r.payload?.lessonId,
            title: r.payload?.title,
            score: r.score,
        }));
    }
};
exports.VectorSearchService = VectorSearchService;
exports.VectorSearchService = VectorSearchService = VectorSearchService_1 = __decorate([
    (0, common_1.Injectable)()
], VectorSearchService);
