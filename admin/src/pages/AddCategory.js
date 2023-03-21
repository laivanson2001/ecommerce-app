import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
	createCategory,
	getAProductCategory,
	resetState,
	updateAProductCategory,
} from "../features/pcategory/pcategorySlice";
let schema = yup.object().shape({
	title: yup.string().required("Danh mục trống"),
});
const AddCategory = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const getPCatId = location.pathname.split("/")[3];
	const navigate = useNavigate();
	const newCategory = useSelector((state) => state.pCategory);
	const {
		isSuccess,
		isError,
		isLoading,
		createdCategory,
		categoryName,
		updatedCategory,
	} = newCategory;
	useEffect(() => {
		if (getPCatId !== undefined) {
			dispatch(getAProductCategory(getPCatId));
		} else {
			dispatch(resetState());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getPCatId]);
	useEffect(() => {
		if (isSuccess && createdCategory) {
			toast.success("Thêm danh mục thành công!");
		}
		if (isSuccess && updatedCategory) {
			toast.success("Cập nhật danh mục thành công!");
			navigate("/admin/danh-sach-danh-muc");
		}
		if (isError) {
			toast.error("Lỗi!");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess, isError, isLoading]);
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			title: categoryName || "",
		},
		validationSchema: schema,
		onSubmit: (values) => {
			if (getPCatId !== undefined) {
				const data = { id: getPCatId, pCatData: values };
				dispatch(updateAProductCategory(data));
				dispatch(resetState());
			} else {
				dispatch(createCategory(values));
				formik.resetForm();
				setTimeout(() => {
					dispatch(resetState());
				}, 300);
			}
		},
	});
	return (
		<div>
			<h3 className='mb-4  title'>
				{getPCatId !== undefined ? "Chỉnh sửa" : "Thêm"} danh mục
			</h3>
			<div>
				<form action='' onSubmit={formik.handleSubmit}>
					<CustomInput
						type='text'
						label='Danh mục'
						onChange={formik.handleChange("title")}
						onBlur={formik.handleBlur("title")}
						val={formik.values.title}
						id='brand'
					/>
					<div className='error'>
						{formik.touched.title && formik.errors.title}
					</div>
					<button
						className='btn btn-success border-0 rounded-3 my-5'
						type='submit'
					>
						{getPCatId !== undefined ? "Chỉnh sửa" : "Thêm"} danh
						mục
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddCategory;
