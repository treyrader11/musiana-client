import extractParams from "../utils/extractParams";
import axiosConfig from "./axiosConfig";

const loginService = async (formData = {}) => {
	const params = extractParams(formData, "email", "password");
	const { data } = await axiosConfig.post("/auth/login", params);
	return data;
};

const registerService = async (formData = {}) => {
	const params = extractParams(formData, "name", "email", "password", "dob");
	const { data } = await axiosConfig.post("/auth/register", params);
	return data;
};

const loginWithGoogleService = async userToken => {
	const { data } = await axiosConfig.post("/auth/google/callback", userToken);
	return data;
 };

const verifyUserService = async verificationToken => {
	const { data } = await axiosConfig.patch(`/auth/verifyUser/${verificationToken}`);
	return data;
 };

export { 
	loginService, 
	registerService, 
	loginWithGoogleService, 
	verifyUserService, 
};
