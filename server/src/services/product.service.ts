import { RequestHandler } from 'express';
import Product from '../models/Product.js';
import createHttpError from 'http-errors';
import {
    Product as CreateProductDTO,
    ProductIdSchema,
    ProductSlugSchema,
    UpdateProductDTO,
} from '../schema/product.schema.js';
import path from 'path';
import fs from 'fs';

interface UpdateState {
    data: UpdateProductDTO;
    files?: Express.Multer.File[];
    productId: string | string[];
}
class ProductService {
    static async createProduct(data: CreateProductDTO, files: Express.Multer.File[]) {
        if (files.length > 5) {
            throw createHttpError(400, 'Maximum of 5 files allowed');
        }
        if (!files || files.length === 0) {
            throw createHttpError(400, 'At least one product image is required');
        }

        const imagePaths = files.map(file => file.path);
        const { name, brand, price, discountPrice, stocks } = data;

        if (discountPrice && discountPrice >= price) {
            throw createHttpError(400, 'Discount price must be less than original price');
        }

        if (stocks && stocks < 0) {
            throw createHttpError(400, 'Stock cannot be less than zero');
        }

        const existProduct = await Product.findOne({ name, brand });

        if (existProduct) {
            throw createHttpError(400, 'Product already exist');
        }

        const product = new Product({ ...data, images: imagePaths });

        await product.save();

        return product;
    }

    static async getProductDetail(param: string) {
        const product = await Product.findOne({ slug: param }).lean();
        if (!product) {
            throw createHttpError(404, 'Product is Not Found');
        }
        return product;
    }

    static async getSingleProduct(id: string) {
        const product = await Product.findById(id).lean();
        if (!product) {
            throw createHttpError(404, 'Product is Not Found');
        }
        return product;
    }

    static async deleteProduct(param: string) {
        const product = await Product.findByIdAndDelete(param);
        if (!product) {
            throw createHttpError(404, 'Product is Not Found');
        }
        return product;
    }

    static async updateProduct({ data, files, productId }: UpdateState) {
        const product = await Product.findById(productId);

        if (!product) {
            throw createHttpError(404, 'Product is Not Found');
        }

        if (data.removedImage) {
            product.images = product.images.filter(img => !data.removedImage?.includes(img));
            data.removedImage.forEach(image => {
                const filePath = path.join('uploads', image);
                fs.existsSync(filePath) && fs.unlinkSync(filePath);
            });
        }

        if (files?.length) {
            const newImage = files.map(file => file.filename);
            product.images.push(...newImage);
        }

        Object.assign(product, data);
        await product.save();
        return product;
    }
}
export default ProductService;
