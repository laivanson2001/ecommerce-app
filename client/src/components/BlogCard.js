import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const BlogCard = ({ item }) => {
	return (
		<div className='blog-card'>
			<div className='card-image'>
				<img
					src={item?.images[0]?.url}
					className='img-fluid w-100'
					alt='blog'
				/>
			</div>
			<div className='blog-content'>
				<p className='date'>
					{moment(item?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
				</p>
				<h5 className='title'>{item?.title}</h5>
				<p
					className='desc'
					dangerouslySetInnerHTML={{
						__html: item?.description.substr(0, 70) + "...",
					}}
				></p>
				<Link to={`/blog/${item?._id}`} className='button'>
					Xem thêm
				</Link>
			</div>
		</div>
	);
};

export default BlogCard;
