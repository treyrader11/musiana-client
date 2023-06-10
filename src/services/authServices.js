import extractParams from "../utils/extractParams";
import axiosConfig from "./axiosConfig";

const registerService = async (formData = {}) => {
	const params = extractParams(formData, "name", "email", "password");
	const { data } = await axiosConfig.post("/auth/register", params);
	return data;
};

const loginService = async (formData = {}) => {
	const params = extractParams(formData, "email", "password");
	const { data } = await axiosConfig.post("/auth/login", params);
	return data;
};

const loginWithGoogleService = async (userToken) => {
	const { data } = await axiosConfig.post("/auth/google/callback", userToken);
	return data;
	//return data.msg;
};

const sendVerificationEmailService = async (email) => {
	const { data } = await axiosConfig.post("/auth/sendVerificationEmail", email);
	return data;
};

const verifyUserService = async (verificationToken) => {
	const { data } = await axiosConfig.patch(`/auth/verifyUser/${verificationToken}`);
	console.log('data', data);
	return data;
 };

export { 
	registerService, 
	loginService,
	loginWithGoogleService, 
	sendVerificationEmailService,
	verifyUserService, 
};
