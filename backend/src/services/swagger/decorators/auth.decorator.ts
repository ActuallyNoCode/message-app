// src/swagger-decorators.ts
import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

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
    }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 404, description: 'User not found' }),
  );
}

export function RefreshTokenDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Refresh Token',
      description: 'Refresh the user token',
    }),
    ApiResponse({
      status: 200,
      description: 'Token refreshed',
    }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiSecurity('JWT Authentication'),
  );
}
