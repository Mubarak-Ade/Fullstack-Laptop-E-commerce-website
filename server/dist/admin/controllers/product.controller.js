import { ProductIdSchema, ProductSchema, UpdateProductSchema, } from '../../modules/schema/product.schema.js';
import createHttpError from 'http-errors';
import ProductService from '../../modules/services/product.service.js';
export const getProducts = async (req, res, next) => {
    try {
        const product = await Product.find({}).lean();
        res.status(200).json(product);
    }
    catch (error) {
        next(error);
    }
};
export const createProduct = async (req, res, next) => {
    try {
        const parse = ProductSchema.safeParse(req.body);
        if (!parse.success) {
            console.error('Validation errors:', parse.error.flatten());
            throw createHttpError(400, parse.error.flatten());
        }
        const product = await ProductService.createProduct(parse.data, req.files);
        res.status(201).json({ message: 'Product created successfully', product });
    }
    catch (error) {
        next(error);
    }
};
export const updateProductController = async (req, res, next) => {
    const parse = UpdateProductSchema.safeParse(req.body);
    if (!parse.success) {
        console.error('Validation errors:', parse.error.flatten());
        throw createHttpError(400, parse.error.flatten());
    }
    try {
        const product = await ProductService.updateProduct({
            data: parse.data,
            files: req.files,
            productId: req.params.id,
        });
        res.status(200).json({ message: 'Product updated successfully', product });
    }
    catch (error) {
        next(error);
    }
};
export const deleteProductController = async (req, res, next) => {
    try {
        const { id } = ProductIdSchema.parse(req.params);
        await ProductService.deleteProduct(id);
        res.status(200).json({ success: true });
    }
    catch (error) {
        next(error);
    }
};
