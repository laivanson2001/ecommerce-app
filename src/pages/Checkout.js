import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import watch from "../images/watch.jpg";

const Checkout = () => {
	const [selected, setSelected] = useState("");
	const handleChange = (e) => {
		setSelected(e.target.value);
	};
	return (
		<>
			<Container class1='checkout-wrapper py-5 home-wrapper-2'>
				<div className='row'>
					<div className='col-7'>
						<div className='checkout-left-data'>
							<h3 className='website-name'>Atomic</h3>
							<nav
								style={{ "--bs-breadcrumb-divider": ">" }}
								aria-label='breadcrumb'
							>
								<ol className='breadcrumb'>
									<li className='breadcrumb-item'>
										<Link
											className='text-dark total-price'
											to='/'
										>
											Trang chủ
										</Link>
									</li>
									&nbsp; /&nbsp;
									<li
										className='breadcrumb-ite total-price active'
										aria-current='page'
									>
										<Link to='/cart' className='text-dark'>
											Giỏ hàng
										</Link>
									</li>
									&nbsp; /&nbsp;
									<li
										className='breadcrumb-item text-dark total-price active'
										aria-current='page'
									>
										Thanh toán
									</li>
								</ol>
							</nav>

							<h4 className='mb-3'>Thông tin của bạn</h4>
							<form
								action=''
								className='d-flex gap-15 flex-wrap justify-content-between'
							>
								<div className='w-100'>
									<input
										type='text'
										placeholder='Họ tên'
										className='form-control'
									/>
								</div>
								<div className='w-100'>
									<input
										type='text'
										placeholder='Số điện thoại'
										className='form-control'
									/>
								</div>
								<div className='w-100'>
									<input
										type='text'
										placeholder='Địa chỉ'
										className='form-control'
									/>
								</div>
								<div className='w-100'>
									<textarea name="" id="" cols="30" rows="5" placeholder='Ghi chú'
										className='form-control'>
									</textarea>
								</div>
								<div className='w-100'>
									<div className='d-flex justify-content-between align-items-center'>
										<Link to='/cart' className='text-dark'>
											<BiArrowBack className='me-2' />
											Quay lại giỏ hàng
										</Link>
										<Link to='/cart' className='button'>
											Xác nhận
										</Link>
									</div>
								</div>
							</form>
						</div>
					</div>
					<div className='col-5'>
						<div className='border-bottom py-4'>
							<div className='d-flex gap-10 mb-2 align-align-items-center'>
								<div className='w-75 d-flex gap-10'>
									<div className='w-25 position-relative'>
										<span
											style={{
												top: "-10px",
												right: "2px",
											}}
											className='badge bg-secondary text-white rounded-circle p-2 position-absolute'
										>
											1
										</span>
										<img
											className='img-fluid'
											src={watch}
											alt='product'
										/>
									</div>
									<div>
										<h5 className='total-price'>Smart Watch Pro</h5>
										<p className='total-price'>
											Màu sắc: Đỏ
										</p>
									</div>
								</div>
								<div className='flex-grow-1'>
									<h5 className='total'>2.000.000đ</h5>
								</div>
							</div>
						</div>
						<div className='border-bottom py-4'>
							<div className='d-flex justify-content-between align-items-center'>
								<p className='total'>Thành tiền</p>
								<p className='total-price'>2.000.000đ</p>
							</div>
							<div className='d-flex justify-content-between align-items-center'>
								<p className='mb-0 total'>Phí vận chuyển</p>
								<p className='mb-0 total-price'>30.000đ</p>
							</div>
						</div>
						<div className='d-flex justify-content-between align-items-center border-bootom py-4'>
							<h4 className='total'>Tổng cộng</h4>
							<h5 className='total-price'>2.030.000đ</h5>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
};

export default Checkout;
