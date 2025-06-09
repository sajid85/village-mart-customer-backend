import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Put(':id/verify-email')
  verifyEmail(@Param('id') id: string) {
    return this.usersService.verifyEmail(id);
  }

  @Put(':id/deactivate')
  deactivateAccount(@Param('id') id: string) {
    return this.usersService.deactivateAccount(id);
  }

  @Put(':id/activate')
  activateAccount(@Param('id') id: string) {
    return this.usersService.activateAccount(id);
  }

  @Put(':id/profile')
  updateProfile(@Param('id') id: string, @Body() profileData: UpdateUserDto) {
    return this.usersService.updateProfile(id, profileData);
  }
}
