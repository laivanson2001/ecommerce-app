import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import BlogCard from "../components/BlogCard";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlide";

const Blog = () => {
	const dispatch = useDispatch();
	const blogState = useSelector((state) => state.blog.blog);
	const getBlogs = () => {
		dispatch(getAllBlogs());
	};
	useEffect(() => {
		getBlogs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<Meta title={"Tin tức"} />
			<BreadCrumb title='Tin tức' />
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
						<div className='row'>
							{blogState.length !== 0 &&
								blogState.map((item, index) => (
									<div className='col-6 mb-3' key={index}>
										<BlogCard item={item} />
									</div>
								))}
						</div>
					</div>
				</div>
			</Container>
		</>
	);
};

export default Blog;
