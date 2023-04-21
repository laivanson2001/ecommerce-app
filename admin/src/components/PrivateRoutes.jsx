import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
	const { user } = useSelector((state) => state.auth);
	return <>{user && user.token ? <Outlet /> : <Navigate to='/' />}</>;
};

export default PrivateRoutes;
