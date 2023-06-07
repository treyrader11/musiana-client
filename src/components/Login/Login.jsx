import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useFetch from "../../hooks/useFetch";
import { setIsLoading, showModal } from "../../features/modalSlice";
import { loginService, loginWithGoogleService } from "../../services/authServices";
import DataList from "../DataList/DataList";
import { GoogleLogin } from "@react-oauth/google";
import { login } from "../../features/userSlice";

const Login = ({ setIsRegistering }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const customFetch = useFetch();

	const loginHandler = async e => {
		e.preventDefault();
		dispatch(setIsLoading(true));
		const data = await customFetch(loginService, { email, password });
		if (data) dispatch(login(data));
		dispatch(setIsLoading(false));
	};

	const guestHandler = () => {
		dispatch(login({ id: "guest", isGuest: true }));
	};

	const googleLogin = async ({ credential }) => {
		dispatch(setIsLoading(true));
		const data = await customFetch(loginWithGoogleService, ({ userToken: credential }));
		if (data) dispatch(login(data));
		dispatch(setIsLoading(false));
    };

	return (
		<form onSubmit={loginHandler} className="login">
			<div className="email">
				<label htmlFor="login-email">Email</label>
				<input
					type="email"
					id="login-email"
					placeholder="johndoe@example.com"
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<DataList email={email} setEmail={setEmail} />
			</div>
			<label htmlFor="login-password">Password</label>
			<input
				type="password"
				id="login-password"
				placeholder="Top secret"
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
			<button className="btn" type="submit">Login</button>
			or
			<button className="google-login btn">
				<GoogleLogin
					className="google-login"
					onSuccess={googleLogin}
					onError={() => {
						console.log("Login Failed")
						dispatch(showModal({ msg: "Oops! Something went wrong" }))
					}}
				/>
			</button>
			<p>
				Don't have an account? <br />
				<span onClick={() => setIsRegistering(true)}>Register</span> or{" "}
				<span onClick={guestHandler}>Continue as a guest</span>
			</p>
		</form>
	);
};

export default Login;
