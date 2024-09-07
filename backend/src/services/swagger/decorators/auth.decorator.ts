// src/swagger-decorators.ts
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export function AuthControllerDocs() {
  return applyDecorators(ApiTags('auth'));
}

export function RegisterDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Register',
      requestBody: {
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/RegisterDto' },
          },
        },
      },
    }),
    ApiResponse({
      status: 201,
      description: 'User has been successfully registered',
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request - Sent data is invalid',
    }),
    ApiResponse({
      status: 409,
      description: 'Conflict - User already exists',
    }),
  );
}

export function LoginDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Login',
      requestBody: {
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/LoginDto' },
          },
        },
      },
    }),
    ApiResponse({
      status: 201,
      description: 'User successfully logged in',
      example: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRlNzFiZjE3LWQ2NWYtNDAxZi05ZTgwLWVjNTc1YjU4YjhhMSIsInBob25lTnVtYmVyIjoiMTIzNDU2Nzg5IiwicGhvbmVDb2RlIjoiKzU3IiwiaWF0IjoxNzIyODI0NTAyLCJleHAiOjE3MjM0MjkzMDJ9.kfI_ItWxgvA1n1d7mcWpjnL17J-1h8Q0vMTw7hmj0KE',
      },
    }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 404, description: 'User not found' }),
  );
}
