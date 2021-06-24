# Node Prisma ORM

- Initialize Prisma in the current project: `npx prisma init`

## Introspect

- Prima can go through the exsisting data and create schemas from them
- Run `npx prisma introspect` to create the models in _./prisma/schema.prisma_

## Prisma Studio

- It is a GUI that shows our database tables and relations
- Run `npx prisma studio` to open the Prisma Studio

## Genarate Models

- The CLI checks the schema, and updates the actual Prisma client at _./node_modules/@prisma/client_
- Hence, we need to run this on our servers too, because we need to update the _node_module_ in our server too! We can add this as a part of our deployment script!
