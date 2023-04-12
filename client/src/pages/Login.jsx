import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/user/userSlice";

const loginSchema = object({
	email: string().email("Email không hợp lệ").required("Email trống"),
	password: string().required("Mật khẩu trống"),
});

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const authState = useSelector((state) => state.auth);
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: loginSchema,
		onSubmit: (values) => {
			dispatch(loginUser(values));
			setTimeout(() => {
				if (authState.isSuccess) {
					navigate("/");
				}
			}, 500);
		},
	});
	return (
		<>
			<Meta title={"Đăng nhập"} />
			<BreadCrumb title='Đăng nhập' />

			<Container class1='login-wrapper py-5 home-wrapper-2'>
				<div className='row'>
					<div className='col-12'>
						<div className='auth-card'>
							<h3 className='text-center mb-4'>Đăng Nhập</h3>
							<form
								action=''
								className='d-flex flex-column gap-15'
								onSubmit={formik.handleSubmit}
							>
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
									<Link
										to='/forgot-password'
										className='ms-3 text-decoration-underline'
									>
										Quên mật khẩu?
									</Link>
									<div className='mt-3 d-flex justify-content-center gap-15 align-items-center'>
										<button
											className='button border-0'
											type='submit'
										>
											Đăng nhập
										</button>
									</div>
									<div className='d-flex justify-content-center mt-3'>
										<p className='m-0'>
											Bạn chưa có tài khoản?{" "}
											<Link
												to='/signup'
												className='text-decoration-underline'
											>
												Đăng ký
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

export default Login;
