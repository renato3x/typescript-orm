import { Column } from '@decorators/column';
import { Entity } from '@decorators/entity';

@Entity()
export class User {
  @Column({ type: 'increments', primary: true })
  private id!: number;

  @Column({ type: 'string' })
  private name!: string;

  @Column({ type: 'string' })
  private email!: string;

  @Column({ type: 'string' })
  private password!: string;
}
