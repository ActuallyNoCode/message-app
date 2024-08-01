import { DocumentBuilder } from '@nestjs/swagger';

const apiDescription = `
  Welcome to the Message App API Reference! This documentation provides all the information you need to integrate with our message app's API.
  
  ## Overview
  
  This API allows you to interact with the core functionalities of our messaging application, including user management, messaging, chat operations, and country data.
  
  ## Features
  
  - **Users**: Manage user accounts, retrieve user information, and update user profiles.
  - **Messages**: Send and receive messages between users, manage message statuses, and retrieve message histories.
  - **Chats**: Create and manage chat groups, retrieve chat histories, and add/remove participants.
  - **Countries**: Access information about countries, including details required for user location settings.
  
  ## Getting Started
  
  To get started, authenticate with our API using your API key. Once authenticated, you can explore the endpoints available for each of the features described above.
  
  For detailed information on each endpoint, including request parameters and response formats, refer to the sections below.

  🤓💥 🤓💥 🤓💥 🤓💥 🤓💥 🤓💥 🤓💥 🤓💥 🤓💥 🤓💥 🤓💥 🤓💥
`;

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Message App API Reference')
  .setDescription(apiDescription)
  .setVersion('0.1.0')
  .addTag('users')
  .addTag('messages')
  .addTag('chats')
  .addTag('countries')
  .build();
