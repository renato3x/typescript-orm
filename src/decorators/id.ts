import 'reflect-metadata';

interface IdOptions {
  name?: string;
}

export function Id(options?: IdOptions) {
  return function(target: Object, propertyKey: string) {
    const columnName = options?.name || propertyKey;
    const columns = (Reflect.getMetadata('table:columns', target.constructor) || []) as Column[];

    const columnIndex = columns.findIndex((column) => column.propertyKey === propertyKey);

    if (columnIndex != -1) {
      columns.splice(columnIndex, 1);
    }

    columns.push({
      name: columnName,
      propertyKey,
      type: 'increments',
      primary: true,
    });

    Reflect.defineMetadata('table:columns', columns, target.constructor);
  }
}
