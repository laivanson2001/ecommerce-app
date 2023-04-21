import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrder } from "../features/auth/authSlice";
const columns = [
	{
		title: "STT",
		dataIndex: "key",
	},
	{
		title: "Sản phẩm",
		dataIndex: "name",
	},
	{
		title: "Thương hiệu",
		dataIndex: "brand",
	},
	{
		title: "Số lượng",
		dataIndex: "count",
	},
	{
		title: "Màu sắc",
		dataIndex: "color",
	},
	{
		title: "Giá",
		dataIndex: "amount",
	},
	{
		title: "Thao tác",
		dataIndex: "action",
	},
];

const ViewOrder = () => {
	const dispatch = useDispatch();

	const location = useLocation();
	const userId = location.pathname.split("/")[3];

	const { orderItems } = useSelector((state) => state.auth.order);
	const data1 = [];
	for (let i = 0; i < orderItems?.length; i++) {
		data1.push({
			key: i + 1,
			name: orderItems[i].product.title,
			brand: orderItems[i].product.brand,
			count: orderItems[i].quantity,
			amount: orderItems[i].price,
			color: orderItems[i].color.title,
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

	useEffect(() => {
		dispatch(getOrder(userId));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<h3 className='mb-4 title'>Xem đơn hàng</h3>
			<div>
				<Table columns={columns} dataSource={data1} />
			</div>
		</div>
	);
};

export default ViewOrder;
