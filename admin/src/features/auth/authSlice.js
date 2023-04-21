import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authServices";
import { toast } from "react-toastify";

const getUserfromLocalStorage = localStorage.getItem("user")
	? JSON.parse(localStorage.getItem("user"))
	: null;

export const login = createAsyncThunk(
	"auth/login",
	async (userData, thunkAPI) => {
		try {
			return await authService.login(userData);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const getOrders = createAsyncThunk(
	"order/get-orders",
	async (thunkAPI) => {
		try {
			return await authService.getOrders();
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const getOrder = createAsyncThunk(
	"order/get-order",
	async (id, thunkAPI) => {
		try {
			return await authService.getOrder(id);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const getMonthlyOrders = createAsyncThunk(
	"user/monthly-orders",
	async (thunkAPI) => {
		try {
			return await authService.getMonthlyOrders();
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const getYearlyTotalOrders = createAsyncThunk(
	"user/yearly-orders",
	async (thunkAPI) => {
		try {
			return await authService.getYearlyTotalOrders();
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const updateOrderStatus = createAsyncThunk(
	"user/update-order-status",
	async (data, thunkAPI) => {
		try {
			return await authService.updateOrderStatus(data);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

const initialState = {
	user: getUserfromLocalStorage,
	orders: [],
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};

export const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {},
	extraReducers: (buildeer) => {
		buildeer
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isError = false;
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
				state.message = "success";
				if (state.isSuccess) {
					toast.success("Đăng nhập thành công");
				}
			})
			.addCase(login.rejected, (state, action) => {
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
				state.isLoading = false;
			})
			.addCase(getOrders.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getOrders.fulfilled, (state, action) => {
				state.isError = false;
				state.isLoading = false;
				state.isSuccess = true;
				state.orders = action.payload;
				state.message = "success";
			})
			.addCase(getOrders.rejected, (state, action) => {
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
				state.isLoading = false;
			})
			.addCase(getOrder.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getOrder.fulfilled, (state, action) => {
				state.isError = false;
				state.isLoading = false;
				state.isSuccess = true;
				state.order = action.payload;
				state.message = "success";
			})
			.addCase(getOrder.rejected, (state, action) => {
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
				state.isLoading = false;
			})
			.addCase(getMonthlyOrders.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getMonthlyOrders.fulfilled, (state, action) => {
				state.isError = false;
				state.isLoading = false;
				state.isSuccess = true;
				state.monthlyOrders = action.payload;
				state.message = "success";
			})
			.addCase(getMonthlyOrders.rejected, (state, action) => {
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
				state.isLoading = false;
			})
			.addCase(getYearlyTotalOrders.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getYearlyTotalOrders.fulfilled, (state, action) => {
				state.isError = false;
				state.isLoading = false;
				state.isSuccess = true;
				state.yearlyOrders = action.payload;
				state.message = "success";
			})
			.addCase(getYearlyTotalOrders.rejected, (state, action) => {
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
				state.isLoading = false;
			})
			.addCase(updateOrderStatus.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateOrderStatus.fulfilled, (state, action) => {
				state.isError = false;
				state.isLoading = false;
				state.isSuccess = true;
				state.updateOrderStatus = action.payload;
				state.message = "success";
			})
			.addCase(updateOrderStatus.rejected, (state, action) => {
				state.isError = true;
				state.isSuccess = false;
				state.message = action.error;
				state.isLoading = false;
			});
	},
});

export default authSlice.reducer;
