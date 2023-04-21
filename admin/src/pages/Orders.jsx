import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders, updateOrderStatus } from "../features/auth/authSlice";
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

	const orderState = useSelector((state) => state.auth.orders);

	const data1 = [];
	for (let i = 0; i < orderState.length; i++) {
		data1.push({
			key: i + 1,
			name: orderState[i].user.name,
			product: (
				<Link to={`/admin/don-hang/${orderState[i]._id}`}>
					Xem đơn hàng
				</Link>
			),
			amount:
				new Intl.NumberFormat().format(orderState[i].totalPrice) + "đ",
			date: new Date(orderState[i].createdAt).toLocaleString(),
			action: (
				<>
					<select
						defaultValue={orderState[i].orderStatus}
						className='form-control form-select'
						onChange={(e) =>
							dispatch(
								updateOrderStatus({
									id: orderState[i]._id,
									status: e.target.value,
								})
							)
						}
					>
						<option value='Ordered' disabled>
							Đã đặt
						</option>
						<option value='Processed'>Đã xử lý</option>
						<option value='Shipped'>Đã vận chuyển</option>
						<option value='Out For Delivery'>Đang giao</option>
						<option value='Delivered'>Đã giao</option>
					</select>
				</>
			),
		});
	}

	useEffect(() => {
		dispatch(getOrders());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<h3 className='mb-4 title'>Đơn hàng</h3>
			<div>{<Table columns={columns} dataSource={data1} />}</div>
		</div>
	);
};

export default Orders;
