import "./dropdownmenu.css";
import { ReactComponent as BellIcon } from "../../assets/bell.svg";
import { ReactComponent as MessengerIcon } from "../../assets/messenger.svg";
import { ReactComponent as CaretIcon } from "../../assets/caret.svg";
import { ReactComponent as PlusIcon } from "../../assets/plus.svg";
import { ReactComponent as LogoutIcon } from "../../assets/logout.svg";
import { ReactComponent as CogIcon } from "../../assets/cog.svg";
import { ReactComponent as ChevronIcon } from "../../assets/chevron.svg";
import { ReactComponent as ArrowIcon } from "../../assets/arrow.svg";
import { ReactComponent as BoltIcon } from "../../assets/bolt.svg";
import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/userSlice";
//import ToggleSwitch from "../../Buttons/ToggleSwitch";

function DropdownMenu({ userId }) {
    const [activeMenu, setActiveMenu] = useState("main");
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goToProfile = () => navigate(`/user/${userId}`);
    const goToVideos = () => navigate(`/videos`);
    const logoutUser = () => dispatch(logout());

    useEffect(() => {
      setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])

    function calcHeight(el) {
      const height = el.offsetHeight;
      setMenuHeight(height);
    }

    function DropdownItem(props) {
      const { goToMenu, children, leftIcon, rightIcon, logout, profile, video } = props;

      const handleClick = () => {
        if (goToMenu) setActiveMenu(goToMenu);
        if (logout) logoutUser() && navigate("/");
        if (profile) goToProfile();
        if (video) goToVideos();
      };

      return (
        <a className="menu-item" onClick={handleClick}>
          <span className="icon-button">{leftIcon}</span>
          {children}
          <span className="icon-right">{rightIcon}</span>
        </a>
      );
    }

    return (
      <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
        <CSSTransition
          in={activeMenu === "main"}
          timeout={500}
          classNames="menu-primary"
          unmountOnExit
          onEnter={calcHeight}
        >
          <div className="dropdown-menu">
            <DropdownItem profile>My Profile</DropdownItem>
            <DropdownItem video>Videos</DropdownItem>
            <DropdownItem
              leftIcon={<CogIcon />}
              rightIcon={<ChevronIcon />}
              goToMenu="settings"
            >
              Settings
            </DropdownItem>
            <DropdownItem
              leftIcon="🦧"
              rightIcon={<ChevronIcon />}
              goToMenu="account"
            >
              Account
            </DropdownItem>
            <br />
            <hr />
            <br />
            <DropdownItem logout leftIcon={<LogoutIcon />}>
              Logout
            </DropdownItem>
          </div>
        </CSSTransition>

        <CSSTransition
          in={activeMenu === "settings"}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}
        >
          <div className="dropdown-menu">
            <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
              <h2>My Tutorial</h2>
            </DropdownItem>
            <DropdownItem leftIcon={<BoltIcon />}>HTML</DropdownItem>
            <DropdownItem leftIcon={<BoltIcon />}>CSS</DropdownItem>
            <DropdownItem leftIcon={<BoltIcon />}>JavaScript</DropdownItem>
            <DropdownItem leftIcon={<BoltIcon />}>Awesome!</DropdownItem>
            {/* <DropdownItem leftIcon={<BoltIcon />}>
              <ToggleSwitch />
            </DropdownItem> */}
          </div>
        </CSSTransition>

      <CSSTransition
        in={activeMenu === "account"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="dropdown-menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Account</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
          <DropdownItem leftIcon="🐸">Frog</DropdownItem>
          <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
          <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default DropdownMenu;
