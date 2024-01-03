import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Avatar from "../Avatar";
import NotifyModal from "../NotifyModal";
import { useState, useEffect, useRef } from "react";
import { getProfileUsers } from "../../redux/actions/profileAction";
import { updating, follow } from "../../redux/actions/profileAction";
import dateImg from "../../images/date.png";
import { createPostDate } from "../../redux/actions/postAction";
const Menu = () => {
  const navLinks = [
    // { label: 'Home', icon: 'home', path: '/'},
    // { label: 'Message', icon: 'near_me', path: '/message'},
    // { label: 'Discover', icon: 'explore', path: '/discover'}
  ];

  const { auth, theme, notify, profile, socket } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isActive = (pn) => {
    if (pn === pathname) return "active";
  };
  const [onDate, setOnDate] = useState(false);
  const [userDate, setUserDate] = useState({
    avatar: "",
    username: "",
    _id: "",
  });
  useEffect(() => {
    if (userDate._id !== "") {
      const id = userDate._id;
      if (profile.ids.every((item) => item !== id)) {
        dispatch(getProfileUsers({ id, auth }));
      }
    }
  }, [auth, dispatch, profile.ids, userDate._id]);

  console.log(profile.users);

  const [user, setUser] = useState();
  const [content, setContent] = useState("");
  const [onDateNoti, setOnDateNoti] = useState(false);

  // const [images, setImages] = useState([]);
  useEffect(() => {
    if (profile.users.length > 0) {
      setUser(profile.users[0]);
    }
  }, [profile.users]);

  useEffect(() => {
    setContent("dating-" +userDate.username + "-" +  userDate._id);
  }, [userDate._id, userDate.username]);
  console.log(content)
  console.log(userDate._id)
  const handleDate = async () => {
    await dispatch(updating({ users: profile.users, user, auth, socket }));
    dispatch(createPostDate({ content, auth, socket }));
    setOnDateNoti(true);
    setOnDate(false);
  };

  return (
    <div className="menu">
      <ul className="navbar-nav flex-row">
        {/* {
                    navLinks.map((link, index) => (
                        <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
                            <Link className="nav-link" to={link.path}>
                                <span className="material-icons">{link.icon}</span>
                            </Link>
                        </li>
                    ))
                } */}

        <li className="nav-item dropdown" style={{ opacity: 1 }}>
          <span
            className="nav-link position-relative nav-noti"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {/* <span className="material-icons" 
                        style={{color: notify.data.length > 0 ? 'crimson' : ''}}>
                            favorite
                        </span> */}

            <span className="position-relative nav-noti">
              <i className="uil uil-bell ">
                <small className="notification-count">
                  {notify.data.length}+
                </small>
              </i>
            </span>

            {/* <span className="notify_length">{notify.data.length}</span> */}
          </span>

          <div
            className="dropdown-menu "
            aria-labelledby="navbarDropdown"
            style={{ transform: "translateX(75px)" }}
          >
            <NotifyModal modal={setOnDate} userDate={setUserDate} />
          </div>
          {onDate && (
            <div className="status_modal">
              <div id="hearts-alpaca" class="hearts">
                <div class="heart"></div>
                <div class="heart"></div>
                <div class="heart"></div>
                <div class="heart"></div>
              </div>
              <form>
                <div id="hearts-alpaca" class="hearts">
                  <div class="heart"></div>
                  <div class="heart"></div>
                  <div class="heart"></div>
                  <div class="heart"></div>
                </div>
                <div className="status_header top-post">
                  <h5 className="m-0">Dating Love Msg</h5>
                  <span className="post-span-icon">
                    <i
                      onClick={() => setOnDate(!onDate)}
                      className="uil uil-x post-out--icon"
                    ></i>
                  </span>
                </div>

                <div className="status_body">
                  <div className="status-input-box">
                    <div className="show_images"></div>
                    <h5 className="m-0">
                      Hi,{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {userDate.username || ""}
                      </span>{" "}
                      just sent you a date request, do you accept ?
                    </h5>

                    <div className="privacy"></div>
                  </div>

                  <div className="post-bottom">
                    <div className="input_images">
                      <ul className="icons">
                        <li>
                          <i class="fas fa-map-marker-alt"></i>
                        </li>
                        {/* <li><i class="far fa-grin"></i></li> */}

                        <li>
                          <i class="far fa-user"></i>
                        </li>
                      </ul>
                    </div>
                    <div className="status_footer">
                      <span className="btn-post" onClick={handleDate}>
                        Send
                      </span>
                    </div>
                  </div>
                </div>
              </form>
              <div id="hearts-alpaca" class="hearts2">
                <div class="heart2"></div>
                <div class="heart2"></div>
                <div class="heart2"></div>
                <div class="heart2"></div>
              </div>
              <div id="hearts-alpaca" class="hearts1">
                <div class="heart1"></div>
                <div class="heart1"></div>
                <div class="heart1"></div>
                <div class="heart1"></div>
              </div>
            </div>
          )}
        </li>

        <li className="nav-item dropdown list-user-menu" style={{ opacity: 1 }}>
          <span
            className="nav-link dropdown-toggle d-flex"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <Avatar src={auth.user.avatar} size="medium-avatar" />
            {/* <img src={auth.user.avatar} alt="avatar"/> */}
          </span>

          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>
              Profile
            </Link>

            <label
              htmlFor="theme"
              className="dropdown-item"
              onClick={() =>
                dispatch({
                  type: GLOBALTYPES.THEME,
                  payload: !theme,
                })
              }
            >
              {theme ? "Light mode" : "Dark mode"}
            </label>

            <div className="dropdown-divider"></div>
            <Link
              className="dropdown-item"
              to="/"
              onClick={() => dispatch(logout())}
            >
              Logout
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
