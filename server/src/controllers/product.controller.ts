import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import Product from '../models/Product.js';
import {
    ProductIdSchema,
    ProductSchema,
    ProductSlugSchema,
    UpdateProductSchema,
} from '../schema/product.schema.js';
import ProductService from '../services/product.service.js';

export const getProducts: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const product = await Product.find({}).lean();
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

export const getProductDetail: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const { slug } = ProductSlugSchema.parse(req.params);
        const product = await ProductService.getProductDetail(slug);
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

export const getSingleProduct: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const { id } = ProductIdSchema.parse(req.params);
        const product = await ProductService.getSingleProduct(id);
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

export const createProduct: RequestHandler = async (req, res, next): Promise<void> => {
    console.log('request body', req.body);
    console.log('request files', req.files);
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
