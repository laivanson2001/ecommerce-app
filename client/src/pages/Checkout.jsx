import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
	createOrder,
	emptyCart,
	getUserCart,
} from "../features/user/userSlice";
import { object, string } from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { base_url, config } from "../utils/axiosConfig";

const shippingSchema = object({
	name: string().required("Họ tên trống"),
	mobile: string().required("Số điện thoại trống"),
	address: string().required("Địa chỉ trống trống"),
	note: string(),
});

const Checkout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const cartState = useSelector((state) => state.auth.cartProducts);

	const [cartProductItems, setCartProductItems] = useState([]);
	const [totalAmount, setTotalAmount] = useState(null);

	const formik = useFormik({
		initialValues: {
			name: "",
			mobile: "",
			address: "",
			note: "",
		},
		validationSchema: shippingSchema,
		onSubmit: (values) => {
			localStorage.setItem("shipping", JSON.stringify(values));
			setTimeout(() => {
				checkoutHandler();
			}, 500);
		},
	});
	const loadScript = (src) => {
		return new Promise((resolve) => {
			const script = document.createElement("script");
			script.src = src;
			script.onload = () => {
				resolve(true);
			};
			script.onerror = () => {
				resolve(false);
			};
			document.body.appendChild(script);
		});
	};

	const checkoutHandler = async () => {
		const res = await loadScript(
			"https://checkout.razorpay.com/v1/checkout.js"
		);
		if (!res) {
			alert("Razorpay SDK failed to load");
			return;
		}
		const result = await axios.post(
			`${base_url}user/order/checkout`,
			{ amount: totalAmount },
			config
		);
		if (!result) {
			alert("Lỗi");
			return;
		}
		const { amount, id: order_id, currency } = result.data.order;

		const options = {
			key: "rzp_test_pdpkM4q533OaKd", // Enter the Key ID generated from the Dashboard
			amount: amount,
			currency: currency,
			name: "Atomic",
			description: "Test Transaction",
			order_id: order_id,
			handler: async function (response) {
				const data = {
					orderCreationId: order_id,
					razorpayPaymentId: response.razorpay_payment_id,
					razorpayOrderId: response.razorpay_order_id,
				};

				const result = await axios.post(
					`${base_url}user/order/payment-verification`,
					data,
					config
				);
				dispatch(
					createOrder({
						totalPrice: totalAmount,
						totalPriceAfterDiscount: totalAmount,
						orderItems: cartProductItems,
						paymentInfo: result.data,
						shippingInfo: JSON.parse(
							localStorage.getItem("shipping")
						),
					})
				);
				dispatch(emptyCart());
				navigate("/my-orders");
			},
			prefill: {
				name: "Atomic",
				email: "laivanson.dev@gmail.com",
				contact: "0348232305",
			},
			notes: {
				address: "Viet Nam",
			},
			theme: {
				color: "#61dafb",
			},
		};
		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	};

	useEffect(() => {
		dispatch(getUserCart());
		let items = [];
		for (let index = 0; index < cartState?.length; index++) {
			items.push({
				product: cartState[index].productId._id,
				color: cartState[index].color._id,
				quantity: cartState[index].quantity,
				price: cartState[index].price,
			});
		}
		setCartProductItems(items);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		setTotalAmount(
			cartState?.reduce(
				(totalAmount, state) =>
					totalAmount + state.quantity * state.price,
				0
			)
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cartState]);
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
								onSubmit={formik.handleSubmit}
								className='d-flex gap-15 flex-wrap justify-content-between'
							>
								<div className='w-100'>
									<input
										type='text'
										placeholder='Họ tên'
										className='form-control'
										name='name'
										onChange={formik.handleChange("name")}
										onBlur={formik.handleBlur("name")}
										value={formik.values.name}
									/>
									<div className='error'>
										{formik.touched.name &&
										formik.errors.name ? (
											<div>{formik.errors.name}</div>
										) : null}
									</div>
								</div>
								<div className='w-100'>
									<input
										type='text'
										placeholder='Số điện thoại'
										className='form-control'
										name='mobile'
										onChange={formik.handleChange("mobile")}
										onBlur={formik.handleBlur("mobile")}
										value={formik.values.mobile}
									/>
									<div className='error'>
										{formik.touched.mobile &&
										formik.errors.mobile ? (
											<div>{formik.errors.mobile}</div>
										) : null}
									</div>
								</div>
								<div className='w-100'>
									<input
										type='text'
										placeholder='Địa chỉ'
										className='form-control'
										name='address'
										onChange={formik.handleChange(
											"address"
										)}
										onBlur={formik.handleBlur("address")}
										value={formik.values.address}
									/>
									<div className='error'>
										{formik.touched.address &&
										formik.errors.address ? (
											<div>{formik.errors.address}</div>
										) : null}
									</div>
								</div>
								<div className='w-100'>
									<textarea
										id=''
										cols='30'
										rows='5'
										placeholder='Ghi chú'
										className='form-control'
										name='note'
										onChange={formik.handleChange("note")}
										onBlur={formik.handleBlur("note")}
										value={formik.values.note}
									></textarea>
									<div className='error'>
										{formik.touched.note &&
										formik.errors.note ? (
											<div>{formik.errors.note}</div>
										) : null}
									</div>
								</div>
								<div className='w-100'>
									<div className='d-flex justify-content-between align-items-center'>
										<Link to='/cart' className='text-dark'>
											<BiArrowBack className='me-2' />
											Quay lại giỏ hàng
										</Link>
										<button
											type='submit'
											className='btn button'
										>
											Đặt ngay
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
					<div className='col-5'>
						<div className='border-bottom py-4'>
							{cartState?.length > 0 &&
								cartState?.map((item, index) => (
									<div
										key={index}
										className='d-flex gap-10 mb-2 align-align-items-center'
									>
										<div className='w-75 d-flex gap-10'>
											<div className='w-25 position-relative'>
												<span
													style={{
														top: "-10px",
														right: "2px",
													}}
													className='badge bg-secondary text-white rounded-circle p-2 position-absolute'
												>
													{item.quantity}
												</span>
												<img
													className='img-fluid'
													src={
														item.productId.images[0]
															.url
													}
													alt='product'
												/>
											</div>
											<div>
												<h5 className='total-price'>
													{item.productId.title}
												</h5>
												<p className='total-price'>
													Màu sắc: {item.color.title}
												</p>
											</div>
										</div>
										<div className='flex-grow-1'>
											<h5 className='total'>
												{new Intl.NumberFormat().format(
													item.price * item.quantity
												)}
												đ
											</h5>
										</div>
									</div>
								))}
						</div>
						<div className='border-bottom py-4'>
							<div className='d-flex justify-content-between align-items-center'>
								<p className='total'>Thành tiền</p>
								<p className='total-price'>
									{new Intl.NumberFormat().format(
										totalAmount
									)}
									đ
								</p>
							</div>
							<div className='d-flex justify-content-between align-items-center'>
								<p className='mb-0 total'>Phí vận chuyển</p>
								<p className='mb-0 total-price'>30,000đ</p>
							</div>
						</div>
						<div className='d-flex justify-content-between align-items-center border-bootom py-4'>
							<h4 className='total'>Tổng cộng</h4>
							<h5 className='total-price'>
								{new Intl.NumberFormat().format(
									totalAmount + 30000
								)}
								đ
							</h5>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
};

export default Checkout;
