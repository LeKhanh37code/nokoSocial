import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { follow, unfollow, dating } from "../redux/actions/profileAction";
import Heart from "react-animated-heart";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
const FollowBtn = ({ user }) => {
  const [followed, setFollowed] = useState(false);
  const [isClick, setClick] = useState(false);
  const [onDate, setOnDate] = useState(false);

  const { auth, profile, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (auth.user.following.find((item) => item._id === user._id)) {
      setFollowed(true);
    }
    return () => setFollowed(false);
  }, [auth.user.following, user._id]);

  const handleFollow = async () => {
    if (load) return;

    setFollowed(true);
    setLoad(true);
    await dispatch(follow({ users: profile.users, user, auth, socket }));
    setLoad(false);
  };

  const handleUnFollow = async () => {
    if (load) return;

    setFollowed(false);
    setLoad(true);
    await dispatch(unfollow({ users: profile.users, user, auth, socket }));
    setLoad(false);
  };
  const { theme } = useSelector((state) => state);

  return (
    <>
      {followed ? (
        <>
          <button
            className="btn btn-outline-danger status-post--text-5"
            onClick={handleUnFollow}
          >
            UnFollow
          </button>
        </>
      ) : (
        <>
          <button
            className="btn btn-outline-info status-post--text-4 status-post--text-3"
            onClick={handleFollow}
          >
            Follow
          </button>
        </>
      )}
    </>
  );
};

export default FollowBtn;
