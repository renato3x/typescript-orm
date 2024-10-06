import 'reflect-metadata';
import { db } from '@database';

export class Repository {
  private get tableName(): string {
    return Reflect.getMetadata('table:name', this.constructor);
  }

  private get columns(): Column[] {
    return (Reflect.getMetadata('table:columns', this.constructor) || []) as Column[];
  }

  private static getTableName(): string {
    return Reflect.getMetadata('table:name', this);
  }

  private static getColumns(): Column[] {
    return (Reflect.getMetadata('table:columns', this) || []) as Column[];
  }

  static async findAll<T extends Repository>(
    this: { new (): T; } & typeof Repository
  ): Promise<T[]> {
    const tableName = this.getTableName();
    const columns = this.getColumns();

    const mappedColumns = columns
      .map((column) => `"${column.name}" AS "${column.propertyKey}"`)
      .join(', ');

    return await db(tableName)
      .select(db.raw(mappedColumns))
      .then((items) => {
        const mappedItems = items.map((item) => {
          const entity = new this();

          columns.forEach((column) => {
            entity[column.propertyKey] = item[column.propertyKey];
          });

          return entity;
        });

        return mappedItems;
      });
  }
}
