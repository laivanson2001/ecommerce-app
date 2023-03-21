import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders } from "../features/auth/authSlice";
const columns = [
	{
		title: "STT",
		dataIndex: "key",
	},
	{
		title: "Họ tên",
		dataIndex: "name",
	},
	{
		title: "Sản phẩm",
		dataIndex: "product",
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

const Orders = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getOrders());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const orderState = useSelector((state) => state.auth.orders);

	const data1 = [];
	for (let i = 0; i < orderState.length; i++) {
		data1.push({
			key: i + 1,
			name: orderState[i].orderBy.name,
			product: (
				<Link to={`/admin/don-hang/${orderState[i].orderBy._id}`}>
					Xem đơn hàng
				</Link>
			),
			amount: orderState[i].paymentIntent.amount,
			date: new Date(orderState[i].createdAt).toLocaleString(),
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
			<h3 className='mb-4 title'>Đơn hàng</h3>
			<div>{<Table columns={columns} dataSource={data1} />}</div>
		</div>
	);
};

export default Orders;
