import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/cutomers/customerSlice";
const columns = [
	{
		title: "STT",
		dataIndex: "key",
	},
	{
		title: "Họ tên",
		dataIndex: "name",
		sorter: (a, b) => a.name.length - b.name.length,
	},
	{
		title: "Email",
		dataIndex: "email",
	},
	{
		title: "SDT",
		dataIndex: "mobile",
	},
];

const Customers = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUsers());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const customerstate = useSelector((state) => state.customer.customers);
	const data = [];
	for (let i = 0; i < customerstate.length; i++) {
		if (customerstate[i].role !== "admin") {
			data.push({
				key: i + 1,
				name: customerstate[i].name,
				email: customerstate[i].email,
				mobile: customerstate[i].mobile,
			});
		}
	}

	return (
		<div>
			<h3 className='mb-4 title'>Khách hàng</h3>
			<div>
				<Table columns={columns} dataSource={data} />
			</div>
		</div>
	);
};

export default Customers;
