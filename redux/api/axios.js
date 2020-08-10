import axios from "axios";
import CookieServices from "../services/cookie.service";

const handleRequestSend = (config) => {
	// Set token
	const token = CookieServices.getToken();
	if (!!token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
};

const handleRequestError = (error) => {
	return Promise.reject(error);
};

const handleResponseReceive = (response) => {
	// Status Code 2xx
	console.log("Axios Response");
	return response.data;
};

const handleResponseError = (error) => {
	// Status Code 4xx
	console.log("Axios Response Error");
	return Promise.reject(error.response);
};

const API = axios.create({
	baseURL: "http://api-bukitroyal.kiplikipli.my.id/api/v1",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

API.interceptors.request.use(handleRequestSend, handleRequestError);
API.interceptors.response.use(handleResponseReceive, handleResponseError);

export default API;