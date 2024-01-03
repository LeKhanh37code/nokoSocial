import React from "react";
import Avatar from "../../Avatar";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";
import { deletePost } from "../../../redux/actions/postAction";
import { BASE_URL } from "../../../utils/config";
import { useState, useRef, useEffect } from "react";
const CardHeader = ({ post }) => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const history = useHistory();

  const handleEditPost = () => {
    dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } });
  };

  const handleDeletePost = () => {
    if (window.confirm("Are you sure want to delete this post?")) {
      dispatch(deletePost({ post, auth, socket }));
      return history.push("/");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`);
  };
  const [userDataDate, setUserDataDate] = useState({
    type: "",
    name: "",
    idUser: "",
  });
  useEffect(() => {
    if (post.content.includes("dating-")) {
      // const text = "dating-b-0658da090836c8b5b68302e6a";

      // Tách đoạn văn bản thành mảng các thành phần
      const parts = post.content.split("-");

      // Cập nhật state với các giá trị tương ứng
      setUserDataDate({
        type: parts[0],
        name: parts[1],
        idUser: parts[2],
      });
    }
  }, [post.content]);
  console.log(post.content);
console.log(userDataDate.idUser)
  return (
    <div className="card_header">
      <div className="card_header-user">
        <div className="card_header-img">
          <Avatar src={post.user.avatar} size="big-avatar" />
        </div>
        {userDataDate.type === "dating" ? (
          <div className="card_name ">
            <div className="card_name-dating">
              <Link to={`/profile/${post.user._id}`}>
                <span className="card-name-user">{post.user.username}</span>
              </Link>
              <small className="card-name-time">
             dating with
            </small>
            <Link to={`/profile/${userDataDate.idUser}`}>
                <span className="card-name-user">{userDataDate.name}</span>
              </Link>
            </div>
            <small className="card-name-time">
              {moment(post.createdAt).fromNow()}
            </small>
          </div>
        ) : (
          <div className="card_name">
            <Link to={`/profile/${post.user._id}`}>
              <span className="card-name-user">{post.user.username}</span>
            </Link>

            <small className="card-name-time">
              {moment(post.createdAt).fromNow()}
            </small>
          </div>
        )}
      </div>

      <div className="nav-item dropdown">
        <span className="material-icons" id="moreLink" data-toggle="dropdown">
          <i className="uil uil-ellipsis-h"></i>
        </span>

        <div className="dropdown-menu edit-cmt">
          {auth.user._id === post.user._id && (
            <div>
              <div className="dropdown-item" onClick={handleEditPost}>
                <span>
                  <i className="uil uil-file-edit-alt"></i>
                </span>{" "}
                Edit Post
              </div>
              <div className="dropdown-item" onClick={handleDeletePost}>
                <span>
                  <i className="uil uil-trash-alt"></i>
                </span>{" "}
                Remove Post
              </div>
            </div>
          )}

          <div className="dropdown-item" onClick={handleCopyLink}>
            <span>
              <i className="uil uil-copy-alt"></i>
            </span>{" "}
            Copy Link
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHeader;
