import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

const Header = () => {
	const navigate = useNavigate();

	const authState = useSelector((state) => state.auth);
	const productState = useSelector((state) => state.product.product);

	const [totalAmount, setTotalAmount] = useState(null);
	const [options, setOptions] = useState([]);

	const handleLogout = () => {
		localStorage.clear();
		toast.success("Đăng xuất thành công");
		window.location.reload();
	};

	useEffect(() => {
		setTotalAmount(
			authState.cartProducts.reduce(
				(totalAmount, state) =>
					totalAmount + state.quantity * state.price,
				0
			)
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authState.cartProducts]);

	useEffect(() => {
		let data = [];
		for (let i = 0; i < productState.length; i++) {
			const item = productState[i];
			data.push({
				id: i,
				productId: item._id,
				name: item.title,
			});
		}
		setOptions(data);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productState]);

	return (
		<>
			<header className='header-top-strip py-3'>
				<div className='container-xxl'>
					<div className='row'>
						<div className='col-6'>
							<p className='text-white mb-0'>
								Miễn phí vận chuyển đơn hàng từ 2.000.000đ
							</p>
						</div>
						<div className='col-6'>
							<p className='text-end text-white mb-0'>
								SĐT:{" "}
								<a
									className='text-white'
									href='tel:+84348232305'
								>
									0348232305
								</a>
							</p>
						</div>
					</div>
				</div>
			</header>
			<header className='header-upper py-3'>
				<div className='container-xxl'>
					<div className='row align-items-center'>
						<div className='col-2'>
							<h2>
								<Link to='/' className='text-white'>
									Atomic
								</Link>
							</h2>
						</div>
						<div className='col-5'>
							<div className='input-group'>
								<Typeahead
									id='pagination-example'
									onPaginate={() =>
										console.log("Results paginated")
									}
									onChange={(selected) =>
										navigate(
											`/product/${selected[0]?.productId}`
										)
									}
									options={options}
									placeholder='Tìm kiếm sản phẩm...'
									labelKey='name'
									minLength={2}
								/>
								<span
									className='input-group-text p-3'
									id='basic-addon2'
								>
									<BsSearch className='fs-6' />
								</span>
							</div>
						</div>
						<div className='col-5'>
							<div className='header-upper-links d-flex align-items-center justify-content-between'>
								<div className=''>
									<Link
										to='/compare-product'
										className='d-flex align-items-center gap-10 text-white'
									>
										<img src={compare} alt='' />
										<p className='mb-0'>So sánh</p>
									</Link>
								</div>
								<div className=''>
									<Link
										to='/wishlist'
										className='d-flex align-items-center gap-10 text-white'
									>
										<img src={wishlist} alt='' />
										<p className='mb-0'>Yêu thích</p>
									</Link>
								</div>
								<div className=''>
									<Link
										to={
											authState.user === null
												? "/login"
												: "/my-profile"
										}
										className='d-flex align-items-center gap-10 text-white'
									>
										<img src={user} alt='' />
										<p className='mb-0'>
											{authState.user === null
												? "Tài khoản"
												: authState.user.name}
										</p>
									</Link>
								</div>
								<div className=''>
									<Link
										to='cart'
										className='d-flex align-items-center gap-10 text-white'
									>
										<img src={cart} alt='' />
										{authState.cartProducts?.length > 0 && (
											<div className='d-flex flex-column gap-10'>
												<span
													className='badge bg-white text-dark'
													style={{ width: "30px" }}
												>
													{
														authState.cartProducts
															?.length
													}
												</span>
												<p className='mb-0'>
													{new Intl.NumberFormat().format(
														totalAmount
													)}
													đ
												</p>
											</div>
										)}
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
			<header className='header-bottom py-3'>
				<div className='container-xxl'>
					<div className='row'>
						<div className='col-12'>
							<div className='menu-bottom d-flex align-items-center gap-30'>
								<div className=''>
									<div className='dropdown'>
										<button
											className='btn btn-secondary dropdown-toggle bg-transparent border-0 d-flex gap-15 align-items-center'
											type='button'
											data-bs-toggle='dropdown'
											aria-expanded='false'
										>
											<img src={menu} alt='' />
											<span className='me-5 d-inline-block'>
												Danh mục
											</span>
										</button>
										<ul className='dropdown-menu'>
											<li>
												<Link
													className='dropdown-item text-white'
													to='/'
												>
													Action
												</Link>
											</li>
											<li>
												<Link
													className='dropdown-item text-white'
													to='/'
												>
													Another action
												</Link>
											</li>
											<li>
												<Link
													className='dropdown-item text-white'
													to='/'
												>
													Something else here
												</Link>
											</li>
										</ul>
									</div>
								</div>
								<div className='menu-link '>
									<div className='d-flex align-items-center gap-15'>
										<NavLink to='/'>Trang chủ</NavLink>
										<NavLink to='/product'>
											Cửa hàng
										</NavLink>
										<NavLink to='/my-orders'>
											Đơn hàng
										</NavLink>
										<NavLink to='/blogs'>Tin tức</NavLink>
										<NavLink to='/contact'>Liên hệ</NavLink>
										{authState.user && (
											<button
												onClick={handleLogout}
												className='border border-0 bg-transparent text-white text-uppercase'
												style={{ fontSize: "14px" }}
											>
												Đăng xuất
											</button>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
