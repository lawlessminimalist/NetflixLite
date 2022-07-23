import './App.css';
import { useEffect, useState, useRef} from 'react';


function App() {
  const vid = document.getElementById('video');
  const videoRef = useRef();
  

  const [quality,setQuality] = useState('360p');
  const [timestamp,setTimestamp] = useState(0);

  let url = `https://video-bucket-aws.s3.ap-southeast-2.amazonaws.com/${quality}/videoplayback.mp4`
  
  
  useEffect(()=>{ 
    videoRef.current?.load();
    vid.currentTime = timestamp;
    },[quality,vid,timestamp])


  return (
    <div className="App">
      <div className="videoPanel">
        <video id="video" controls autoPlay muted ref={videoRef} >
          <source src={url} type="video/mp4"/>
        </video>
        <div className='videoControls'>
          <button id='360p' onClick={() => {setQuality('360p');setTimestamp(vid.currentTime)}}>360p</button>
          <button id='720p' onClick={() => {setQuality('720p');setTimestamp(vid.currentTime)}}>720p</button>
        </div>
      </div>
    </div>
  ); 
}

export default App;
