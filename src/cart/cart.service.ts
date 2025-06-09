import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private cartRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async addToCart(
    user: User,
    productId: string,
    quantity: number = 1,
  ): Promise<CartItem> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    let cartItem = await this.cartRepository.findOne({
      where: { user: { id: user.id }, product: { id: productId } },
      relations: ['product'],
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      return this.cartRepository.save(cartItem);
    }

    cartItem = this.cartRepository.create({
      user,
      product,
      quantity,
      price: product.price,
    });

    return this.cartRepository.save(cartItem);
  }

  async getCart(userId: string): Promise<CartItem[]> {
    return this.cartRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
  }

  async updateQuantity(
    userId: string,
    cartItemId: string,
    quantity: number,
  ): Promise<CartItem> {
    const cartItem = await this.cartRepository.findOne({
      where: { id: cartItemId, user: { id: userId } },
      relations: ['product'],
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    cartItem.quantity = quantity;
    return this.cartRepository.save(cartItem);
  }

  async removeFromCart(userId: string, cartItemId: string): Promise<void> {
    const cartItem = await this.cartRepository.findOne({
      where: { id: cartItemId, user: { id: userId } },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    await this.cartRepository.remove(cartItem);
  }

  async clearCart(userId: string): Promise<void> {
    const cartItems = await this.cartRepository.find({
      where: { user: { id: userId } },
    });

    await this.cartRepository.remove(cartItems);
  }

  async getCartTotal(userId: string): Promise<number> {
    const cartItems = await this.getCart(userId);
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  }
}
