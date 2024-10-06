import { initializeEntities } from '@database';
import { User } from '@entities/user';

initializeEntities([User]).then(async () => {
  const users = await User.findAll();
  console.log(users[0].email);
});
