import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QdrantClient } from '@qdrant/js-client-rest';
import { CohereEmbeddings } from '@langchain/cohere';

@Injectable()
export class VectorSearchService implements OnModuleInit {
  private readonly logger = new Logger(VectorSearchService.name);
  private qdrant: QdrantClient | null = null;
  private embeddings: CohereEmbeddings | null = null;
  private readonly collectionName = 'language_lessons';
  private initialized = false;

  async onModuleInit() {
    try {
      await this.initialize();
    } catch (error) {
      this.logger.warn(
        'Vector search initialization failed - service will be unavailable. ' +
        'Ensure QDRANT_URL and COHERE_API_KEY are set.',
        error,
      );
    }
  }

  private async initialize() {
    if (!process.env.QDRANT_URL || !process.env.COHERE_API_KEY) {
      this.logger.warn('QDRANT_URL or COHERE_API_KEY not set, vector search disabled');
      return;
    }

    this.qdrant = new QdrantClient({ url: process.env.QDRANT_URL });
    this.embeddings = new CohereEmbeddings({
      apiKey: process.env.COHERE_API_KEY,
      model: 'embed-english-v3.0',
    });

    const collections = await this.qdrant.getCollections();
    const exists = collections.collections.some(
      (c) => c.name === this.collectionName,
    );

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

  async upsertLesson(
    lessonId: number,
    title: string,
    content: string,
    level: string,
  ) {
    if (!this.initialized || !this.qdrant || !this.embeddings) {
      this.logger.warn('Vector search not available, skipping upsert');
      return;
    }

    const embedding = await this.embeddings.embedQuery(
      `${title}\n\n${content}`,
    );

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

  async search(query: string, limit = 5) {
    if (!this.initialized || !this.qdrant || !this.embeddings) {
      return [];
    }

    const embedding = await this.embeddings.embedQuery(query);

    const results = await this.qdrant.search(this.collectionName, {
      vector: embedding,
      limit,
    });

    return results.map((r) => ({
      lessonId: r.payload?.lessonId as number | undefined,
      title: r.payload?.title as string | undefined,
      score: r.score,
    }));
  }
}
