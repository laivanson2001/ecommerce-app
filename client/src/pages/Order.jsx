import React, { useEffect } from "react";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, getUserCart } from "../features/user/userSlice";

const Order = () => {
	const dispatch = useDispatch();

	const orders = useSelector((state) => state.auth.getOrders?.orders);

	useEffect(() => {
		dispatch(getOrders());
		dispatch(getUserCart());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<BreadCrumb title='Đơn hàng' />
			<Container class1='cart-wrapper home-wrapper-2 py-5'>
				<div className='row'>
					<div className='col-12'>
						<div className='row'>
							<div className='col-3'>
								<h5>Mã đơn hàng</h5>
							</div>
							<div className='col-3'>
								<h5>Thành tiền</h5>
							</div>
							<div className='col-3'>
								<h5>Tổng tiền</h5>
							</div>
							<div className='col-3'>
								<h5>Trạng thái</h5>
							</div>
						</div>
					</div>
					<div className='col-12 mt-3'>
						{orders?.length > 0 &&
							orders?.map((item, index) => (
								<div
									className='row my-3'
									key={index}
									style={{ background: "#febd69" }}
								>
									<div className='col-3 pt-3'>
										<p>{item._id}</p>
									</div>
									<div className='col-3 pt-3'>
										<p>
											{new Intl.NumberFormat().format(
												item.totalPrice
											)}
											đ
										</p>
									</div>
									<div className='col-3 pt-3'>
										<p>
											{new Intl.NumberFormat().format(
												item.totalPriceAfterDiscount
											)}
											đ
										</p>
									</div>
									<div className='col-3 pt-3'>
										<p>
											{item.orderStatus === "Ordered"
												? "Đã đặt"
												: ""}
										</p>
									</div>
									<div className='col-12'>
										<div
											className='row p-3'
											style={{
												background: "#232f3e",
											}}
										>
											<div className='col-3'>
												<h6 className='text-white'>
													Sản phẩm
												</h6>
											</div>
											<div className='col-3'>
												<h6 className='text-white'>
													Số lượng
												</h6>
											</div>
											<div className='col-3'>
												<h6 className='text-white'>
													Giá tiền
												</h6>
											</div>
											<div className='col-3'>
												<h6 className='text-white'>
													Màu sắc
												</h6>
											</div>
											{item.orderItems.map(
												(item, index) => (
													<div
														className='col-12'
														key={index}
													>
														<div className='row p-3'>
															<div className='col-3'>
																<p className='text-white'>
																	{
																		item
																			.product
																			.title
																	}
																</p>
															</div>
															<div className='col-3'>
																<p className='text-white'>
																	{
																		item.quantity
																	}
																</p>
															</div>
															<div className='col-3'>
																<p className='text-white'>
																	{new Intl.NumberFormat().format(
																		item.price
																	)}
																	đ
																</p>
															</div>
															<div className='col-3'>
																<span className='colors ps-0'>
																	<li
																		style={{
																			backgroundColor:
																				item
																					.color
																					.title,
																		}}
																	></li>
																</span>
															</div>
														</div>
													</div>
												)
											)}
										</div>
									</div>
								</div>
							))}
					</div>
				</div>
			</Container>
		</>
	);
};

export default Order;
