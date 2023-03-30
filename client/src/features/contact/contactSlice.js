import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { contactService } from "./contactService";

export const createQuery = createAsyncThunk(
	"contact/create",
	async (contactData, thunkAPI) => {
		try {
			return await contactService.postQuery(contactData);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

const initialState = {
	contact: "",
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

export const contactSlice = createSlice({
	name: "contact",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createQuery.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createQuery.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.contact = action.payload;
				if (state.isSuccess) {
					toast.success("Gửi phản hồi thành công");
				}
			})
			.addCase(createQuery.rejected, (state, action) => {
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

export default contactSlice.reducer;
