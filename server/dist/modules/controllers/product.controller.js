import { ProductIdSchema, ProductSlugSchema, } from '../../admin/schema/product.schema.js';
import ProductService from '../services/product.service.js';
export const getProducts = async (req, res, next) => {
    try {
        const product = await ProductService.getProducts(req.query);
        res.status(200).json(product);
    }
    catch (error) {
        next(error);
    }
};
export const getProductDetail = async (req, res, next) => {
    try {
        const { slug } = ProductSlugSchema.parse(req.params);
        const product = await ProductService.getProductDetail(slug);
        res.status(200).json(product);
    }
    catch (error) {
        next(error);
    }
};
export const getSingleProduct = async (req, res, next) => {
    try {
        const { id } = ProductIdSchema.parse(req.params);
        const product = await ProductService.getSingleProduct(id);
        res.status(200).json(product);
    }
    catch (error) {
        next(error);
    }
};
