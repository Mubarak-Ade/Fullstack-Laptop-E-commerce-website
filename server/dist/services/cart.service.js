import createHttpError from 'http-errors';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
class CartService {
    /* ---------------- GET CART ---------------- */
    static async getUserCart(identity) {
        const cart = (await this.findCartByIdentity(identity)
            ?.populate({
            path: 'items.product user',
            select: 'name images storage ram cpu price email',
        })
            .lean()
            .exec());
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
    static async addToCart(data, identity) {
        const { productId, quantity = 1 } = data;
        if (!productId) {
            throw createHttpError(400, 'Product ID is required');
        }
        let cart = await this.findCartByIdentity(identity);
        if (!cart) {
            cart =
                identity.type === 'user'
                    ? (cart = new Cart({ user: identity.userId, items: [] }))
                    : (cart = new Cart({ guestId: identity.guestId, items: [] }));
        }
        const product = await Product.findById(productId);
        if (!product) {
            throw createHttpError(404, 'Product not found');
        }
        const price = this.getProductPrice(product);
        const existingIndex = this.getItemIndex(cart, productId);
        const inStock = this.stockStatus(product.stocks, quantity);
        if (existingIndex > -1) {
            if (inStock)
                return (cart.items[existingIndex].quantity += quantity);
        }
        else {
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
    static async updateItem({ identity, productId, quantity, }) {
        const cart = await this.findCartByIdentity(identity);
        if (!cart)
            throw createHttpError(404, 'Cart not found');
        const product = await Product.findById(productId);
        const index = this.getItemIndex(cart, productId);
        if (index === -1) {
            throw createHttpError(404, 'Item not found');
        }
        const inStock = product && this.stockStatus(product.stocks, quantity);
        if (inStock) {
            cart.items[index].quantity = quantity;
        }
        this.recalculateCart(cart);
        await cart.save();
        return cart;
    }
    /* ---------------- DELETE CART ITEM ---------------- */
    static async deleteItem(identity, productId) {
        const cart = await this.findCartByIdentity(identity);
        if (!cart)
            throw createHttpError(404, 'Cart not found');
        const index = this.getItemIndex(cart, productId);
        if (index === -1) {
            throw createHttpError(404, 'Item not found');
        }
        cart.items.splice(index, 1);
        this.recalculateCart(cart);
        await cart.save();
        return cart;
    }
    static async mergeCart(guestId, userId) {
        try {
            const guestCart = await Cart.findOne({ guest: guestId });
            if (!guestCart || guestCart.items.length === 0)
                return null;
            let userCart = await Cart.findOne({ user: userId });
            if (!userCart) {
                userCart = new Cart({ user: userId, items: [] });
            }
            for (const guestItem of guestCart.items) {
                const productId = guestItem.product.toString();
                const product = await Product.findById(productId);
                const price = product && this.getProductPrice(product);
                const existingIndex = this.getItemIndex(userCart, productId);
                if (existingIndex >= 0) {
                    userCart.items[existingIndex].quantity += guestItem.quantity;
                }
                else {
                    userCart.items.push({
                        product: productId,
                        quantity: guestItem.quantity,
                        price,
                    });
                }
            }
            this.recalculateCart(userCart);
            await userCart.save();
            await Cart.deleteOne({ guest: guestId });
            return userCart;
        }
        catch (error) {
            console.error(error);
        }
    }
    static async CheckoutSnapShot(identity) {
        const cart = await this.findCartByIdentity(identity);
        if (!cart)
            throw createHttpError(404, 'Cart Not Found');
        let checkoutItems = [];
        const productIds = cart.items?.map(item => item.product.toString());
        const products = await Product.find({ _id: { $in: productIds } });
        for (const items of cart.items) {
            const productId = items.product.toString();
            const product = products.find(p => p._id.toString() === productId);
            if (!product) {
                throw createHttpError(404, `Product with ID ${productId} not found`);
            }
            if (product.stocks === 0 || product.stocks < items.quantity) {
                throw createHttpError(400, 'Out of Stocks');
            }
            const price = this.getProductPrice(product);
            checkoutItems.push({
                productId,
                name: product.name,
                image: product.images[0],
                unitPriceAtCheckout: price,
                quantity: items.quantity,
            });
        }
        const subTotal = checkoutItems.reduce((sum, item) => sum + item.unitPriceAtCheckout * item.quantity, 0);
        ;
        const tax = subTotal * 0.12;
        const total = subTotal + tax;
        return { items: checkoutItems, subTotal, shipping: 0, tax, total };
    }
    /* ---------------- SHARED LOGIC ---------------- */
    static stockStatus(stocks, quantity) {
        let inStock = false;
        if (quantity <= stocks) {
            return (inStock = true);
        }
        else {
            inStock = false;
            throw createHttpError(400, 'Out of Stocks');
        }
    }
    static findCartByIdentity(identity) {
        if (identity.type === 'user') {
            return Cart.findOne({ user: identity.userId });
        }
        else {
            return Cart.findOne({ guestId: identity.guestId });
        }
    }
    static recalculateCart(cart) {
        cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
    static getProductPrice(product) {
        const currentPrice = product.discountPrice
            ? product.price - product.discountPrice
            : product.price;
        return currentPrice;
    }
    static getItemIndex(cart, productId) {
        const index = cart.items.findIndex(item => item.product.toString() === productId);
        return index;
    }
    static async clearCart(userId, session) {
        const cartQuery = Cart.findOne({ user: userId });
        if (session) {
            cartQuery.session(session);
        }
        const cart = await cartQuery;
        if (!cart) {
            throw createHttpError(404, "Cart Not Found");
        }
        cart.items.length = 0;
        cart.totalPrice = 0;
        cart.totalItems = 0;
        await cart.save({ session });
        return cart;
    }
}
export default CartService;
