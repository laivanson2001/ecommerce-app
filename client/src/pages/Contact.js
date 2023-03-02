import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import Container from "../components/Container";

const Contact = () => {
	return (
		<>
			<Meta title={"Liên hệ"} />
			<BreadCrumb title='Liên hệ' />
			<Container class1='contact-wrapper py-5 home-wrapper-2'>
				<div className='row'>
					<div className='col-12'>
						<iframe
							title='map'
							src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7451.146204159629!2d105.8960299!3d20.9696521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1677422307302!5m2!1svi!2s'
							width='600'
							height='450'
							className='border-0 w-100'
							allowFullScreen=''
							loading='lazy'
							referrerPolicy='no-referrer-when-downgrade'
						></iframe>
					</div>
					<div className='col-12 mt-5'>
						<div className='contact-inner-wrapper d-flex justify-content-between '>
							<div>
								<h3 className='contact-title mb-4'>
									Thông tin của bạn
								</h3>
								<form
									action=''
									className='d-flex flex-column gap-15'
								>
									<div>
										<input
											type='text'
											className='form-control'
											placeholder='Họ tên'
										/>
									</div>
									<div>
										<input
											type='email'
											className='form-control'
											placeholder='Email'
										/>
									</div>
									<div>
										<input
											type='tel'
											className='form-control'
											placeholder='Điện thoại'
										/>
									</div>
									<div>
										<textarea
											name=''
											id=''
											className='w-100 form-control'
											cols='30'
											rows='4'
											placeholder='Ghi chú'
										></textarea>
									</div>
									<div>
										<button className='button border-0 w-25'>
											Gửi
										</button>
									</div>
								</form>
							</div>
							<div>
								<h3 className='contact-title mb-4'>
									Liên hệ với chúng tôi
								</h3>
								<div>
									<ul className='ps-0'>
										<li className='mb-3 d-flex gap-15 align-items-center'>
											<AiOutlineHome className='fs-5' />
											<address className='mb-0'>
												Ngõ 95 Thúy Lĩnh, Lĩnh Nam,
												Hoàng Mai, Hà Nội
											</address>
										</li>
										<li className='mb-3 d-flex gap-15 align-items-center'>
											<BiPhoneCall className='fs-5' />
											<a href='tel:+91 8264954234'>
												0348232305
											</a>
										</li>
										<li className='mb-3 d-flex gap-15 align-items-center'>
											<AiOutlineMail className='fs-5' />
											<a href='mailto:navdeepdahiya753@gmail.com'>
												laivanson.dev@gmail.com
											</a>
										</li>
										<li className='mb-3 d-flex gap-15 align-items-center'>
											<BiInfoCircle className='fs-5' />
											<p className='mb-0'>
												Thứ 2 – Thứ 7(8h – 17h)
											</p>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
};

export default Contact;
