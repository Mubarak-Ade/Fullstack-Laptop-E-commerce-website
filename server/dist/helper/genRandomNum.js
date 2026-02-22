import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);
export function generateOrderNumber() {
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, '');
    return `ORD-SH-${formattedDate}-${nanoid()}`;
}
