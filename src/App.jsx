import { useEffect } from "react";
//utilities
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import useFetch from "./hooks/useFetch.js";
import SERVER_URI from "./serverUri";
//redux
import { useDispatch, useSelector } from "react-redux";
import { login } from "./features/userSlice.js";
import { setSocket } from "./features/socketSlice";
import { showModal } from "./features/modalSlice.js";
import {
  addMessages,
  clearMessage,
  deleteChat,
  updateChats,
} from "./features/messageSlice.js";
import { addOnline, getUsers } from "./features/usersSlice.js";
import { setPosts } from "./features/postSlice.js";
//components
import Modal from "./components/Modal/Modal.jsx";
import Loading from "./components/Loading/Loading.jsx";
import Backdrop from "./components/Backdrop/Backdrop.jsx";
//import ThemeSwitch from "./components/ThemeSwitch/ThemeSwitch.jsx";
import Router from "./routes";
import Online from "./components/Online/Online.jsx";
import Landing from "./pages/Landing/Landing.jsx";

function App() {
  const dispatch = useDispatch();
  const customFetch = useFetch();
  const {
    user: { id },
    modal: { isLoading, isSidebarVisible },
    socket: { socket },
    message: { to, conversationID },
  } = useSelector((state) => state);

  //login
  useEffect(() => {
    const user = Cookies.get("user");
    if (user) dispatch(login(JSON.parse(user)));
  }, [dispatch]);

  //get users and chats and init socket
  useEffect(() => {
    if (id) {
      const query = `id=${id}`;
      dispatch(getUsers({ customFetch }));
      dispatch(setPosts({ customFetch }));
      dispatch(setSocket(io(SERVER_URI, { query })));
    }
  }, [id, customFetch, dispatch]);

  //socket events
  useEffect(() => {
    if (socket) {
      socket.on("usersOnline", (users) => dispatch(addOnline(users)));
      socket.on("delete chat", (id) => dispatch(deleteChat(id)));
    }
  }, [socket, dispatch]);

  useEffect(() => {
    if (socket) {
      socket
        .off("receive message")
        .on("receive message", (message, senderID) => {
          dispatch(showModal({ msg: "1 new message" }));
          dispatch(
            updateChats({ lastMessage: message, id: senderID, customFetch })
          );
          senderID === to && dispatch(addMessages({ text: message }));
        });
      socket
        .off("clear chat")
        .on("clear chat", (id) =>
          dispatch(clearMessage({ conversationID: id }))
        );
    }
  }, [customFetch, dispatch, socket, to, conversationID]);

  return (
    <>
      <div className={isSidebarVisible ? "sidebar visible" : "sidebar"}>
        {/* <ThemeSwitch setTheme={setTheme} /> */}
        <Online />
      </div>
      <Modal />
      {/* {id !== "guest" && id ? <Router /> : <Landing />} */}
      {id ? <Router /> : <Landing />}
      <Backdrop show={isLoading}>
        <Loading />
      </Backdrop>
    </>
  );
}

export default App;
