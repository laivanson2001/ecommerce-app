import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { Link } from "react-router-dom";
const Signup = () => {
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
							>
								<CustomInput
									type='text'
									name='name'
									placeholder='Họ tên'
								/>
								<CustomInput
									type='email'
									name='email'
									placeholder='Email'
								/>
								<CustomInput
									type='tel'
									name='mobile'
									placeholder='Số điện thoại'
								/>
								<CustomInput
									type='password'
									name='password'
									placeholder='Mật khẩu'
								/>
								<div>
									<div className='mt-3 d-flex justify-content-center gap-15 align-items-center'>
										<button className='button border-0'>
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
