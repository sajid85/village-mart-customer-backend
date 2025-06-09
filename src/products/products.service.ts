import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll() {
    return this.productsRepository.find();
  }

  async findFeatured() {
    return this.productsRepository.findOne({
      where: { isFeatured: true },
    });
  }

  async findByCategory(category: string) {
    return this.productsRepository.find({
      where: { category },
    });
  }

  async findOne(id: string) {
    return this.productsRepository.findOne({ where: { id } });
  }

  async create(productData: Partial<Product>) {
    const product = this.productsRepository.create(productData);
    return this.productsRepository.save(product);
  }

  async update(id: string, updateData: Partial<Product>) {
    await this.productsRepository.update(id, updateData);
    return this.findOne(id);
  }

  async seedProducts() {
    await this.productsRepository.delete({});

    const products = [
      {
        name: 'Sony WH-1000XM4',
        description:
          'Premium noise-cancelling wireless headphones with exceptional sound quality',
        price: 349.99,
        oldPrice: 399.99,
        imageUrl:
          'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
        category: 'audio',
        rating: 4.8,
        reviewCount: 1250,
        inStock: true,
        isFeatured: true,
        isOnSale: true,
      },
      {
        name: 'Razer BlackWidow V3',
        description: 'Mechanical gaming keyboard with RGB lighting',
        price: 139.99,
        oldPrice: 169.99,
        imageUrl:
          'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
        category: 'gaming',
        rating: 4.6,
        reviewCount: 850,
        inStock: true,
        isFeatured: false,
        isOnSale: true,
      },
      {
        name: 'Logitech C920x HD Pro',
        description: 'Full HD 1080p webcam with dual microphones',
        price: 79.99,
        oldPrice: 99.99,
        imageUrl:
          'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
        category: 'accessories',
        rating: 4.5,
        reviewCount: 2389,
        inStock: true,
        isFeatured: false,
        isOnSale: true,
      },
      {
        name: 'Bose SoundLink Revolve+',
        description: '360-degree Bluetooth speaker with immersive sound',
        price: 299.99,
        oldPrice: 329.99,
        imageUrl:
          'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format',
        category: 'audio',
        rating: 4.9,
        reviewCount: 1678,
        inStock: true,
        isFeatured: true,
        isOnSale: true,
      },
      {
        name: 'Logitech G Pro X Superlight',
        description:
          'Ultra-lightweight wireless gaming mouse for professional-level gaming.',
        price: 149.99,
        oldPrice: 169.99,
        imageUrl:
          'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&auto=format',
        category: 'Gaming',
        rating: 4.8,
        reviewCount: 945,
        inStock: true,
        isOnSale: true,
      },
      {
        name: 'PlayStation 5 DualSense',
        description: 'Next-gen wireless game controller with haptic feedback',
        price: 69.99,
        oldPrice: 89.99,
        imageUrl:
          'https://images.unsplash.com/photo-1606318801954-d46d46d3360a?w=500&auto=format',
        category: 'gaming',
        rating: 4.7,
        reviewCount: 890,
        inStock: true,
        isFeatured: false,
        isOnSale: true,
      },
      {
        name: 'Apple AirPods Pro',
        description:
          'Active noise cancelling earbuds with transparency mode and spatial audio.',
        price: 249.99,
        oldPrice: 279.99,
        imageUrl:
          'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=500&auto=format',
        category: 'Audio',
        rating: 4.7,
        reviewCount: 5678,
        inStock: true,
        isOnSale: true,
      },
      {
        name: 'Samsung 49" Odyssey G9',
        description:
          'Ultra-wide curved gaming monitor with 240Hz refresh rate and 1ms response time.',
        price: 1299.99,
        oldPrice: 1499.99,
        imageUrl:
          'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format',
        category: 'Electronics',
        rating: 4.6,
        reviewCount: 342,
        inStock: true,
        isFeatured: true,
      },
      {
        name: 'Dell XPS 15',
        description: 'Premium laptop with 4K OLED display and RTX graphics',
        price: 1899.99,
        oldPrice: 2099.99,
        imageUrl:
          'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=500&auto=format',
        category: 'electronics',
        rating: 4.7,
        reviewCount: 325,
        inStock: true,
        isFeatured: false,
        isOnSale: true,
      },
      {
        name: 'ASUS ROG Swift PG279QM',
        description: '27" Gaming Monitor, 1440p, 240Hz, G-SYNC',
        price: 799.99,
        imageUrl:
          'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format',
        category: 'gaming',
        rating: 4.6,
        reviewCount: 189,
        inStock: true,
        isFeatured: false,
        isOnSale: false,
      },
      {
        name: 'Keychron K2',
        description: 'Wireless Mechanical Keyboard with Hot-swappable Switches',
        price: 89.99,
        oldPrice: 99.99,
        imageUrl:
          'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=500&auto=format',
        category: 'accessories',
        rating: 4.5,
        reviewCount: 756,
        inStock: true,
        isFeatured: false,
        isOnSale: true,
      },
      {
        name: 'Jabra Elite 85t',
        description: 'True Wireless Earbuds with Active Noise Cancellation',
        price: 229.99,
        oldPrice: 249.99,
        imageUrl:
          'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format',
        category: 'audio',
        rating: 4.4,
        reviewCount: 892,
        inStock: true,
        isFeatured: false,
        isOnSale: true,
      },
      {
        name: 'Logitech MX Master 3S',
        description: 'Advanced Wireless Mouse for Productivity',
        price: 99.99,
        imageUrl:
          'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format',
        category: 'accessories',
        rating: 4.8,
        reviewCount: 1456,
        inStock: true,
        isFeatured: false,
        isOnSale: false,
      },
      {
        name: 'SteelSeries Arctis Nova Pro',
        description: 'Wireless Gaming Headset with Active Noise Cancellation',
        price: 349.99,
        imageUrl:
          'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&auto=format',
        category: 'gaming',
        rating: 4.7,
        reviewCount: 567,
        inStock: true,
        isFeatured: false,
        isOnSale: false,
      },
      {
        name: 'Apple iPad Air',
        description: '10.9-inch, M1 chip, 256GB Storage',
        price: 749.99,
        oldPrice: 799.99,
        imageUrl:
          'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format',
        category: 'electronics',
        rating: 4.9,
        reviewCount: 2341,
        inStock: true,
        isFeatured: false,
        isOnSale: true,
      },
      {
        name: 'Elgato Stream Deck MK.2',
        description: 'Stream Controller with LCD Keys',
        price: 149.99,
        imageUrl:
          'https://images.unsplash.com/photo-1561883088-039e53143d73?w=500&auto=format',
        category: 'accessories',
        rating: 4.6,
        reviewCount: 432,
        inStock: true,
        isFeatured: false,
        isOnSale: false,
      },
      {
        name: 'Samsung Galaxy Buds2 Pro',
        description: 'True Wireless Earbuds with 360 Audio',
        price: 229.99,
        oldPrice: 249.99,
        imageUrl:
          'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format',
        category: 'audio',
        rating: 4.5,
        reviewCount: 978,
        inStock: true,
        isFeatured: false,
        isOnSale: true,
      },
      {
        name: 'NVIDIA RTX 4080',
        description: 'High-end Graphics Card for Gaming and Content Creation',
        price: 1199.99,
        imageUrl:
          'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&auto=format',
        category: 'gaming',
        rating: 4.8,
        reviewCount: 345,
        inStock: false,
        isFeatured: false,
        isOnSale: false,
      },
      {
        name: 'Blue Yeti X',
        description: 'Professional USB Microphone for Streaming',
        price: 169.99,
        oldPrice: 189.99,
        imageUrl:
          'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format',
        category: 'audio',
        rating: 4.6,
        reviewCount: 1123,
        inStock: true,
        isFeatured: false,
        isOnSale: true,
      },
      {
        name: 'Corsair K100 RGB',
        description: 'Optical-Mechanical Gaming Keyboard',
        price: 229.99,
        imageUrl:
          'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=500&auto=format',
        category: 'gaming',
        rating: 4.7,
        reviewCount: 567,
        inStock: true,
        isFeatured: false,
        isOnSale: false,
      },
      {
        name: 'Microsoft Surface Laptop 5',
        description: '13.5" Touch-Screen Laptop',
        price: 1299.99,
        oldPrice: 1399.99,
        imageUrl:
          'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=500&auto=format',
        category: 'electronics',
        rating: 4.5,
        reviewCount: 234,
        inStock: true,
        isFeatured: false,
        isOnSale: true,
      },
      {
        name: 'Razer Basilisk V3',
        description: 'Customizable Gaming Mouse with RGB',
        price: 69.99,
        imageUrl:
          'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format',
        category: 'gaming',
        rating: 4.6,
        reviewCount: 890,
        inStock: true,
        isFeatured: false,
        isOnSale: false,
      },
      {
        name: 'Sennheiser HD 660S',
        description: 'Open-Back Audiophile Headphones',
        price: 499.99,
        oldPrice: 549.99,
        imageUrl:
          'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&auto=format',
        category: 'audio',
        rating: 4.8,
        reviewCount: 445,
        inStock: true,
        isFeatured: false,
        isOnSale: true,
      },
      {
        name: 'ASUS ROG Strix G15',
        description: 'Gaming Laptop with RTX 3070',
        price: 1599.99,
        imageUrl:
          'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=500&auto=format',
        category: 'gaming',
        rating: 4.7,
        reviewCount: 678,
        inStock: true,
        isFeatured: false,
        isOnSale: false,
      },
      {
        name: 'Elgato Facecam',
        description: 'Professional Webcam for Creators',
        price: 199.99,
        oldPrice: 219.99,
        imageUrl:
          'https://images.unsplash.com/photo-1596774105710-8e3f98097d65?w=500&auto=format',
        category: 'accessories',
        rating: 4.5,
        reviewCount: 567,
        inStock: true,
        isFeatured: false,
        isOnSale: true,
      },
      {
        name: 'Samsung Odyssey Neo G7',
        description: '32" Curved Gaming Monitor',
        price: 999.99,
        imageUrl:
          'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format',
        category: 'gaming',
        rating: 4.5,
        reviewCount: 234,
        inStock: true,
        isFeatured: false,
        isOnSale: false,
      },
      {
        name: 'Rode NT-USB Mini',
        description: 'Compact USB Microphone',
        price: 99.99,
        imageUrl:
          'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format',
        category: 'audio',
        rating: 4.4,
        reviewCount: 789,
        inStock: true,
        isFeatured: false,
        isOnSale: false,
      },
      {
        name: 'LG 27GN950-B',
        description: '27" 4K UHD Gaming Monitor',
        price: 799.99,
        oldPrice: 899.99,
        imageUrl:
          'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format',
        category: 'gaming',
        rating: 4.7,
        reviewCount: 432,
        inStock: true,
        isFeatured: false,
        isOnSale: true,
      },
      {
        name: 'Razer Naga Pro',
        description: 'Wireless Gaming Mouse with Swappable Side Plates',
        price: 149.99,
        imageUrl:
          'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format',
        category: 'gaming',
        rating: 4.5,
        reviewCount: 678,
        inStock: true,
        isFeatured: false,
        isOnSale: false,
      },
      {
        name: 'Audio-Technica ATH-M50x',
        description: 'Professional Studio Monitor Headphones',
        price: 149.99,
        oldPrice: 169.99,
        imageUrl:
          'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&auto=format',
        category: 'audio',
        rating: 4.8,
        reviewCount: 3456,
        inStock: true,
        isFeatured: false,
        isOnSale: true,
      },
      {
        name: 'Logitech Brio 4K',
        description: 'Ultra HD Webcam for Video Conferencing',
        price: 199.99,
        imageUrl:
          'https://images.unsplash.com/photo-1596774105710-8e3f98097d65?w=500&auto=format',
        category: 'accessories',
        rating: 4.6,
        reviewCount: 892,
        inStock: true,
        isFeatured: false,
        isOnSale: false,
      },
      {
        name: 'MacBook Pro 16"',
        description: 'Apple M2 Max Chip, 32GB RAM, 1TB SSD',
        price: 2499.99,
        imageUrl:
          'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=500&auto=format',
        category: 'electronics',
        rating: 4.9,
        reviewCount: 1234,
        inStock: true,
        isFeatured: false,
        isOnSale: false,
      },
      {
        name: 'Elgato Key Light Air',
        description: 'Professional LED Panel for Streaming',
        price: 129.99,
        oldPrice: 149.99,
        imageUrl:
          'https://images.unsplash.com/photo-1561883088-039e53143d73?w=500&auto=format',
        category: 'accessories',
        rating: 4.5,
        reviewCount: 567,
        inStock: true,
        isFeatured: false,
        isOnSale: true,
      },
      {
        name: 'Shure SM7B',
        description: 'Professional Dynamic Microphone',
        price: 399.99,
        imageUrl:
          'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format',
        category: 'audio',
        rating: 4.9,
        reviewCount: 789,
        inStock: true,
        isFeatured: false,
        isOnSale: false,
      },
      {
        name: 'Steam Deck',
        description: 'Portable Gaming PC',
        price: 649.99,
        imageUrl:
          'https://images.unsplash.com/photo-1616248304589-6a3d8d60ad7d?w=500&auto=format',
        category: 'gaming',
        rating: 4.7,
        reviewCount: 2345,
        inStock: false,
        isFeatured: false,
        isOnSale: false,
      },
      {
        name: 'Razer Kiyo Pro',
        description: 'High-Performance Webcam for Streaming',
        price: 199.99,
        oldPrice: 229.99,
        imageUrl:
          'https://images.unsplash.com/photo-1596774105710-8e3f98097d65?w=500&auto=format',
        category: 'accessories',
        rating: 4.4,
        reviewCount: 432,
        inStock: true,
        isFeatured: false,
        isOnSale: true,
      },
      {
        name: 'Focusrite Scarlett 2i2',
        description: 'USB Audio Interface',
        price: 169.99,
        imageUrl:
          'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format',
        category: 'audio',
        rating: 4.8,
        reviewCount: 2789,
        inStock: true,
        isFeatured: false,
        isOnSale: false,
      },
      {
        name: 'Lenovo Legion 5 Pro',
        description: '16" Gaming Laptop with RTX 3070',
        price: 1499.99,
        oldPrice: 1699.99,
        imageUrl:
          'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=500&auto=format',
        category: 'gaming',
        rating: 4.6,
        reviewCount: 567,
        inStock: true,
        isFeatured: false,
        isOnSale: true,
      },
      {
        name: 'Elgato Wave:3',
        description: 'Premium USB Condenser Microphone',
        price: 159.99,
        imageUrl:
          'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format',
        category: 'audio',
        rating: 4.5,
        reviewCount: 890,
        inStock: true,
        isFeatured: false,
        isOnSale: false,
      },
      {
        name: 'ASUS ROG Phone 7',
        description: 'Gaming Smartphone with 165Hz Display',
        price: 999.99,
        imageUrl:
          'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&auto=format',
        category: 'gaming',
        rating: 4.7,
        reviewCount: 345,
        inStock: true,
        isFeatured: false,
        isOnSale: false,
      },
      {
        name: 'Logitech G915 TKL',
        description: 'Wireless Mechanical Gaming Keyboard',
        price: 229.99,
        oldPrice: 249.99,
        imageUrl:
          'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=500&auto=format',
        category: 'gaming',
        rating: 4.6,
        reviewCount: 789,
        inStock: true,
        isFeatured: false,
        isOnSale: true,
      },
    ];

    for (const product of products) {
      await this.create(product);
    }

    return this.findAll();
  }
}
