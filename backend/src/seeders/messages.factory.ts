import { Faker } from '@faker-js/faker';
import { MessageMediaType, MessageStatus } from '../constants/types';
import { Message } from '../entities/messages.entity';
import { setSeederFactory } from 'typeorm-extension';
import { v4 } from 'uuid';

export const MessageFactory = setSeederFactory(Message, (faker: Faker) => {
  const isImage = faker.number.int({
    min: 0,
    max: 32,
  });

  const message = new Message();

  message.id = v4();
  message.content = faker.lorem.sentence();
  message.status = MessageStatus.SENT;

  message.createdAt = faker.date.between({
    from: new Date('2023-01-01'),
    to: new Date(),
  });

  // TODO: Make some messages have media and mediaType
  if (isImage <= 1) {
    message.media = faker.image.url();
    message.mediaType = MessageMediaType.IMAGE_JPEG;
  }

  return message;
});
