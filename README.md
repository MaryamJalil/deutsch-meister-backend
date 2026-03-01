# Deutsch Meister Backend

A German language learning platform backend built with NestJS, GraphQL, and AI-powered content generation.

## Tech Stack

- **Framework:** NestJS 11 + Apollo GraphQL
- **Language:** TypeScript 5
- **Database:** PostgreSQL 16 (Drizzle ORM)
- **Cache:** Redis 7
- **Vector Search:** Qdrant + Cohere Embeddings
- **AI:** Anthropic Claude (content generation, tutoring)
- **Auth:** JWT + Passport
- **AWS:** S3, SQS, EventBridge (via LocalStack for local dev)
- **Containerization:** Docker + Docker Compose

## Getting Started

### Prerequisites

- Node.js >= 20
- Docker & Docker Compose
- npm

### Installation

```bash
# Install dependencies
npm install

# Start infrastructure (Postgres, Redis, Qdrant, LocalStack)
docker compose up -d

# Run database migrations
npm run drizzle:generate
npm run drizzle:migrate

# Start the dev server
npm run start:dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
JWT_ACCESS_SECRET=your-access-secret
JWT_REFRESH_SECRET=your-refresh-secret
ANTHROPIC_API_KEY=your-anthropic-key
REDIS_URL=redis://:redispassword@localhost:6379
QDRANT_URL=http://localhost:6333
COHERE_API_KEY=your-cohere-key
AWS_REGION=eu-central-1
AWS_ENDPOINT=http://localhost:4566
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
EVENT_BUS_NAME=deutsch-meister-events
```

### Available Scripts

```bash
npm run start:dev        # Development with hot reload
npm run start:debug      # Debug mode
npm run start:prod       # Production mode
npm run build            # Build for production
npm run lint             # Lint and fix
npm run format           # Prettier formatting
npm run test             # Unit tests
npm run test:e2e         # End-to-end tests
npm run test:cov         # Test coverage
npm run drizzle:generate # Generate migrations
npm run drizzle:push     # Push schema to DB
npm run drizzle:migrate  # Run migrations
npm run drizzle:studio   # Interactive DB editor
```

### Docker Compose Services

| Service    | Port(s)    | Purpose                     |
| ---------- | ---------- | --------------------------- |
| PostgreSQL | 5432       | Primary database            |
| Redis      | 6379       | Caching layer               |
| Qdrant     | 6333, 6334 | Vector database             |
| LocalStack | 4566       | Local AWS emulation         |
| API        | 3000       | NestJS application          |
| Worker     | -          | Background async processing |

---

## Current Architecture

```
src/
├── modules/
│   ├── auth/          # JWT authentication + Passport
│   ├── users/         # User management
│   ├── courses/       # Course CRUD
│   ├── levels/        # A1-C2 level management
│   ├── modules/       # Course module management
│   ├── lessons/       # Lesson content
│   ├── vocabulary/    # Vocabulary management
│   ├── examples/      # Example sentences
│   ├── ai/            # Claude AI + Cohere + Qdrant vector search
│   ├── cache/         # Redis caching layer
│   └── events/        # EventBridge/SQS event publishing
├── database/
│   └── schema/        # Drizzle ORM schema definitions
├── config/            # App configuration + env validation
└── guards/            # Auth guards (JWT, roles)
```

This is a **modular monolith** — each module is self-contained with its own service, resolver, and DTOs.

---

## Learning Roadmap: Microservices & AWS

This roadmap uses the existing project as a learning sandbox to progressively adopt microservices patterns and AWS services.

---

### Phase 1: Extract the AI Microservice (Weeks 1-2)

**Goal:** Learn NestJS microservice communication by extracting the AI module into a standalone service.

#### What You'll Learn

- NestJS microservice transports (Redis, RabbitMQ, gRPC)
- `@MessagePattern()` and `@EventPattern()` decorators
- `ClientProxy` for inter-service messaging
- Request-response vs event-based communication
- Monorepo project structure

#### Architecture Change

```
BEFORE (current monolith):
┌───────────────────────────────────┐
│          Single NestJS App        │
│  Auth | Courses | AI | Events    │
└───────────────────────────────────┘

AFTER (first microservice):
┌───────────────────┐   Redis transport   ┌────────────────┐
│   API Gateway     │ ◄─────────────────► │   AI Service   │
│  Auth, Courses,   │   message patterns  │  Claude, Cohere│
│  Levels, Lessons  │                     │  Qdrant        │
└───────────────────┘                     └────────────────┘
```

