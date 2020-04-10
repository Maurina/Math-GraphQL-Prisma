# GraphQL Server Example (SDL-first)

This example shows how to implement an **GraphQL server (SDL-first) with Node.js** based on [Prisma Client](https://github.com/prisma/prisma2/blob/master/docs/prisma-client-js/api.md), [apollo-server](https://www.npmjs.com/package/apollo-server) and the [nexus-prisma](https://github.com/prisma-labs/nexus-prisma) plugin. It is based on a PostGreSQL database running inside Docker.

## How to use

### 1. Download example & install dependencies

Clone this repository:

```
git clone https://github.com/thortek/dgm4790-graphql-server
```

Change into project's root directory and install:

```
cd dgm4790-graphql-server
npm install
```

Note that this also generates Prisma Client JS into `node_modules/@prisma/client` via a `postinstall` hook of the `@prisma/client` package from your `package.json`.

<Details><Summary><strong>Follow these steps to start/restart from scratch</strong></Summary>

If you have an existing Docker container running and want to restart from scratch, run the `nuke` npm script:

```
npm run nuke
```

Create a new database instance and migrate it by running the `createDB` npm script:

```
npm run createDB
```

Generate the Prisma Client code by running the `generate` npm script:

```
npm run generate
```

Seed the database by running the `seed` npm script:

```
npm run seed
```
</Details>

### 2. Start the GraphQL server

Launch your GraphQL server with this command:

```
npm start
```

Navigate to [http://localhost:4000](http://localhost:4000) in your browser to explore the API of your GraphQL server in a [GraphQL Playground](https://github.com/prisma/graphql-playground).

### 3. Using the GraphQL API

The schema that specifies the API operations of your GraphQL server is defined in [`./schema.graphql`](./schema.graphql). Below are a number of operations that you can send to the API using the GraphQL Playground.

Feel free to adjust any operation by adding or removing fields. The GraphQL Playground helps you with its auto-completion and query validation features.

#### Retrieve all courses with their name, course code and description

```graphql
query allCourses {
  Users {
    id
    email
    students
    unit
    lesson
  }
}
```

<Details><Summary><strong>See more API operations</strong></Summary>

#### Create a new course

```graphql
mutation createUser {
  createUser(email: "test-email@test.com",
    student: "Jill",
    unit: "1",
    lesson: "1",) 
    {
    id
    createdAt
    email
  }
}
```

#### Update a user

```graphql
mutation updateUser {
  updateUser(id: __COURSE_ID__,
    email: "test-email-new@test.com",
    student: "Robert",
    unit: "3",
    lesson: "1",) 
    {
    id
    createdAt
    email
  }
}
```

#### Delete a specific user by id

```graphql
mutation deleteOneUser {
  deleteOneUser(where: {
    id: __USERS_ID__
  }) {
    id
    email
  }
}
```

> **Note**: You need to replace the `__USERS_ID__` placeholder with an actual `id` from a `Users` item. You can find one e.g. using the `allUsers` query.

#### Search for courses with a specific string found in the name or description

```graphql
query filterUsers {
  Courses(searchString: "Robert") {
    id
    email
    students
    lesson
  }
}
```

#### Retrieve a single course by its id

```graphql
query oneUser {
  Users(id: __USERS_ID__) {
    email
    students
    id
  }
}
```

> **Note**: You need to replace the `__USERS_ID__` placeholder with an actual `id` from a `Users` item. You can find one e.g. using the `allUsers` query.

</Details>

