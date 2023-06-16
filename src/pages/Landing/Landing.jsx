import "./landing.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Pricing from "./pricing/Pricing";
import About from "./about/About";
import Team from "./team/Team";
import Content from "./content/Content";
import Navbar from "./navbar/Navbar";
//import ForgotPassword from "../Auth/ForgotPassword";
import Auth from "../Auth/Auth";

const routes = [
  { path: "/", Component: Content },
  { path: "/pricing", Component: Pricing },
  { path: "/team", Component: Team },
  { path: "/about", Component: About },
  { path: "/signup", Component: Auth },
  //{ path: "/forgot", Component: ForgotPassword },
];

const routeComponents = routes.map(({ path, Component }, index) => (
  <Route path={path} key={index} element={<Component />} />
));

export const Landing = () => {
  const location = useLocation();
  const shouldShowNavbar = !["/signup", "/forgot"].includes(location.pathname);

  return (
    <motion.div initial="initial" animate="animate" className="landing">
      <>
        {shouldShowNavbar && <Navbar />}
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
