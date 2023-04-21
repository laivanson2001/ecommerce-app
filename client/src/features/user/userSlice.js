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
	"auth/add-cart",
	async (cartData, thunkAPI) => {
		try {
			return await authService.addToCart(cartData);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const getUserCart = createAsyncThunk(
	"auth/get-cart",
	async (thunkAPI) => {
		try {
			return await authService.getCart();
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const removeProductCart = createAsyncThunk(
	"auth/remove-cart",
	async (id, thunkAPI) => {
		try {
			return await authService.removeCart(id);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const updateQuantity = createAsyncThunk(
	"auth/update-quantity",
	async (cartDetail, thunkAPI) => {
		try {
			return await authService.updateQuantity(cartDetail);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const createOrder = createAsyncThunk(
	"auth/create-order",
	async (orderDetail, thunkAPI) => {
		try {
			return await authService.createOrder(orderDetail);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const getOrders = createAsyncThunk(
	"auth/get-orders",
	async (thunkAPI) => {
		try {
			return await authService.getUserOrders();
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const updateUser = createAsyncThunk(
	"auth/update-user",
	async (data, thunkAPI) => {
		try {
			return await authService.updateUser(data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const forgotPassToken = createAsyncThunk(
	"auth/forgot-password",
	async (data, thunkAPI) => {
		try {
			return await authService.forgotPassToken(data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const resetPassword = createAsyncThunk(
	"auth/reset-password",
	async (data, thunkAPI) => {
		try {
			return await authService.resetPassword(data);
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
				state.cartProduct = action.payload;
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
			})
			.addCase(removeProductCart.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(removeProductCart.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.deletedProductCart = action.payload;
				if (state.isSuccess) {
					toast.success("Xóa khỏi giỏ hàng thành công");
				}
			})
			.addCase(removeProductCart.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
			})
			.addCase(updateQuantity.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateQuantity.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.updatedProductCart = action.payload;
				if (state.isSuccess) {
					toast.success("Đã cập nhật");
				}
			})
			.addCase(updateQuantity.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
			})
			.addCase(createOrder.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.createOrder = action.payload;
				if (state.isSuccess) {
					toast.success("Đặt đơn thành công");
				}
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
			})
			.addCase(getOrders.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getOrders.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.getOrders = action.payload;
			})
			.addCase(getOrders.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
			})
			.addCase(updateUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.user = { ...action.payload };
				if (state.isSuccess) {
					toast.success("Cập nhật tài khoản thành công");
				}
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
				if (state.isError) {
					toast.error("Cập nhật tài khoản thất bại");
				}
			})
			.addCase(forgotPassToken.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(forgotPassToken.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.token = action.payload;
				if (state.isSuccess) {
					toast.success("Đã gửi link xác nhận đến địa chỉ email");
				}
			})
			.addCase(forgotPassToken.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
				if (state.isError) {
					toast.error("Lỗi");
				}
			})
			.addCase(resetPassword.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(resetPassword.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.password = action.payload;
				if (state.isSuccess) {
					toast.success("Đổi mật khẩu thành công");
				}
			})
			.addCase(resetPassword.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
				if (state.isError) {
					toast.error("Lỗi");
				}
			});
	},
});

export default authSlice.reducer;
