import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post('add/:productId')
  addToWishlist(@Request() req, @Param('productId') productId: string) {
    return this.wishlistService.addToWishlist(req.user, productId);
  }

  @Get()
  getWishlist(@Request() req) {
    return this.wishlistService.getWishlist(req.user.id);
  }

  @Delete(':itemId')
  removeFromWishlist(@Request() req, @Param('itemId') itemId: string) {
    return this.wishlistService.removeFromWishlist(req.user.id, itemId);
  }

  @Delete()
  clearWishlist(@Request() req) {
    return this.wishlistService.clearWishlist(req.user.id);
  }

  @Get('check/:productId')
  isInWishlist(@Request() req, @Param('productId') productId: string) {
    return this.wishlistService.isInWishlist(req.user.id, productId);
  }
}
