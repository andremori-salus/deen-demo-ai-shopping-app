import { type User, type InsertUser, type Product, type InsertProduct } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.seedProducts();
  }

  private seedProducts() {
    const mockProducts: InsertProduct[] = [
      {
        name: "Wireless Noise-Canceling Headphones",
        shortDescription: "Premium sound quality with active noise cancellation",
        description: "Experience immersive audio with our premium wireless headphones featuring advanced active noise cancellation technology. 40-hour battery life, comfortable over-ear design, and crystal-clear sound for all your listening needs. Perfect for travel, work, or relaxation.",
        price: "299.99",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        category: "Electronics",
        stock: 45,
      },
      {
        name: "Minimalist Leather Wallet",
        shortDescription: "Slim, elegant design with RFID protection",
        description: "Crafted from premium full-grain leather, this minimalist wallet combines style and security. Features RFID-blocking technology to protect your cards, holds up to 8 cards and cash, and develops a beautiful patina over time. Available in classic black and rich brown.",
        price: "79.99",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
        category: "Accessories",
        stock: 120,
      },
      {
        name: "Stainless Steel Water Bottle",
        shortDescription: "24oz insulated bottle keeps drinks cold for 24 hours",
        description: "Stay hydrated in style with our double-walled stainless steel water bottle. Vacuum insulation keeps beverages cold for 24 hours or hot for 12 hours. Leak-proof lid, wide mouth for easy filling and cleaning, and fits most cup holders. BPA-free and eco-friendly.",
        price: "34.99",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
        category: "Home & Kitchen",
        stock: 200,
      },
      {
        name: "Smart Fitness Tracker Watch",
        shortDescription: "Track your health and fitness goals with precision",
        description: "Monitor your heart rate, sleep quality, steps, and calories with this advanced fitness tracker. Features GPS tracking, water resistance up to 50m, 7-day battery life, and seamless smartphone integration. Includes multiple sport modes and personalized coaching.",
        price: "149.99",
        image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80",
        category: "Electronics",
        stock: 85,
      },
      {
        name: "Organic Cotton T-Shirt",
        shortDescription: "Soft, sustainable, and stylish essential",
        description: "Made from 100% organic cotton, this premium t-shirt offers unmatched comfort and breathability. Classic fit with reinforced seams, pre-shrunk fabric, and eco-friendly dyes. Available in multiple colors. Perfect for everyday wear or layering.",
        price: "29.99",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        category: "Clothing",
        stock: 300,
      },
      {
        name: "Portable Bluetooth Speaker",
        shortDescription: "360° sound with deep bass and 12-hour battery",
        description: "Take your music anywhere with this compact yet powerful Bluetooth speaker. Delivers rich, immersive 360-degree sound with enhanced bass. Waterproof design (IPX7), built-in microphone for calls, and connects to multiple devices. Perfect for outdoor adventures.",
        price: "89.99",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
        category: "Electronics",
        stock: 150,
      },
      {
        name: "Ceramic Plant Pot Set",
        shortDescription: "Set of 3 modern planters with drainage",
        description: "Elevate your indoor garden with this beautiful set of three ceramic planters. Features drainage holes and matching saucers, smooth matte finish, and modern minimalist design. Perfect for succulents, herbs, or small houseplants. Adds style to any space.",
        price: "44.99",
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80",
        category: "Home & Kitchen",
        stock: 95,
      },
      {
        name: "Leather Laptop Messenger Bag",
        shortDescription: "Professional bag with padded laptop compartment",
        description: "Handcrafted from premium leather, this messenger bag combines classic style with modern functionality. Fits laptops up to 15 inches, multiple organizational pockets, adjustable shoulder strap, and durable brass hardware. Ages beautifully with use.",
        price: "189.99",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
        category: "Accessories",
        stock: 60,
      },
      {
        name: "Bamboo Cutting Board",
        shortDescription: "Extra-large board with juice groove",
        description: "Sustainable bamboo construction makes this cutting board both eco-friendly and durable. Extra-large surface (18x12 inches) with deep juice groove, naturally antimicrobial, gentle on knife edges, and easy to maintain. Includes hanging hole for convenient storage.",
        price: "39.99",
        image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
        category: "Home & Kitchen",
        stock: 180,
      },
      {
        name: "Running Shoes - Performance Edition",
        shortDescription: "Lightweight cushioning for all-day comfort",
        description: "Engineered for runners of all levels, these performance shoes feature responsive cushioning, breathable mesh upper, and durable rubber outsole. Provides excellent arch support and energy return with every stride. Available in multiple sizes and colors.",
        price: "129.99",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
        category: "Clothing",
        stock: 220,
      },
      {
        name: "Aromatic Candle Gift Set",
        shortDescription: "4 premium scented candles in luxury packaging",
        description: "Indulge in this curated collection of four hand-poured soy candles with unique fragrances: Lavender Dreams, Vanilla Bean, Ocean Breeze, and Sandalwood Noir. Each burns for 50+ hours, presented in elegant gift-ready packaging. Natural, non-toxic ingredients.",
        price: "64.99",
        image: "https://images.unsplash.com/photo-1602874801006-95415c52e90f?w=800&q=80",
        category: "Home & Kitchen",
        stock: 140,
      },
      {
        name: "Polarized Sunglasses",
        shortDescription: "UV protection with sleek modern design",
        description: "Shield your eyes in style with these premium polarized sunglasses. 100% UV protection, scratch-resistant lenses, and lightweight yet durable frame. Reduces glare for crystal-clear vision in bright conditions. Includes protective case and cleaning cloth.",
        price: "119.99",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
        category: "Accessories",
        stock: 175,
      },
    ];

    mockProducts.forEach((product) => {
      const id = randomUUID();
      this.products.set(id, { ...product, id } as Product);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { ...insertProduct, id } as Product;
    this.products.set(id, product);
    return product;
  }
}

export const storage = new MemStorage();
