import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  oldPrice: number;

  @Column()
  imageUrl: string;

  @Column()
  category: string;

  @Column('decimal', { precision: 3, scale: 1 })
  rating: number;

  @Column()
  reviewCount: number;

  @Column({ default: true })
  inStock: boolean;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ default: false })
  isOnSale: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 