import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/user/userSlice";

const signUpSchema = object({
	name: string().required("Họ tên trống"),
	email: string().email("Email không hợp lệ").required("Email trống"),
	mobile: string().required("Số điện thoại trống"),
	password: string().required("Mật khẩu trống"),
});

const Signup = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const authState = useSelector((state) => state.auth);

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			mobile: "",
			password: "",
		},
		validationSchema: signUpSchema,
		onSubmit: (values) => {
			dispatch(registerUser(values));
		},
	});

	useEffect(() => {
		if (authState.user !== null) {
			navigate("/");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authState]);

	return (
		<>
			<Meta title={"Đăng ký"} />
			<BreadCrumb title='Đăng Ký' />
			<Container class1='login-wrapper py-5 home-wrapper-2'>
				<div className='row'>
					<div className='col-12'>
						<div className='auth-card'>
							<h3 className='text-center mb-3'>Đăng Ký</h3>
							<form
								action=''
								className='d-flex flex-column gap-15'
								onSubmit={formik.handleSubmit}
							>
								<CustomInput
									type='text'
									name='name'
									placeholder='Họ tên'
									value={formik.values.name}
									onChange={formik.handleChange("name")}
									onBlur={formik.handleBlur("name")}
								/>
								<div className='error'>
									{formik.touched.name && formik.errors.name}
								</div>
								<CustomInput
									type='text'
									name='email'
									placeholder='Email'
									value={formik.values.email}
									onChange={formik.handleChange("email")}
									onBlur={formik.handleBlur("email")}
								/>
								<div className='error'>
									{formik.touched.email &&
										formik.errors.email}
								</div>
								<CustomInput
									type='tel'
									name='mobile'
									placeholder='Số điện thoại'
									value={formik.values.mobile}
									onChange={formik.handleChange("mobile")}
									onBlur={formik.handleBlur("mobile")}
								/>
								<div className='error'>
									{formik.touched.mobile &&
										formik.errors.mobile}
								</div>
								<CustomInput
									type='password'
									name='password'
									placeholder='Mật khẩu'
									value={formik.values.password}
									onChange={formik.handleChange("password")}
									onBlur={formik.handleBlur("password")}
								/>
								<div className='error'>
									{formik.touched.password &&
										formik.errors.password}
								</div>
								<div>
									<div className='mt-3 d-flex justify-content-center gap-15 align-items-center'>
										<button
											className='button border-0'
											type='submit'
										>
											Đăng ký
										</button>
									</div>
									<div className='d-flex justify-content-center mt-3'>
										<p className='m-0'>
											Bạn đã có tài khoản?{" "}
											<Link
												to='/login'
												className='text-decoration-underline'
											>
												Đăng nhập
											</Link>
										</p>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
};

export default Signup;
