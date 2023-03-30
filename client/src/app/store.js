import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import authReducer from "../features/user/userSlice";
import blogReducer from "../features/blogs/blogSlide";
import contactReducer from "../features/contact/contactSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		product: productReducer,
		blog: blogReducer,
		contact: contactReducer,
	},
});
