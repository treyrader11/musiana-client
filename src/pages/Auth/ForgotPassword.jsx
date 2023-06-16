import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
// import { Card } from "../../components/card/Card";
//import { PasswordInput } from "../../components/passwordinput/PasswordInput";
import styles from "./Auth.module.scss";
//import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
//import { forgotPassword, RESET_USER } from "../../features/userSlice";
//import Loader from "../../components/loader/Loader";
//import { validateEmail } from "../../services/authServices";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.auth);

  const forgot = async (e) => {
    e.preventDefault();

    if (!email) {
      //return toast.error("Please enter an email");
    }

    if (!validateEmail(email)) {
      //return toast.error("Please enter a valid email");
    }

    const userData = { email };

    await dispatch(forgotPassword(userData));
    await dispatch(RESET_USER(userData));
  };

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <AiOutlineMail size={35} color="#999" />
          </div>
          <h2>Forgot Password</h2>
          <form onSubmit={forgot}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Get Reset Email
            </button>
            <div className={styles.links}>
              <p>
                <Link to="/">- Home</Link>
              </p>
              <p>
                <Link to="/signup">- Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;
