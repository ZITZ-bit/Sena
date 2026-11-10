import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { ActivateAccountDto } from './dto/activate-account.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('activation/:token')
  getActivationDetails(@Param('token') token: string) {
    return this.authService.getActivationDetails(token);
  }

  @Post('activation')
  activateAccount(@Body() activationDto: ActivateAccountDto) {
    return this.authService.activateAccount(activationDto);
  }
}
