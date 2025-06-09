import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OrdersService } from './orders.service';
import { AdminGuard } from '../auth/guards/admin.guard';

interface CreateOrderDto {
  shippingDetails: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
    phoneNumber: string;
  };
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  total: number;
}

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(req.user, createOrderDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.ordersService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.ordersService.findOne(req.user.id, id);
  }

  // Admin endpoints
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('admin/all')
  async getAllOrders() {
    return this.ordersService.findAllOrders();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('admin/statistics')
  async getOrderStatistics() {
    return this.ordersService.getOrderStatistics();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch('admin/:id/status')
  async updateOrderStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.ordersService.updateOrderStatus(id, status);
  }
}
