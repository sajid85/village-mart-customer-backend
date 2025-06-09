import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CartService } from './cart.service';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add/:productId')
  addToCart(
    @Request() req,
    @Param('productId') productId: string,
    @Body('quantity') quantity: number = 1,
  ) {
    return this.cartService.addToCart(req.user, productId, quantity);
  }

  @Get()
  getCart(@Request() req) {
    return this.cartService.getCart(req.user.id);
  }

  @Put(':itemId')
  updateQuantity(
    @Request() req,
    @Param('itemId') itemId: string,
    @Body('quantity') quantity: number,
  ) {
    return this.cartService.updateQuantity(req.user.id, itemId, quantity);
  }

  @Delete(':itemId')
  removeFromCart(@Request() req, @Param('itemId') itemId: string) {
    return this.cartService.removeFromCart(req.user.id, itemId);
  }

  @Delete()
  clearCart(@Request() req) {
    return this.cartService.clearCart(req.user.id);
  }

  @Get('total')
  getCartTotal(@Request() req) {
    return this.cartService.getCartTotal(req.user.id);
  }
}
