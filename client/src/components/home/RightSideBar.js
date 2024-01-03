import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import UserCard from "../UserCard";
import FollowBtn from "../FollowBtn";
import LoadIcon from "../../images/load-m.gif";
import { getSuggestions } from "../../redux/actions/suggestionsAction";


import { getDataAPI } from '../../utils/fetchData';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { useHistory, useParams } from 'react-router-dom';
import { MESS_TYPES, getConversations } from '../../redux/actions/messageAction';
import LeftSide from "../message/LeftSide";
import RightSideHome from "../message/RightSideHome";


const RightSideBar = () => {
  const { auth, suggestions } = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(suggestions.user);
  console.log(auth.user);
  return (
    <div className="home-right">
      {/* <UserCard user={auth.user} /> */}
      {/* ======== Messenger ========= */}
      {/* <div class="messages1">
                    <div class="heading1">
                        <h5>Messages</h5>
                        <i class="uil uil-edit"></i>
                    </div>
                    
                    <div class="search-bar1">
                        <i class="uil uil-search"></i>
                        <input type="search" placeholder="Search messages" id="message-search"/>
                    </div>
               
                    <div class="category1">
                        <h6 class="active1">Primary</h6>
                        <h6>General</h6>
                        <h6 class="message-requests1">Requests(7)</h6>
                    </div>
                   
                    <div class="message1">
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
                    </div>
                  </div> */}
      <RightSideHome></RightSideHome>
      {/* ======== Messenger ========= */}
      {/* <div className="profile-con">
        <div className="profile-photo1">
          <img src={auth.user.avatar}></img>
        </div>
        <div className="handle">
          <span>{auth.user.username}</span>
          <p className="text-muted1">@{auth.user.fullname}</p>
        </div>
      </div> */}
      <div className="d-flex justify-content-between align-items-center my-2">
        <h4 className="req-text">Suggestions</h4>
        {!suggestions.loading && (
          <i
            className="fas fa-redo"
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(getSuggestions(auth.token))}
          />
        )}
      </div>

      {suggestions.loading ? (
        <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
      ) : (
        <div className="suggestions">
          {suggestions.users.map((user) => (
            <UserCard key={user._id} user={user}>
              <FollowBtn user={user} />
            </UserCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default RightSideBar;
