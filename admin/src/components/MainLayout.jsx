import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
	AiOutlineBgColors,
	AiOutlineDashboard,
	AiOutlineLogout,
	AiOutlineShoppingCart,
	AiOutlineUser,
} from "react-icons/ai";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { RiCouponLine } from "react-icons/ri";
import { ImBlog } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const navigate = useNavigate();
	return (
		<Layout>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className='logo'>
					<h2 className='text-white fs-5 text-center py-3 mb-0'>
						<span className='sm-logo'>AD</span>
						<span className='lg-logo'>Atomic Dev</span>
					</h2>
				</div>
				<Menu
					theme='dark'
					mode='inline'
					defaultSelectedKeys={[""]}
					onClick={({ key }) => {
						if (key === "dang-xuat") {
							localStorage.clear();
							window.location.reload();
						} else {
							navigate(key);
						}
					}}
					items={[
						{
							key: "",
							icon: <AiOutlineDashboard className='fs-4' />,
							label: "Dashboard",
						},
						{
							key: "khach-hang",
							icon: <AiOutlineUser className='fs-4' />,
							label: "Khách hàng",
						},
						{
							key: "quan-ly",
							icon: <AiOutlineShoppingCart className='fs-4' />,
							label: "Quản lý",
							children: [
								{
									key: "san-pham",
									icon: (
										<AiOutlineShoppingCart className='fs-4' />
									),
									label: "Sản phẩm",
								},
								{
									key: "danh-sach-san-pham",
									icon: (
										<AiOutlineShoppingCart className='fs-4' />
									),
									label: "Danh sách sản phẩm",
								},
								{
									key: "thuong-hieu",
									icon: <SiBrandfolder className='fs-4' />,
									label: "Thương hiệu",
								},
								{
									key: "danh-sach-thuong-hieu",
									icon: <SiBrandfolder className='fs-4' />,
									label: "Danh sách thương hiệu",
								},
								{
									key: "danh-muc",
									icon: <BiCategoryAlt className='fs-4' />,
									label: "Danh mục",
								},
								{
									key: "danh-sach-danh-muc",
									icon: <BiCategoryAlt className='fs-4' />,
									label: "Danh sách danh mục",
								},
								{
									key: "mau-sac",
									icon: (
										<AiOutlineBgColors className='fs-4' />
									),
									label: "Màu sắc",
								},
								{
									key: "danh-sach-mau-sac",
									icon: (
										<AiOutlineBgColors className='fs-4' />
									),
									label: "Danh sách màu sắc",
								},
							],
						},
						{
							key: "don-hang",
							icon: <FaClipboardList className='fs-4' />,
							label: "Đơn hàng",
						},
						{
							key: "tiep-thi",
							icon: <RiCouponLine className='fs-4' />,
							label: "Tiếp thị",
							children: [
								{
									key: "ma-giam-gia",
									icon: <ImBlog className='fs-4' />,
									label: "Mã giảm giá",
								},
								{
									key: "danh-sach-ma-giam-gia",
									icon: <RiCouponLine className='fs-4' />,
									label: "Danh sách mã giảm giá",
								},
							],
						},
						{
							key: "tin-tuc",
							icon: <FaBloggerB className='fs-4' />,
							label: "Tin tức",
							children: [
								{
									key: "tin",
									icon: <ImBlog className='fs-4' />,
									label: "Tin",
								},
								{
									key: "danh-sach-tin",
									icon: <FaBloggerB className='fs-4' />,
									label: "Danh sách tin",
								},
								{
									key: "danh-muc-tin",
									icon: <ImBlog className='fs-4' />,
									label: "Danh mục tin",
								},
								{
									key: "danh-sach-danh-muc-tin",
									icon: <FaBloggerB className='fs-4' />,
									label: "Danh sách danh mục tin",
								},
							],
						},
						{
							key: "ho-tro",
							icon: <FaClipboardList className='fs-4' />,
							label: "Hỗ trợ",
						},
						{
							key: "dang-xuat",
							icon: <AiOutlineLogout className='fs-4' />,
							label: "Đăng xuất",
						},
					]}
				/>
			</Sider>
			<Layout className='site-layout'>
				<Header
					className='d-flex justify-content-between ps-1 pe-5'
					style={{
						padding: 0,
						background: colorBgContainer,
					}}
				>
					{React.createElement(
						collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
						{
							className: "trigger",
							onClick: () => setCollapsed(!collapsed),
						}
					)}
					<div className='d-flex gap-4 align-items-center'>
						<div className='position-relative'>
							<IoIosNotifications className='fs-4' />
							<span className='badge bg-warning rounded-circle p-1 position-absolute'>
								3
							</span>
						</div>

						<div className='d-flex gap-3 align-items-center dropdown'>
							<div>
								<img
									width={32}
									height={32}
									src='https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg'
									alt=''
								/>
							</div>
							<div
								role='button'
								id='dropdownMenuLink'
								data-bs-toggle='dropdown'
								aria-expanded='false'
							>
								<h5 className='mb-0'>Lại Văn Sơn</h5>
								<p className='mb-0'>laivanson.dev@gmail.com</p>
							</div>
							<div
								className='dropdown-menu'
								aria-labelledby='dropdownMenuLink'
							>
								<li>
									<Link
										className='dropdown-item py-1 mb-1'
										style={{
											height: "auto",
											lineHeight: "20px",
										}}
										to='/'
									>
										Trang cá nhân
									</Link>
								</li>
								<li>
									<Link
										className='dropdown-item py-1 mb-1'
										style={{
											height: "auto",
											lineHeight: "20px",
										}}
										to='/'
									>
										Đăng xuất
									</Link>
								</li>
							</div>
						</div>
					</div>
				</Header>
				<Content
					style={{
						margin: "24px 16px",
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
					}}
				>
					<ToastContainer
						position='top-right'
						autoClose={250}
						hideProgressBar={false}
						newestOnTop={true}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						theme='light'
					/>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};

export default MainLayout;