#### Project Structure (NestJS Monorepo)

```
deutsch-meister-backend/
├── apps/
│   ├── api/                    # Current app → becomes API gateway
│   │   └── src/
│   │       ├── main.ts
│   │       └── app.module.ts   # Imports ClientsModule for AI service
│   └── ai-service/             # New standalone microservice
│       └── src/
│           ├── main.ts                     # Microservice bootstrap (no HTTP)
│           ├── ai.controller.ts            # @MessagePattern handlers
│           ├── content-generator.service.ts
│           └── vector-search.service.ts
├── libs/
│   └── shared/                 # Shared DTOs, interfaces, contracts
│       └── src/
│           ├── dto/
│           └── interfaces/
├── docker-compose.yml          # Add ai-service container
└── nest-cli.json               # Configure monorepo mode
```

#### Steps

1. **Convert to NestJS monorepo** using `nest-cli.json` monorepo mode
2. **Create shared library** (`libs/shared`) for DTOs and message patterns
3. **Create AI microservice** (`apps/ai-service`) with Redis transport:
   ```typescript
   // apps/ai-service/src/main.ts
   const app = await NestFactory.createMicroservice<MicroserviceOptions>(
     AiServiceModule,
     {
       transport: Transport.REDIS,
       options: { host: 'localhost', port: 6379 },
     },
   );
   await app.listen();
   ```
4. **Add message handlers** in the AI service:

   ```typescript
   @MessagePattern({ cmd: 'generate_content' })
   async generateContent(data: GenerateContentDto) { ... }

   @MessagePattern({ cmd: 'search_vectors' })
   async searchVectors(data: SearchDto) { ... }

   @EventPattern('lesson_created')
   async handleLessonCreated(data: LessonCreatedEvent) { ... }
   ```

5. **Update API gateway** to use `ClientProxy` instead of direct imports:

   ```typescript
   @Inject('AI_SERVICE') private readonly aiClient: ClientProxy;

   async generateContent(input: GenerateContentDto) {
     return this.aiClient.send({ cmd: 'generate_content' }, input);
   }
   ```

6. **Add ai-service to docker-compose.yml** as a separate container
7. **Test** request-response and event-based patterns between services

#### Key NestJS Docs

