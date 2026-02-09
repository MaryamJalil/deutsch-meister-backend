import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QdrantClient } from '@qdrant/js-client-rest';
import { CohereEmbeddings } from '@langchain/cohere';
// or
// import { HuggingFaceInferenceEmbeddings } from '@langchain/community/embeddings/hf';

@Injectable()
export class VectorSearchService implements OnModuleInit {
  private readonly logger = new Logger(VectorSearchService.name);
  private readonly qdrant: QdrantClient;
  private readonly embeddings: CohereEmbeddings;
  private readonly collectionName = 'language_lessons';

  constructor() {
    this.qdrant = new QdrantClient({
      url: process.env.QDRANT_URL,
    });

    this.embeddings = new CohereEmbeddings({
      apiKey: process.env.COHERE_API_KEY,
      model: 'embed-english-v3.0',
    });
  }

  async onModuleInit() {
    await this.initializeCollection();
  }

  private async initializeCollection() {
    const collections = await this.qdrant.getCollections();
    const exists = collections.collections.some(
      (c) => c.name === this.collectionName,
    );

    if (!exists) {
      await this.qdrant.createCollection(this.collectionName, {
        vectors: {
          size: 1024, // Cohere embed-english-v3.0 dimension
          distance: 'Cosine',
        },
      });
      this.logger.log('Vector collection created');
    }
  }

  async upsertLesson(
    lessonId: number,
    title: string,
    content: string,
    level: string,
  ) {
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
}
