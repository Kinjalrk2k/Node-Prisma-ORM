# Node Prisma ORM

- Initialize Prisma in the current project:

```bash
npx prisma init
```

### Prisma Studio

- It is a GUI that shows our database tables and relations
- Run to open the Prisma Studio:

```bash
npx prisma studio
```

## Adding Prisma to existing SQL database project

### Introspect

- Prima can go through the exsisting data and create schemas from them
- Run to create the models in _./prisma/schema.prisma_

```bash
npx prisma introspect
```

### Genarate Models

- The CLI checks the schema, and updates the actual Prisma client at _./node_modules/@prisma/client_
- Run to generate models for the client:

```bash
npx prisma generate
```

- Hence, we need to run this on our servers too, because we need to update the _node_module_ in our server too! We can add this as a part of our deployment script!

## Prisma from scratch

### Creating the Models

```js
model User {
  id        Int      @id @default(autoincrement())
  uuid      String   @unique @default(uuid())
  email     String   @unique
  name      String
  role      UserRole @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  posts     Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  uuid      String   @unique @default(uuid())
  title     String   @db.VarChar(255)
  body      String?
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  userId    Int
}

enum UserRole {
  USER
  ADMIN
  SUPERADMIN
}
```

- Notes on syntax:
  - Datatypes: `String`, `Int`, `DateTime` etc
  - `@default(...)` - default values for the column
  - `autoincrement()` - autoincrement integer sequence
  - `@id` - primary id of the model (Primary key?)
  - `@unique` - constraint that takes only distict values
    - Unique lets us search for data in a model and also lets us connect different models
  - `?` after a datatype means it is nullable
  - Enumerable types can be seperately declared with `enum` and used in the model with it's name
  - One-to-many relations can be done using the array syntax in the model
  - `@updatedAt` - automatically udates the time when the data is updated
  - `@uuid` - helper for creating an `uuid`
  - `@relation` - defines relations between tables.
    - Works like foreign key defination
    - `fields` denotes the column in the current table (field in current model) which is linke to `references` of another table
  - `@` means field attribute and `@@` means block attribute
  - `@@map` lets us rename the tabel name. The model name isn't changed. Similarly `@map` lets us rename a field name

### Migrations

- Once we're done creating models in our _./prisma/scham.prisma_ file, we can go on to create our migration
- To create and apply migrations run:

```bash
prisma migrate dev --name init
```
