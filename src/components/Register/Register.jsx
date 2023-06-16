import { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsLoading, showModal } from "../../features/modalSlice";
import { login, sendVerificationEmail } from "../../features/userSlice";
import useFetch from "../../hooks/useFetch";
import { registerService } from "../../services/authServices";
import DataList from "../DataList/DataList";

const initialForm = { email: "", name: "", password: "", confirmPassword: "" };

const Register = ({ setIsRegistering }) => {
  const [form, setForm] = useState(initialForm);
  const { email, name, password, confirmPassword } = form;

  const dispatch = useDispatch();
  const customFetch = useFetch();

  const registerHandler = async (e) => {
    e.preventDefault();
    dispatch(setIsLoading(true));
    const data = await customFetch(registerService, form);
    if (data) {
      dispatch(login(data));
      console.log("data", data);
      dispatch(sendVerificationEmail({ customFetch, userId: data.id }));
      dispatch(
        showModal({ msg: "Please check your email for a verification link." })
      );
    }
    dispatch(setIsLoading(false));
  };

  const updateForm = (e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  };

  return (
    <form onSubmit={registerHandler} className="form register">
      <div className="input-box">
        <input
          //type="email"
		  type="text"
          name="email"
          value={email}
          required
          onChange={updateForm}
        />
        <span className="label">Email</span>
        <div className="input-line"></div>
        <DataList
          email={email}
          setEmail={(value) => setForm((form) => ({ ...form, email: value }))}
        />
      </div>

      <div className="input-box">
        <input
          type="text"
          name="name"
          value={name}
          required
          onChange={updateForm}
        />
        <span className="label">Username</span>
        <div className="input-line"></div>
      </div>

      <div className="input-box">
        <input
          type="password"
          name="password"
          value={password}
          required
          onChange={updateForm}
        />
        <span className="label">Password</span>
        <div className="input-line"></div>
      </div>

      <div className="input-box">
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          required
          onChange={updateForm}
        />
        <span className="label">Confirm Password</span>
        <div className="input-line"></div>
      </div>

      <button className="btn" type="submit">
        Register
      </button>
      <p>
        Already have an account?{" "}
        <span onClick={() => setIsRegistering(false)}>Login</span>
      </p>
    </form>
  );
};

export default Register;
