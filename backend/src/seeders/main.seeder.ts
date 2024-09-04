import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../entities/users.entity';
import { Chat } from '../entities/chats.entity';
import { Message } from '../entities/messages.entity';
import { faker } from '@faker-js/faker';
import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const logger = new Logger('MainSeeder');
    const userFactory = factoryManager.get(User);
    const chatFactory = factoryManager.get(Chat);
    const messageFactory = factoryManager.get(Message);

    try {
      // Generate and save users
      logger.log('Generating users...');
      const users = await userFactory.saveMany(9);

      // Generate my user
      const actuallyPanda = await userFactory.save({
        phoneNumber: '123456789',
        phoneCode: '+57',
        username: 'Actualmente Pandatástico',
        password: await bcrypt.hash('password', 10),
        profilePicture: faker.image.avatar(),
        createdAt: faker.date.between({
          from: new Date('2021-01-01'),
          to: new Date('2021-12-31'),
        }),
      });

      users.push(actuallyPanda);

      // Generate and save chats
      logger.log('Generating chats...');
      const chats = await Promise.all(
        Array(20)
          .fill('')
          .map(async () => {
            const chatUsers = faker.helpers
              .shuffle(users)
              .slice(0, faker.number.int({ min: 2, max: 10 }));
            const adminIds = faker.helpers
              .shuffle(chatUsers)
              .slice(0, faker.number.int({ min: 2, max: chatUsers.length }))
              .map((user) => user.id);
            const ownerId = faker.helpers.arrayElement(adminIds);

            const chat = await chatFactory.make({
              users: chatUsers,
              adminIds,
              ownerId,
            });
            return chat;
          }),
      );

      const chatRepo = dataSource.getRepository(Chat);
      await chatRepo.save(chats);

      // Generate and save messages
      logger.log('Generating messages...');
      const messages = await Promise.all(
        Array(250)
          .fill('')
          .map(async () => {
            const chat = faker.helpers.arrayElement(chats);
            const sender = faker.helpers.arrayElement(chat.users);
            const message = await messageFactory.make({
              chatId: chat,
              senderId: sender,
            });
            return message;
          }),
      );

      const messageRepo = dataSource.getRepository(Message);
      await messageRepo.save(messages);
    } catch (error) {
      logger.error(`Error occurred during seeding: ${error.message}`);
      throw new Error(error);
    }
  }
}
