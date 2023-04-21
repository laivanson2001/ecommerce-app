import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import { object, string } from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { resetPassword } from "../features/user/userSlice";

const passwordSchema = object({
	password: string().required("Mật khẩu trống"),
});

const ResetPassword = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { token } = useParams();

	const formik = useFormik({
		initialValues: {
			password: "",
		},
		validationSchema: passwordSchema,
		onSubmit: (values) => {
			dispatch(
				resetPassword({
					token,
					password: values.password,
				})
			);
			navigate("/login");
		},
	});

	return (
		<>
			<Meta title={"Đặt lại mật khẩu"} />
			<BreadCrumb title='Đặt lại mật khẩu' />
			<Container class1='login-wrapper py-5 home-wrapper-2'>
				<div className='row'>
					<div className='col-12'>
						<div className='auth-card'>
							<h3 className='text-center mb-3'>
								Đặt lại mật khẩu
							</h3>
							<form
								action=''
								className='d-flex flex-column gap-15'
								onSubmit={formik.handleSubmit}
							>
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
											type='button'
										>
											Xác nhận
										</button>
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

export default ResetPassword;
