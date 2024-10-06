import { Column } from '@decorators/column';
import { Entity } from '@decorators/entity';
import { Id } from '@decorators/id';

@Entity({ name: 'products' })
export class Product {
  @Id()
  private id!: number;

  @Column({ type: 'string' })
  private name!: string;

  @Column({ type: 'float' })
  private price!: number;

  @Column({ type: 'timestamp' })
  private createdAt!: Date;
}
