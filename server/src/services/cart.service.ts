import createHttpError from 'http-errors';
import { CartItem } from '../schema/cart.schema.js';
import Cart, { PopulatedCart, Cart as CartDocument } from '../models/Cart.js';
import Product from '../models/Product.js';

export class CartService {
    /* ---------------- GET CART ---------------- */
    static async getUserCart(guestId: string): Promise<PopulatedCart> {
        const cart = (await Cart.findOne({ guestId })
            .populate({
                path: 'items.product',
                select: 'name images storage ram cpu price',
            })
            .lean()) as PopulatedCart | null;

        if (!cart) {
            throw createHttpError(404, 'Cart not found');
        }

        // Keep only the first image per product
        cart.items.forEach(item => {
            const images = item.product?.images;
            if (images?.length) {
                item.product.images = [images[0]];
            }
        });

        return cart;
    }

    /* ---------------- ADD TO CART ---------------- */
    static async addToCart(data: CartItem, userId?: string) {
        const { productId, quantity = 1, guestId } = data;

        if (!productId) {
            throw createHttpError(400, 'Product ID is required');
        }

        let cart;

        if (userId) {
            cart = await Cart.findOne({ user: userId });
        } else {
            if (!guestId) {
                throw createHttpError(400, 'Guest ID is required for guest users');
            }
            cart = await Cart.findOne({ guestId });
        }

        if (!cart) {
            cart = new Cart({ guestId, items: [] });
        }

        const product = await Product.findById(productId);
        if (!product) {
            throw createHttpError(404, 'Product not found');
        }

        const currentPrice = product.discountPrice
            ? product.price - product.discountPrice
            : product.price;

        const existingIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (existingIndex > -1) {
            cart.items[existingIndex].quantity += quantity;
        } else {
            cart.items.push({
                product: productId,
                quantity,
                price: currentPrice,
            });
        }

        this.recalculateCart(cart);

        await cart.save();
        return cart;
    }

    /* ---------------- UPDATE CART ITEM ---------------- */
    static async updateItem({
        guestId,
        productId,
        quantity,
    }: {
        guestId: string;
        productId: string;
        quantity: number;
    }) {
        const cart = await Cart.findOne({ guestId });
        if (!cart) throw createHttpError(404, 'Cart not found');

        const index = cart.items.findIndex(item => item.product.toString() === productId);

        if (index === -1) {
            throw createHttpError(404, 'Item not found');
        }

        cart.items[index].quantity = quantity;

        this.recalculateCart(cart);

        await cart.save();
        return cart;
    }

    /* ---------------- DELETE CART ITEM ---------------- */
    static async deleteItem(guestId: string, productId: string) {
        const cart = await Cart.findOne({ guestId });
        if (!cart) throw createHttpError(404, 'Cart not found');

        const index = cart.items.findIndex(item => item.product.toString() === productId);

        if (index === -1) {
            throw createHttpError(404, 'Item not found');
        }

        cart.items.splice(index, 1);

        this.recalculateCart(cart);

        await cart.save();
        return cart;
    }

    /* ---------------- SHARED LOGIC ---------------- */
    private static recalculateCart(cart: CartDocument) {
        cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
}
