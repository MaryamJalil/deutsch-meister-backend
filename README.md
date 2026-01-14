 Examples

      Set up a new local Prisma Postgres `prisma dev`-ready project
      $ prisma init

      Start a local Prisma Postgres server for development
      $ prisma dev

      Generate artifacts (e.g. Prisma Client)
      $ prisma generate

      Browse your data
      $ prisma studio

      Create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client)
      $ prisma migrate dev

      Pull the schema from an existing database, updating the Prisma schema
      $ prisma db pull

      Push the Prisma schema state to the database
      $ prisma db push

      Validate your Prisma schema
      $ prisma validate

      Format your Prisma schema
      $ prisma format

      Display Prisma version info
      $ prisma version

      Display Prisma debug info
      $ prisma debug
      
      Then, generate the GraphQL schema:
      graphql get-schema

npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate

# Create migration (after making schema changes)
npx prisma migrate dev --name init

# Push schema to database (alternative to migrate)
npx prisma db push

export DATABASE_URL="postgresql://postgres:maryam@localhost:5432/deutsch-meister?schema=public"


 prisma db push --force-reset


 Next, choose how you want to set up your database:
CONNECT EXISTING DATABASE:
  1. Configure your DATABASE_URL in prisma.config.ts
  2. Run prisma db pull to introspect your database.
CREATE NEW DATABASE:
  Local: npx prisma dev (runs Postgres locally in your terminal)
  Cloud: npx create-db (creates a free Prisma Postgres database)

Then, define your models in prisma/schema.prisma and run prisma migrate dev to apply your schema.
Learn more: https://pris.ly/getting-started
 
 pnpm prisma migrate dev --name auth_fields
pnpm prisma generate
npx prisma migrate dev --name add_refresh_token


# Install NestJS common module
npm install @nestjs/common

# Install Prisma Client
npm install @prisma/client

# Install Prisma CLI as dev dependency if not yet installed
npm install -D prisma
