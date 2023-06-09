import extractParams from "../utils/extractParams";
import axiosConfig from "./axiosConfig";

const sendAutomatedEmailService = async (emailData) => {
    const { data } = await axiosConfig.post("/auth/sendAutomatedEmail", emailData);
    console.log('data:', data);
    return data.message;
 };

// const sendVerificationEmailService = async () => {
//     const { data } = await axiosConfig.post("/auth/sendVerificationEmail");
//     console.log('data', data);
//     return data.message;
// };

export { sendAutomatedEmailService };
