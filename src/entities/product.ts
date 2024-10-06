import { Column } from '@decorators/column';
import { Entity } from '@decorators/entity';

@Entity({ name: 'products' })
export class Product {
  @Column({ type: 'increments', primary: true, name: 'product_id' })
  private id!: number;

  @Column({ name: 'product_name', type: 'string' })
  private name!: string;

  @Column({ type: 'float' })
  private price!: number;

  @Column({ type: 'timestamp' })
  private createdAt!: Date;
}
