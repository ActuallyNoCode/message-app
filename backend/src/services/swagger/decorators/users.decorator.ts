import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from 'src/web/v1/users/dto/update-user.dto';

class UserResponse {
  @ApiProperty({
    example: 'a038e797-6ee2-412c-9ee7-f6671b40a931',
  })
  id: string;

  @ApiProperty({
    example: 'user1',
  })
  username: string;

  @ApiProperty({
    example: '1234567890',
  })
  phoneNumber: string;

  @ApiProperty({
    example: '+245',
  })
  phoneCode: string;

  @ApiProperty({
    example: 'https://example.com/profile.jpg',
  })
  profilePicture: string;
}

export function usersControllerDocs() {
  return applyDecorators(ApiTags('users'));
}

export function getUsersDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all users',
      description: 'Retrieve a list of all users in the system',
    }),
    ApiResponse({
      status: 200,
      description: 'List of all users',
      type: UserResponse,
      isArray: true,
      example: [
        {
          id: 'a038e797-6ee2-412c-9ee7-f6671b40a931',
          username: 'user1',
          phoneNumber: '1234567890',
          phoneCode: '+245',
          profilePicture: 'https://example.com/profile.jpg',
        },
        {
          id: '58a36267-d1d9-481c-994a-3011e69f492a',
          username: 'user2',
          phoneNumber: '2345678901',
          phoneCode: '+57',
          profilePicture: 'https://example.com/profile.jpg',
        },
      ],
    }),
  );
}

export function getUserByIdDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get user by ID',
      description: 'Retrieve user information by user ID',
    }),
    ApiResponse({
      status: 200,
      description: 'User information',
      type: UserResponse,
      example: {
        id: '72c43cdf-a4a4-45bb-91ca-b8a6c89017e1',
        username: 'user1',
        phoneNumber: '1234567890',
        phoneCode: '+57',
        profilePicture: 'https://example.com/profile.jpg',
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 404,
      description: 'User not found',
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'User ID',
    }),
    ApiSecurity('JWT Authentication'),
  );
}

export function getUserByUsernameDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get users by username',
      description:
        'Retrieve users information by username - Supports partial information and is case insensitive',
    }),
    ApiResponse({
      status: 200,
      description: 'List of users with similar usernames',
      type: UserResponse,
      example: [
        {
          id: '524f84b0-3405-4253-b497-578305ad3f81',
          username: 'user1',
          phoneNumber: '1234567890',
          phoneCode: '+57',
          profilePicture: 'https://example.com/profile.jpg',
        },
        {
          id: 'e484a506-be01-4d82-8823-9cbbe8c4ef23',
          username: 'user2',
          phoneNumber: '1234566666',
          phoneCode: '+57',
          profilePicture: 'https://example.com/profile.jpg',
        },
      ],
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request - Invalid username',
    }),
    ApiResponse({
      status: 404,
      description: 'User not found',
    }),
    ApiParam({
      name: 'username',
      type: 'string',
      description: 'Username',
      example: 'use...',
    }),
    ApiSecurity('JWT Authentication'),
  );
}

export function getUserByPhoneNumberDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get users by phone number',
      description:
        'Retrieve users information by phone number - supports partial information',
    }),
    ApiResponse({
      status: 200,
      description: 'List of users with similar phone numbers',
      type: UserResponse,
      example: [
        {
          id: '524f84b0-3405-4253-b497-578305ad3f81',
          username: 'user1',
          phoneNumber: '1234567890',
          phoneCode: '+57',
          profilePicture: 'https://example.com/profile.jpg',
        },
        {
          id: 'e484a506-be01-4d82-8823-9cbbe8c4ef23',
          username: 'user2',
          phoneNumber: '1234566666',
          phoneCode: '+57',
          profilePicture: 'https://example.com/profile.jpg',
        },
      ],
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request - Invalid phone number',
    }),
    ApiResponse({
      status: 404,
      description: 'User not found',
    }),
    ApiParam({
      name: 'phoneNumber',
      type: 'string',
      description: 'Phone number',
      example: '123...',
    }),
    ApiSecurity('JWT Authentication'),
  );
}

export function updateUserDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update user information',
      description: 'Update user information by user ID',
    }),
    ApiBody({
      type: UpdateUserDto,
      description: 'User information to update - every field is optional',
      examples: {
        user: {
          value: {
            username: 'user1',
            password: '123456789',
            phoneNumber: '1234567890',
            phoneCode: '+57',
            profilePicture: 'https://example.com/profile.jpg',
          },
        },
      },
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'User ID to update',
    }),
    ApiResponse({
      status: 200,
      description: 'Updated user information',
    }),
    ApiResponse({
      status: 401,
      description:
        'Unauthorized - User does not have permission to update this user',
    }),
    ApiResponse({
      status: 404,
      description: 'User not found',
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'User ID',
    }),
    ApiSecurity('JWT Authentication'),
  );
}

export function deleteUserDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete user',
      description:
        'Soft delete user by user ID - Makes user deletedAt field not null',
    }),
    ApiResponse({
      status: 200,
      description: 'User successfully deleted',
    }),
    ApiResponse({
      status: 401,
      description:
        'Unauthorized - User does not have permission to delete this user',
    }),
    ApiResponse({
      status: 404,
      description: 'User not found',
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'User ID',
    }),
    ApiSecurity('JWT Authentication'),
  );
}
