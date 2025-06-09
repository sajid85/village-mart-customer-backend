import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WishlistItem } from './entities/wishlist.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(WishlistItem)
    private wishlistRepository: Repository<WishlistItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async addToWishlist(user: User, productId: string): Promise<WishlistItem> {
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const existingItem = await this.wishlistRepository.findOne({
      where: { user: { id: user.id }, product: { id: productId } },
    });

    if (existingItem) {
      throw new ConflictException('Product already in wishlist');
    }

    const wishlistItem = this.wishlistRepository.create({
      user,
      product,
    });

    return this.wishlistRepository.save(wishlistItem);
  }

  async getWishlist(userId: string): Promise<WishlistItem[]> {
    return this.wishlistRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
  }

  async removeFromWishlist(userId: string, wishlistItemId: string): Promise<void> {
    const wishlistItem = await this.wishlistRepository.findOne({
      where: { id: wishlistItemId, user: { id: userId } },
    });

    if (!wishlistItem) {
      throw new NotFoundException('Wishlist item not found');
    }

    await this.wishlistRepository.remove(wishlistItem);
  }

  async clearWishlist(userId: string): Promise<void> {
    const wishlistItems = await this.wishlistRepository.find({
      where: { user: { id: userId } },
    });

    await this.wishlistRepository.remove(wishlistItems);
  }

  async isInWishlist(userId: string, productId: string): Promise<boolean> {
    const item = await this.wishlistRepository.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });

    return !!item;
  }
} 