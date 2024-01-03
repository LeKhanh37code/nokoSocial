import React, { useState, useEffect, useRef } from "react";
import UserCard from "../UserCard";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { useHistory, useParams } from "react-router-dom";
import {
  MESS_TYPES,
  getConversations,
} from "../../redux/actions/messageAction";
import UserCardHomeMe from "../UserCardHomeMe";

const RightSideHome = () => {
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
    return history.push(`/message/${user._id}`);
  };

  const isActive = (user) => {
    if (id === user._id) return "active";
    return "";
  };

  useEffect(() => {
    if (message.firstLoad) return;
    dispatch(getConversations({ auth }));
  }, [dispatch, auth, message.firstLoad]);

  // Load More
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(pageEnd.current);
  }, [setPage]);

  useEffect(() => {
    if (message.resultUsers >= (page - 1) * 9 && page > 1) {
      dispatch(getConversations({ auth, page }));
    }
  }, [message.resultUsers, page, auth, dispatch]);

  // Check User Online - Offline
  useEffect(() => {
    if (message.firstLoad) {
      dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online });
    }
  }, [online, message.firstLoad, dispatch]);
  console.log(searchUsers);
  return (
    <>
      <div class="messages1">
        <div class="heading1">
          <h5>Messages</h5>
          <i class="uil uil-edit"></i>
        </div>

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

        {/* <div class="search-bar1">
                        <i class="uil uil-search"></i>
                        <input type="search" placeholder="Search messages" id="message-search"/>
                    </div> */}

        <div class="category1">
          <h6 class="active1">Primary</h6>
          <h6>General</h6>
          <h6 class="message-requests1">Requests(7)</h6>
        </div>

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
                  <UserCardHomeMe user={user} msg={true}>
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

        {/* <div class="message1">
                        <div class="profile-photo1">
                        <img src={auth.user.avatar}></img>
                        </div>
                        <div class="message-body1">
                            <h5>Edem Quít</h5>
                            <p class="text-muted1">Just woke up bruh</p>
                        </div>
                    </div>
                   
                    <div class="message1">
                        <div class="profile-photo1">
                        <img src={auth.user.avatar}></img>
                            <div class="active1"></div>
                        </div>
                        <div class="message-body1">
                            <h5>Chantel Msiza</h5>
                            <p class="text-bold1">Birthday Tomorrow!</p>
                        </div>
                    </div>
                    <div class="message1">
                        <div class="profile-photo1">
                        <img src={auth.user.avatar}></img>
                            <div class="active1"></div>
                        </div>
                        <div class="message-body1">
                            <h5>Chantel Msiza</h5>
                            <p class="text-bold1">Birthday Tomorrow!</p>
                        </div>
                    </div>
                    <div class="message1">
                        <div class="profile-photo1">
                        <img src={auth.user.avatar}></img>
                            <div class="active1"></div>
                        </div>
                        <div class="message-body1">
                            <h5>Chantel Msiza</h5>
                            <p class="text-bold1">Birthday Tomorrow!</p>
                        </div>
                    </div>
                    <div class="message1">
                        <div class="profile-photo1">
                        <img src={auth.user.avatar}></img>
                            <div class="active1"></div>
                        </div>
                        <div class="message-body1">
                            <h5>Chantel Msiza</h5>
                            <p class="text-bold1">Birthday Tomorrow!</p>
                        </div>
                    </div> */}
      </div>

      {/* =============== */}
      {/* <form className="message_header" onSubmit={handleSearch} >
                <input type="text" value={search}
                placeholder="Enter to Search..."
                onChange={e => setSearch(e.target.value)} />

                <button type="submit" style={{display: 'none'}}>Search</button>
            </form> */}

      {/* <div className="message_chat_list">
                {
                    searchUsers.length !== 0
                    ?  <>
                        {
                            searchUsers.map(user => (
                                <div key={user._id} className={`message_user ${isActive(user)}`}
                                onClick={() => handleAddUser(user)}>
                                    <UserCard user={user} />
                                </div>
                            ))
                        }
                        
                    </>
                    : <>
                        {
                            message.users.map(user => (
                                <div key={user._id} className={`message_user ${isActive(user)}`}
                                onClick={() => handleAddUser(user)}>
                                    <UserCard user={user} msg={true}>
                                        {
                                            user.online
                                            ? <i className="fas fa-circle text-success" />
                                            : auth.user.following.find(item => 
                                                item._id === user._id
                                            ) && <i className="fas fa-circle" />
                                                
                                        }
                                        
                                    </UserCard>
                                </div>
                            ))
                        }
                    </>
                }
               
               <button ref={pageEnd} style={{opacity: 0}} >Load More</button>
            </div> */}
    </>
  );
};

export default RightSideHome;
