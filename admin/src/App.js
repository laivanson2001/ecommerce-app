import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Enquiries from "./pages/Enquiries";
import BlogList from "./pages/BlogList";
import CategoryBlogList from "./pages/CategoryBlogList";
import ViewEnq from "./pages/ViewEnq";
import AddBlog from "./pages/AddBlog";
import CouponList from "./pages/CouponList";
import AddCoupon from "./pages/AddCoupon";
import AddCategoryBlog from "./pages/AddCategoryBlog";
import Orders from "./pages/Orders";
import ViewOrder from "./pages/ViewOrder";
import Customers from "./pages/Customers";
import ColorList from "./pages/ColorList";
import AddColor from "./pages/AddColor";
import CategoryList from "./pages/CategoryList";
import AddCategory from "./pages/AddCategory";
import BrandList from "./pages/BrandList";
import AddBrand from "./pages/AddBrand";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/dat-lai-mat-khau' element={<ResetPassword />} />
				<Route path='/quen-mat-khau' element={<ForgotPassword />} />
				<Route path='/admin' element={<MainLayout />}>
					<Route index element={<Dashboard />} />
					<Route path='ho-tro' element={<Enquiries />} />
					<Route path='ho-tro/:id' element={<ViewEnq />} />
					<Route path='danh-sach-tin' element={<BlogList />} />
					<Route path='tin' element={<AddBlog />} />
					<Route path='tin/:id' element={<AddBlog />} />
					<Route
						path='danh-sach-ma-giam-gia'
						element={<CouponList />}
					/>
					<Route path='ma-giam-gia' element={<AddCoupon />} />
					<Route path='ma-giam-gia/:id' element={<AddCoupon />} />
					<Route
						path='danh-sach-danh-muc-tin'
						element={<CategoryBlogList />}
					/>
					<Route path='danh-muc-tin' element={<AddCategoryBlog />} />
					<Route
						path='danh-muc-tin/:id'
						element={<AddCategoryBlog />}
					/>
					<Route path='don-hang' element={<Orders />} />
					<Route path='don-hang/:id' element={<ViewOrder />} />
					<Route path='khach-hang' element={<Customers />} />
					<Route path='danh-sach-mau-sac' element={<ColorList />} />
					<Route path='mau-sac' element={<AddColor />} />
					<Route path='mau-sac/:id' element={<AddColor />} />
					<Route
						path='danh-sach-danh-muc'
						element={<CategoryList />}
					/>
					<Route path='danh-muc' element={<AddCategory />} />
					<Route path='danh-muc/:id' element={<AddCategory />} />
					<Route
						path='danh-sach-thuong-hieu'
						element={<BrandList />}
					/>
					<Route path='thuong-hieu' element={<AddBrand />} />
					<Route path='thuong-hieu/:id' element={<AddBrand />} />
					<Route
						path='danh-sach-san-pham'
						element={<ProductList />}
					/>
					<Route path='san-pham' element={<AddProduct />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
