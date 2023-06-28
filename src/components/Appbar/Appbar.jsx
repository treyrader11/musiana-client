import React, { useState, useEffect } from "react";
import {
  dp,
  closeIcon,
  searchIcon,
  hamburger,
  chatIcon,
  homeIcon,
  uploadVideoIcon,
} from "../../assets";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, toggleSidebar } from "../../features/modalSlice";
import useFetch from "../../hooks/useFetch";
import SearchResults from "../SearchResults/SearchResults";
import { fetchUsersService } from "../../services/userServices";
import { fetchPostsService } from "../../services/postServices";
import "./appbar.scss";
import { logout } from "../../features/userSlice";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import Backdrop from "../Backdrop/Backdrop";
import { getVideos, openWizard } from "../../features/videoSlice";
import Wizard from "../VideoUpload/Wizard/Wizard";
import Tooltip from "../Tooltip/Tooltip";

const Appbar = () => {
  //global states
  const {
    user: { id, profileImage },
    post: { posts },
    modal: { isSidebarVisible },
    video: { videos, wizardOpen },
    user: { users },
  } = useSelector((state) => state);

  const prevSearchedVideos = videos;

  //local states
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState({});
  const [showAutoSearch, setShowAutoSearch] = useState(false);
  const [autoSearch, setAutoSearch] = useState({});
  const [openDropdown, setOpenDropdown] = useState(false);

  const dispatch = useDispatch();
  const customFetch = useFetch();

  const searchHandler = async (e) => {
    e.preventDefault();
    if (query.length > 0) {
      dispatch(setIsLoading(true));
      const { posts } = await customFetch(fetchPostsService, { query });
      const { users } = await customFetch(fetchUsersService, { query });
      // setSearchResult({ posts, users });
      setAutoSearch({ prevSearchedVideos });
      setSearchResult({ videos, posts, users });
      dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    dispatch(getVideos("all"));
    searchResult && setSearchResult({ videos, posts, users });
    prevSearchedVideos && setAutoSearch({ prevSearchedVideos });
  }, [dispatch]);

  const handleAutoSearch = () => {
    setShowAutoSearch(true);
  };

  const reset = () => {
    setQuery("");
    setSearchResult({});
    setShowAutoSearch(false);
    //setAutoSearch({});
  };

  // const hideUploading = () => setIsUploading(false);
  const gotoLogin = () => dispatch(logout());
  const toggleDropdown = () => setOpenDropdown(!openDropdown);

  return (
    <header
      className={
        searchResult.posts || searchResult.users ? "header topZ" : "header"
      }
    >
      <>
        <Backdrop show={wizardOpen}>
          <Wizard />
        </Backdrop>
      </>
      <div
        className="hamburger"
        onClick={() => dispatch(toggleSidebar(!isSidebarVisible))}
      >
        <img src={isSidebarVisible ? closeIcon : hamburger} alt="hamburger" />
      </div>
      <Link to="/">
        <img
          width="64"
          height="64"
          src="https://img.icons8.com/dotty/80/84A401/circled-m.png"
          alt="circled-m"
        />
        {/* <img width="64" height="64" src="https://img.icons8.com/sf-black-filled/64/84A401/m.png" alt="m"/>  */}
      </Link>
      <form onSubmit={searchHandler} className="searchform">
        <button type="submit" aria-label="search">
          <img src={searchIcon} alt="search" />
        </button>
        <input
          type="text"
          placeholder="Search for videos, teachers, and articles..."
          value={query}
          onClick={handleAutoSearch}
          onChange={(e) => setQuery(e.target.value)}
        />
        {showAutoSearch && (
          <button onClick={reset} type="button" aria-label="clear search">
            <img src={closeIcon} alt="close" className="close" />
          </button>
        )}
        {/* {(searchResult.posts || searchResult.users) && ( */}
        {/* {(autoSearch.videos || autoSearch.posts || autoSearch.users) && (
					// <SearchResults searchResult={searchResult} reset={reset} />
					<SearchResults searchResult={autoSearch} reset={reset} />
				)} */}
        {showAutoSearch && (
          // <SearchResults searchResult={searchResult} reset={reset} />
          <SearchResults searchResult={autoSearch} reset={reset} />
        )}
      </form>
      <div id="brand">
        <span style={{ color: "rgb(132 164 1)" }}>mus</span>iane
      </div>
      <nav className="header__profile">
        <>
          <div
            className="upload icon"
            onClick={() => dispatch(openWizard(true))}
          >
            <Tooltip position="bottom" text="Upload a video">
              <img src={uploadVideoIcon} height="32px" alt="upload videos" />
            </Tooltip>
          </div>
          <button className="icon" onClick={toggleDropdown}>
            <img src={profileImage || dp} className="header__profile__dp" />
          </button>
          <Link to="/chat">
            <Tooltip position="bottom" text="Chats">
              <img
                src={chatIcon}
                alt="chat"
                height="32px"
                className="chat icon"
              />
            </Tooltip>
          </Link>
        </>

        {openDropdown && <DropdownMenu userId={id} />}
      </nav>
    </header>
  );
};

export default Appbar;
