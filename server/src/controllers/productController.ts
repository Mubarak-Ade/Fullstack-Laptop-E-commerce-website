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
export const createProduct: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[];
    
    // Add logging to debug
    console.log("Request body:", req.body);
    console.log("Files:", files);
    console.log("Specs string:", req.body.specs);
    
    if (!files || files.length === 0) {
      throw createHttpError(400, "At least one product image is required");
    }

    const imagePaths = files.map(file => file.path);

    // Check if specs exists before parsing

    const parse = ProductSchema.safeParse({...req.body, price: Number(req.body.price), discountPrice: Number(req.body.discountPrice), stocks: Number(req.body.stocks), images: imagePaths});

    if (!parse.success) {
      console.error("Validation errors:", parse.error.flatten());
      throw createHttpError(400, parse.error.flatten());
    }

    const product = await createProductService(parse.data);
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    next(error);
  }
};