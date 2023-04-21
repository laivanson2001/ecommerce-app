import React from "react";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
	getMonthlyOrders,
	getOrders,
	getYearlyTotalOrders,
} from "../features/auth/authSlice";
import { useState } from "react";

const columns = [
	{
		title: "Mã đơn hàng",
		dataIndex: "_id",
	},
	{
		title: "Họ tên",
		dataIndex: "name",
	},
	{
		title: "Số sản phẩm",
		dataIndex: "count",
	},
	{
		title: "Tổng tiền",
		dataIndex: "price",
	},
	{
		title: "Tổng tiền sau giảm giá",
		dataIndex: "dprice",
	},
	{
		title: "Trạng thái",
		dataIndex: "status",
	},
];

const Dashboard = () => {
	const dispatch = useDispatch();

	const { monthlyOrders, yearlyOrders, orders } = useSelector(
		(state) => state.auth
	);

	const [dataMonthly, setDataMonthly] = useState([]);
	const [orderData, setOrderData] = useState([]);

	const config = {
		data: dataMonthly,
		xField: "type",
		yField: "income",
		color: ({ type }) => {
			return "#ffd333";
		},
		label: {
			position: "middle",
			style: {
				fill: "#FFFFFF",
				opacity: 1,
			},
		},
		xAxis: {
			label: {
				autoHide: true,
				autoRotate: false,
			},
		},
		meta: {
			type: {
				alias: "Tháng",
			},
			sales: {
				alias: "Doanh thu",
			},
		},
	};

	useEffect(() => {
		dispatch(getMonthlyOrders());
		dispatch(getYearlyTotalOrders());
		dispatch(getOrders());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		let month = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		let data = [];
		let monthlyOrderCount = [];
		for (let index = 0; index < monthlyOrders?.length; index++) {
			const element = monthlyOrders[index];
			data.push({
				type: month[element._id.month],
				income: element.amount,
			});
			monthlyOrderCount.push({
				type: month[element._id.month],
				sales: element.count,
			});
		}
		setDataMonthly(data);
	}, [monthlyOrders]);

	useEffect(() => {
		const data = [];
		for (let i = 0; i < orders.length; i++) {
			data.push({
				_id: orders[i]._id,
				name: orders[i].user.name,
				count: orders[i].orderItems.length,
				product: 32,
				price: orders[i].totalPrice,
				dprice: orders[i].totalPriceAfterDiscount,
				status: orders[i].orderStatus === "Ordered" ? "Đã đặt" : "",
			});
		}
		setOrderData(data);
	}, [orders]);

	return (
		<div>
			<h3 className='mb-4 title'>Dashboard</h3>
			<div className='d-flex justify-content-between align-items-center gap-3'>
				<div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3'>
					<div>
						<p className='desc'>Doanh thu</p>
						<h4 className='mb-0 sub-title'>
							{yearlyOrders &&
								new Intl.NumberFormat().format(
									yearlyOrders[0].amount
								)}
							đ
						</h4>
					</div>
					<div className='d-flex flex-column align-items-end'>
						<p className='mb-0  desc'>Năm 2023</p>
					</div>
				</div>
				<div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3'>
					<div>
						<p className='desc'>Số đơn</p>
						<h4 className='mb-0 sub-title'>
							{yearlyOrders && yearlyOrders[0].count}
						</h4>
					</div>
					<div className='d-flex flex-column align-items-end'>
						<p className='mb-0  desc'>Năm 2023</p>
					</div>
				</div>
			</div>
			<div className='mt-4'>
				<h3 className='mb-5 title'>Thống kê doanh thu</h3>
				<div>
					<Column {...config} />
				</div>
			</div>
			<div className='mt-4'>
				<h3 className='mb-5 title'>Recent Orders</h3>
				<div>
					<Table columns={columns} dataSource={orderData} />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
