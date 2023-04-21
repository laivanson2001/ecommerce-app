import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const login = async (user) => {
	const response = await axios.post(`${base_url}user/admin-login`, user);
	if (response.data) {
		localStorage.setItem("user", JSON.stringify(response.data));
	}
	return response.data;
};
const getOrders = async () => {
	const response = await axios.get(`${base_url}user/get-all-orders`, config);

	return response.data;
};

const getOrder = async (id) => {
	const response = await axios.get(`${base_url}user/get-order/${id}`, config);

	return response.data;
};

const getMonthlyOrders = async () => {
	const response = await axios.get(
		`${base_url}user/get-month-wise-order-income`,
		config
	);
	return response.data;
};

const getYearlyTotalOrders = async () => {
	const response = await axios.get(
		`${base_url}user/get-yearly-total-orders`,
		config
	);
	return response.data;
};

const updateOrderStatus = async (data) => {
	const response = await axios.put(
		`${base_url}user/update-order/${data.id}`,
		{
			status: data.status,
		},
		config
	);
	return response.data;
};

const authService = {
	login,
	getOrders,
	getOrder,
	getMonthlyOrders,
	getYearlyTotalOrders,
	updateOrderStatus,
};

export default authService;
