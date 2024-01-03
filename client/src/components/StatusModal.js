import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../redux/actions/globalTypes'
import { createPost, updatePost } from '../redux/actions/postAction'
import Icons from './Icons'
import { imageShow, videoShow } from '../utils/mediaShow'

const StatusModal = () => {
    const { auth, theme, status, socket } = useSelector(state => state)
    const dispatch = useDispatch()

    const [content, setContent] = useState('')
    const [images, setImages] = useState([])

    const [stream, setStream] = useState(false)
    const videoRef = useRef()
    const refCanvas = useRef()
    const [tracks, setTracks] = useState('')

    const handleChangeImages = e => {
        const files = [...e.target.files]
        console.log(files)
        let err = ""
        let newImages = []

        files.forEach(file => {
            if(!file) return err = "File does not exist."

            if(file.size > 1024 * 1024 * 5){
                return err = "The image/video largest is 5mb."
            }

            return newImages.push(file)
        })

        if(err) dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err} })
        setImages([...images, ...newImages])
    }

    const deleteImages = (index) => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    const handleStream = () => {
        setStream(true)
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
            navigator.mediaDevices.getUserMedia({video: true})
            .then(mediaStream => {
                videoRef.current.srcObject = mediaStream
                videoRef.current.play()

                const track = mediaStream.getTracks()
                setTracks(track[0])
            }).catch(err => console.log(err))
        }
    }

    const handleCapture = () => {
        const width = videoRef.current.clientWidth;
        const height = videoRef.current.clientHeight;

        refCanvas.current.setAttribute("width", width)
        refCanvas.current.setAttribute("height", height)

        const ctx = refCanvas.current.getContext('2d')
        ctx.drawImage(videoRef.current, 0, 0, width, height)
        let URL = refCanvas.current.toDataURL()
        setImages([...images, {camera: URL}])
    }

    const handleStopStream = () => {
        tracks.stop()
        setStream(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(images.length === 0)
        return dispatch({ 
            type: GLOBALTYPES.ALERT, payload: {error: "Please add your photo."}
        })

        if(status.onEdit){
            dispatch(updatePost({content, images, auth, status}))
        }else{
            dispatch(createPost({content, images, auth, socket}))
        }
        

        setContent('')
        setImages([])
        if(tracks) tracks.stop()
        dispatch({ type: GLOBALTYPES.STATUS, payload: false})
    }

    useEffect(() => {
        if(status.onEdit){
            setContent(status.content)
            setImages(status.images)
        }
    },[status])




   

    return (
        <div className="status_modal">
            <form onSubmit={handleSubmit}>
                <div className="status_header top-post">
                    <h5 className="m-0">Create Post</h5>
                    <span className='post-span-icon' onClick={() => dispatch({
                        type: GLOBALTYPES.STATUS, payload: false
                    })}>
                        {/* &times; */}
                        <i className="uil uil-x post-out--icon"></i>
                    </span>
                </div>

                <div className="status_body">
                    <div className='status-input-box'>
                        <textarea name="content" value={content}
                        placeholder={`${auth.user.username}, What's happening?`}
                        onChange={e => setContent(e.target.value)}
                        style={{
                            filter: theme ? 'invert(1)' : 'invert(0)',
                            color: theme ? 'white' : '#111',
                            background: theme ? 'rgba(0,0,0,.03)' : '',
                        }} />

                        <div className="show_images">
                            {
                                images.map((img, index) => (
                                    <div key={index} id="file_img">
                                        {
                                            img.camera ? imageShow(img.camera, theme)
                                            : img.url
                                                ?<>
                                                    {
                                                        img.url.match(/video/i)
                                                        ? videoShow(img.url, theme) 
                                                        : imageShow(img.url, theme)
                                                    }
                                                </>
                                                :<>
                                                    {
                                                        img.type.match(/video/i)
                                                        ? videoShow(URL.createObjectURL(img), theme) 
                                                        : imageShow(URL.createObjectURL(img), theme)
                                                    }
                                                </>
                                        }
                                        <span onClick={() => deleteImages(index)}>&times;</span>
                                    </div>
                                ))
                            }
                        </div>

                        {
                            stream && 
                            <div className="stream position-relative">
                                <video autoPlay muted ref={videoRef} width="100%" height="100%"
                                style={{filter: theme ? 'invert(1)' : 'invert(0)'}} />
                                
                                <span onClick={handleStopStream}>&times;</span>
                                <canvas ref={refCanvas} style={{display: 'none'}} />
                            </div>
                        }

                        <div className="privacy">
                            <i className="fas fa-globe-asia"></i>
                            <span>Everyone can reply</span>
                        </div>
                    </div>
                    
                    <div className='post-bottom'>
                        <div className="input_images">
                            <ul className='icons'>

                                {
                                    stream 
                                    ? <i className="uil uil-capture" onClick={handleCapture} />
                                    : <>
                                        <i className="uil uil-capture" onClick={handleStream} />

                                        <div className="file_upload">
                                            <i className="far fa-file-image" />
                                            <input type="file" name="file" id="file" 
                                            multiple accept="image/*,video/*" onChange={handleChangeImages} />
                                        </div>
                                    </>
                                }
                            
                                <li><i class="fas fa-map-marker-alt"></i></li>
                                {/* <li><i class="far fa-grin"></i></li> */}
                                <li><Icons setContent={setContent} content={content} theme={theme} /></li>
                                <li><i class="far fa-user"></i></li>
                            </ul>
                        </div>
                        <div className="status_footer">
                            <button className="btn-post" type="submit">
                                Post
                            </button>
                        </div>
                    </div>
                </div>

               

            </form>
        </div>
    )
}

export default StatusModal
