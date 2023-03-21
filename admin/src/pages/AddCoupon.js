import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
	createCoupon,
	getACoupon,
	resetState,
	updateACoupon,
} from "../features/coupon/couponSlice";

let schema = yup.object().shape({
	name: yup.string().required("Mã giảm giá trống"),
	expiry: yup.date().required("Ngày hết hạn trống"),
	discount: yup.number().required("% Giảm giá trống"),
});
const AddCoupon = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const getCouponId = location.pathname.split("/")[3];
	const newCoupon = useSelector((state) => state.coupon);

	const {
		isSuccess,
		isError,
		isLoading,
		createdCoupon,
		couponName,
		couponDiscount,
		couponExpiry,
		updatedCoupon,
	} = newCoupon;
	const changeDateFormet = (date) => {
		const newDate = new Date(date).toLocaleDateString();
		const parts = newDate.split("/");
		const formattedDate = parts
			.map((part) => part.padStart(2, "0"))
			.reverse()
			.join("-");
		return formattedDate;
	};

	useEffect(() => {
		if (getCouponId !== undefined) {
			dispatch(getACoupon(getCouponId));
		} else {
			dispatch(resetState());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getCouponId]);

	useEffect(() => {
		if (isSuccess && createdCoupon) {
			toast.success("Thêm mã giảm giá thành công!");
		}
		if (isSuccess && updatedCoupon) {
			toast.success("Cập nhật mã giảm giá thành công!");
			navigate("/admin/danh-sach-ma-giam-gia");
		}
		if (isError && couponName && couponDiscount && couponExpiry) {
			toast.error("Lỗi!");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess, isError, isLoading]);
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: couponName || "",
			expiry: changeDateFormet(couponExpiry) || "",
			discount: couponDiscount || "",
		},
		validationSchema: schema,
		onSubmit: (values) => {
			if (getCouponId !== undefined) {
				const data = { id: getCouponId, couponData: values };
				dispatch(updateACoupon(data));
				dispatch(resetState());
			} else {
				dispatch(createCoupon(values));
				formik.resetForm();
				setTimeout(() => {
					dispatch(resetState);
				}, 300);
			}
		},
	});

	return (
		<div>
			<h3 className='mb-4 title'>
				{getCouponId !== undefined ? "Chỉnh sửa" : "Thêm"} mã giảm giá
			</h3>
			<div>
				<form action='' onSubmit={formik.handleSubmit}>
					<CustomInput
						type='text'
						name='name'
						onChange={formik.handleChange("name")}
						onBlur={formik.handleBlur("name")}
						val={formik.values.name}
						label='Mã giảm giá'
						id='name'
					/>
					<div className='error'>
						{formik.touched.name && formik.errors.name}
					</div>
					<CustomInput
						type='date'
						name='expiry'
						onChange={formik.handleChange("expiry")}
						onBlur={formik.handleBlur("expiry")}
						val={formik.values.expiry}
						label='Ngày hết hạn'
						id='date'
					/>
					<div className='error'>
						{formik.touched.expiry && formik.errors.expiry}
					</div>
					<CustomInput
						type='number'
						name='discount'
						onChange={formik.handleChange("discount")}
						onBlur={formik.handleBlur("discount")}
						val={formik.values.discount}
						label='% Giảm giá'
						id='discount'
					/>
					<div className='error'>
						{formik.touched.discount && formik.errors.discount}
					</div>
					<button
						className='btn btn-success border-0 rounded-3 my-5'
						type='submit'
					>
						{getCouponId !== undefined ? "Chỉnh sửa" : "Thêm"} mã
						giảm giá
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddCoupon;
