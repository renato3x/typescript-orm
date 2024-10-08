import { initializeEntities } from '@database';
import { User } from '@entities/user';
import { faker } from '@faker-js/faker';

initializeEntities([User]).then(async () => {
  console.log('inserting new users...');

  await Promise.all(
    new Array(30).fill(null).map(() => {
      const user = new User;
      user.name = faker.person.fullName();
      user.email = faker.internet.email().toLowerCase();
      user.createdAt = faker.date.recent();

      return user.save();
    })
  );

  console.log('searching all users...');

  const users = await User.findAll();
  const count = await User.count();

  console.log('total users: ', count);
  console.log(users);

  let user: User | null = null;

  while(!user) {
    const id = faker.number.int({ min: 1, max: users.at(-1)?.id || 30 });

    console.log(`searching user with id #${id}...`);

    user = await User.findOne({
      where: {
        id,
      },
    });

    if (user) {
      console.log(`user with id #${id} was found!!!`);
      console.log(user);
    } else {
      console.log(`user with id #${id} not found`);
    }
  }

  console.log(`updating name from user with id #${user.id}...`);
  user.name = faker.person.fullName();

  await user.save();

  console.log(`name form user with id $${user.id} was updated successfully!`);
  console.log(user);

  console.log(`deleting user with id #${user.id}...`);

  const id = user.id;
  await user.remove();

  console.log(`user with id #${id} was deleted`);
});
