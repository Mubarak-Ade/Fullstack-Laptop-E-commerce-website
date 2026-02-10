import multer from 'multer';
import path from 'path';

const storage = (folder: string) =>
    multer.diskStorage({
        destination: (_req, _file, cb) => {
            cb(null, `uploads/${folder}`);
        },
        filename: (_req, file, cb) => {
            const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            cb(null, `${uniqueName}${path.extname(file.originalname)}`);
        },
    });

export const upload = (folder: string) => multer({
    storage: storage(folder),
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp/;
        const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        cb(null, isValid);
    },
});
