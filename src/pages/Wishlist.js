import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import watch from "../images/watch.jpg";

const Wishlist = () => {
	return (
		<>
			<Meta title={"Yêu thích"} />
			<BreadCrumb title='Yêu thích' />
			<Container class1='wishlist-wrapper home-wrapper-2 py-5'>
				<div className='row'>
					<div className='col-3'>
						<div className='wishlist-card position-relative'>
							<img
								src='images/cross.svg'
								alt='cross'
								className='position-absolute cross img-fluid'
							/>
							<div className='wishlist-card-image'>
								<img
									src={watch}
									className='img-fluid w-100'
									alt='watch'
								/>
							</div>
							<div className='py-3 px-3'>
								<h5 className='title'>Smart Watch Pro</h5>
								<h6 className='price'>2.000.000đ</h6>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
};

export default Wishlist;
