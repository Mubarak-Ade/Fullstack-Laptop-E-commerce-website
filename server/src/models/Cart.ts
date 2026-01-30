import mongoose, { InferSchemaType, model, Schema } from 'mongoose';
import type { Product } from './Product.js';

const CartItemSchema = new Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
            min: 1,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    { _id: false }
);

const CartSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false,
            default: undefined,
        },
        guestId: {
            type: String,
            required: false,
            default: undefined,
        },
        items: [CartItemSchema],
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        totalItems: {
            type: Number,
            required: true,
            default: 0,
        },
        status: {
            type: String,
            enum: ['active', 'completed', 'cancelled'],
            default: 'active',
        },
    },
    { timestamps: true }
);

CartSchema.index(
    { user: 1 },
    { unique: true, partialFilterExpression: { user: { $exists: true } } }
);

/**
 * One cart per guest
 */
CartSchema.index(
    { guestId: 1 },
    { unique: true, partialFilterExpression: { guestId: { $exists: true } } }
);
export type Cart = InferSchemaType<typeof CartSchema>;

export type PopulatedCart = Omit<Cart, 'items'> & {
    items: Array<{
        product: Product;
        quantity: number,
        price: number
    }>
}

const Cart = model<Cart>('Cart', CartSchema);

export default Cart;
