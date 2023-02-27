import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import About from "./pages/About";
import Blog from "./pages/Blog";
import CompareProduct from "./pages/CompareProduct";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OurStore from "./pages/OurStore";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";
import SingleBlog from "./pages/SingleBlog";
import Wishlist from "./pages/Wishlist";

function App() {
	return (
		<BrowserRouter>
			<HelmetProvider>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route index element={<Home />} />
						<Route path='about' element={<About />} />
						<Route path='contact' element={<Contact />} />
						<Route path='product' element={<OurStore />} />
						<Route path='blogs' element={<Blog />} />
						<Route path='blog/:id' element={<SingleBlog />} />
						<Route
							path='compare-product'
							element={<CompareProduct />}
						/>
						<Route path='wishlist' element={<Wishlist />} />
						<Route path='login' element={<Login />} />
						<Route
							path='forgot-password'
							element={<ForgotPassword />}
						/>
						<Route path='signup' element={<Signup />} />
						<Route
							path='reset-password'
							element={<ResetPassword />}
						/>
					</Route>
				</Routes>
			</HelmetProvider>
		</BrowserRouter>
	);
}

export default App;
