import 'reflect-metadata';

interface ColumnOptions {
  name?: string;
  type: ColumnBaseType
  primary?: boolean;
}

export function Column(options: ColumnOptions) {
  return function(target: Object, propertyKey: string) {
    const columnName = options?.name || propertyKey;

    const columns = (Reflect.getMetadata('table:columns', target.constructor) || []) as Column[];

    columns.push({
      name: columnName,
      type: options.type,
      propertyKey,
      primary: options.primary,
    });

    Reflect.defineMetadata('table:columns', columns, target.constructor);
  }
}
