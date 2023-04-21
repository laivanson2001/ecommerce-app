import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CompareProduct from "./pages/CompareProduct";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OurStore from "./pages/OurStore";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ResetPassword from "./pages/ResetPassword";
import ShippingPolicy from "./pages/ShippingPolicy";
import Signup from "./pages/Signup";
import SingleBlog from "./pages/SingleBlog";
import SingleProduct from "./pages/SingleProduct";
import TermAndContions from "./pages/TermAndContions";
import Wishlist from "./pages/Wishlist";
import PrivateRoutes from "./routing/PrivateRoutes";
import Order from "./pages/Order";
import Profile from "./pages/Profile";

function App() {
	return (
		<BrowserRouter>
			<HelmetProvider>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route element={<PrivateRoutes />}>
							<Route path='cart' element={<Cart />} />
							<Route path='checkout' element={<Checkout />} />
							<Route
								path='compare-product'
								element={<CompareProduct />}
							/>
							<Route path='wishlist' element={<Wishlist />} />
							<Route path='my-orders' element={<Order />} />
							<Route path='my-profile' element={<Profile />} />
						</Route>
						<Route index element={<Home />} />
						<Route path='about' element={<About />} />
						<Route path='contact' element={<Contact />} />
						<Route path='product' element={<OurStore />} />
						<Route path='product/:id' element={<SingleProduct />} />
						<Route path='blogs' element={<Blog />} />
						<Route path='blog/:id' element={<SingleBlog />} />

						<Route path='login' element={<Login />} />
						<Route
							path='forgot-password'
							element={<ForgotPassword />}
						/>
						<Route path='signup' element={<Signup />} />
						<Route
							path='reset-password/:token'
							element={<ResetPassword />}
						/>
						<Route
							path='privacy-policy'
							element={<PrivacyPolicy />}
						/>
						<Route
							path='term-conditions'
							element={<TermAndContions />}
						/>
						<Route
							path='shipping-policy'
							element={<ShippingPolicy />}
						/>
					</Route>
				</Routes>
			</HelmetProvider>
		</BrowserRouter>
	);
}

export default App;
