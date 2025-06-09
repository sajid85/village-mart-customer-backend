import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order, OrderItem } from './entities/order.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { CartService } from '../cart/cart.service';

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

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private cartService: CartService,
    private dataSource: DataSource,
  ) {}

  async create(user: User, createOrderDto: CreateOrderDto): Promise<Order> {
    // Start a transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (!createOrderDto.items || createOrderDto.items.length === 0) {
        throw new BadRequestException('Order must contain at least one item');
      }

      if (!createOrderDto.shippingDetails) {
        throw new BadRequestException('Shipping details are required');
      }

      const order = this.ordersRepository.create({
        user,
        ...createOrderDto.shippingDetails,
        total: createOrderDto.total,
        status: 'pending',
      });

      const savedOrder = await queryRunner.manager.save(Order, order);

      // Create order items
      const orderItems = await Promise.all(
        createOrderDto.items.map(async (item) => {
          const product = await queryRunner.manager.findOne(Product, {
            where: { id: item.productId },
          });

          if (!product) {
            throw new NotFoundException(
              `Product with ID ${item.productId} not found`,
            );
          }

          const orderItem = this.orderItemsRepository.create({
            order: savedOrder,
            product,
            quantity: item.quantity,
            price: item.price,
          });

          return queryRunner.manager.save(OrderItem, orderItem);
        }),
      );

      savedOrder.items = orderItems;

      // Clear the user's cart after successful order creation
      await this.cartService.clearCart(user.id);

      // Commit the transaction
      await queryRunner.commitTransaction();

      // Return the complete order with items
      const completeOrder = await this.ordersRepository.findOne({
        where: { id: savedOrder.id },
        relations: ['items', 'items.product'],
      });

      if (!completeOrder) {
        throw new NotFoundException(`Order with ID ${savedOrder.id} not found`);
      }

      return completeOrder;
    } catch (error) {
      // If anything fails, rollback the transaction
      await queryRunner.rollbackTransaction();

      // If it's already a NestJS exception, rethrow it
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      // Log the error for debugging
      console.error('Error creating order:', error);

      // Throw a more specific error message
      throw new BadRequestException(
        `Failed to create order: ${error.message || 'Unknown error'}`,
      );
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
  }

  async findAll(userId: string): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(userId: string, orderId: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId, user: { id: userId } },
      relations: ['items', 'items.product'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async findAllOrders(): Promise<Order[]> {
    return this.ordersRepository.find({
      relations: ['items', 'items.product', 'user'],
      order: { createdAt: 'DESC' },
    });
  }

  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order = await queryRunner.manager.findOne(Order, {
        where: { id: orderId },
        relations: ['items', 'items.product', 'user'],
      });

      if (!order) {
        throw new NotFoundException('Order not found');
      }

      // Save the old status for rollback
      const oldStatus = order.status;
      order.status = status;

      const updatedOrder = await queryRunner.manager.save(Order, order);
      await queryRunner.commitTransaction();

      return updatedOrder;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getOrderStatistics(): Promise<any> {
    const totalOrders = await this.ordersRepository.count();
    const pendingOrders = await this.ordersRepository.count({
      where: { status: 'pending' },
    });
    const processingOrders = await this.ordersRepository.count({
      where: { status: 'processing' },
    });
    const shippedOrders = await this.ordersRepository.count({
      where: { status: 'shipped' },
    });
    const deliveredOrders = await this.ordersRepository.count({
      where: { status: 'delivered' },
    });

    return {
      totalOrders,
      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
    };
  }
}
