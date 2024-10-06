import 'reflect-metadata';

interface EntityOptions {
  name?: string;
}

export function Entity<T extends ClassType>(options?: EntityOptions) {
  return function(target: T) {
    const tableName = options?.name || target.name.toLowerCase();
    Reflect.defineMetadata('tableName', tableName, target);
  }
}
