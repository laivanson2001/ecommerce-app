import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteABrand,
	getBrands,
	resetState,
} from "../features/brand/brandSlice";
import CustomModal from "../components/CustomModal";

const columns = [
	{
		title: "STT",
		dataIndex: "key",
	},
	{
		title: "Thương hiệu",
		dataIndex: "name",
		sorter: (a, b) => a.name.length - b.name.length,
	},
	{
		title: "Thao tác",
		dataIndex: "action",
	},
];

const BrandList = () => {
	const [open, setOpen] = useState(false);
	const [brandId, setbrandId] = useState("");
	const showModal = (e) => {
		setOpen(true);
		setbrandId(e);
	};

	const hideModal = () => {
		setOpen(false);
	};
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(resetState());
		dispatch(getBrands());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const brandState = useSelector((state) => state.brand.brands);
	const data1 = [];
	for (let i = 0; i < brandState.length; i++) {
		data1.push({
			key: i + 1,
			name: brandState[i].title,
			action: (
				<>
					<Link
						to={`/admin/thuong-hieu/${brandState[i]._id}`}
						className=' fs-3 text-danger'
					>
						<BiEdit />~
					</Link>
					<button
						className='ms-3 fs-3 text-danger bg-transparent border-0'
						onClick={() => showModal(brandState[i]._id)}
					>
						<AiFillDelete />
					</button>
				</>
			),
		});
	}
	const deleteBrand = (e) => {
		dispatch(deleteABrand(e));

		setOpen(false);
		setTimeout(() => {
			dispatch(getBrands());
		}, 200);
	};
	return (
		<div>
			<h3 className='mb-4 title'>Danh sách thương hiệu</h3>
			<div>
				<Table columns={columns} dataSource={data1} />
			</div>
			<CustomModal
				hideModal={hideModal}
				open={open}
				performAction={() => {
					deleteBrand(brandId);
				}}
				title='Bạn chắc chắn muốn xóa thương hiệu này?'
			/>
		</div>
	);
};

export default BrandList;
