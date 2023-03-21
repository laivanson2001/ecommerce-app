import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
// import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts, resetState } from "../features/product/productSlice";

let schema = yup.object().shape({
	title: yup.string().required("Tên sản phẩm trống"),
	description: yup.string().required("Mô tả trống"),
	price: yup.number().required("Giá trống"),
	brand: yup.string().required("Thương hiệu trống"),
	category: yup.string().required("Danh mục trống"),
	tags: yup.string().required("Tags trống"),
	color: yup.array().min(1, "Chọn ít nhất 1 màu").required("Màu trống"),
	quantity: yup.number().required("Số lượng trống"),
});

const AddProduct = () => {
	const dispatch = useDispatch();
	// const navigate = useNavigate();
	const [color, setColor] = useState([]);
	// const [images, setImages] = useState([]);
	useEffect(() => {
		dispatch(getBrands());
		dispatch(getCategories());
		dispatch(getColors());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const brandState = useSelector((state) => state.brand.brands);
	const catState = useSelector((state) => state.pCategory.pCategories);
	const colorState = useSelector((state) => state.color.colors);
	const imgState = useSelector((state) => state.upload.images);
	const newProduct = useSelector((state) => state.product);
	const { isSuccess, isError, isLoading, createdProduct } = newProduct;
	useEffect(() => {
		if (isSuccess && createdProduct) {
			toast.success("Thêm sản phẩm thành công!");
		}
		if (isError) {
			toast.error("Lỗi!");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess, isError, isLoading]);
	const coloropt = [];
	colorState.forEach((i) => {
		coloropt.push({
			label: i.title,
			value: i._id,
		});
	});
	const img = [];
	imgState.forEach((i) => {
		img.push({
			public_id: i.public_id,
			url: i.url,
		});
	});

	useEffect(() => {
		formik.values.color = color ? color : " ";
		formik.values.images = img;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [color, img]);
	const formik = useFormik({
		initialValues: {
			title: "",
			description: "",
			price: "",
			brand: "",
			category: "",
			tags: "",
			color: "",
			quantity: "",
			images: "",
		},
		validationSchema: schema,
		onSubmit: (values) => {
			console.log(values);
			dispatch(createProducts(values));
			formik.resetForm();
			setColor(null);
			setTimeout(() => {
				dispatch(resetState());
			}, 3000);
		},
	});
	const handleColors = (e) => {
		setColor(e);
		console.log(color);
	};
	return (
		<div>
			<h3 className='mb-4 title'>Thêm sản phẩm</h3>
			<div>
				<form
					onSubmit={formik.handleSubmit}
					className='d-flex gap-3 flex-column'
				>
					<CustomInput
						type='text'
						label='Tên sản phẩm'
						name='title'
						onChange={formik.handleChange("title")}
						onBlur={formik.handleBlur("title")}
						val={formik.values.title}
					/>
					<div className='error'>
						{formik.touched.title && formik.errors.title}
					</div>
					<div className=''>
						<ReactQuill
							theme='snow'
							name='description'
							onChange={formik.handleChange("description")}
							value={formik.values.description}
						/>
					</div>
					<div className='error'>
						{formik.touched.description &&
							formik.errors.description}
					</div>
					<CustomInput
						type='number'
						label='Giá'
						name='price'
						onChange={formik.handleChange("price")}
						onBlur={formik.handleBlur("price")}
						val={formik.values.price}
					/>
					<div className='error'>
						{formik.touched.price && formik.errors.price}
					</div>
					<select
						name='brand'
						onChange={formik.handleChange("brand")}
						onBlur={formik.handleBlur("brand")}
						value={formik.values.brand}
						className='form-control py-3 mb-3'
						id=''
					>
						<option value=''>Chọn thương hiệu</option>
						{brandState.map((i, j) => {
							return (
								<option key={j} value={i.title}>
									{i.title}
								</option>
							);
						})}
					</select>
					<div className='error'>
						{formik.touched.brand && formik.errors.brand}
					</div>
					<select
						name='category'
						onChange={formik.handleChange("category")}
						onBlur={formik.handleBlur("category")}
						value={formik.values.category}
						className='form-control py-3 mb-3'
						id=''
					>
						<option value=''>Chọn danh mục</option>
						{catState.map((i, j) => {
							return (
								<option key={j} value={i.title}>
									{i.title}
								</option>
							);
						})}
					</select>
					<div className='error'>
						{formik.touched.category && formik.errors.category}
					</div>
					<select
						name='tags'
						onChange={formik.handleChange("tags")}
						onBlur={formik.handleBlur("tags")}
						value={formik.values.tags}
						className='form-control py-3 mb-3'
						id=''
					>
						<option value='' disabled>
							Chọn tags
						</option>
						<option value='featured'>Nổi bật</option>
						<option value='popular'>Phổ biến</option>
						<option value='special'>Đặc biệt</option>
					</select>
					<div className='error'>
						{formik.touched.tags && formik.errors.tags}
					</div>

					<Select
						mode='multiple'
						allowClear
						className='w-100'
						placeholder='Chọn màu'
						defaultValue={color}
						onChange={(i) => handleColors(i)}
						options={coloropt}
					/>
					<div className='error'>
						{formik.touched.color && formik.errors.color}
					</div>
					<CustomInput
						type='number'
						label='Nhập số lượng'
						name='quantity'
						onChange={formik.handleChange("quantity")}
						onBlur={formik.handleBlur("quantity")}
						val={formik.values.quantity}
					/>
					<div className='error'>
						{formik.touched.quantity && formik.errors.quantity}
					</div>
					<div className='bg-white border-1 p-5 text-center'>
						<Dropzone
							onDrop={(acceptedFiles) =>
								dispatch(uploadImg(acceptedFiles))
							}
						>
							{({ getRootProps, getInputProps }) => (
								<section>
									<div {...getRootProps()}>
										<input {...getInputProps()} />
										<p>Kéo thả hoặc click để chọn file</p>
									</div>
								</section>
							)}
						</Dropzone>
					</div>
					<div className='showimages d-flex flex-wrap gap-3'>
						{imgState?.map((i, j) => {
							return (
								<div className=' position-relative' key={j}>
									<button
										type='button'
										onClick={() =>
											dispatch(delImg(i.public_id))
										}
										className='btn-close position-absolute'
										style={{ top: "10px", right: "10px" }}
									></button>
									<img
										src={i.url}
										alt=''
										width={200}
										height={200}
									/>
								</div>
							);
						})}
					</div>
					<button
						className='btn btn-success border-0 rounded-3 my-5'
						type='submit'
					>
						Thêm sản phẩm
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddProduct;
