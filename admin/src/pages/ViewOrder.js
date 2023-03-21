import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrderByUser } from "../features/auth/authSlice";
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
		title: "Tổng tiền",
		dataIndex: "amount",
	},
	{
		title: "Ngày",
		dataIndex: "date",
	},

	{
		title: "Thao tác",
		dataIndex: "action",
	},
];

const ViewOrder = () => {
	const location = useLocation();
	const userId = location.pathname.split("/")[3];
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getOrderByUser(userId));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const orderState = useSelector((state) => state.auth.orders[0].products);
	console.log(orderState);
	const data1 = [];
	for (let i = 0; i < orderState.length; i++) {
		data1.push({
			key: i + 1,
			name: orderState[i].product.title,
			brand: orderState[i].product.brand,
			count: orderState[i].count,
			amount: orderState[i].product.price,
			color: orderState[i].product.color,
			date: new Date(orderState[i].product.createdAt).toLocaleString(),
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
			<h3 className='mb-4 title'>Xem đơn hàng</h3>
			<div>
				<Table columns={columns} dataSource={data1} />
			</div>
		</div>
	);
};

export default ViewOrder;
