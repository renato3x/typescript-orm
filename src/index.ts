import { initializeEntities } from '@database';
import { Product } from '@entities/product';
import { User } from '@entities/user';

async function main() {
  await initializeEntities([
    User,
    Product
  ]);
}

main();
