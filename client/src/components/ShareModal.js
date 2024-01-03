import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
} from "react-share";
import React, { useState, useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../utils/fetchData";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { useHistory, useParams } from "react-router-dom";
import { MESS_TYPES, getConversations } from "../redux/actions/messageAction";
import UserCardHomeMe from "./UserCardHomeMe";

const ShareModal = ({ url, theme }) => {
  console.log(url);
  const [onShare, setOnShare] = useState(false);
  const { auth, message, online } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);

  const history = useHistory();
  const { id } = useParams();

  const pageEnd = useRef();
  const [page, setPage] = useState(0);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return setSearchUsers([]);

    try {
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setSearchUsers(res.data.users);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

  const handleAddUser = (user) => {
    setSearch("");
    setSearchUsers([]);
    dispatch({
      type: MESS_TYPES.ADD_USER,
      payload: { ...user, text: "", media: [] },
    });
    dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online });
    return history.push(`/message/${user._id}?param=${url}`);
  };

  const isActive = (user) => {
    if (id === user._id) return "active";
    return "";
  };

  useEffect(() => {
    if (message.firstLoad) return;
    dispatch(getConversations({ auth }));
  }, [dispatch, auth, message.firstLoad]);

  //   // Load More
  //   useEffect(() => {
  //     const observer = new IntersectionObserver(
  //       (entries) => {
  //         if (entries[0].isIntersecting) {
  //           setPage((p) => p + 1);
  //         }
  //       },
  //       {
  //         threshold: 0.1,
  //       }
  //     );

  //     observer.observe(pageEnd.current);
  //   }, [setPage]);

  useEffect(() => {
    if (message.resultUsers >= (page - 1) * 9 && page > 1) {
      dispatch(getConversations({ auth, page }));
    }
  }, [message.resultUsers, page, auth, dispatch]);

  //   Check User Online - Offline
  useEffect(() => {
    if (message.firstLoad) {
      dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online });
    }
  }, [online, message.firstLoad, dispatch]);
  return (
    <div
      className="card-share-modal"
      style={{ filter: theme ? "invert(1)" : "invert(0)", display:'flex', alignItems:'center' }}
    >
      <FacebookShareButton url={url}>
        <FacebookIcon round={true} size={32} />
      </FacebookShareButton>

      <TwitterShareButton url={url}>
        <TwitterIcon round={true} size={32} />
      </TwitterShareButton>

      <EmailShareButton url={url}>
        <EmailIcon round={true} size={32} />
      </EmailShareButton>

      <RedditShareButton url={url}>
        <RedditIcon round={true} size={32} />
      </RedditShareButton>

      <TelegramShareButton url={url}>
        <TelegramIcon round={true} size={32} />
      </TelegramShareButton>

      <WhatsappShareButton url={url}>
        <WhatsappIcon round={true} size={32} />
      </WhatsappShareButton>
      <div onClick={() => setOnShare(!onShare)}>mess</div>
     
      {onShare && (
        <div className="modal-1">
          <div className="modal-2">
            <form className="search-bar1" onSubmit={handleSearch}>
              <i class="uil uil-search"></i>
              <input
                type="text"
                value={search}
                placeholder="Search messages"
                onChange={(e) => setSearch(e.target.value)}
                id='message-search"'
              />

              <button type="submit" style={{ display: "none" }}>
                Search
              </button>
            </form>
            <div className="message_chat_list">
              {searchUsers.length !== 0 ? (
                <>
                  {searchUsers.map((user) => (
                    <div
                      key={user._id}
                      className={`message_user ${isActive(user)}`}
                      onClick={() => handleAddUser(user)}
                    >
                      <UserCardHomeMe user={user} />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {message.users.map((user) => (
                    <div
                      key={user._id}
                      className={`message_user ${isActive(user)}`}
                      onClick={() => handleAddUser(user)}
                    >
                      <UserCardHomeMe user={user} url={url}>
                        {user.online ? (
                          <i className="fas fa-circle text-success" />
                        ) : (
                          auth.user.following.find(
                            (item) => item._id === user._id
                          ) && <i className="fas fa-circle" />
                        )}
                      </UserCardHomeMe>
                    </div>
                  ))}
                </>
              )}

              <button ref={pageEnd} style={{ opacity: 0 }}>
                Load More
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareModal;
