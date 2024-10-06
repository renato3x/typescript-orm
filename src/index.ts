import { initializeEntities } from '@database';
import { User } from '@entities/user';

initializeEntities([User]).then(async () => {
  const user = await User.findOne({
    where: {
      id: 50,
      email: 'joao.silva@example.com'
    },
  });

  console.log(user);
});
