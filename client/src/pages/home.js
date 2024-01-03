import React, { useEffect } from "react";

import Status from "../components/home/Status";
import Posts from "../components/home/Posts";
import RightSideBar from "../components/home/RightSideBar";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadIcon from "../images/loading.gif";
import Avatar from "../components/Avatar";
import NotifyModal from "../components/NotifyModal";
import { GLOBALTYPES } from "../redux/actions/globalTypes";

let scroll = 0;

const Home = () => {
  const { homePosts, notify } = useSelector((state) => state);

  const { auth } = useSelector((state) => state);
  //   console.log(auth.user);

  window.addEventListener("scroll", () => {
    if (window.location.pathname === "/") {
      scroll = window.pageYOffset;
      return scroll;
    }
  });

  // console.log(notify.data.length);
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: scroll, behavior: "smooth" });
    }, 100);
  }, []);

  return (
    <div className="home_container">
      <div className="home_left">
        <div className="profile-con">
          <div className="profile-photo1">
            <img src={auth.user.avatar}></img>
          </div>
          <div className="handle">
            <span>{auth.user.username}</span>
            <p className="text-muted1">@{auth.user.fullname}</p>
          </div>
        </div>

        <div className="sidebar">
          <div className="menu-item">
            <span>
              <i className="uil uil-home"></i>
            </span>{" "}
            <span className="menu-item-name">
              <Link to="/" className="logo">
                Home
              </Link>{" "}
            </span>
          </div>
          <div className="menu-item active">
            <span>
              <i className="uil uil-compass"></i>
            </span>
            <span className="menu-item-name">
              <Link to="/discover" className="logo">
                Explore
              </Link>
            </span>
          </div>
          <div
            className="menu-item dropdown position-relative'"
            id="notifications"
          >
            <span className="position-relative">
              <i className="uil uil-bell ">
                <small className="notification-count">
                  {notify.data.length}+
                </small>
              </i>
            </span>
            <span
              className="menu-item-name position-relative"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Notifications
            </span>
            <div
              aria-labelledby="navbarDropdown"
              className="dropdown-menu notifi-drop"
            >
              <NotifyModal />
            </div>

            {/* ==================================


 */}

            <div className="notifications-popups">
              <div>
                <div className="profile-photo">
                  {/* <img src="./images/profile-2.jpg" alt=""> */}
                </div>
                <div className="notification-body">
                  <b>Keko Benjamin</b> accepted your friend request
                  <small className="text-muted">2 DAYS AGO </small>
                </div>
              </div>
              <div>
                <div className="profile-photo">
                  {/* <img src="./images/profile-3.jpg" alt=""> */}
                </div>
                <div className="notification-body">
                  <b>John Doe</b> commented on your post
                  <small className="text-muted">1 HOUR AGO </small>
                </div>
              </div>
              <div>
                <div className="profile-photo">
                  {/* <img src="./images/profile-4.jpg" alt=""> */}
                </div>
                <div className="notification-body">
                  <b>Keko Benjamin</b> accepted your friend request
                  <small className="text-muted">2 DAYS AGO </small>
                </div>
              </div>
              <div>
                <div className="profile-photo">
                  {/* <img src="./images/profile-5.jpg" alt=""> */}
                </div>
                <div className="notification-body">
                  <b>Keko Benjamin</b> accepted your friend request
                  <small className="text-muted">2 DAYS AGO </small>
                </div>
              </div>
              <div>
                <div className="profile-photo">
                  {/* <img src="./images/profile-6.jpg" alt=""> */}
                </div>
                <div className="notification-body">
                  <b>Keko Benjamin</b> accepted your friend request
                  <small className="text-muted">2 DAYS AGO </small>
                </div>
              </div>
              <div>
                <div className="profile-photo">
                  {/* <img src="./images/profile-7.jpg" alt=""> */}
                </div>
                <div className="notification-body">
                  <b>Keko Benjamin</b> accepted your friend request
                  <small className="text-muted">2 DAYS AGO </small>
                </div>
              </div>
            </div>
          </div>
          <div className="menu-item" id="messages-notifications">
            <span>
              <i className="uil uil-envelope-alt">
                <small className="notification-count">6+</small>{" "}
              </i>
            </span>
            <span className="menu-item-name">
              <Link to="/message">Messagse</Link>
            </span>
          </div>
          <div className="menu-item">
            <span>
              <i className="uil uil-bookmark"></i>
            </span>
            <span className="menu-item-name">Bookmarks</span>
          </div>
          <div className="menu-item">
            <span>
              <i className="uil uil-chart-line"></i>
            </span>
            <span className="menu-item-name">Analytics</span>
          </div>
          <div className="menu-item">
            <span>
              <i className="uil uil-palette"></i>
            </span>
            <span className="menu-item-name">Theme</span>
          </div>
          <div className="menu-item">
            <span>
              <i className="uil uil-setting"></i>
            </span>
            <span className="menu-item-name">Settings</span>
          </div>
        </div>

        <label for="create-post" className="btn btn-primary">
          Create Post
        </label>
      </div>

      <div className="middle">

      {/* <h1>Story</h1>
      <div class="stories">
                    <div class="story">
                        <div class="profile-photo">
                          <img src={auth.user.avatar}></img>
                          
                        </div>
                        <p class="name">Your Story</p>
                    </div>
                    <div class="story">
                        <div class="profile-photo">
                        <img src={auth.user.avatar}></img>
                        </div>
                        <p class="name">Winnie Hale</p>
                    </div>
                    <div class="story">
                        <div class="profile-photo">
                        <img src={auth.user.avatar}></img>
                        </div>
                        <p class="name">Daniel Bale</p>
                    </div>
                    <div class="story">
                        <div class="profile-photo">
                        <img src={auth.user.avatar}></img>
                        </div>
                        <p class="name">Jane Doe</p>
                    </div>
                    <div class="story">
                        <div class="profile-photo">
                        <img src={auth.user.avatar}></img>
                        </div>
                        <p class="name">Tina White</p>
                    </div>
                    <div class="story">
                        <div class="profile-photo">
                        <img src={auth.user.avatar}></img>
                        </div>
                        <p class="name">Cheft Curry</p>
                    </div>
                </div> */}
        
        

        <Status />

        {homePosts.loading ? (
          <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
        ) : homePosts.result === 0 && homePosts.posts.length === 0 ? (
          <h2 className="text-center">No Post</h2>
        ) : (
          <Posts />
        )}
      </div>

      <div className="right">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
