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
};

const sendVerificationEmailService = async () => {
	const { data } = await axiosConfig.post("/auth/sendVerificationEmail");
	console.log('data', data);
	return data;
};

const verifyUserService = async (verificationToken) => {
	const { data } = await axiosConfig.patch(`/auth/verifyUser/${verificationToken}`);
	return data;
 };

export { 
	registerService, 
	loginService,
	loginWithGoogleService, 
	sendVerificationEmailService,
	verifyUserService, 
};
