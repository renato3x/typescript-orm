import 'reflect-metadata';
import { db } from '@database';

export async function initializeEntities(entities: ClassType[]) {
  for (const entity of entities) {
    const tableName = Reflect.getMetadata('table:name', entity) as string;

    const tableExists = await db.schema.hasTable(tableName);

    if (!tableExists) {
      await db.schema.createTable(tableName, (table) => {
        const columns = (Reflect.getMetadata('table:columns', entity) || []) as Column[];

        columns.forEach((column) => {
          const col = table[column.type](column.name);

          if (column.primary) {
            col.primary();
          }
        });
      });
    }
  }
}
