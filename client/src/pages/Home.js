import React, { useEffect } from "react";
import Marquee from "react-fast-marquee";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import Container from "../components/Container";
import SpecialProduct from "../components/SpecialProduct";
import { getAllBlogs } from "../features/blogs/blogSlide";
import {
	addToWishList,
	getAllProducts,
} from "../features/products/productSlice";
import wish from "../images/wish.svg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import prodcompare from "../images/prodcompare.svg";

const Home = () => {
	const dispatch = useDispatch();
	const productState = useSelector((state) => state.product.product);
	const getProducts = () => {
		dispatch(getAllProducts());
	};
	const getBlogs = () => {
		dispatch(getAllBlogs());
	};

	const addWishList = (productId) => {
		dispatch(addToWishList(productId));
	};

	useEffect(() => {
		getProducts();
		getBlogs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<Container class1='home-wrapper-1 py-5'>
				<div className='row'>
					<div className='col-6'>
						<div className='main-banner position-relative'>
							<img
								className='img-fluid rounded-3'
								src='images/main-banner-1.jpg'
								alt=''
							/>
							<div className='main-banner-content position-absolute'>
								<h4>Chế độ chuyên nghiệp</h4>
								<h5>iPad S23+ Pro</h5>
								<div className='price mb-2'>
									<span className='price-old'>
										23.800.000đ
									</span>
									<br />
									<span className='price-new'>
										20.500.000đ
									</span>
								</div>
								<Link className='button'>Mua ngay</Link>
							</div>
						</div>
					</div>
					<div className='col-6'>
						<div className='d-flex flex-wrap justify-content-between align-items-center gap-4'>
							<div className='small-banner position-relative'>
								<img
									className='img-fluid rounded-3'
									src='images/catbanner-01.jpg'
									alt=''
								/>
								<div className='small-banner-content position-absolute'>
									<h4>Siêu giảm giá</h4>
									<h5>Laptops Max</h5>
									<div className='price mb-2'>
										<span className='price-old'>
											40.500.000đ
										</span>
										<br />
										<span className='price-new'>
											34.999.000đ
										</span>
									</div>
								</div>
							</div>
							<div className='small-banner position-relative'>
								<img
									className='img-fluid rounded-3'
									src='images/catbanner-03.jpg'
									alt=''
								/>
								<div className='small-banner-content position-absolute'>
									<h4>Mới nhất</h4>
									<h5>iPad Air</h5>
									<div className='price mb-2'>
										<span className='price-old'>
											14.250.000đ
										</span>
										<br />
										<span className='price-new'>
											13.500.000đ
										</span>
									</div>
								</div>
							</div>
							<div className='small-banner position-relative'>
								<img
									className='img-fluid rounded-3'
									src='images/catbanner-02.jpg'
									alt=''
								/>
								<div className='small-banner-content position-absolute'>
									<h4>Giảm 15%</h4>
									<h5>Smartwatch 7</h5>
									<p>
										Kiểu dáng mới <br /> phong cách mới
									</p>
								</div>
							</div>
							<div className='small-banner position-relative'>
								<img
									className='img-fluid rounded-3'
									src='images/catbanner-04.jpg'
									alt=''
								/>
								<div className='small-banner-content position-absolute'>
									<h4>Khắc miễn phí</h4>
									<h5>AirPods Max</h5>
									<p>
										Tạo sự khác biệt <br /> của bạn
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Container>
			<Container class1='home-wrapper-2 py-5'>
				<div className='row'>
					<div className='col-12'>
						<div className='service d-flex align-items-center justify-content-between'>
							<div className='d-flex align-items-center gap-15'>
								<img src='images/service.png' alt='' />
								<div className=''>
									<h6>Miễn phí vận chuyển</h6>
									<p className='mb-0'>
										Tất cả đơn hàng từ 2.000.000đ
									</p>
								</div>
							</div>
							<div className='d-flex align-items-center gap-15'>
								<img src='images/service-02.png' alt='' />
								<div className=''>
									<h6>Ưu đãi hàng ngày</h6>
									<p className='mb-0'>
										Tiết kiệm lên đến 25%
									</p>
								</div>
							</div>
							<div className='d-flex align-items-center gap-15'>
								<img src='images/service-03.png' alt='' />
								<div className=''>
									<h6>Hỗ trợ 24/7</h6>
									<p className='mb-0'>Mua sắm mọi lúc</p>
								</div>
							</div>
							<div className='d-flex align-items-center gap-15'>
								<img src='images/service-04.png' alt='' />
								<div className=''>
									<h6>Giá cả hợp lý</h6>
									<p className='mb-0'>Hàng từ nhà sản xuất</p>
								</div>
							</div>
							<div className='d-flex align-items-center gap-15'>
								<img src='images/service-05.png' alt='' />
								<div className=''>
									<h6>Thanh toán an toàn</h6>
									<p className='mb-0'>Bảo mật 100%</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Container>
			<Container class1='home-wrapper-2 py-5'>
				<div className='row'>
					<div className='col-12'>
						<div className='categories d-flex justify-content-between align-items-center flex-wrap'>
							<div className='d-flex gap-30 align-items-center'>
								<div className=''>
									<h6>Máy ảnh</h6>
									<p>10 sản phẩm</p>
								</div>
								<img src='images/camera.jpg' alt='' />
							</div>
							<div className='d-flex gap-30 align-items-center'>
								<div className=''>
									<h6>Smart TV</h6>
									<p>10 sản phẩm</p>
								</div>
								<img src='images/tv.jpg' alt='' />
							</div>
							<div className='d-flex gap-30 align-items-center'>
								<div className=''>
									<h6>Tai nghe</h6>
									<p>10 sản phẩm</p>
								</div>
								<img src='images/headphone.jpg' alt='' />
							</div>
							<div className='d-flex gap-30 align-items-center'>
								<div className=''>
									<h6>Máy ảnh</h6>
									<p>10 sản phẩm</p>
								</div>
								<img src='images/camera.jpg' alt='' />
							</div>
							<div className='d-flex gap-30 align-items-center'>
								<div className=''>
									<h6>Máy ảnh</h6>
									<p>10 sản phẩm</p>
								</div>
								<img src='images/camera.jpg' alt='' />
							</div>
							<div className='d-flex gap-30 align-items-center'>
								<div className=''>
									<h6>Smart TV</h6>
									<p>10 sản phẩm</p>
								</div>
								<img src='images/tv.jpg' alt='' />
							</div>
							<div className='d-flex gap-30 align-items-center'>
								<div className=''>
									<h6>Tai nghe</h6>
									<p>10 sản phẩm</p>
								</div>
								<img src='images/headphone.jpg' alt='' />
							</div>
							<div className='d-flex gap-30 align-items-center'>
								<div className=''>
									<h6>Máy ảnh</h6>
									<p>10 sản phẩm</p>
								</div>
								<img src='images/camera.jpg' alt='' />
							</div>
						</div>
					</div>
				</div>
			</Container>
			<Container class1='featured-wrapper py-5 home-wrapper-2'>
				<div className='row'>
					<div className='col-12'>
						<h3 className='section-heading'>Sản phẩm nổi bật</h3>
					</div>
				</div>
				<div className='row'>
					{productState.length > 0 &&
						productState
							.filter((item) => item.tags[0] === "featured")
							.map((item, index) => (
								<div className='col-3' key={index}>
									<Link
										// to={`${
										// 	location.pathname === "/"
										// 		? "/product/:id"
										// 		: location.pathname === "/product/:id"
										// 		? "/product/:id"
										// 		: ":id"
										// }`}
										className='product-card position-relative'
									>
										<div className='wishlist-icon position-absolute'>
											<button
												className='border-0 bg-transparent'
												onClick={(e) =>
													addWishList(item?._id)
												}
											>
												<img
													src={wish}
													alt='wishlist'
												/>
											</button>
										</div>
										<div className='product-image'>
											<img
												src={item?.images[0]?.url}
												className='img-fluid '
												alt='product_image'
											/>
											<img
												src={item?.images[1]?.url}
												className='img-fluid'
												alt='product_image'
											/>
										</div>
										<div className='product-details'>
											<h6 className='brand'>
												{item?.brand}
											</h6>
											<h5 className='product-title'>
												{item?.title}
											</h5>
											<ReactStars
												count={5}
												size={24}
												value={Number.parseInt(
													item?.totalRating
												)}
												edit={false}
												activeColor='#ffd700'
											/>
											<p className='price'>
												{new Intl.NumberFormat().format(
													item?.price
												)}
												đ
											</p>
										</div>
										<div className='action-bar position-absolute'>
											<div className='d-flex flex-column gap-15'>
												<button className='border-0 bg-transparent'>
													<img
														src={prodcompare}
														alt='compare'
													/>
												</button>
												<button className='border-0 bg-transparent'>
													<img
														src={view}
														alt='view'
													/>
												</button>
												<button className='border-0 bg-transparent'>
													<img
														src={addcart}
														alt='addcart'
													/>
												</button>
											</div>
										</div>
									</Link>
								</div>
							))}
				</div>
			</Container>
			<Container class1='famous-wrapper py-5 home-wrapper-2'>
				<div className='row'>
					<div className='col-3'>
						<div className='famous-card position-relative'>
							<img
								src='images/famous-1.webp'
								className='img-fluid'
								alt='famous'
							/>
							<div className='famous-content position-absolute'>
								<h5>Đồng hồ thông minh</h5>
								<h6>Smart Watch Series 7</h6>
								<p>9.500.000đ</p>
							</div>
						</div>
					</div>
					<div className='col-3'>
						<div className='famous-card position-relative'>
							<img
								src='images/famous-2.webp'
								className='img-fluid'
								alt='famous'
							/>
							<div className='famous-content position-absolute'>
								<h5 className='text-dark'>TV HD</h5>
								<h6 className='text-dark'>
									Smart Tivi QLED 4K
								</h6>
								<p className='text-dark'> 14.000.000đ</p>
							</div>
						</div>
					</div>
					<div className='col-3'>
						<div className='famous-card position-relative'>
							<img
								src='images/famous-3.webp'
								className='img-fluid'
								alt='famous'
							/>
							<div className='famous-content position-absolute'>
								<h5 className='text-dark'>Điện thoại</h5>
								<h6 className='text-dark'>Iphone 13 Pro.</h6>
								<p className='text-dark'>25.000.000đ</p>
							</div>
						</div>
					</div>
					<div className='col-3'>
						<div className='famous-card position-relative'>
							<img
								src='images/famous-4.webp'
								className='img-fluid'
								alt='famous'
							/>
							<div className='famous-content position-absolute'>
								<h5 className='text-dark'>Loa</h5>
								<h6 className='text-dark'>
									Loa Bluetooth Sony
								</h6>
								<p className='text-dark'>16.700.000đ</p>
							</div>
						</div>
					</div>
				</div>
			</Container>
			<Container class1='special-wrapper py-5 home-wrapper-2'>
				<div className='row'>
					<div className='col-12'>
						<h3 className='section-heading'>Sản phẩm đặc biệt</h3>
					</div>
				</div>
				<div className='row'>
					{productState.length > 0 &&
						productState
							.filter((item) => item.tags[0] === "special")
							.map((item, index) => (
								<SpecialProduct item={item} key={index} />
							))}
				</div>
			</Container>
			<Container class1='popular-wrapper py-5 home-wrapper-2'>
				<div className='row'>
					<div className='col-12'>
						<h3 className='section-heading'>Sản phẩm phổ biến</h3>
					</div>
				</div>
				<div className='row'>
					{productState.length > 0 &&
						productState
							.filter((item) => item.tags[0] === "popular")
							.map((item, index) => (
								<div className='col-3' key={index}>
									<Link
										// to={`${
										// 	location.pathname === "/"
										// 		? "/product/:id"
										// 		: location.pathname === "/product/:id"
										// 		? "/product/:id"
										// 		: ":id"
										// }`}
										className='product-card position-relative'
									>
										<div className='wishlist-icon position-absolute'>
											<button
												className='border-0 bg-transparent'
												onClick={(e) =>
													addWishList(item?._id)
												}
											>
												<img
													src={wish}
													alt='wishlist'
												/>
											</button>
										</div>
										<div className='product-image'>
											<img
												src={item?.images[0]?.url}
												className='img-fluid '
												alt='product_image'
											/>
											<img
												src={item?.images[1]?.url}
												className='img-fluid'
												alt='product_image'
											/>
										</div>
										<div className='product-details'>
											<h6 className='brand'>
												{item?.brand}
											</h6>
											<h5 className='product-title'>
												{item?.title}
											</h5>
											<ReactStars
												count={5}
												size={24}
												value={Number.parseInt(
													item?.totalRating
												)}
												edit={false}
												activeColor='#ffd700'
											/>
											<p className='price'>
												{new Intl.NumberFormat().format(
													item?.price
												)}
												đ
											</p>
										</div>
										<div className='action-bar position-absolute'>
											<div className='d-flex flex-column gap-15'>
												<button className='border-0 bg-transparent'>
													<img
														src={prodcompare}
														alt='compare'
													/>
												</button>
												<button className='border-0 bg-transparent'>
													<img
														src={view}
														alt='view'
													/>
												</button>
												<button className='border-0 bg-transparent'>
													<img
														src={addcart}
														alt='addcart'
													/>
												</button>
											</div>
										</div>
									</Link>
								</div>
							))}
				</div>
			</Container>
			<Container class1='marque-wrapper home-wrapper-2 py-5'>
				<div className='row'>
					<div className='col-12'>
						<div className='marquee-inner-wrapper card-wrapper'>
							<Marquee className='d-flex'>
								<div className='mx-4 w-25'>
									<img src='images/brand-01.png' alt='' />
								</div>
								<div className='mx-4 w-25'>
									<img src='images/brand-02.png' alt='' />
								</div>
								<div className='mx-4 w-25'>
									<img src='images/brand-03.png' alt='' />
								</div>
								<div className='mx-4 w-25'>
									<img src='images/brand-04.png' alt='' />
								</div>
								<div className='mx-4 w-25'>
									<img src='images/brand-05.png' alt='' />
								</div>
								<div className='mx-4 w-25'>
									<img src='images/brand-06.png' alt='' />
								</div>
								<div className='mx-4 w-25'>
									<img src='images/brand-07.png' alt='' />
								</div>
								<div className='mx-4 w-25'>
									<img src='images/brand-08.png' alt='' />
								</div>
							</Marquee>
						</div>
					</div>
				</div>
			</Container>
			<Container class1='blog-wrapper py-5 home-wrapper-2'>
				<div className='row'>
					<div className='col-12'>
						<h3 className='section-heading'>Tin tức mới</h3>
					</div>
				</div>
				<div className='row'>
					<div className='col-3'>
						<BlogCard />
					</div>
					<div className='col-3'>
						<BlogCard />
					</div>
					<div className='col-3'>
						<BlogCard />
					</div>
					<div className='col-3'>
						<BlogCard />
					</div>
				</div>
			</Container>
		</>
	);
};

export default Home;
