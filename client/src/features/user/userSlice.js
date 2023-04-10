import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { authService } from "./userService";

const getCustomerfromLocalStorage = localStorage.getItem("customer")
	? JSON.parse(localStorage.getItem("customer"))
	: null;

export const registerUser = createAsyncThunk(
	"auth/register",
	async (userData, thunkAPI) => {
		try {
			return await authService.register(userData);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const loginUser = createAsyncThunk(
	"auth/login",
	async (userData, thunkAPI) => {
		try {
			return await authService.login(userData);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const getUserWishList = createAsyncThunk(
	"auth/wishlist",
	async (thunkAPI) => {
		try {
			return await authService.getUserWishList();
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const addCart = createAsyncThunk(
	"auth/cart",
	async (cartData, thunkAPI) => {
		try {
			return await authService.addToCart(cartData);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const getUserCart = createAsyncThunk(
	"auth/cart/get",
	async (thunkAPI) => {
		try {
			return await authService.getCart();
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

const initialState = {
	user: getCustomerfromLocalStorage,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

export const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.createdUser = action.payload;
				if (state.isSuccess) {
					toast.success("Đăng ký tài khoản thành công");
				}
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
				if (state.isError) {
					toast.error("Đăng ký tài khoản thất bại");
				}
			})
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.createdUser = action.payload;
				if (state.isSuccess) {
					localStorage.setItem("token", action.payload.token);
					toast.success("Đăng nhập tài khoản thành công");
				}
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
				if (state.isError) {
					toast.error("Đăng nhập tài khoản thất bại");
				}
			})
			.addCase(getUserWishList.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserWishList.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.wishlist = action.payload;
			})
			.addCase(getUserWishList.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
			})
			.addCase(addCart.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addCart.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.cart = action.payload;
				if (state.isSuccess) {
					toast.success("Thêm giỏ hàng thành công");
				}
			})
			.addCase(addCart.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
			})
			.addCase(getUserCart.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserCart.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.cartProducts = action.payload;
			})
			.addCase(getUserCart.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
			});
	},
});

export default authSlice.reducer;
