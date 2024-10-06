import 'reflect-metadata';

interface ColumnOptions {
  name?: string;
  type: ColumnType
  primary?: boolean;
}

export function Column(options: ColumnOptions) {
  return function(target: Object, propertyKey: string) {
    const columnName = options?.name || propertyKey;

    const columns = (Reflect.getMetadata('columns', target.constructor) || []) as Column[];

    columns.push({
      name: columnName,
      type: options.type,
      propertyKey,
      primary: options.primary || false,
    });

    Reflect.defineMetadata('columns', columns, target.constructor);
  }
}
