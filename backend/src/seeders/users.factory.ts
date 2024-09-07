import { Faker } from '@faker-js/faker';
import { User } from '../entities/users.entity';
import { setSeederFactory } from 'typeorm-extension';
import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';

export const UserFactory = setSeederFactory(User, async (faker: Faker) => {
  const user = new User();

  user.id = v4();
  user.phoneNumber = faker.phone.number();
  user.password = await bcrypt.hash(faker.internet.password(), 10);
  user.username = faker.internet.userName();
  user.phoneCode = '+' + faker.number.int({ min: 1, max: 999 });
  user.profilePicture = faker.image.avatar();

  user.createdAt = faker.date.between({
    from: new Date('2021-01-01'),
    to: new Date('2021-12-31'),
  });

  return user;
});
