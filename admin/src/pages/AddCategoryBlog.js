import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
	createNewblogCat,
	getABlogCat,
	resetState,
	updateABlogCat,
} from "../features/bcategory/bcategorySlice";
let schema = yup.object().shape({
	title: yup.string().required("Danh mục tin trống"),
});
const AddCategoryBlog = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const getBlogCatId = location.pathname.split("/")[3];
	const newBlogCategory = useSelector((state) => state.bCategory);
	const {
		isSuccess,
		isError,
		isLoading,
		createBlogCategory,
		blogCatName,
		updatedBlogCategory,
	} = newBlogCategory;
	useEffect(() => {
		if (getBlogCatId !== undefined) {
			dispatch(getABlogCat(getBlogCatId));
		} else {
			dispatch(resetState());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getBlogCatId]);
	useEffect(() => {
		if (isSuccess && createBlogCategory) {
			toast.success("Thêm danh mục tin thành công!");
		}
		if (isSuccess && updatedBlogCategory) {
			toast.success("Cập nhật danh mục tin thành công!");
			navigate("/admin/danh-sach-danh-muc-tin");
		}
		if (isError) {
			toast.error("Lỗi!");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess, isError, isLoading]);
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			title: blogCatName || "",
		},
		validationSchema: schema,
		onSubmit: (values) => {
			const data = { id: getBlogCatId, blogCatData: values };
			if (getBlogCatId !== undefined) {
				dispatch(updateABlogCat(data));
				dispatch(resetState());
			} else {
				dispatch(createNewblogCat(values));
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
				{getBlogCatId !== undefined ? "Chỉnh sửa" : "Thêm"} danh mục tin
			</h3>
			<div>
				<form action='' onSubmit={formik.handleSubmit}>
					<CustomInput
						type='text'
						name='title'
						onChange={formik.handleChange("title")}
						onBlur={formik.handleBlur("title")}
						val={formik.values.title}
						label='Danh mục tin'
						id='blogcat'
					/>
					<div className='error'>
						{formik.touched.title && formik.errors.title}
					</div>
					<button
						className='btn btn-success border-0 rounded-3 my-5'
						type='submit'
					>
						{getBlogCatId !== undefined ? "Chỉnh sửa" : "Thêm"} danh
						mục tin
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddCategoryBlog;
