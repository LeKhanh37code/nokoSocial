import React, { useEffect, useState } from 'react'

import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'
import Saved from '../../components/profile/Saved'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import LoadIcon from '../../images/loading.gif'
import { getProfileUsers } from '../../redux/actions/profileAction'
import { useParams } from 'react-router-dom'


const Profile = () => {
    const { profile, auth } = useSelector(state => state)
    const dispatch = useDispatch()

    const { id } = useParams()
    const [saveTab, setSaveTab] = useState(false)

    useEffect(() => {
        if(profile.ids.every(item => item !== id)){
            dispatch(getProfileUsers({id, auth}))
        }
    },[id, auth, dispatch, profile.ids])
    console.log(profile)
    return (
        <div className="profile">
            <div className='profile-left'>
            <div className='home_left'>
                <div className='profile-con'>
                        <div className="profile-photo1">
                            <img src='https://res.cloudinary.com/dw1sniewf/image/upload/v1669720008/noko-social/audefto1as6m8gg17nu1.jpg'></img>
                        </div>
                        <div className="handle">
                            <span>Diana Ayi</span>
                            <p className="text-muted1">@dayi</p>
                        </div>
                </div>
               
             
               <div className="sidebar">
                <div className="menu-item">
                    <span>
                        <i className="uil uil-home"></i>
                    </span> <span className="menu-item-name"><Link to="/" className="logo">Home</Link> </span>
                </div>
                <div className="menu-item active">
                    <span>
                        <i className="uil uil-compass"></i>  
                    </span><span className="menu-item-name">Explore</span>
                </div>
                <div className="menu-item " id="notifications">
                    <span>
                        <i className="uil uil-bell"><small className="notification-count">9+</small></i>
                    </span><span className="menu-item-name">Notifications</span>
                    
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
                        <i className="uil uil-envelope-alt" ><small className="notification-count">6+</small> </i>
                    </span>
                    <span className="menu-item-name">Messagse</span>
                   
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
              
               <label for="create-post" className="btn btn-primary">Create Post</label>
            </div>
            </div>
           <div className='profile-middle'>
             <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />

            {
                auth.user._id === id &&
                <div className="profile_tab">
                    <span className={saveTab ? '' : 'active'} onClick={() => setSaveTab(false)}><i class="uil uil-table"></i> Posts</span>
                    <span className={saveTab ? 'active' : ''} onClick={() => setSaveTab(true)}><i class="uil uil-bookmark"></i> Saved</span>
                </div>
            }

            {
                profile.loading 
                ? <img className="d-block mx-auto" src={LoadIcon} alt="loading" />
                : <>
                    {
                        saveTab
                        ? <Saved auth={auth} dispatch={dispatch} />
                        : <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
                    }
                </>
            }
           </div>
            
        </div>
    )
}

export default Profile
