import { Column } from '@decorators/column';
import { Entity } from '@decorators/entity';
import { Id } from '@decorators/id';

@Entity()
export class User {
  @Id({ name: 'user_id' })
  @Column({ type: 'integer', name: 'userId' })
  private id!: number;

  @Column({ type: 'string' })
  private name!: string;

  @Column({ type: 'string' })
  private email!: string;

  @Column({ type: 'timestamp' })
  private createdAt!: Date;
}
