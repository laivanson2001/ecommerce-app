import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteABlog, getBlogs, resetState } from "../features/blogs/blogSlice";
import CustomModal from "../components/CustomModal";

const columns = [
	{
		title: "STT",
		dataIndex: "key",
	},
	{
		title: "Tin",
		dataIndex: "name",
	},
	{
		title: "Danh mục tin",
		dataIndex: "category",
	},
	{
		title: "Thao tác",
		dataIndex: "action",
	},
];

const BlogList = () => {
	const [open, setOpen] = useState(false);
	const [blogId, setblogId] = useState("");
	const showModal = (e) => {
		setOpen(true);
		setblogId(e);
	};

	const hideModal = () => {
		setOpen(false);
	};
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(resetState());
		dispatch(getBlogs());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const getBlogState = useSelector((state) => state.blogs.blogs);
	const data1 = [];
	for (let i = 0; i < getBlogState.length; i++) {
		data1.push({
			key: i + 1,
			name: getBlogState[i].title,
			category: getBlogState[i].category,

			action: (
				<>
					<Link
						to={`/admin/tin/${getBlogState[i].id}`}
						className=' fs-3 text-danger'
					>
						<BiEdit />
					</Link>
					<button
						className='ms-3 fs-3 text-danger bg-transparent border-0'
						onClick={() => showModal(getBlogState[i]._id)}
					>
						<AiFillDelete />
					</button>
				</>
			),
		});
	}
	const deleteBlog = (e) => {
		dispatch(deleteABlog(e));

		setOpen(false);
		setTimeout(() => {
			dispatch(getBlogs());
		}, 200);
	};
	return (
		<div>
			<h3 className='mb-4 title'>Danh sách tin</h3>
			<div>
				<Table columns={columns} dataSource={data1} />
			</div>
			<CustomModal
				hideModal={hideModal}
				open={open}
				performAction={() => {
					deleteBlog(blogId);
				}}
				title='Bạn chắc chắn muốn xóa tin này?'
			/>
		</div>
	);
};

export default BlogList;
