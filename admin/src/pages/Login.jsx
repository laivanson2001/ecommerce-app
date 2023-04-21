import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

let userSchema = object({
	email: string().email("Email không hợp lệ").required("Vui lòng nhập email"),
	password: string().required("Vui lòng nhập mật khẩu"),
});

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user, isError, isSuccess, isLoading, message } = useSelector(
		(state) => state.auth
	);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: userSchema,
		onSubmit: (values) => {
			dispatch(login(values));
		},
	});
	useEffect(() => {
		if (user !== null || isSuccess) {
			navigate("/admin");
		} else {
			navigate("/");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, isError, isSuccess, isLoading]);
	return (
		<div
			className='py-5'
			style={{ background: "#ffd333", minHeight: "100vh" }}
		>
			<div className='my-5 w-25 bg-white rounded-3 mx-auto p-4'>
				<h3 className='text-center title'>Đăng nhập</h3>
				<p className='text-center'>
					Đăng nhập tài khoản của bạn để tiếp tục
				</p>
				<div className='error text-center'>
					{message.message === "Rejected"
						? "Bạn không có quyền truy cập trang này"
						: ""}
				</div>
				<form action='' onSubmit={formik.handleSubmit}>
					<CustomInput
						name='email'
						type='text'
						label='Email'
						onChange={formik.handleChange("email")}
						value={formik.values.email}
					/>
					<div className='error'>
						{formik.touched.email && formik.errors.email ? (
							<div>{formik.errors.email}</div>
						) : null}
					</div>
					<CustomInput
						name='password'
						type='password'
						label='Mật khẩu'
						onChange={formik.handleChange("password")}
						value={formik.values.password}
					/>
					<div className='error'>
						{formik.touched.password && formik.errors.password ? (
							<div>{formik.errors.password}</div>
						) : null}
					</div>
					<button
						className='border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5'
						style={{ background: "#ffd333" }}
						type='submit'
					>
						Đăng nhập
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
