import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Color from "../components/Color";
import Meta from "../components/Meta";
import Container from "../components/Container";

const CompareProduct = () => {
	return (
		<>
			<Meta title={"So sánh"} />
			<BreadCrumb title='So sánh' />
			<Container class1='compare-product-wrapper py-5 home-wrapper-2'>
				<div className='row'>
					<div className='col-3'>
						<div className='compare-product-card position-relative'>
							<img
								src='images/cross.svg'
								alt='cross'
								className='position-absolute cross img-fluid'
							/>
							<div className='product-card-image'>
								<img src='images/watch.jpg' alt='watch' />
							</div>
							<div className='compare-product-details'>
								<h5 className='title'>Smart Watch Pro</h5>
								<h6 className='price mb-3 mt-3'>2.000.000đ</h6>

								<div>
									<div className='product-detail'>
										<h5>Thương hiệu:</h5>
										<p>Apple</p>
									</div>
									<div className='product-detail'>
										<h5>Loại:</h5>
										<p>Đồng hồ</p>
									</div>
									<div className='product-detail'>
										<h5>Khả dụng:</h5>
										<p>Còn hàng</p>
									</div>
									<div className='product-detail'>
										<h5>Màu sắc:</h5>
										<Color />
									</div>
									<div className='product-detail'>
										<h5>Size:</h5>
										<div className='d-flex gap-10'>
											<p>S</p>
											<p>M</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='col-3'>
						<div className='compare-product-card position-relative'>
							<img
								src='images/cross.svg'
								alt='cross'
								className='position-absolute cross img-fluid'
							/>
							<div className='product-card-image'>
								<img src='images/watch.jpg' alt='watch' />
							</div>
							<div className='compare-product-details'>
								<h5 className='title'>Smart Watch Pro</h5>
								<h6 className='price mb-3 mt-3'>2.000.000đ</h6>

								<div>
									<div className='product-detail'>
										<h5>Thương hiệu:</h5>
										<p>Apple</p>
									</div>
									<div className='product-detail'>
										<h5>Loại:</h5>
										<p>Đồng hồ</p>
									</div>
									<div className='product-detail'>
										<h5>Khả dụng:</h5>
										<p>Còn hàng</p>
									</div>
									<div className='product-detail'>
										<h5>Màu sắc:</h5>
										<Color />
									</div>
									<div className='product-detail'>
										<h5>Size:</h5>
										<div className='d-flex gap-10'>
											<p>S</p>
											<p>M</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
};

export default CompareProduct;
