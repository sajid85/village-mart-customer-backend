import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('featured')
  findFeatured() {
    return this.productsService.findFeatured();
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
    return this.productsService.findByCategory(category);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<Product>) {
    return this.productsService.update(id, updateData);
  }

  @Post('seed')
  seedProducts() {
    return this.productsService.seedProducts();
  }
} 