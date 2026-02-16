import { RequestHandler } from 'express';
import {
    ProductIdSchema,
    ProductSchema,
    UpdateProductSchema,
} from '../../modules/schema/product.schema.js';
import createHttpError from 'http-errors';
import ProductService from '../../modules/services/product.service.js';

export const getProducts: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const product = await Product.find({}).lean();
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

export const createProduct: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const parse = ProductSchema.safeParse(req.body);

        if (!parse.success) {
            console.error('Validation errors:', parse.error.flatten());
            throw createHttpError(400, parse.error.flatten());
        }
        const product = await ProductService.createProduct(
            parse.data,
            req.files as Express.Multer.File[]
        );
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        next(error);
    }
};

export const updateProductController: RequestHandler = async (req, res, next): Promise<void> => {
    const parse = UpdateProductSchema.safeParse(req.body);

    if (!parse.success) {
        console.error('Validation errors:', parse.error.flatten());
        throw createHttpError(400, parse.error.flatten());
    }
    try {
        const product = await ProductService.updateProduct({
            data: parse.data,
            files: req.files as Express.Multer.File[],
            productId: req.params.id,
        });
        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        next(error);
    }
};

export const deleteProductController: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const { id } = ProductIdSchema.parse(req.params);
        await ProductService.deleteProduct(id);
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};
