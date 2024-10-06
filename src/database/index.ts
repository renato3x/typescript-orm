import knex from 'knex';
import config from '@knexfile';
import { initializeEntities } from './initialize-entities';
import { Repository } from './repository';

const db = knex(config);

export {
  db,
  initializeEntities,
  Repository,
}
