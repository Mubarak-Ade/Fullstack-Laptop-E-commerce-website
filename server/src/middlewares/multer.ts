import multer from "multer";
import path from "path";

const storage = multer.diskStorage( {
    destination: ( _req, _file, cb ) => {
        cb( null, "uploads/products" );
    },
    filename: ( _req, file, cb ) => {
        const uniqueName = Date.now() + "-" + Math.round( Math.random() * 1e9 );
        cb( null, `${ uniqueName }${ path.extname( file.originalname ) }` );
    }
} );

export const upload = multer({
    storage, 
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (_req, file, cb) => {
        
        cb(null, true)
    }
})