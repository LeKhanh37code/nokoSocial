import React, { useState, useEffect } from "react";
import Avatar from "../Avatar";
import EditProfile from "./EditProfile";
import FollowBtn from "../FollowBtn";
import Followers from "./Followers";
import Following from "./Following";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { useParams } from "react-router-dom";
import { dating, follow } from "../../redux/actions/profileAction";

// import { date } from '../redux/actions/profileAction'
const Info = ({ id, auth, profile, dispatch }) => {
  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [onDate, setOnDate] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users]);

  useEffect(() => {
    if (showFollowers || showFollowing || onEdit) {
      dispatch({ type: GLOBALTYPES.MODAL, payload: true });
    } else {
      dispatch({ type: GLOBALTYPES.MODAL, payload: false });
    }
  }, [showFollowers, showFollowing, onEdit, dispatch]);
  const [followed, setFollowed] = useState(false);
  useEffect(() => {
    if (auth.user.following.find((item) => item._id === id)) {
      setFollowed(true);
    }
    return () => setFollowed(false);
  }, [auth.user.following, id]);

  let stopCreation = false;

  if (auth.user.dating.includes(id)) {
    function createHeart() {
      if (stopCreation) {
        return; // Nếu đã dừng, thoát khỏi hàm
      }

      const heart = document.createElement("div");
      heart.classList.add("heart00");

      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = Math.random() * 2 + 3 + "s";

      heart.innerText = "💗";

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 5000);
    }
    const intervalId = setInterval(createHeart, 1000);
    setTimeout(() => {
      stopCreation = true;
      clearInterval(intervalId);
      // Xóa toàn bộ các phần tử có class "heart00"

      const hearts = document.querySelectorAll(".heart00");
      hearts.forEach((heart) => heart.remove());
    }, 7000);
  }

  // Gọi createHeart một lần và lưu giữ ID của setInterval

  // Dừng createHeart sau 5 giây

  const { socket } = useSelector((state) => state);
  const [load, setLoad] = useState(false);
  const [user, setUser] = useState();
  useEffect(() => {
    if (userData.length > 0) {
      setUser(userData[0]);
    }
  }, [userData]);

  const handleDate = async () => {
    await dispatch(dating({ users: profile.users, user, auth, socket }));
    setOnDate(false);
  };

  return (
    <div className="info">
      {userData.map((user) => (
        <div className="info_container" key={user._id}>
          <Avatar src={user.avatar} size="supper-avatar" />

          <div className="info_content">
            <div className="info_content_title">
              <span>{user.username}</span>
              <div className="info-user-edit">
                {user._id === auth.user._id ? (
                  <>
                    <span
                      className="user-edit--link"
                      onClick={() => setOnEdit(true)}
                    >
                      Chỉnh sửa trang cá nhân
                    </span>
                    <i class="user-edit-icon uil uil-setting"></i>
                  </>
                ) : (
                  <>
                    {followed && (
                      <>
                        {user.dating.length > 0 ? (
                          <>
                            {auth.user.dating.includes(id) && (
                              <i
                                style={{ color: "#fb6f92" }}
                                className="fas fa-heart"
                              />
                            )}
                            {}
                          </>
                        ) : (
                          <>
                            {auth.user.dating.length > 0 ? (
                              <i
                                style={{ color: "#ffe5ec" }}
                                className="fas fa-heart"
                              />
                            ) : (
                              <i
                                style={{ color: "#1da1f2" }}
                                className="fas fa-heart"
                                onClick={() => setOnDate(!onDate)}
                              />
                            )}
                          </>
                        )}
                      </>
                    )}
                    <FollowBtn user={user} />
                  </>
                )}
              </div>
            </div>

            <div className="follow_btn">
              <span
                className="user-fl-link"
                onClick={() => setShowFollowers(true)}
              >
                <b>{user.followers.length}</b> người theo dõi
              </span>
              <span
                className="user-fl-link"
                onClick={() => setShowFollowing(true)}
              >
                Đang theo dõi <b>{user.following.length}</b> người dùng
              </span>
            </div>

            <div className="user-info-desc">
              <span>
                @{user.fullname} <span className="">{user.mobile}</span>
              </span>
              <span className="">{user.address}</span>
              <span className="">{user.email}</span>
              <a href={user.website} target="_blank" rel="noreferrer">
                {user.website}
              </a>
              <span>{user.story}</span>
            </div>
          </div>
          {/* <div className="love_modal">
            <h1>Love</h1>
          </div> */}
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
                  <h5 className="m-0">Dating Love</h5>
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
                      Would you like to send a date to {user.fullname} ?
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
          {onEdit && <EditProfile setOnEdit={setOnEdit} />}

          {showFollowers && (
            <Followers
              users={user.followers}
              setShowFollowers={setShowFollowers}
            />
          )}
          {showFollowing && (
            <Following
              users={user.following}
              setShowFollowing={setShowFollowing}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Info;
