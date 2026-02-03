import createHttpError from 'http-errors';
import { CartItem } from '../schema/cart.schema.js';
import Cart, { PopulatedCart, Cart as CartDocument } from '../models/Cart.js';
import Product, { Product as ProductType } from '../models/Product.js';
import { PopulateOption } from 'mongoose';

type UserType = { type: 'user'; userId: string } | { type: 'guest'; guestId: string };
class CartService {
    /* ---------------- GET CART ---------------- */
    static async getUserCart(identity: UserType) {
        const cart = (await this.findCartByIdentity(identity)
            ?.populate({
                path: 'items.product',
                select: 'name images storage ram cpu price',
            })
            .lean()
            .exec()) as PopulatedCart | null;

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
    static async addToCart(data: CartItem, identity: UserType) {
        const { productId, quantity = 1 } = data;

        if (!productId) {
            throw createHttpError(400, 'Product ID is required');
        }

        let cart = await this.findCartByIdentity(identity);

        
        if (!cart) {
            cart = identity.type === "user"
            ? cart = new Cart({ user: identity.userId, items: [] }) 
            : cart = new Cart({ guestId: identity.guestId, items: [] })
        }

        const product = await Product.findById(productId);
        if (!product) {
            throw createHttpError(404, 'Product not found');
        }

        const price = this.getProductPrice(product);

        const existingIndex = this.getItemIndex(cart, productId);

        if (existingIndex > -1) {
            cart.items[existingIndex].quantity += quantity;
        } else {
            cart.items.push({
                product: productId,
                quantity,
                price,
            });
        }

        this.recalculateCart(cart);

        await cart.save();
        return cart;
    }

    /* ---------------- UPDATE CART ITEM ---------------- */
    static async updateItem({
        identity,
        productId,
        quantity,
    }: {
        identity: UserType;
        productId: string;
        quantity: number;
    }) {
        const cart = await this.findCartByIdentity(identity);
        if (!cart) throw createHttpError(404, 'Cart not found');

        const index = this.getItemIndex(cart, productId);

        if (index === -1) {
            throw createHttpError(404, 'Item not found');
        }

        cart.items[index].quantity = quantity;

        this.recalculateCart(cart);

        await cart.save();
        return cart;
    }

    /* ---------------- DELETE CART ITEM ---------------- */
    static async deleteItem(identity: UserType, productId: string) {
        const cart = await this.findCartByIdentity(identity);
        if (!cart) throw createHttpError(404, 'Cart not found');

        const index = this.getItemIndex(cart, productId);

        if (index === -1) {
            throw createHttpError(404, 'Item not found');
        }

        cart.items.splice(index, 1);

        this.recalculateCart(cart);

        await cart.save();
        return cart;
    }

    static async mergeCart(guestId: string, userId: string) {
        const guestCart = await Cart.findOne({ guestId });
        if (!guestCart || guestCart.items.length === 0) return null;

        let userCart = await Cart.findOne({ user: userId });

        if (!userCart) {
            userCart = new Cart({ user: userId, items: [] });
        }

        for (const guestItem of guestCart.items) {
            const productId = guestItem.product.toString();

            const product = await Product.findById(productId);

            if (!product) continue;

            const price = this.getProductPrice(product);

            const existingIndex = this.getItemIndex(userCart, productId);

            if (existingIndex >= 0) {
                userCart.items[existingIndex].quantity += guestItem.quantity;
            } else {
                userCart.items.push({
                    product: productId,
                    quantity: guestItem.quantity,
                    price,
                });
            }
        }
        this.recalculateCart(userCart);

        await userCart.save();
        await Cart.deleteOne({ guestId });

        return userCart;
    }

    /* ---------------- SHARED LOGIC ---------------- */

    private static findCartByIdentity(identity: UserType) {
        if (identity.type === 'user') {
            return Cart.findOne({ user: identity.userId });
        } else {
            return Cart.findOne({ guestId: identity.guestId });
        }
    }

    private static recalculateCart(cart: CartDocument) {
        cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    private static getProductPrice(product: ProductType) {
        const currentPrice = product.discountPrice
            ? product.price - product.discountPrice
            : product.price;
        return currentPrice;
    }

    private static getItemIndex(cart: CartDocument, productId: string) {
        const index = cart.items.findIndex(item => item.product.toString() === productId);
        return index;
    }
}

export default CartService;
