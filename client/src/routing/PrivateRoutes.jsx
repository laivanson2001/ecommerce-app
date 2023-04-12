import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
	const getTokenFromLocalStorage = JSON.parse(
		localStorage.getItem("customer")
	);
	return (
		<>
			{getTokenFromLocalStorage?.token !== undefined ? (
				<Outlet />
			) : (
				<Navigate to='/login' replace />
			)}
		</>
	);
};

export default PrivateRoutes;
