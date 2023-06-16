import { Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Route, Routes } from "react-router-dom";
import { setEditingPost } from "../features/postSlice";
import { useState } from "react";
import Appbar from "../components/Appbar/Appbar";
import Backdrop from "../components/Backdrop/Backdrop";
import EditPost from "../components/EditPost/EditPost";
import ProtectedRoute from "./ProtectedRoute";
import ProgressBar from "react-topbar-progress-indicator";
import ThemeSwitch from "../components/ThemeSwitch/ThemeSwitch";

const Home = lazy(() => import("../pages/Home/Home"));
const SinglePost = lazy(() => import("../pages/Singlepost/SinglePost"));
const Verify = lazy(() => import("../pages/Auth/Verify"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const Videos = lazy(() => import("../pages/Video/Videos"));
const Video = lazy(() => import("../pages/Video/Video"));
const Chat = lazy(() => import("../pages/Chat/Chat"));
const MessengerPage = lazy(() => import("../pages/Messenger/Messenger"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

const Layout = () => {
  const [theme, setTheme] = useState("dark");
  const {
    post: { editingPost },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const closeEditing = () => {
    dispatch(setEditingPost({}));
  };

  return (
    <div className={"app " + theme}>
      <div className="container">
        <ThemeSwitch setTheme={setTheme} />
        <Backdrop show={!!editingPost._id} onClose={closeEditing}>
          <EditPost close={closeEditing} />
        </Backdrop>
        <Appbar />
        <Suspense fallback={<ProgressBar />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

const Router = () => {
  const authenticate = (Comp) => (
    <ProtectedRoute>
      <Comp />
    </ProtectedRoute>
  );
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={authenticate(Home)} />
        <Route path="/post/:id" element={authenticate(SinglePost)} />
        <Route path="/verify/:verificationToken" element={<Verify />} />
        <Route path="/user/:id" element={authenticate(Profile)} />
        <Route path="/videos" element={<Videos type="all" />} />
        <Route path="/video/:id" element={authenticate(Video)} />
        <Route path="/chat" element={authenticate(Chat)} />
        <Route path="/chat/messenger" element={authenticate(MessengerPage)} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Router;
