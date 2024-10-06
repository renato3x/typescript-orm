declare type ColumnBaseType = 'string' | 'integer' | 'float' | 'boolean' | 'timestamp';
declare type Id = 'increments';

declare interface Column {
  name: string;
  type: ColumnBaseType | Id;
  propertyKey: string;
  primary?: boolean;
}
