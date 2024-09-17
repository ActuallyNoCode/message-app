import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiSecurity,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { Chat } from 'src/entities/chats.entity';
import { deleteChatResponse } from 'src/web/v1/chats/chats.service';
import { createChatResponse } from 'src/web/v1/chats/dto/create-chat.dto';
import { updateChatResponse } from 'src/web/v1/chats/dto/update-chat.dto';

export function chatsControllerDocs() {
  return applyDecorators(ApiTags('chats'));
}

export function getChatsDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all chats user is in',
      description:
        'Retrieve a list of all chats user is in. User is determined by the JWT token',
    }),
    ApiResponse({
      status: 200,
      description: 'List of all chats user is in',
      type: [Chat],
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 404,
      description: 'User not found',
    }),
    ApiQuery({
      name: 'chatPage',
      type: 'number',
      required: false,
      description: 'Page number for chats default 1',
    }),
    ApiQuery({
      name: 'chatLimit',
      type: 'number',
      required: false,
      description: 'Number of chats per page default 20',
    }),
    ApiQuery({
      name: 'messagePage',
      type: 'number',
      required: false,
      description: 'Page number for messages default 1',
    }),
    ApiQuery({
      name: 'messageLimit',
      type: 'number',
      required: false,
      description: 'Number of messages per page default 1',
    }),
    ApiSecurity('jwt'),
  );
}

export function getChatByIdDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get chat by ID',
      description: 'Retrieve chat by chat ID',
    }),
    ApiResponse({
      status: 200,
      description: 'Chat information',
      type: Chat,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 404,
      description: 'User not found | Chat not found',
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'Chat ID',
    }),
    ApiSecurity('jwt'),
  );
}

export function createChatDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create chat',
      description: 'Create a new chat',
    }),
    ApiResponse({
      status: 201,
      description: 'Chat created',
      type: createChatResponse,
      example: {
        message: 'Chat created successfully',
        data: {
          id: 'b9b1c5b7-4e7c-4c9b-8e7e-6f7f3f5e7d7e',
          name: 'PachoTeam',
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 404,
      description: 'Users not found',
    }),
    ApiResponse({
      status: 400,
      description:
        'Bad request - Admins not in users list | Owner not in users list',
    }),
    ApiSecurity('jwt'),
  );
}

export function updateChatDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update chat',
      description: 'Update chat information',
    }),
    ApiResponse({
      status: 200,
      description: 'Chat updated successfully',
      type: updateChatResponse,
      example: {
        message: 'Chat updated successfully',
        data: {
          id: 'b9b1c5b7-4e7c-4c9b-8e7e-6f7f3f5e7d7e',
          name: 'PachoTeam',
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized - User is not an admin',
    }),
    ApiResponse({
      status: 404,
      description: 'Chat not found | Users not found',
    }),
    ApiResponse({
      status: 400,
      description:
        'Bad request - Some admins are not in the users list | Owner must be in the users list',
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'Chat ID to update',
    }),
    ApiSecurity('jwt'),
  );
}

export function deleteChatDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete chat',
      description: 'Delete chat by chat ID',
    }),
    ApiResponse({
      status: 200,
      description: 'Chat deleted successfully',
      type: deleteChatResponse,
      example: {
        message: 'Chat deleted successfully',
        data: {
          id: 'b9b1c5b7-4e7c-4c9b-8e7e-6f7f3f5e7d7e',
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized - User is not an admin',
    }),
    ApiResponse({
      status: 404,
      description: 'Chat not found',
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'Chat ID',
    }),
    ApiSecurity('jwt'),
  );
}
