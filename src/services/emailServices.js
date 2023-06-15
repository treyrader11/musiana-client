import axiosConfig from "./axiosConfig";

const sendAutomatedEmailService = async (emailData) => {
    const { data } = await axiosConfig.post("/auth/sendAutomatedEmail", emailData);
    console.log('data:', data);
    return data;
};

export { sendAutomatedEmailService };
