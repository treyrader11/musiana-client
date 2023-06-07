import React from "react";
import "./avatar.scss";
import { dp } from "../../assets";

const Avatar = ({ userDetails, alt, size }) => {
  return (
    <div className="avatar">
        <img 
            className="user__dp"
            src={userDetails.profileImage || dp} 
            alt={alt ? alt : "profileImage"} 
            width={size} 
        />
    </div>
  )
}

export default Avatar;