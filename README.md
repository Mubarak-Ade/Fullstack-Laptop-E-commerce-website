# Laptop Ecommerce Website

Full-stack laptop ecommerce application with:
- Customer storefront (search, product details, cart, checkout)
- Authentication and user dashboard
- Admin dashboard for product and order management
- Express + MongoDB API with Cloudinary image upload support

## Tech Stack

- Frontend: React 19, TypeScript, Vite, Tailwind CSS, React Router, TanStack Query, Zustand
- Backend: Node.js, Express 5, TypeScript, Mongoose, Zod
- Database: MongoDB
- Media: Cloudinary

## Project Structure

```text
.
├── client/    # Vite + React frontend
└── server/    # Express + TypeScript backend
```

## Prerequisites

- Node.js 18+ (Node.js 20+ recommended)
- npm
- MongoDB running locally or a remote MongoDB URI
- Cloudinary account credentials

## Environment Variables

### Client (`client/.env`)

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

### Server (`server/.env`)

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/shina-store
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

## Installation

Install dependencies in each app:

```bash
cd client && npm install
cd ../server && npm install
```

## Run Locally

Start backend:

```bash
cd server
npm run dev
```

Start frontend (new terminal):

```bash
cd client
npm run dev
```

Default URLs:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`
- Health check: `http://localhost:4000/health`

## Available Scripts

### Client (`client/package.json`)

- `npm run dev` - Start Vite dev server
- `npm run build` - Type-check and build production bundle
- `npm run lint` - Run ESLint
- `npm run format` - Run Prettier on `src`

### Server (`server/package.json`)

- `npm run dev` - Start backend with nodemon
- `npm run build` - Compile TypeScript to `dist`
- `npm run start` - Run compiled server from `dist`
- `npm run migrate:orders` - Run TypeScript order migration script
- `npm run migrate:orders:js` - Run JavaScript order migration script

## API Overview

Base URL: `http://localhost:4000/api`

- `/api/user` - User auth/profile routes
- `/api/product` - Product listing/details routes
- `/api/cart` - Cart routes
- `/api/order` - Order routes (requires auth)
- `/api/payment` - Payment routes (requires auth)
- `/api/admin` - Admin routes

## Notes

- Payment flow in the current server uses fake payment endpoints (`/api/payment/fake/*`) for local testing.
- `server/src/env.ts` validates required env vars at startup, so missing values will prevent the server from booting.
- If real credentials were committed in `.env`, rotate them before deploying.
