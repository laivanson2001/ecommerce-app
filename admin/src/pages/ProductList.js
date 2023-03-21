import React, { useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
const columns = [
	{
		title: "STT",
		dataIndex: "key",
	},
	{
		title: "Sản phẩm",
		dataIndex: "title",
		sorter: (a, b) => a.title.length - b.title.length,
	},
	{
		title: "Thương hiệu",
		dataIndex: "brand",
		sorter: (a, b) => a.brand.length - b.brand.length,
	},
	{
		title: "Danh mục",
		dataIndex: "category",
		sorter: (a, b) => a.category.length - b.category.length,
	},
	{
		title: "Màu sắc",
		dataIndex: "color",
	},
	{
		title: "Giá",
		dataIndex: "price",
		sorter: (a, b) => a.price - b.price,
	},
	{
		title: "Thao tác",
		dataIndex: "action",
	},
];

const ProductList = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProducts());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const productState = useSelector((state) => state.product.products);
	const data = [];
	for (let i = 0; i < productState.length; i++) {
		data.push({
			key: i + 1,
			title: productState[i].title,
			brand: productState[i].brand,
			category: productState[i].category,
			color: productState[i].color,
			price: `${productState[i].price}`,
			action: (
				<>
					<Link to='/' className=' fs-3 text-danger'>
						<BiEdit />
					</Link>
					<Link className='ms-3 fs-3 text-danger' to='/'>
						<AiFillDelete />
					</Link>
				</>
			),
		});
	}
	return (
		<div>
			<h3 className='mb-4 title'>Danh sách sản phẩm</h3>
			<div>
				<Table columns={columns} dataSource={data} />
			</div>
		</div>
	);
};

export default ProductList;
