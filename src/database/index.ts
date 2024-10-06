import knex from 'knex';
import config from '@knexfile';
import { initializeEntities } from './initialize-entities';

const db = knex(config);

export {
  db,
  initializeEntities
}
