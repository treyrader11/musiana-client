import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './app/store';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router } from 'react-router-dom';
import axios from "axios";

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
			<Provider store={store}>
				<Router>
					<App />
				</Router>
			</Provider>
		</GoogleOAuthProvider>
	</React.StrictMode>,
);
