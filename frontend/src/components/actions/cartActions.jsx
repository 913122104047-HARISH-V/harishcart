import {addCartItemRequest, addCartItemSuccess} from '../slices/cartSlice';
import api from "../../api/axios";
import { toast } from "react-toastify";
export const addCartItem = (id, quantity) => async(dispatch) => {
    try {
        dispatch(addCartItemRequest())
        const {data } = await api.get(`/api/v1/product/${id}`)
        console.log(data);
        dispatch(addCartItemSuccess({
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0]?.url,
            stock: data.product.stock,
            quantity
        }))
    } catch (error) {
        console.error(error);
        toast(error.response?.data?.message || "Something went wrong", { type: 'error' });
    }
}