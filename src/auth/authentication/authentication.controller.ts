import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { ActiveUser } from '../decorators/active-user.decorator';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { Request, Response } from 'express';
import { OtpAuthService } from './otp-auth.service';
import { toFileStream } from 'qrcode';
import { AuthenticationService } from './authentication.service';

@Auth(AuthType.None)
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly otpAuthService: OtpAuthService,
  ) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authenticationService.create(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authenticationService.signIn(signInDto, response);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies['refresh_token'];
    return this.authenticationService.refreshToken(refreshToken, response);
  }

  @Auth(AuthType.Bearer)
  @HttpCode(HttpStatus.OK)
  @Post('2fa/generate')
  async generateQrCode(
    @ActiveUser() activeUser: ActiveUserData,
    @Res() response: Response,
  ) {
    const { secret, uri } = await this.otpAuthService.generateSecret(
      activeUser.email,
    );
    await this.otpAuthService.enableTFAForUser(activeUser.email, secret);
    response.type('png');
    return toFileStream(response, uri);
  }

  @Get('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('refresh_token', { path: '/auth/refresh-token' });
    return { message: 'Logout successful' };
  }
}
