import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
	createBrand,
	getABrand,
	resetState,
	updateABrand,
} from "../features/brand/brandSlice";

let schema = yup.object().shape({
	title: yup.string().required("Thương hiệu trống"),
});
const AddBrand = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const getBrandId = location.pathname.split("/")[3];
	const newBrand = useSelector((state) => state.brand);
	const {
		isSuccess,
		isError,
		isLoading,
		createdBrand,
		brandName,
		updatedBrand,
	} = newBrand;
	useEffect(() => {
		if (getBrandId !== undefined) {
			dispatch(getABrand(getBrandId));
		} else {
			dispatch(resetState());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getBrandId]);

	useEffect(() => {
		if (isSuccess && createdBrand) {
			toast.success("Thêm thương hiệu thành công!");
		}
		if (isSuccess && updatedBrand) {
			toast.success("Cập nhật thương hiệu thành công!");
			navigate("/admin/danh-sach-thuong-hieu");
		}

		if (isError) {
			toast.error("Lỗi!");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess, isError, isLoading]);
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			title: brandName || "",
		},
		validationSchema: schema,
		onSubmit: (values) => {
			if (getBrandId !== undefined) {
				const data = { id: getBrandId, brandData: values };
				dispatch(updateABrand(data));
				dispatch(resetState());
			} else {
				dispatch(createBrand(values));
				formik.resetForm();
				setTimeout(() => {
					dispatch(resetState());
				}, 300);
			}
		},
	});

	return (
		<div>
			<h3 className='mb-4 title'>
				{getBrandId !== undefined ? "Chỉnh sửa" : "Thêm"} thương hiệu
			</h3>
			<div>
				<form action='' onSubmit={formik.handleSubmit}>
					<CustomInput
						type='text'
						name='title'
						onChange={formik.handleChange("title")}
						onBlur={formik.handleBlur("title")}
						val={formik.values.title}
						label='Thương hiệu'
						id='brand'
					/>
					<div className='error'>
						{formik.touched.title && formik.errors.title}
					</div>
					<button
						className='btn btn-success border-0 rounded-3 my-5'
						type='submit'
					>
						{getBrandId !== undefined ? "Chỉnh sửa" : "Thêm"} thương
						hiệu
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddBrand;
