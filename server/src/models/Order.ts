import mongoose, { InferSchemaType, Schema } from 'mongoose';

const OrderSchema = new Schema(
    {
        orderNumber: { type: String, index: true, unique: true, required: true },
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, sparse: true },
        products: [
            {
                productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
                productName: { type: String, required: true },
                quantity: { type: Number, required: true },
                image: { type: String },
                unitPriceAtPurchase: { type: Number, required: true },
            },
        ],
        subTotal: { type: Number, required: true },
        tax: { type: Number, required: true },
        total: { type: Number, required: true },
        shippingFee: { type: Number, required: true },
        shippingAddress: {
            fullName: { type: String, required: true },
            phone: { type: String, required: true },
            email: { type: String, required: true },
            state: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        status: {
            type: String,
            enum: ['PENDING_PAYMENT', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
            default: 'PENDING_PAYMENT',
            index: true,
        },
        paymentStatus: {
            type: String,
            enum: ['UNPAID', 'PENDING', 'PAID', 'FAILED'],
            default: 'UNPAID',
        },
        paymentProvider: {
            type: String,
            enum: ['FAKE', 'PAYSTACK'],
        },
        paymentReference: {
            type: String,
            index: true,
            unique: true,
            sparse: true,
        },
        paidAt: {
            type: Date,
        },
        isStockReduced: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export type OrderType = InferSchemaType<typeof OrderSchema>;

const Order = mongoose.model<OrderType>('Order', OrderSchema);
export default Order;
