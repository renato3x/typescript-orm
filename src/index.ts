import { initializeEntities } from '@database';
import { User } from '@entities/user';
import { faker } from '@faker-js/faker';

initializeEntities([User]).then(async () => {
  const user = new User();

  user.name = faker.person.fullName();
  user.email = faker.internet.email();
  user.createdAt = faker.date.recent();

  await user.save();
  
  const users = await User.findAll();

  console.log(users);
});
