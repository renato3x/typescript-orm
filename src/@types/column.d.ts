declare type ColumnType = 'string' | 'integer' | 'float' | 'boolean' | 'timestamp' | 'increments';

declare interface Column {
  name: string;
  type: ColumnType;
  propertyKey: string;
  primary?: boolean;
}
