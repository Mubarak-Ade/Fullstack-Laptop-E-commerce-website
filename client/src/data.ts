import Acer1 from '@/assets/Images/Acer/acer 1.jfif'
import Acer2 from '@/assets/Images/Acer/acer 2.jfif'
import Acer3 from '@/assets/Images/Acer/acer 3.png'

import Dell1 from '@/assets/Images/Dell/dell 1.jpg'
import Dell2 from '@/assets/Images/Dell/dell 2.jfif'
import Dell3 from '@/assets/Images/Dell/dell 3.jfif'
import Dell4 from '@/assets/Images/Dell/dell 4.jfif'
import Dell5 from '@/assets/Images/Dell/dell 5.jfif'
import Dell6 from '@/assets/Images/Dell/dell 6.jfif'

import Hp1 from '@/assets/Images/Hp/hp 1.jfif'
import Hp2 from '@/assets/Images/Hp/hp 2.jfif'
import Hp3 from '@/assets/Images/Hp/hp 3.jfif'
import Hp4 from '@/assets/Images/Hp/hp 4.jfif'
import Hp5 from '@/assets/Images/Hp/hp 5.jfif'
import Hp6 from '@/assets/Images/Hp/hp 6.jfif'

import Samsung1 from '@/assets/Images/Samsung/samsung 1.jfif'
import Samsung2 from '@/assets/Images/Samsung/samsung 2.jfif'
import Samsung3 from '@/assets/Images/Samsung/samsung 3.jfif'
import Samsung4 from '@/assets/Images/Samsung/samsung 4.jfif'
import Samsung5 from '@/assets/Images/Samsung/samsung 5.jfif'
import Samsung6 from '@/assets/Images/Samsung/samsung 6.jfif'

import Lenovo1 from '@/assets/Images/Lenovo/lenovo 1.jfif'
import Lenovo2 from '@/assets/Images/Lenovo/lenovo 2.jfif'
import Lenovo3 from '@/assets/Images/Lenovo/lenovo 3.jfif'
import Lenovo4 from '@/assets/Images/Lenovo/lenovo 2.jfif'
import Lenovo5 from '@/assets/Images/Lenovo/lenovo 5.jfif'

import Apple1 from '@/assets/Images/Apple/apple 1.png'
import Apple2 from '@/assets/Images/Apple/apple 2.png'
import Apple3 from '@/assets/Images/Apple/apple 3.png'
import Apple4 from '@/assets/Images/Apple/apple 4.png'
import type { Product } from './schema/product.schema';

export const Data: Product[] = [
  {
    name: "Dell Inspiron 16 Plus",
    brand: "Dell",
    stocks: 12,
    rating: 4.5,
    numReviews: 38,
    price: "$700",
    discountPrice: "$650",
    image: [Dell1],

    specs: {
      screenSize: '16.0" - 1920x1200',
      cpu: "INTEL Ultra i9 185H",
      gpu: "INTEL Arc Graphics XE-cores",
      ram: "16 GB DDR5",
      storage: "512 GB SSD",
      os: "Windows 11 Home",
      battery: "8.1 - 8.6 h",
    },
  },

  {
    name: "Dell Inspiron 14",
    brand: "Dell",
    stocks: 20,
    rating: 4.3,
    numReviews: 24,
    price: "$600",
    discountPrice: "$570",
    image: [Dell2],

    specs: {
      screenSize: '14.0" - 1920x1200',
      cpu: "ARM-based Snapdragon X Plus",
      gpu: "Adreno GPU",
      ram: "16 GB DDR5",
      storage: "512 GB SSD",
      os: "Windows 11 Home",
      battery: "10.5 - 11.3 h",
    },
  },

  {
    name: "Dell Inspiron 16 2-in-1",
    brand: "Dell",
    stocks: 8,
    rating: 4.6,
    numReviews: 41,
    price: "$750",
    discountPrice: "$710",
    image: [Dell3],

    specs: {
      screenSize: '16.0" - 1920x1200',
      cpu: "INTEL Ultra i7 155H",
      gpu: "INTEL Iris XE 96 EU",
      ram: "16 GB DDR5",
      storage: "512 GB SSD",
      os: "Windows 11 Home",
      battery: "10.4 - 11.2 h",
    },
  },

  {
    name: "Dell Latitude 15",
    brand: "Dell",
    stocks: 15,
    rating: 4.4,
    numReviews: 19,
    price: "$680",
    discountPrice: "$640",
    image: [Dell6],

    specs: {
      screenSize: '15.6" - 1920x1080',
      cpu: "INTEL Ultra i7 155U",
      gpu: "INTEL Graphics XE-cores",
      ram: "32 GB DDR5",
      storage: "1024 GB SSD",
      os: "Windows 11 Pro",
      battery: "7.2 - 7.7 h",
    },
  },

  {
    name: "MacBook Pro 14",
    brand: "Apple",
    stocks: 6,
    rating: 4.8,
    numReviews: 112,
    price: "$1259",
    discountPrice: "$1199",
    image: [Apple1, Apple2, Apple3, Apple4],

    specs: {
      screenSize: '14.0" - 2560x1600',
      cpu: "Apple Silicon",
      gpu: "Apple GPU",
      ram: "16 GB Unified",
      storage: "512 GB SSD",
      os: "macOS",
      battery: "18 - 20 h",
    },
  },

  {
    name: "Acer Swift X",
    brand: "Acer",
    stocks: 10,
    rating: 4.2,
    numReviews: 27,
    price: "$1259",
    discountPrice: "$1200",
    image: [Acer1, Acer2, Acer3],

    specs: {
      screenSize: '14.0" - 2560x1600',
      cpu: "Snapdragon X Elite",
      gpu: "Adreno GPU",
      ram: "16 GB DDR5",
      storage: "512 GB SSD",
      os: "Windows 11 Pro",
      battery: "6 - 6.4 h",
    },
  },
];
