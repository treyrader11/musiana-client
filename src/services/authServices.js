import extractParams from "../utils/extractParams";
import axiosConfig from "./axiosConfig";

const registerService = async (formData = {}) => {
	const params = extractParams(formData, "name", "email", "password");
	const { data } = await axiosConfig.post("/auth/register", params);
	return data;
};

const getLoginStatusService = async () => {
	const { data } = await axiosConfig.get("auth/loginStatus");
	return data;
};

const getUserService = async (userId) => {
	const { data } = await axiosConfig("/auth/getUser", userId);
	console.log("get user:", data);
	return data;
};

const loginService = async (formData = {}) => {
	const params = extractParams(formData, "email", "password");
	const { data } = await axiosConfig.post("/auth/login", params);
	return data;
};

const logoutService = async () => {
	const { data } = await axiosConfig.get("/auth/logout");
	return data.message;
};

const loginWithGoogleService = async userToken => {
	const { data } = await axiosConfig.post("/auth/google/callback", userToken);
	return data;
};

const sendVerificationEmailService = async () => {
	const { data } = await axiosConfig.post("/auth/sendVerificationEmail");
	console.log('data', data);
	return data;
};

const verifyUserService = async verificationToken => {
	const { data } = await axiosConfig.patch(`/auth/verifyUser/${verificationToken}`);
	return data;
 };

export { 
	getLoginStatusService,
	registerService, 
	getUserService,
	loginService,
	logoutService, 
	loginWithGoogleService, 
	sendVerificationEmailService,
	verifyUserService, 
};
