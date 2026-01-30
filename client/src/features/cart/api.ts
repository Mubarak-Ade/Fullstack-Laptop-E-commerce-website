import { useProductStore } from '@/store/ProductStore';
import api from '@/utils/axios';

const guestId = useProductStore.getState().guestId

export const getUserCart = async () => {
    const res = await api.get(`cart/${guestId}`);
    return res.data;
};

export const addItemToCart = async (productId: string) => {
    const res = await api.post('cart', {guestId, productId})
    return res.data
}

export const modifyCartQuantity = async ({productId, quantity}: {productId: string, quantity: number}) => {
    const res = await api.post('/cart/item/quantity', {guestId, productId, quantity})
    return res.data
}
export const deleteCartItem = async (productId: string) => {
    const res = await api.delete('/cart/item/remove', {data: {guestId, productId}})
    return res.data
}

console.log(guestId);
