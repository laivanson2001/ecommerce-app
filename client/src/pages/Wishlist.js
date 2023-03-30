import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishList } from "../features/user/userSlice";
import { addToWishList } from "../features/products/productSlice";

const Wishlist = () => {
	const dispatch = useDispatch();
	const wishListState = useSelector((state) => state.auth.wishlist?.wishlist);
	const getWishList = () => {
		dispatch(getUserWishList());
	};
	const removeWishList = (id) => {
		dispatch(addToWishList(id));
		setTimeout(() => {
			dispatch(getUserWishList());
		}, 300);
	};
	useEffect(() => {
		getWishList();
		console.log(wishListState);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<Meta title={"Yêu thích"} />
			<BreadCrumb title='Yêu thích' />
			<Container class1='wishlist-wrapper home-wrapper-2 py-5'>
				<div className='row'>
					{wishListState && wishListState.length === 0 && (
						<div className='text-center fs-3'>Trống</div>
					)}
					{wishListState &&
						wishListState.length > 0 &&
						wishListState.map((item, index) => (
							<div className='col-3' key={index}>
								<div className='wishlist-card position-relative'>
									<img
										src='images/cross.svg'
										alt='cross'
										className='position-absolute cross img-fluid'
										onClick={(e) =>
											removeWishList(item?._id)
										}
									/>
									<div className='wishlist-card-image'>
										<img
											src={item?.images[0]?.url}
											className='img-fluid w-100'
											alt='watch'
										/>
									</div>
									<div className='py-3 px-3'>
										<h5 className='title'>{item?.title}</h5>
										<h6 className='price'>
											{new Intl.NumberFormat().format(
												item?.price
											)}
											đ
										</h6>
									</div>
								</div>
							</div>
						))}
				</div>
			</Container>
		</>
	);
};

export default Wishlist;
