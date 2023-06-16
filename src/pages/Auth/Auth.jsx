import React, { useState } from "react";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import "./auth.scss";

const Auth = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <section className={isRegistering ? "auth signup" : "auth"}>
      <div className="card-3d-wrap">
        <Login setIsRegistering={setIsRegistering} />
        <Register setIsRegistering={setIsRegistering} />
      </div>
    </section>
  );
};

export default Auth;
