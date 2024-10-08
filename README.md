
# `typescript-orm`

This repository is a manual implementation of an Object-Relational Mapping (ORM) using TypeScript. The main idea is to provide a way to interact with databases using an object-oriented approach, similar to TypeORM. The project uses decorators and metadata manipulation to define and manage entities and columns, abstracting the complexity of database operations.

This repository is an interesting example of how to implement a manual ORM using TypeScript and decorators. The manipulation of metadata is a key point for the mapping of entities and columns to work correctly, allowing the developer to work in an intuitive manner with a high level of abstraction.

## Project Structure

- **`src/`**: Contains the main implementation, including entity classes, connection, and ORM logic.
  - **`entities/`**: Contains decorated classes that represent the database entities.
  - **`decorators/`**: Implementation for metadata manipulation, essential for the functioning of the decorators.
  - **`database/`**: Contains the file with the connection to the Postgres database and also the class that holds the basic commands for the database, the **`Repository`** class.
    - **`initialize-entities.ts`**: Implementation of the function that receives as parameters the classes mapped as tables in the database and creates the tables in the Postgres database based on the metadata defined in each class.

- **`knexfile.js`**: Configuration file for Knex, defining connection parameters and migrations.
- **`docker-compose.yml`** and **`Dockerfile`**: Configuration files for the development environment using Docker.
- **`tsconfig.json`**: TypeScript configuration for compiling and managing the project.

## Used Decorators

### `@Entity`
The `@Entity` decorator is used to define a class as an entity, i.e., to represent a table in the database. When applied, it stores metadata that is used to map the class to its corresponding table.

Parameters:

  - **`name?`** (string): Name of the table in the database. If not specified, the name of the class will be used.

Example usage:

```typescript
@Entity('users')
class User {
  // some code here...
}
```

### `@Column`
The `@Column` decorator is used to mark properties of a class as columns of a table. It accepts a parameter that defines the name of the column in the database. This decorator stores metadata of the column, such as type and name, to be used later in building queries.

Parameters:

  - **`name?`** (string): Name of the column in the database. If not specified, the name of the property will be used.

  - **`type`** (string): Data type of the column: ('string' | 'integer' | 'float' | 'boolean' | 'timestamp')
  
  - **`primary?`** (boolean): Indicates if the column is a primary key. The default value is `false`.

Example usage:

```typescript
@Entity('users')
class User {
  @Column({ type: 'string' })
  public name!: string;

  @Column({ name: '__email', type: 'string' })
  public email!: string;

  @Column({ type: 'string', primary: true })
  public username!: string;
}
```

### `@Id`
The `@Id` decorator is used to define which property of a class will be designated as the identifier of that entity. By defining a property with the `@Id` decorator, this field automatically becomes an auto-increment field in the Postgres database.

Example usage:

```typescript
@Entity('users')
class User {
  @Id
  public id!: number;

  @Column({ type: 'string' })
  public name!: string;

  @Column({ name: '__email', type: 'string' })
  public email!: string;

  @Column({ type: 'string', primary: true })
  public username!: string;
}
```

## Metadata Manipulation

Metadata manipulation is a fundamental part of the project. The repository uses the `reflect-metadata` package, which allows associating additional information with classes and properties, such as the name of the table, column types, and primary keys. This feature is essential for the ORM to dynamically generate SQL queries based on the applied decorators.

### How It Works?

1. **Storing Metadata**: When a decorator is applied, it uses `Reflect.defineMetadata` to store the information in the context of the class or property. In the case of the `@Entity` decorator, it defines a metadata that stores the name to be used for the table, which can be either the original class name or the value defined as a parameter when using it.
   
   ```typescript
   Reflect.defineMetadata('table:name', 'users', User);
   ```

2. **Reading Metadata**: During execution, the ORM uses `Reflect.getMetadata` to read this information and dynamically build database operations. The reading of this metadata is done in the **[initialize-entities.ts](./src/database/initialize-entities.ts)** file, which defines the name, columns, and their types.

   ```typescript
   const entityMeta = Reflect.getMetadata('table:name', User);
   console.log(entityMeta.tableName); // Output: users
   ```

This use of metadata allows the ORM to have a clear view of the table structures and their relationships, abstracting the complexity of interactions with the database.
