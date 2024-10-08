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

  async save(): Promise<void> {
    const idColumn = this.columns.find((column) => column.type === 'increments') as Column;

    const mappedData = this.columns.reduce((final, column) => {
      final[column.name] = this[column.propertyKey];
      return final;
    }, {} as AnyObject);

    if (!this[idColumn.propertyKey]) {
      await db(this.tableName)
        .insert(mappedData)
        .returning('*')
        .then(([ value ]) => {
          this.columns.forEach((column) => {
            this[column.propertyKey] =  value[column.name];
          })
        });
      
      return;
    } else {
      await db(this.tableName)
        .update({
          ...mappedData,
          [idColumn.name]: undefined,
        })
        .where({
          [idColumn.name]: this[idColumn.propertyKey],
        })
        .returning('*')
        .then(([ value ]) => {
          this.columns.forEach((column) => {
            this[column.propertyKey] =  value[column.name];
          })
        });
    }
  }

  async remove(): Promise<void> {
    const where = this.columns.reduce((final, column) => {
      final[column.name] = this[column.propertyKey]

      return final;
    }, {} as AnyObject);

    await db(this.tableName)
      .delete()
      .where(where)
      .then(() => {
        const idColumn = this.columns.find((column) => column.type === 'increments')?.propertyKey as string;
        delete this[idColumn];
      });
  }

  static async count(): Promise<number> {
    const tableName = this.getTableName();
    return await db(tableName)
      .count()
      .first()
      .then((result) => result?.count as number);
  }

  static async findAll<T extends Repository>(
    this: { new (...args: any[]): T; } & typeof Repository
  ): Promise<T[]> {
    const tableName = this.getTableName();
    const columns = this.getColumns();

    return await db(tableName)
      .then((items) => {
        const mappedItems = items.map((item) => {
          const entity = new this();

          columns.forEach((column) => {
            entity[column.propertyKey] = item[column.name];
          });

          return entity;
        });

        return mappedItems;
      });
  }

  static async findOne<T extends Repository>(
    this: { new (...args: any[]): T; } & typeof Repository,
    options: FindOneOptions<T>
  ): Promise<T | null> {
    const tableName = this.getTableName();
    const columns = this.getColumns();

    const mappedWhere = Object
      .keys(options.where)
      .reduce((final, field) => {
        const column = columns.find((col) => col.propertyKey === field);

        final[column?.name as string] = options.where[field];

        return final;
      }, {} as AnyObject);
    
    return await db(tableName)
      .where(mappedWhere)
      .first()
      .then((value) => {
        if (!value) {
          return null;
        }

        const entity = new this();

        columns.forEach((column) => {
          entity[column.propertyKey] = value[column.name];
        });

        return entity;
      });
  }
}
