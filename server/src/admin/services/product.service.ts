import createHttpError from 'http-errors';
import Product, { Product as ProductType } from '../../models/Product.js';
import {
    Product as CreateProductDTO,
    UpdateProductDTO,
} from '../schema/product.schema.js';
import path from 'path';
import fs from 'fs';
import { parseProductQuery } from '../../utils/product-query.js';
import cloudinary from '../../config/cloudinary.js';

interface UpdateState {
    data: UpdateProductDTO;
    files?: Express.Multer.File[];
    productId: string | string[];
}

class ProductService {
    static async getProducts(query: any) {
        const { page, limit, filter, sort } = parseProductQuery(query);

        const [product, total] = await Promise.all([
            Product.find(filter).sort(sort).skip((page - 1) * limit).limit(limit).lean(),
            Product.countDocuments(filter),
        ]);
        return { product, page, pages: Math.ceil(total / limit), total, limit };
    }
    static async createProduct(data: CreateProductDTO, files: Express.Multer.File[]) {
        if (files.length > 5) {
            throw createHttpError(400, 'Maximum of 5 files allowed');
        }
        if (!files || files.length === 0) {
            throw createHttpError(400, 'At least one product image is required');
        }

        const imagePaths = files.map(file => ({ url: file.path, public_id: file.filename }));
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

    static async deleteProduct(param: string) {
        const product = await Product.findById(param);
        if (!product) {
            throw createHttpError(404, 'Product is Not Found');
        }
        for (const image of product.images) {
            await cloudinary.uploader.destroy(image.public_id as string);
        }
        await product.deleteOne();
        return product;
    }

    static async updateProduct({ data, files, productId }: UpdateState) {
        const product = await Product.findById(productId);

        if (!product) {
            throw createHttpError(404, 'Product is Not Found');
        }

        if (data.removedImage) {
            const imageToRemove = product.images.filter(img => data.removedImage?.includes(img.public_id as string));
            for (const image of imageToRemove) {
                await cloudinary.uploader.destroy(image.public_id as string);
            }
            product.images = product.images.filter(img => !data.removedImage?.includes(img.public_id as string)) as ProductType['images'];
        }

        if (files?.length) {
            const newImage = files.map(file => ({ url: file.path, public_id: file.filename }));
            product.images.push(...newImage);
        }

        Object.assign(product, data);
        await product.save();
        return product;
    }
}

export default ProductService;
