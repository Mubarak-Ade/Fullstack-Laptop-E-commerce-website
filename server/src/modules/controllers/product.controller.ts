import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import Product from '../../models/Product.js';
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

