import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { sendAutomatedEmail } from '../../features/emailSlice';
import { showModal } from '../../features/modalSlice';
import "./ChangePassword.scss";

const initialState = {
    oldPassword: "",
    password: "",
    password2: ""
}

const ChangePassword = () => {
    useRedirectLoggedOutUser('/login');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const { oldPassword, password, password2 } = formData;

    //const { isLoading, user } = useSelector(store => store.user);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const userData = {
        oldPassword,
        password,
        userId: user?._id
    };

    const updatePassword =  async (e) => {
        e.preventDefault();

        if (!oldPassword || !password || !password2) {
            dispatch(showModal({ msg: "All fields are required" }));
        }

        if (password !== password2) {
            dispatch(showModal({ msg: "Passwords do not match" }));
        }

        const emailData = {
            subject: 'Password Changed - Musiane',
            send_to: user.email,
            reply_to: 'noreply@musiane.com',
            template: 'changePassword',
            url: '/forgot'
        }

        // await dispatch(changePassword(userData));
        // await dispatch(sendAutomatedEmail(emailData));
        // await dispatch(logout());
        // dispatch(RESET_AUTH());
        navigate("/");
    };

  return (
    <>
        <section>
            <div className="container">
                <h2>Change Password</h2>
                <div className="--flex-start change-password">
                    <div>
                            <form onSubmit={updatePassword}>
                                <span>
                                    <label>Current Password:</label>
                                    <PasswordInput 
                                        placeholder="Old Password"
                                        name="oldPassword"
                                        value={oldPassword}
                                        onChange={handleInputChange}
                                    />
                                </span>
                                <span>
                                    <label>New Password:</label>
                                    <PasswordInput 
                                        placeholder="Password"
                                        name="password"
                                        value={password}
                                        onChange={handleInputChange}
                                    />
                                </span>
                                <span>
                                    <label>Confirm New Password</label>
                                    <PasswordInput 
                                        placeholder="Confirm Password"
                                        name="password2"
                                        value={password2}
                                        onChange={handleInputChange}
                                    />
                                </span>
                                    {/* {isLoading ? (
                                        <Spinner />
                                    ) : ( */}
                                        <button type="submit" className="btn"> 
                                            Change Password
                                        </button>
                                    {/* )} */}
                            </form>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
}

export default ChangePassword;