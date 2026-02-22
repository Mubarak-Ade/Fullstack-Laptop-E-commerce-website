import mongoose, { Schema } from 'mongoose';
const OrderSchema = new Schema({
    orderNumber: { type: String, index: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', require: true, sparse: true },
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
    shippingMethod: { type: String, required: true },
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
    },
    paymentProvider: {
        type: String,
        enum: ['FAKE', 'PAYSTACK']
    },
    paymentReference: {
        type: String,
        index: true
    },
    paidAt: {
        type: Date
    }
}, { timestamps: true });
const Order = mongoose.model('Order', OrderSchema);
export default Order;
