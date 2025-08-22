import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./components/slices/productsSlice"
import productReducer from './components/slices/productSlice';
import authReducer from './components/slices/authSlice';
import cartReducer from './components/slices/cartSlice';
import orderReducer from './components/slices/orderSlice';
import userReducer from './components/slices/userSlice'


const reducer = combineReducers({
    productsState: productsReducer,
    productState: productReducer ,
    authState: authReducer,
    cartState: cartReducer,
    orderState: orderReducer,
    userState: userReducer
})


export const store = configureStore({
    reducer,
    devTools: true,
    //middleware: [thunk]  // to apply some delay when api calls,
     // No need to add thunk manually, it's already in RTK's default middleware
})
