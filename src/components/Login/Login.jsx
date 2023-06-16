import { useState } from "react";
import { useDispatch } from "react-redux";
import useFetch from "../../hooks/useFetch";
import { setIsLoading, showModal } from "../../features/modalSlice";
import {
  loginService,
  loginWithGoogleService,
} from "../../services/authServices";
import DataList from "../DataList/DataList";
import { GoogleLogin } from "@react-oauth/google";
import { login, loginWithGoogle } from "../../features/userSlice";
import { Link } from "react-router-dom";

const initialForm = {
  email: "",
  password: "",
};

const Login = ({ setIsRegistering }) => {
  const [form, setForm] = useState(initialForm);
  const { email, password } = form;

  const dispatch = useDispatch();
  const customFetch = useFetch();

  const updateForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addShakeClass = () => {
    const formElement = document.querySelector("#shaker");
    formElement.classList.add("shake");

    setTimeout(() => {
      formElement.classList.remove("shake");
    }, 1000);
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      addShakeClass();
      dispatch(showModal({ msg: "All fields are required" }));
      return;
    }
    // if (!validateEmail(email)) {
    //   addShakeClass();
    //   return;
    // }

    dispatch(setIsLoading(true));
    const data = await customFetch(loginService, { email, password });
    if (data) dispatch(login(data));
    dispatch(setIsLoading(false));
  };

  const googleLogin = async ({ credential }) => {
    dispatch(setIsLoading(true));
    const data = await customFetch(loginWithGoogleService, {
      userToken: credential,
    });
    console.log("data", data);
    if (data) dispatch(loginWithGoogle(data));
    dispatch(setIsLoading(false));
  };

  return (
    <div id="shaker">
      <form onSubmit={loginHandler} className="form login">
        <div className="input-box">
          <input
            type="text"
            //type="email"
            name="email"
            required
            value={email}
            onChange={updateForm}
          />
          <span className="label">Email</span>
          <div className="input-line"></div>
          <DataList
            email={email}
            setEmail={(email) => setForm((form) => ({ ...form, email }))}
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={updateForm}
          />
          <span className="label">Password</span>
          <div className="input-line"></div>
        </div>
        <button className="btn" type="submit">
          Login
        </button>
        or
        <GoogleLogin
          className="google-login"
          onSuccess={googleLogin}
          onError={() => {
            console.log("Login Failed");
            dispatch(showModal({ msg: "Oops! Something went wrong" }));
          }}
        />
        <p>
          Don't have an account? <br />
          <span onClick={() => setIsRegistering(true)}>Register</span>
        </p>
        <Link to="/forgot" className="forgot-password">
          Forgot Password?
        </Link>
      </form>
    </div>
  );
};

export default Login;
