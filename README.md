# Node Prisma ORM

- Learning Prisma ORM with PostgreSQL in NodeJS backend
- Tutorial by: Ahmed Hadjou (Classsed)
  - [Prisma Tutorial - Next Gen ORM (with JS & TS)](https://www.youtube.com/watch?v=Ehv69qFvN2I)

## Bootstrapping

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
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  posts     Post[]

  @@map("users")
}

model Post {
  id        Int      @id @default(autoincrement())
  uuid      String   @unique @default(uuid())
  title     String   @db.VarChar(255)
  body      String?
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  userId    Int

  user User @relation(fields: [userId], references: [id])

  @@map("posts")
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

### Prisma Client

- Every time we update the schema/models, we need to re-generate the Prisma client
- Run to generate client:

```bash
npx prisma generate
```

### Migrations

- Once we're done creating models in our _./prisma/scham.prisma_ file, we can go on to create our migration
- To create and apply migrations run:

```bash
prisma migrate dev --name init
```

## Sample queries

- Create a new record:

```js
const newUser = await prisma.user.create({
  data: { name, email, role },
});
```

- Query with `SELECT`, `WHERE`, `ORDER BY` clause

```js
const user = await prisma.user.findUnique({
  where: { uuid },
  include: { posts: true }, // populating!
});
```

```js
const users = await prisma.user.findMany({
  select: { uuid: true, name: true, role: true }, // select particular fields
});
```

```js
const posts = await prisma.post.findMany({
  orderBy: { createdAt: "desc" },
  include: { user: true },
});
```

- Update query

```js
const updatedUser = await prisma.user.update({
  where: { uuid }, // searching with WHERE
  data: { name, email, role }, // new data to update with
});
```

- Delete query

```js
await prisma.user.delete({ where: { uuid } });
```

- Build relations

```js
const post = await prisma.post.create({
  data: { title, body, user: { connect: { uuid: userUuid } } },
  // connecting a post to an user
});
```
