import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
	createColor,
	getAColor,
	resetState,
	updateAColor,
} from "../features/color/colorSlice";
let schema = yup.object().shape({
	title: yup.string().required("Màu trống"),
});
const AddColor = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const getColorId = location.pathname.split("/")[3];
	const newColor = useSelector((state) => state.color);
	const {
		isSuccess,
		isError,
		isLoading,
		createdColor,
		updatedColor,
		colorName,
	} = newColor;
	useEffect(() => {
		if (getColorId !== undefined) {
			dispatch(getAColor(getColorId));
		} else {
			dispatch(resetState());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getColorId]);
	useEffect(() => {
		if (isSuccess && createdColor) {
			toast.success("Thêm màu thành công!");
		}
		if (isSuccess && updatedColor) {
			toast.success("Cập nhật màu thành công!");
			dispatch(resetState());
			navigate("/admin/danh-sach-mau-sac");
		}
		if (isError) {
			toast.error("Lỗi!");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess, isError, isLoading, createdColor]);
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			title: colorName || "#ffffff",
		},
		validationSchema: schema,
		onSubmit: (values) => {
			if (getColorId !== undefined) {
				const data = { id: getColorId, colorData: values };
				dispatch(updateAColor(data));
				dispatch(resetState());
			} else {
				dispatch(createColor(values));
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
				{getColorId !== undefined ? "Chỉnh sửa" : "Thêm"} Màu
			</h3>
			<div>
				<form action='' onSubmit={formik.handleSubmit}>
					<CustomInput
						type='color'
						label='Chọn màu'
						onChange={formik.handleChange("title")}
						onBlur={formik.handleBlur("title")}
						val={formik.values.title}
						id='color'
					/>
					<div className='error'>
						{formik.touched.title && formik.errors.title}
					</div>
					<button
						className='btn btn-success border-0 rounded-3 my-5'
						type='submit'
					>
						{getColorId !== undefined ? "Chỉnh sửa" : "Thêm"} Màu
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddColor;
