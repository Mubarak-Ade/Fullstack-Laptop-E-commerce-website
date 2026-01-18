import { RequestHandler } from "express";
import Product from "../models/Product.js";
import createHttpError from "http-errors";
import { Product as CreateProductDTO } from "../schema/product.schema.js";

export const createProductService = async ( data: CreateProductDTO ) => {
    const { name, brand, price, discountPrice, images, specs, stocks } = data;

    if ( discountPrice && discountPrice >= price ) {
        throw createHttpError( 400, "Discount price must be less than original price" );
    }

    if ( stocks < 0 ) {
        throw createHttpError( 400, "Stock cannot be less than zero" );
    }

    if (!images || images.length === 0) {
        throw createHttpError(400, "Product images are required")
    }

    if(images.length > 5) {
        throw createHttpError(400, "Maximum of 5 images allowed")
    }

    const existProduct = await Product.findOne( { name, brand } );

    if ( existProduct ) {
        throw createHttpError( 400, "Product already exist" );
    }

    const product = await Product.create( data );

    return product;
};
