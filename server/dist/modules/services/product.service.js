import createHttpError from 'http-errors';
import Product from '../../models/Product.js';
import { parseProductQuery } from '../../utils/product-query.js';
class ProductService {
    static async getProducts(query) {
        const { page, limit, filter, sort } = parseProductQuery(query);
        const [product, total] = await Promise.all([
            Product.find(filter)
                .sort(sort)
                .skip((page - 1) * limit)
                .limit(limit)
                .lean(),
            Product.countDocuments(filter),
        ]);
        return {
            product,
            page,
            pages: Math.ceil(total / limit),
            total,
            limit,
        };
    }
    static async getProductDetail(param) {
        const product = await Product.findOne({ slug: param }).lean();
        if (!product) {
            throw createHttpError(404, 'Product is Not Found');
        }
        return product;
    }
    static async getSingleProduct(id) {
        const product = await Product.findById(id).lean();
        if (!product) {
            throw createHttpError(404, 'Product is Not Found');
        }
        return product;
    }
}
export default ProductService;
