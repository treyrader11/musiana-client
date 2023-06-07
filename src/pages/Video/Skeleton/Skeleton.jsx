import React from "react";
import "./skeleton.css";

const Skeleton = () => {
    return (
        <>

            <div className="video skeleton"></div>
            <div className="info skeleton">
                <div className="info-heading">
                    <div className="profileImg skeleton"></div>
                    <div className="line"></div>
                </div>
                <div className="info-contents">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            </div>
        </>
    )
}

export default Skeleton;