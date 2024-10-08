import 'reflect-metadata';

export function Entity<T extends ClassType>(name?: string) {
  return function(target: T) {
    const tableName = name || target.name.toLowerCase();
    Reflect.defineMetadata('table:name', tableName, target);
  }
}
