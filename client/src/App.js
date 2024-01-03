import { useEffect } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import PageRender from './customRouter/PageRender'
import PrivateRouter from './customRouter/PrivateRouter'

import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'

import Alert from './components/alert/Alert'
import Header from './components/header/Header'
import StatusModal from './components/StatusModal'

import { useSelector, useDispatch } from 'react-redux'
import { refreshToken } from './redux/actions/authAction'
import { getPosts } from './redux/actions/postAction'
import { getSuggestions } from './redux/actions/suggestionsAction'

import io from 'socket.io-client'
import { GLOBALTYPES } from './redux/actions/globalTypes'
import SocketClient from './SocketClient'

import { getNotifies } from './redux/actions/notifyAction'
import CallModal from './components/message/CallModal'
import Peer from 'peerjs'


function App() {
  const { auth, status, modal, call } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())

    const socket = io()
    dispatch({type: GLOBALTYPES.SOCKET, payload: socket})
    return () => socket.close()
  },[dispatch])

  useEffect(() => {
    if(auth.token) {
      dispatch(getPosts(auth.token))
      dispatch(getSuggestions(auth.token))
      dispatch(getNotifies(auth.token))
    }
  }, [dispatch, auth.token])

  
  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    else if (Notification.permission === "granted") {}
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {}
      });
    }
  },[])

 
  useEffect(() => {
    const newPeer = new Peer(undefined, {
      path: '/', secure: true
    })
    
    dispatch({ type: GLOBALTYPES.PEER, payload: newPeer })
  },[dispatch])

  

  return (
    <Router>
      <Alert />

      <input type="checkbox" id="theme" />
      <div className={`App ${(status || modal ) && 'mode'}`}>
        <div className="main">
          {auth.token && <Header />}
          {status && <StatusModal />}

          {/* <div className="status_modal">
             
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
                      

                        <li>
                          <i class="far fa-user"></i>
                        </li>
                      </ul>
                    </div>
                    <div className="status_footer">
                      <span className="btn-post">
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
          </div> */}
          {auth.token && <SocketClient />}
          {call && <CallModal />}
           <Route exact path="/" component={auth.token ? Home : Login} />
           <Route exact path="/register" component={Register} />

          <PrivateRouter exact path="/:page" component={PageRender} />
          <PrivateRouter exact path="/:page/:id" component={PageRender} />
          
        </div>
      </div>
    </Router>
  );
}

export default App;