- [NestJS Microservices Overview](https://docs.nestjs.com/microservices/basics)
- [Redis Transport](https://docs.nestjs.com/microservices/redis)
- [NestJS Monorepo](https://docs.nestjs.com/cli/monorepo)

---

### Phase 2: Deploy to AWS Manually (Weeks 3-4)

**Goal:** Learn core AWS services by deploying the project to real AWS infrastructure.

#### What You'll Learn

- ECS Fargate (serverless containers)
- ECR (Docker image registry)
- RDS (managed PostgreSQL)
- ElastiCache (managed Redis)
- ALB (Application Load Balancer)
- VPC, subnets, security groups
- IAM roles and policies

#### Target Architecture

```
                         ┌──────────────┐
                         │     ALB      │
                         │ (port 443)   │
                         └──────┬───────┘
                                │
                  ┌─────────────┼─────────────┐
                  │                           │
           ┌──────▼───────┐           ┌──────▼───────┐
           │  ECS Fargate  │           │  ECS Fargate  │
           │  (API Gateway)│           │  (AI Service) │
           │  Port 3000    │           │  No HTTP port │
           └──────┬───────┘           └──────┬───────┘
                  │                           │
      ┌───────────┼───────────┬───────────────┤
      │           │           │               │
 ┌────▼───┐ ┌────▼────┐ ┌────▼────┐   ┌──────▼──────┐
 │  RDS   │ │ Elasti  │ │  SQS /  │   │   Qdrant    │
 │Postgres│ │ Cache   │ │EventBr. │   │ (ECS or EC2)│
 │        │ │ Redis   │ │         │   │             │
 └────────┘ └─────────┘ └─────────┘   └─────────────┘
```

#### Steps

1. **Push Docker images to ECR**

   ```bash
   # Create ECR repositories
   aws ecr create-repository --repository-name deutsch-meister/api
   aws ecr create-repository --repository-name deutsch-meister/ai-service

   # Build and push
   docker build -t deutsch-meister/api .
   docker tag deutsch-meister/api:latest <account>.dkr.ecr.<region>.amazonaws.com/deutsch-meister/api
   docker push <account>.dkr.ecr.<region>.amazonaws.com/deutsch-meister/api
   ```

2. **Create a VPC** with public and private subnets
   - Public subnet: ALB
   - Private subnet: ECS tasks, RDS, ElastiCache
   - NAT Gateway for outbound internet from private subnet

3. **Set up RDS PostgreSQL**
   - Engine: PostgreSQL 16
   - Instance: db.t3.micro (free tier)
   - Place in private subnet
   - Security group: allow port 5432 from ECS only

4. **Set up ElastiCache Redis**
   - Engine: Redis 7
   - Node type: cache.t3.micro
   - Place in private subnet
   - Security group: allow port 6379 from ECS only

5. **Create ECS Cluster + Fargate services**
   - Task definition for API (port 3000, health check on `/health`)
   - Task definition for AI service (no port mapping, Redis transport)
   - Task definition for Worker (no port mapping)
   - IAM task roles with permissions for SQS, EventBridge, S3

6. **Set up ALB**
   - Listener on port 443 (HTTPS) → target group → API service
   - Health check path: `/health`

7. **Store secrets in AWS Secrets Manager**

   ```
   ANTHROPIC_API_KEY, COHERE_API_KEY, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET
   ```

8. **Update environment variables** in ECS task definitions to point to real AWS resources instead of localhost/LocalStack

#### Key Concepts to Understand

- **VPC:** Your private network in AWS — nothing is accessible unless you allow it
- **Security Groups:** Firewalls for each service — only allow traffic between your own services
- **IAM Roles:** Instead of hardcoded AWS keys, ECS tasks assume roles with specific permissions
- **Fargate:** You define CPU/memory, AWS handles the servers

---

### Phase 3: Event-Driven Architecture with SQS & EventBridge (Weeks 5-6)

**Goal:** Replace LocalStack with real AWS messaging and build async workflows.

#### What You'll Learn

- EventBridge event buses and rules
- SQS queues, dead-letter queues (DLQ), visibility timeout
- Async event-driven patterns
- Retry strategies and error handling
- Eventual consistency

#### Event Flow

```
┌─────────┐  LessonCreated   ┌─────────────┐  Rule match   ┌─────────┐
│   API   │ ───────────────► │ EventBridge  │ ────────────► │   SQS   │
│ Gateway │                  │  Event Bus   │               │  Queue  │
└─────────┘                  └─────────────┘               └────┬────┘
                                    │                           │
                                    │ Rule match          ┌─────▼─────┐
                                    │                     │ AI Service│
                              ┌─────▼─────┐              │ (consumer)│
                              │  SQS DLQ  │              └───────────┘
                              │ (failures)│              auto-embeds
                              └───────────┘              lesson content
```

#### Events to Implement

| Event                  | Source     | Consumer   | Action                                       |
| ---------------------- | ---------- | ---------- | -------------------------------------------- |
| `lesson.created`       | API        | AI Service | Auto-generate embeddings for vector search   |
| `lesson.updated`       | API        | AI Service | Re-generate embeddings                       |
| `user.registered`      | API        | Worker     | Send welcome email, generate starter content |
| `vocabulary.generated` | AI Service | API        | Cache generated vocabulary                   |
| `course.deleted`       | API        | AI Service | Remove vectors from Qdrant                   |

#### Steps

1. **Create EventBridge event bus** in AWS

   ```bash
   aws events create-event-bus --name deutsch-meister-events
   ```

2. **Create SQS queues** with dead-letter queues

   ```bash
   # Main queue
   aws sqs create-queue --queue-name deutsch-meister-ai-queue
   # Dead-letter queue for failed messages
   aws sqs create-queue --queue-name deutsch-meister-ai-dlq
   ```

3. **Create EventBridge rules** to route events to SQS

   ```json
   {
     "source": ["deutsch-meister"],
     "detail-type": ["lesson.created", "lesson.updated", "course.deleted"]
   }
   ```

4. **Update the Events module** to publish real events:

   ```typescript
   // Already exists in src/modules/events/ — update to use real AWS endpoints
   await this.eventBridge.send(
     new PutEventsCommand({
       Entries: [
         {
           Source: 'deutsch-meister',
           DetailType: 'lesson.created',
           Detail: JSON.stringify({ lessonId, title, level }),
           EventBusName: 'deutsch-meister-events',
         },
       ],
     }),
   );
   ```

5. **Add SQS consumer to AI Service**

   ```typescript
   // AI service polls SQS and processes events
   @EventPattern('lesson.created')
   async handleLessonCreated(data: { lessonId: number; title: string; content: string }) {
     await this.vectorSearchService.upsertLesson(data.lessonId, data.title, data.content, data.level);
   }
   ```

6. **Set up DLQ alerting** — CloudWatch alarm when messages land in DLQ

#### Key Concepts to Understand

- **Eventual consistency:** AI embeddings may lag a few seconds behind lesson creation — that's OK
- **Idempotency:** Processing the same event twice should produce the same result
- **Dead-letter queues:** Failed messages go here instead of being lost
- **Visibility timeout:** How long a consumer has to process a message before it becomes visible again

---

### Phase 4: Infrastructure as Code with Terraform (Weeks 7-8)

**Goal:** Codify everything you built manually in Phase 2-3.

#### What You'll Learn

- Terraform HCL syntax and providers
- State management (remote state with S3 backend)
- Plan → Apply workflow
- Modules and reusability
- Managing secrets and sensitive variables

#### Project Structure

```
infra/
├── main.tf              # Provider config, backend
├── variables.tf         # Input variables
├── outputs.tf           # Output values (URLs, ARNs)
├── vpc.tf               # VPC, subnets, NAT gateway
├── rds.tf               # PostgreSQL RDS instance
├── elasticache.tf       # Redis ElastiCache
├── ecr.tf               # Container registries
├── ecs.tf               # ECS cluster, task definitions, services
├── alb.tf               # Application Load Balancer
├── sqs.tf               # SQS queues + DLQs
├── eventbridge.tf       # Event bus + rules
├── s3.tf                # S3 buckets
├── iam.tf               # IAM roles and policies
├── secrets.tf           # Secrets Manager
└── terraform.tfvars     # Variable values (git-ignored)
```

#### Steps

1. **Install Terraform** and learn the basics:

   ```bash
   brew install terraform
   ```

2. **Start with one resource** — don't try to codify everything at once:

   ```hcl
   # infra/main.tf
   provider "aws" {
     region = "eu-central-1"
   }

   resource "aws_s3_bucket" "uploads" {
     bucket = "deutsch-meister-uploads"
   }
   ```

3. **Run the workflow:**

   ```bash
   cd infra
   terraform init      # Download provider plugins
   terraform plan      # Preview what will be created
   terraform apply     # Create the resources
   terraform destroy   # Tear everything down (for learning)
   ```

4. **Progressively add resources** in this order:
   - VPC + networking (vpc.tf)
   - RDS PostgreSQL (rds.tf)
   - ElastiCache Redis (elasticache.tf)
   - ECR repositories (ecr.tf)
   - ECS cluster + services (ecs.tf)
   - ALB (alb.tf)
   - SQS + EventBridge (sqs.tf, eventbridge.tf)

5. **Set up remote state** (so state isn't just on your laptop):
   ```hcl
   terraform {
     backend "s3" {
       bucket = "deutsch-meister-tf-state"
       key    = "infra/terraform.tfstate"
       region = "eu-central-1"
     }
   }
   ```

#### Key Concepts to Understand

- **State:** Terraform tracks what it created — never edit AWS resources manually after this
- **Plan:** Always review the plan before applying — it shows what will be created/changed/destroyed
- **Idempotency:** Running `apply` twice with the same config changes nothing
- **Modules:** Reusable blocks of Terraform config (use later, keep it flat for now)

---

### Phase 5: CI/CD Pipeline (Weeks 9-10)

**Goal:** Automate the build → test → deploy cycle.

#### What You'll Learn

- GitHub Actions workflow syntax
- Docker build + push to ECR in CI
- Automated testing in pipeline
- ECS rolling deployments
- Environment-specific deployments (staging vs production)

#### Pipeline Flow

```
Push to main
     │
     ▼
┌─────────────┐    ┌──────────────┐    ┌──────────────┐    ┌─────────────┐
│   Lint &    │───►│  Build &     │───►│  Push to     │───►│  Deploy to  │
│   Test      │    │  Docker Build│    │  ECR         │    │  ECS Fargate│
└─────────────┘    └──────────────┘    └──────────────┘    └─────────────┘
```

#### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Build & Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm run test

  build-and-deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: eu-central-1

      - name: Login to ECR
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build and push API image
        run: |
          docker build -t deutsch-meister/api .
          docker tag deutsch-meister/api:latest ${{ secrets.ECR_REGISTRY }}/deutsch-meister/api:latest
          docker push ${{ secrets.ECR_REGISTRY }}/deutsch-meister/api:latest

      - name: Deploy to ECS
        run: |
          aws ecs update-service \
            --cluster deutsch-meister \
            --service api \
            --force-new-deployment
```

#### Steps

1. **Create `.github/workflows/` directory** and add the workflow file
2. **Add GitHub secrets:** `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `ECR_REGISTRY`
3. **Start with just lint + test** on PRs (no deploy)
4. **Add Docker build + ECR push** on merge to main
5. **Add ECS deployment** with `aws ecs update-service`
6. **Add staging environment** — deploy PRs to staging, main to production

---

### Phase 6: Second Microservice & Observability (Weeks 11+)

**Goal:** Add a notification service and implement distributed tracing.

#### What You'll Learn

- Designing service boundaries
- Distributed tracing with AWS X-Ray
- CloudWatch Logs, Metrics, and Alarms
- Service-to-service authentication
- gRPC as an alternative transport

#### New Service: Notification Service

```
┌──────────┐   event    ┌─────────────┐   SQS    ┌────────────────────┐
│   API    │──────────►│ EventBridge  │────────►│ Notification Svc   │
│ Gateway  │           └─────────────┘         │                    │
└──────────┘                                   │ - Email (SES)      │
                                               │ - Push (SNS)       │
                                               │ - In-app (WebSocket)│
                                               └────────────────────┘
```

#### Events the Notification Service Handles

| Event                  | Notification                               |
| ---------------------- | ------------------------------------------ |
| `user.registered`      | Welcome email via SES                      |
| `course.completed`     | Congratulations push notification          |
| `vocabulary.generated` | "New vocabulary ready" in-app notification |
| `streak.milestone`     | Achievement notification                   |

#### Observability Stack

| Tool                   | Purpose                                                       |
| ---------------------- | ------------------------------------------------------------- |
| **AWS X-Ray**          | Trace requests across API → AI Service → Notification Service |
| **CloudWatch Logs**    | Centralized logging from all ECS tasks                        |
| **CloudWatch Metrics** | Custom metrics (requests/sec, AI latency, queue depth)        |
| **CloudWatch Alarms**  | Alert when error rate spikes or DLQ has messages              |

#### Steps

1. **Create notification service** in `apps/notification-service/`
2. **Add AWS SES** for email sending
3. **Add AWS SNS** for push notifications
4. **Instrument all services with X-Ray SDK**
   ```typescript
   import * as AWSXRay from 'aws-xray-sdk';
   AWSXRay.captureHTTPsGlobal(require('http'));
   ```
5. **Create CloudWatch dashboard** showing all services
6. **Set up alarms** for error rates and queue depth

---

## Quick Reference: AWS Services Used

| Service             | Purpose                        | Phase |
| ------------------- | ------------------------------ | ----- |
| **ECR**             | Docker image registry          | 2     |
| **ECS Fargate**     | Run containers without servers | 2     |
| **RDS**             | Managed PostgreSQL             | 2     |
| **ElastiCache**     | Managed Redis                  | 2     |
| **ALB**             | Load balancer                  | 2     |
| **VPC**             | Private networking             | 2     |
| **Secrets Manager** | Store API keys securely        | 2     |
| **IAM**             | Roles and permissions          | 2     |
| **SQS**             | Message queues                 | 3     |
| **EventBridge**     | Event bus and routing          | 3     |
| **S3**              | File/object storage            | 4     |
| **CloudWatch**      | Logs, metrics, alarms          | 5-6   |
| **X-Ray**           | Distributed tracing            | 6     |
| **SES**             | Email sending                  | 6     |
| **SNS**             | Push notifications             | 6     |

## Quick Reference: Key NestJS Microservice Concepts

| Concept               | Description                                                           |
| --------------------- | --------------------------------------------------------------------- |
| **Transport**         | Communication layer between services (Redis, RMQ, gRPC, NATS, Kafka)  |
| **@MessagePattern()** | Request-response handler — caller waits for a response                |
| **@EventPattern()**   | Fire-and-forget handler — caller doesn't wait                         |
| **ClientProxy**       | Client used in the gateway to send messages to microservices          |
| **ClientsModule**     | Registers microservice clients in a module                            |
| **Hybrid App**        | A single NestJS app that serves both HTTP and microservice transports |
