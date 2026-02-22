import Acer1 from '@/assets/Images/Acer/acer 1.jfif'
import Acer2 from '@/assets/Images/Acer/acer 2.jfif'
import Acer3 from '@/assets/Images/Acer/acer 3.png'

import Dell1 from '@/assets/Images/Dell/dell 1.jpg'
import Dell2 from '@/assets/Images/Dell/dell 2.jfif'
import Dell3 from '@/assets/Images/Dell/dell 3.jfif'
import Dell6 from '@/assets/Images/Dell/dell 6.jfif'

import Apple1 from '@/assets/Images/Apple/apple 1.png'
import Apple2 from '@/assets/Images/Apple/apple 2.png'
import Apple3 from '@/assets/Images/Apple/apple 3.png'
import Apple4 from '@/assets/Images/Apple/apple 4.png'
import type { Product } from './schema/product.schema';

export const Data: Product[] = [
  {
    _id: "seed-dell-1",
    name: "Dell Inspiron 16 Plus",
    brand: "Dell",
    stocks: 12,
    ratings: 4.5,
    numReviews: 38,
    price: 700,
    discountPrice: 650,
    images: [Dell1],
    isActive: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",

    screenSize: '16.0" - 1920x1200',
    cpu: "INTEL Ultra i9 185H",
    gpu: "INTEL Arc Graphics XE-cores",
    ram: "16 GB DDR5",
    storage: "512 GB SSD",
    os: "Windows 11 Home",
    battery: "8.1 - 8.6 h",
  },

  {
    _id: "seed-dell-2",
    name: "Dell Inspiron 14",
    brand: "Dell",
    stocks: 20,
    ratings: 4.3,
    numReviews: 24,
    price: 600,
    discountPrice: 570,
    images: [Dell2],
    isActive: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",

    screenSize: '14.0" - 1920x1200',
    cpu: "ARM-based Snapdragon X Plus",
    gpu: "Adreno GPU",
    ram: "16 GB DDR5",
    storage: "512 GB SSD",
    os: "Windows 11 Home",
    battery: "10.5 - 11.3 h",
  },

  {
    _id: "seed-dell-3",
    name: "Dell Inspiron 16 2-in-1",
    brand: "Dell",
    stocks: 8,
    ratings: 4.6,
    numReviews: 41,
    price: 750,
    discountPrice: 710,
    images: [Dell3],
    isActive: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",

    screenSize: '16.0" - 1920x1200',
    cpu: "INTEL Ultra i7 155H",
    gpu: "INTEL Iris XE 96 EU",
    ram: "16 GB DDR5",
    storage: "512 GB SSD",
    os: "Windows 11 Home",
    battery: "10.4 - 11.2 h",
  },

  {
    _id: "seed-dell-4",
    name: "Dell Latitude 15",
    brand: "Dell",
    stocks: 15,
    ratings: 4.4,
    numReviews: 19,
    price: 680,
    discountPrice: 640,
    images: [Dell6],
    isActive: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",

    screenSize: '15.6" - 1920x1080',
    cpu: "INTEL Ultra i7 155U",
    gpu: "INTEL Graphics XE-cores",
    ram: "32 GB DDR5",
    storage: "1024 GB SSD",
    os: "Windows 11 Pro",
    battery: "7.2 - 7.7 h",
  },

  {
    _id: "seed-apple-1",
    name: "MacBook Pro 14",
    brand: "Apple",
    stocks: 6,
    ratings: 4.8,
    numReviews: 112,
    price: 1259,
    discountPrice: 1199,
    images: [Apple1, Apple2, Apple3, Apple4],
    isActive: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",

    screenSize: '14.0" - 2560x1600',
    cpu: "Apple Silicon",
    gpu: "Apple GPU",
    ram: "16 GB Unified",
    storage: "512 GB SSD",
    os: "macOS",
    battery: "18 - 20 h",
  },

  {
    _id: "seed-acer-1",
    name: "Acer Swift X",
    brand: "Acer",
    stocks: 10,
    ratings: 4.2,
    numReviews: 27,
    price: 1259,
    discountPrice: 1200,
    images: [Acer1, Acer2, Acer3],
    isActive: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",

    screenSize: '14.0" - 2560x1600',
    cpu: "Snapdragon X Elite",
    gpu: "Adreno GPU",
    ram: "16 GB DDR5",
    storage: "512 GB SSD",
    os: "Windows 11 Pro",
    battery: "6 - 6.4 h",
  },
];
