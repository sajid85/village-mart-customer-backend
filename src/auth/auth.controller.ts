import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(
    @Body()
    createUserDto: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    },
  ) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Put('change-password')
  async changePassword(
    @Request() req,
    @Body() data: { currentPassword: string; newPassword: string },
  ) {
    return this.authService.changePassword(
      req.user.id,
      data.currentPassword,
      data.newPassword,
    );
  }
}
