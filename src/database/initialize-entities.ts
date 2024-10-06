import 'reflect-metadata';
import { db } from '@database';

export async function initializeEntities(entities: ClassType[]) {
  for (const entity of entities) {
    const tableName = Reflect.getMetadata('tableName', entity) as string;

    const tableExists = await db.schema.hasTable(tableName);

    if (!tableExists) {
      await db.schema.createTable(tableName, (table) => {
        table.increments('id').primary();
      });
    }
  }
}
