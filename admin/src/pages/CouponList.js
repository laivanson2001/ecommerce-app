import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteACoupon,
	getAllCoupon,
	resetState,
} from "../features/coupon/couponSlice";
import CustomModal from "../components/CustomModal";

const columns = [
	{
		title: "STT",
		dataIndex: "key",
	},

	{
		title: "Mã giảm giá",
		dataIndex: "name",
		sorter: (a, b) => a.name.length - b.name.length,
	},
	{
		title: "Giảm giá %",
		dataIndex: "discount",
		sorter: (a, b) => a.discount - b.discount,
	},
	{
		title: "Hết hạn",
		dataIndex: "expiry",
		sorter: (a, b) => a.name.length - b.name.length,
	},
	{
		title: "Thao tác",
		dataIndex: "action",
	},
];

const CouponList = () => {
	const [open, setOpen] = useState(false);
	const [couponId, setcouponId] = useState("");
	const showModal = (e) => {
		setOpen(true);
		setcouponId(e);
	};

	const hideModal = () => {
		setOpen(false);
	};
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(resetState());
		dispatch(getAllCoupon());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const couponState = useSelector((state) => state.coupon.coupons);
	const data1 = [];
	for (let i = 0; i < couponState.length; i++) {
		data1.push({
			key: i + 1,
			name: couponState[i].name,
			discount: couponState[i].discount,
			expiry: new Date(couponState[i].expiry).toLocaleString(),
			action: (
				<>
					<Link
						to={`/admin/ma-giam-gia/${couponState[i]._id}`}
						className=' fs-3 text-danger'
					>
						<BiEdit />
					</Link>
					<button
						className='ms-3 fs-3 text-danger bg-transparent border-0'
						onClick={() => showModal(couponState[i]._id)}
					>
						<AiFillDelete />
					</button>
				</>
			),
		});
	}
	const deleteCoupon = (e) => {
		dispatch(deleteACoupon(e));

		setOpen(false);
		setTimeout(() => {
			dispatch(getAllCoupon());
		}, 200);
	};
	return (
		<div>
			<h3 className='mb-4 title'>Danh sách mã giảm giá</h3>
			<div>
				<Table columns={columns} dataSource={data1} />
			</div>
			<CustomModal
				hideModal={hideModal}
				open={open}
				performAction={() => {
					deleteCoupon(couponId);
				}}
				title='Bạn chắc chắn muốn xóa mã giảm giá này?'
			/>
		</div>
	);
};

export default CouponList;
