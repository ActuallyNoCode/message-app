import { Faker } from '@faker-js/faker';
import { Chat } from '../entities/chats.entity';
import { setSeederFactory } from 'typeorm-extension';
import { v4 } from 'uuid';

export const ChatFactory = setSeederFactory(Chat, (faker: Faker) => {
  const chat = new Chat();

  chat.id = v4();
  chat.name = faker.company.name();
  chat.profileImages = Array.from(
    { length: faker.number.int({ min: 1, max: 5 }) },
    () => faker.image.avatar(),
  );

  chat.createdAt = faker.date.between({
    from: new Date('2022-01-01'),
    to: new Date('2022-12-31'),
  });

  return chat;
});
