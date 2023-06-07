import React from "react";
import { useNavigate } from "react-router";
import "./notfound.css";

const NotFound = () => {
	const navigate = useNavigate();
	return (
		<div className="notfound">
            <div className="container" data-text="404">
                <div className="title glitch" data-text="404">
                    404
                </div>
                <div className="description glitch" data-text="PAGE NOT FOUND">
                    PAGE NOT FOUND
                </div>
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
		</div>
	);
};

export default NotFound;
