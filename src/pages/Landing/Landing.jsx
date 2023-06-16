import "./landing.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Pricing from "./pricing/Pricing";
import About from "./about/About";
import Team from "./team/Team";
import Content from "./content/Content";
import Header from "./header/Header";
// import Login from "../Auth/Login";
// import Register from "../Auth/Register";
//import ForgotPassword from "../Auth/ForgotPassword";
import Auth from "../Auth/Auth";

const routes = [
  { path: "/", name: "Content", Component: Content },
  { path: "/pricing", name: "Pricing", Component: Pricing },
  { path: "/team", name: "Team", Component: Team },
  { path: "/about", name: "About", Component: About },
  { path: "/signup", name: "signup", Component: Auth },
  //{ path: "/forgot", name: "forgotPassword", Component: ForgotPassword },
];

const routeComponents = routes.map(({ path, Component, name }, index) => (
  <Route path={path} key={index} element={<Component />} />
));

export const Landing = () => {
  const location = useLocation();
  const shouldShowHeader = !["/signup", "/forgot"].includes(location.pathname);

  return (
    <motion.div initial="initial" animate="animate" className="landing">
      <>
        {shouldShowHeader && <Header />}
        <div className="content">
          <Routes key={location.pathname} location={location}>
            {routeComponents}
          </Routes>
        </div>
      </>
    </motion.div>
  );
};

export default Landing;
