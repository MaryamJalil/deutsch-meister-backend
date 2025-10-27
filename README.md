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


# Generate Prisma Client
npx prisma generate

# Create migration (after making schema changes)
npx prisma migrate dev --name init

# Push schema to database (alternative to migrate)
npx prisma db push

export DATABASE_URL="postgresql://postgres:maryam@localhost:5432/deutsch-meister?schema=public"


px prisma db push --force-reset