import 'reflect-metadata';

export function Id(target: Object, propertyKey: string) {
  const columns = (Reflect.getMetadata('table:columns', target.constructor) || []) as Column[];

  const columnIndex = columns.findIndex((column) => column.propertyKey === propertyKey);

  columns[columnIndex] = {
    ...columns[columnIndex],
    type: 'increments',
    primary: true,
  }

  Reflect.defineMetadata('table:columns', columns, target.constructor);
}
