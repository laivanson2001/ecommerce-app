import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import Container from "../components/Container";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch } from "react-redux";
import { createQuery } from "../features/contact/contactSlice";

const contactSchema = object({
	name: string().required("Họ tên trống"),
	email: string().email("Email không hợp lệ").required("Email trống"),
	mobile: string().required("Số điện thoại trống"),
	comment: string().required("Ghi chú trống"),
});

const Contact = () => {
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			mobile: "",
			comment: "",
		},
		validationSchema: contactSchema,
		onSubmit: (values) => {
			dispatch(createQuery(values));
			formik.resetForm();
		},
	});
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
									onSubmit={formik.handleSubmit}
								>
									<div>
										<input
											type='text'
											className='form-control'
											placeholder='Họ tên'
											name='name'
											onChange={formik.handleChange(
												"name"
											)}
											onBlur={formik.handleBlur("name")}
											value={formik.values.name}
										/>
										<div className='error'>
											{formik.touched.name &&
												formik.errors.name}
										</div>
									</div>
									<div>
										<input
											type='email'
											className='form-control'
											placeholder='Email'
											name='email'
											onChange={formik.handleChange(
												"email"
											)}
											onBlur={formik.handleBlur("email")}
											value={formik.values.email}
										/>
										<div className='error'>
											{formik.touched.email &&
												formik.errors.email}
										</div>
									</div>
									<div>
										<input
											type='tel'
											className='form-control'
											placeholder='Điện thoại'
											name='mobile'
											onChange={formik.handleChange(
												"mobile"
											)}
											onBlur={formik.handleBlur("mobile")}
											value={formik.values.mobile}
										/>
										<div className='error'>
											{formik.touched.mobile &&
												formik.errors.mobile}
										</div>
									</div>
									<div>
										<textarea
											id=''
											className='w-100 form-control'
											cols='30'
											rows='4'
											placeholder='Ghi chú'
											name='comment'
											onChange={formik.handleChange(
												"comment"
											)}
											onBlur={formik.handleBlur(
												"comment"
											)}
											value={formik.values.comment}
										></textarea>
										<div className='error'>
											{formik.touched.comment &&
												formik.errors.comment}
										</div>
									</div>
									<div>
										<button
											type='submit'
											className='button border-0 w-25'
										>
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
