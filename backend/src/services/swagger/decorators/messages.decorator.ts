import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Message } from 'src/entities/messages.entity';
import { createMessageResponse } from 'src/web/v1/messages/dto/create-message.dto';
import { updateMessageResponse } from 'src/web/v1/messages/dto/update-message.dto';
import { deleteMessageResponse } from 'src/web/v1/messages/messages.service';

export function messagesControllerDocs() {
  return applyDecorators(ApiTags('messages'));
}

// Get Message By ID
export function getMessageByIdDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get message by ID',
      description: 'Retrieve message by message ID',
    }),
    ApiResponse({
      status: 200,
      description: 'Message information',
      type: Message,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 404,
      description: 'Message not found',
    }),
    ApiSecurity('jwt'),
  );
}

// Get Messages By Content
export function getMessagesByContentDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get messages by content. Partial match is supported.',
      description: 'Retrieve messages by content',
    }),
    ApiParam({
      name: 'content',
      description: 'Content of the message - case insensitive - partial match',
      type: String,
    }),
    ApiParam({
      name: 'chatId',
      description: 'Chat ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'List of messages',
      type: [Message],
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 404,
      description: 'Message not found',
    }),
    ApiSecurity('jwt'),
  );
}

// Get Messages By Content In Chat
export function getMessagesByContentInChatDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get messages by content in chat. Partial match is supported.',
      description: 'Retrieve messages by content in chat',
    }),
    ApiParam({
      name: 'content',
      description: 'Content of the message - case insensitive - partial match',
      type: String,
    }),
    ApiParam({
      name: 'chatId',
      description: 'Chat ID',
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'List of messages',
      type: [Message],
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 404,
      description: 'Message not found',
    }),
    ApiSecurity('jwt'),
  );
}

// Get Messages With Media
export function getMessagesWithMediaDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get messages with media',
      description: 'Retrieve messages with media',
    }),
    ApiResponse({
      status: 200,
      description: 'List of messages',
      type: [Message],
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 404,
      description: 'Message not found',
    }),
    ApiSecurity('jwt'),
  );
}

// Create Message
export function createMessageDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create message',
      description: 'Create a new message',
    }),
    ApiResponse({
      status: 201,
      description: 'Message created',
      type: createMessageResponse,
      example: {
        message: 'Message created successfully',
        data: {
          id: 'f5d7b3f6-9b0d-4e0b-8d3c-6c3e1c6a0b1b',
          chatId: 'f5d7b3f6-9b0d-4e0b-8d3c-6c3e1c6a0b1b',
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden - User is not part of the chat',
    }),
    ApiResponse({
      status: 404,
      description: 'User or Chat not found',
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    }),
    ApiSecurity('jwt'),
  );
}

// Update Message
export function updateMessageDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update message',
      description: 'Update a message',
    }),
    ApiResponse({
      status: 200,
      description: 'Message updated',
      type: updateMessageResponse,
      example: {
        message: 'Message updated successfully',
        data: {
          id: 'f5d7b3f6-9b0d-4e0b-8d3c-6c3e1c6a0b1b',
          chatId: 'f5d7b3f6-9b0d-4e0b-8d3c-6c3e1c6a0b1b',
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden - User is not the sender of the message',
    }),
    ApiResponse({
      status: 404,
      description: 'User or Chat not found',
    }),
    ApiSecurity('jwt'),
  );
}

// Delete Message
export function deleteMessageDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete message',
      description: 'Delete a message',
    }),
    ApiResponse({
      status: 200,
      description: 'Message deleted',
      type: deleteMessageResponse,
      example: {
        message: 'Message deleted successfully',
        data: {
          id: 'f5d7b3f6-9b0d-4e0b-8d3c-6c3e1c6a0b1b',
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden - User is not authorized to delete the message',
    }),
    ApiResponse({
      status: 404,
      description: 'Message not found',
    }),
    ApiSecurity('jwt'),
  );
}
