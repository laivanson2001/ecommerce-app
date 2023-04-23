import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
	getUserCart,
	removeProductCart,
	updateQuantity,
} from "../features/user/userSlice";

const Cart = () => {
	const [productDetail, setproductDetail] = useState(null);
	const [totalAmount, setTotalAmount] = useState(null);
	const dispatch = useDispatch();
	const authState = useSelector((state) => state.auth);

	const updateCart = (id, quantity) => {
		dispatch(updateQuantity({ cartItemId: id, quantity }));
		setTimeout(() => {
			dispatch(getUserCart());
		}, 300);
	};
	useEffect(() => {
		dispatch(getUserCart());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);
	useEffect(() => {
		if (productDetail !== null) {
			updateCart(productDetail.id, productDetail.quantity);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productDetail]);
	useEffect(() => {
		authState.cartProducts?.length > 0 &&
			setTotalAmount(
				authState.cartProducts?.reduce(
					(totalAmount, state) =>
						totalAmount + state.quantity * state.price,
					0
				)
			);
	}, [authState.cartProducts]);
	return (
		<>
			<Meta title={"Giỏ hàng"} />
			<BreadCrumb title='Giỏ hàng' />
			<Container class1='cart-wrapper home-wrapper-2 py-5'>
				<div className='row'>
					<div className='col-12'>
						<div className='cart-header py-3 d-flex justify-content-between align-items-center'>
							<h4 className='cart-col-1'>Sản phẩm</h4>
							<h4 className='cart-col-2'>Giá</h4>
							<h4 className='cart-col-3'>Số lượng</h4>
							<h4 className='cart-col-4'>Tổng</h4>
						</div>
						{authState.cartProducts?.length > 0 &&
							authState.cartProducts.map((item, index) => (
								<div
									key={index}
									className='cart-data py-3 mb-2 d-flex justify-content-between align-items-center'
								>
									<div className='cart-col-1 gap-15 d-flex align-items-center'>
										<div className='w-25'>
											<img
												src={
													item.productId.images[0].url
												}
												className='img-fluid'
												alt='product_image'
											/>
										</div>
										<div className='w-75'>
											<p>{item.productId.title}</p>
											<p>Size: S</p>
											<p className='d-flex gap-1'>
												Màu:
												<span className='colors ps-0'>
													<li
														style={{
															backgroundColor:
																item.color
																	.title,
														}}
													></li>
												</span>
											</p>
										</div>
									</div>
									<div className='cart-col-2'>
										<h5 className='price'>
											{new Intl.NumberFormat().format(
												item.productId.price
											)}
											đ
										</h5>
									</div>
									<div className='cart-col-3 d-flex align-items-center gap-15'>
										<div>
											<input
												className='form-control'
												type='number'
												value={
													productDetail &&
													productDetail.id ===
														item._id
														? productDetail.quantity
														: item.quantity
												}
												onChange={(e) =>
													setproductDetail({
														id: item._id,
														quantity:
															e.target.value,
													})
												}
											/>
										</div>
										<div>
											<AiFillDelete
												onClick={() => {
													dispatch(
														removeProductCart(
															item._id
														)
													);
													setTimeout(() => {
														dispatch(getUserCart());
													}, 300);
												}}
												className='text-danger '
												role='button'
											/>
										</div>
									</div>
									<div className='cart-col-4'>
										<h5 className='price'>
											{new Intl.NumberFormat().format(
												item.productId.price *
													item.quantity
											)}
											đ
										</h5>
									</div>
								</div>
							))}
					</div>
					<div className='col-12 py-2 mt-4'>
						<div className='d-flex justify-content-between align-items-baseline'>
							<Link to='/product' className='button'>
								Tiếp tục mua
							</Link>
							{totalAmount && (
								<div className='d-flex flex-column align-items-end gap-3'>
									<h4>
										Thành tiền:{" "}
										{new Intl.NumberFormat().format(
											totalAmount
										)}
										đ
									</h4>
									<Link to='/checkout' className='button'>
										Thanh toán
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			</Container>
		</>
	);
};

export default Cart;
