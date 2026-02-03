import api from '@/utils/axios';


export const getUserCart = async () => {
    const res = await api.get(`cart/items`);
    return res.data;
};

export const addItemToCart = async ( productId: string) => {
    const res = await api.post('cart/items', { productId });
    return res.data;
};

export const modifyCartQuantity = async ({
    productId,
    quantity,
}: {
    productId: string;
    quantity: number;
}) => {

    const res = await api.post('/cart/item/quantity', {productId, quantity });
    return res.data;
};
export const deleteCartItem = async (productId: string) => {
    // const user
    const res = await api.delete('/cart/item/remove', { data: { productId } });
    return res.data;
};

