import slugify from "@sindresorhus/slugify";
import { InferSchemaType, model, Schema } from "mongoose";

const ProductSchema = new Schema( {
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
    required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountPrice: {
        type: Number
    },
    specs: {
        _id: false,
        ram:  String,
        storage: String,
        cpu: String,
        gpu: String,
        screenSize: String,
        battery: String
    },
    images: { 
        type: [ String ],
        default: []
    },
    stocks: {
        type: Number,
        default: 0,
        min: 0
    },
    ratings: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    numReviews: {
        type: Number,
        default: 0
    },
    slug: {
        type: String,
        unique: true,
        index: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true } );


type Product = InferSchemaType<typeof ProductSchema>;

ProductSchema.pre( 'save', function ()
{
    // Generate slug for category name
    if ( this.isModified( 'name' ) || this.isNew )
    {
        this.slug = slugify( this.name, {
            lowercase: true,
        } );
    }
} )

const Product = model<Product>( "Product", ProductSchema );

export default Product;