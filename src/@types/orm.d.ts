declare type ClassType = {
  new (...args: any[]): {}
}

declare type ColumnBaseType = 'string' | 'integer' | 'float' | 'boolean' | 'timestamp';
declare type Id = 'increments';

declare interface Column {
  name: string;
  type: ColumnBaseType | Id;
  propertyKey: string;
  primary?: boolean;
}

declare type FindOneOptions<T> = {
  where: {
    [P in keyof T]?: T[P];
  }
}

declare type AnyObject = {
  [K: string]: any;
}
