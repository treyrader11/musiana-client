import "./header.scss";
import { motion } from "framer-motion";
import { IconContext } from "react-icons";
import { NavLink, useNavigate } from "react-router-dom";
//import icon from "../../../assets/icons/Louisiana icon teal.webp";

let easeing = [0.6, -0.05, 0.01, 0.99];

const stagger = {
  animate: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

const header = {
  initial: {
    y: -60,
    opacity: 0,
    transition: { duration: 0.05, ease: easeing },
  },
  animate: {
    y: 0,
    opacity: 1,
    animation: {
      duration: 0.6,
      ease: easeing,
    },
  },
};

const navLinks = [
  { path: "/about", name: "ABOUT" },
  { path: "/pricing", name: "PRICING" },
  { path: "/team", name: "TEAM" },
];

const Header = () => {
  const navigate = useNavigate();
  const goHome = () => navigate("/");

  return (
    <motion.header variants={stagger}>
      {/* <motion.icon className="icon">
        <img src={icon} height="80" width="114" />
      </motion.icon> */}
      <motion.div
        className="logo_wrapper icon"
        variants={header}
        onClick={goHome}
      >
        m<span>US</span>iana
      </motion.div>
      <motion.div className="menu_container" variants={stagger}>
        {navLinks.map(({ path, name }, index) => (
          <motion.span key={`${name}_${index}`} variants={header}>
            <NavLink to={path}>
              <IconContext.Provider
                value={{
                  color: "#000",
                  size: "18px",
                  className: "icons_container",
                }}
              >
                {name}
              </IconContext.Provider>
              {/* Need to read on IconContext.Provider */}
            </NavLink>
          </motion.span>
        ))}
        <motion.span className="menu" variants={header}>
          <span></span>
          <span></span>
          <span></span>
        </motion.span>
      </motion.div>
    </motion.header>
  );
};

export default Header;
