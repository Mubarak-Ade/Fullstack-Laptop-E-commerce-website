import { RequestHandler } from "express";
import { createProductService } from "../services/Product.js";
import Product from "../models/Product.js";
import { ProductIdSchema, ProductSchema } from "../schema/product.schema.js";
import createHttpError from "http-errors";

export const getProducts: RequestHandler = async ( req, res, next ): Promise<void> => {
  try {
    const product = await Product.find( {} ).lean();
    res.status( 200 ).json( product );
  } catch ( error ) {
    next( error );
  }
};

export const getSingleProduct: RequestHandler = async ( req, res, next ): Promise<void> => {
  try {
    const id = ProductIdSchema.parse( req.params.id );
    const product = await Product.findById( id ).lean();
    res.status( 200 ).json( product );
  } catch ( error ) {
    next( error );
  }
};
export const createProduct: RequestHandler = async ( req, res, next ): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[];
    const imagePaths = files.map( file => file.path );

    const parse = ProductSchema.safeParse( { ...req.body, images: imagePaths, price: Number( req.body.price ), discountPrice: Number( req.body.discountPrice ), stocks: Number( req.body.stocks ), specs: JSON.parse(req.body.specs) } );
    if ( !parse.success ) {
      throw createHttpError( 400, parse.error.flatten() );
    }
    const product = createProductService( parse.data );
    res.status( 201 ).json( { message: "Product created Successfully", product } );
  } catch ( error ) {
    next( error );
  }
};