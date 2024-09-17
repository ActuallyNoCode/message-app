import { Injectable, ExecutionContext, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/web/v1/auth/auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    /* const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>(); */

    try {
      // Try activating the guard using the authToken (Bearer Token)
      return (await super.canActivate(context)) as boolean;
    } catch (err) {
      /* 
      // If the token is expired, attempt to refresh using refreshToken
      if (
        err instanceof TokenExpiredError ||
        err.name === 'UnauthorizedException'
      ) {
        const refreshToken = request.cookies?.refreshToken;

        if (!refreshToken) {
          throw new UnauthorizedException('Refresh token not found');
        }

        // Call refresh token logic to get a new authToken
        const newTokens = await this.authService.refreshTokens(refreshToken);
        if (!newTokens) {
          throw new UnauthorizedException('Invalid refresh token');
        }

        // Set the new authToken in the response header
        response.setHeader('Authorization', `Bearer ${newTokens.authToken}`);

        // Attach the new authToken to the request for further processing
        request.headers['authorization'] = `Bearer ${newTokens.authToken}`;

        // Retry the original request with the new authToken
        return (await super.canActivate(context)) as boolean;
      }

      // If it's not a token-related error, rethrow the error
      
     */
      throw err;
    }
  }
}
