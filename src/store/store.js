import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice'

const Store = configureStore({
    reducer:{
        auth:authSlice
       //add more slice here for Post post:postSlice
    }
});


export default Store; 