import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import blog from "../images/blog-1.jpg";

const SingleBlog = () => {
	return (
		<>
			<Meta title={"Lorem ipsum"} />
			<BreadCrumb title='Lorem ipsum' />
			<Container class1='blog-wrapper home-wrapper-2 py-5'>
				<div className='row'>
					<div className='col-3'>
						<div className='filter-card mb-3'>
							<h3 className='filter-title'>Danh mục</h3>
							<div>
								<ul className='ps-0'>
									<li>Đồng hồ</li>
									<li>TV</li>
									<li>Máy ảnh</li>
									<li>Laptop</li>
								</ul>
							</div>
						</div>
					</div>
					<div className='col-9'>
						<div className='single-blog-card'>
							<h3 className='title'>
								Lorem ipsum dolor sit amet.
							</h3>
							<img
								src={blog}
								className='img-fluid w-100 my-4'
								alt='blog'
							/>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipisicing elit. Quo beatae quidem iste
								similique commodi. Alias excepturi totam omnis,
								veritatis repudiandae ab fugiat odit qui
								praesentium? Rem dolore ad numquam officiis.
							</p>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
};

export default SingleBlog;
