import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook, BsGithub, BsInstagram } from "react-icons/bs";

const Footer = () => {
	return (
		<>
			<footer className='py-4'>
				<div className='container-xxl'>
					<div className='row align-items-center'>
						<div className='col-5'>
							<div className='footer-top-data d-flex gap-30 align-items-center'>
								<img src='images/newsletter.png' alt='' />
								<h2 className='mb-0 text-white'>
									Nhận thông báo khuyến mãi
								</h2>
							</div>
						</div>
						<div className='col-7'>
							<div className='input-group'>
								<input
									type='text'
									className='form-control py-1'
									placeholder='Nhập email của bạn...'
									aria-label="Recipient's username"
									aria-describedby='basic-addon2'
								/>
								<span
									className='input-group-text p-2'
									id='basic-addon2'
								>
									Đăng ký
								</span>
							</div>
						</div>
					</div>
				</div>
			</footer>
			<footer className='py-4'>
				<div className='container-xxl'>
					<div className='row'>
						<div className='col-4'>
							<h4 className='text-white mb-4'>Liên hệ</h4>
							<div className='text-white fs-6'>
								<address>
									Địa chỉ: 95 Thúy Lĩnh, Lĩnh Nam, Hoàng Mai,
									Hà Nội
								</address>
								<a
									className='mt-3 d-block mb-0 text-white'
									href='tel:+84348232305'
								>
									SĐT: 0348232305
								</a>
								<a
									className='mt-3 d-block mb-0 text-white'
									href='mailto:laivanson.devc@gmail.com'
								>
									Email: laivanson.dev@gmail.com
								</a>
								<div className='social-icons d-flex align-items-center gap-30 mt-3'>
									<a className='text-white' href='/'>
										<BsFacebook className='fs-4' />
									</a>
									<a className='text-white' href='/'>
										<BsInstagram className='fs-4' />
									</a>
									<a className='text-white' href='/'>
										<BsGithub className='fs-4' />
									</a>
								</div>
							</div>
						</div>
						<div className='col-3'>
							<h4 className='text-white mb-4'>Thông tin</h4>
							<div className='footer-link d-flex flex-column'>
								<Link
									to='/privacy-policy'
									className='text-white py-2 mb-1'
								>
									Chính sách bảo mật
								</Link>
								<Link
									to='/shipping-policy'
									className='text-white py-2 mb-1'
								>
									Vận chuyển
								</Link>
								<Link
									to='/term-conditions'
									className='text-white py-2 mb-1'
								>
									Điều khoản & dịch vụ
								</Link>
								<Link
									to='/blogs'
									className='text-white py-2 mb-1'
								>
									Tin tức
								</Link>
							</div>
						</div>
						<div className='col-3'>
							<h4 className='text-white mb-4'>Tài khoản</h4>
							<div className='footer-link d-flex flex-column'>
								<Link className='text-white py-2 mb-1'>
									Thông tin
								</Link>
								<Link className='text-white py-2 mb-1'>
									Câu hỏi thường gặp
								</Link>
								<Link className='text-white py-2 mb-1'>
									Liên hệ
								</Link>
							</div>
						</div>
						<div className='col-2'>
							<h4 className='text-white mb-4'>Liên kết nhanh</h4>
							<div className='footer-link d-flex flex-column'>
								<Link className='text-white py-2 mb-1'>
									Laptop
								</Link>
								<Link className='text-white py-2 mb-1'>
									Tai nghe
								</Link>
								<Link className='text-white py-2 mb-1'>
									Máy tính bảng
								</Link>
								<Link className='text-white py-2 mb-1'>
									Đồng hồ
								</Link>
							</div>
						</div>
					</div>
				</div>
			</footer>
			<footer className='py-4'>
				<div className='container-xxl'>
					<div className='row'>
						<div className='col-12'>
							<p className='text-center mb-0 text-white'>
								&copy; {new Date().getFullYear()} Powered by
								Atomic
							</p>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
