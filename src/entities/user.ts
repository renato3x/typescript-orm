import { Column } from '@decorators/column';
import { Entity } from '@decorators/entity';
import { Id } from '@decorators/id';
import { Repository } from '@database';

@Entity("_users")
export class User extends Repository {
  @Id
  @Column({ type: 'integer', name: '_user_id' })
  public id!: number;

  @Column({ type: 'string' })
  public name!: string;

  @Column({ type: 'string' })
  public email!: string;

  @Column({ type: 'timestamp' })
  public createdAt!: Date;
}
