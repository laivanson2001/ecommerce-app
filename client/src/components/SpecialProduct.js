import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const SpecialProduct = ({ item }) => {
	return (
		<>
			<div className='col-4 mb-3'>
				<div className='special-product-card'>
					<div className='d-flex justify-content-between'>
						<div>
							<img
								src={item.images[0].url}
								className='img-fluid'
								alt='watch'
							/>
						</div>
						<div className='special-product-content'>
							<h5 className='brand'>{item.brand}</h5>
							<h6 className='title text-truncate-2'>
								{item.title}
							</h6>
							<ReactStars
								count={5}
								size={24}
								value={Number(item.totalRating)}
								edit={false}
								activeColor='#ffd700'
							/>
							<p className='price'>
								<span className='red-p'>
									{new Intl.NumberFormat().format(item.price)}
									đ
								</span>{" "}
								{/* &nbsp; <strike>2.300.000đ</strike> */}
							</p>
							<div className='discount-till d-flex align-items-center gap-10'>
								<p className='mb-0'>
									<b>5 </b>ngày
								</p>
								<div className='d-flex gap-10 align-items-center'>
									<span className='badge rounded-circle p-3 bg-danger'>
										10
									</span>
									:
									<span className='badge rounded-circle p-3 bg-danger'>
										20
									</span>
									:
									<span className='badge rounded-circle p-3 bg-danger'>
										30
									</span>
								</div>
							</div>
							<div className='prod-count my-3'>
								<p>Số lượng: {item.quantity}</p>
								<div className='progress'>
									<div
										className='progress-bar'
										role='progressbar'
										style={{
											width:
												(item.sold /
													(item.quantity +
														item.sold)) *
													100 +
												"%",
										}}
										aria-valuenow={
											(item.sold /
												(item.quantity + item.sold)) *
											100
										}
										aria-valuemin={0}
										aria-valuemax={
											item.sold + item.quantity
										}
									></div>
								</div>
							</div>
							<Link
								to={`/product/${item._id}`}
								className='button'
							>
								Xem chi tiết
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SpecialProduct;
