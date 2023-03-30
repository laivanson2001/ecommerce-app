import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getABlog } from "../features/blogs/blogSlide";

const SingleBlog = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const blogState = useSelector((state) => state.blog.singleBlog);
	const getSingleBlog = () => {
		dispatch(getABlog(id));
	};
	useEffect(() => {
		getSingleBlog();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
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
							<h3 className='title'>{blogState.title}</h3>
							<img
								src={blogState.images[0].url}
								className='img-fluid w-100 my-4'
								alt='blog'
							/>
							<p
								dangerouslySetInnerHTML={{
									__html: blogState.description,
								}}
							></p>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
};

export default SingleBlog;
