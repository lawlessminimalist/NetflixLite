import './App.css';
import { useEffect, useState, useRef} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const videoRef = useRef();
  let vid = document.getElementById('video');
  const [quality,setQuality] = useState('360p');
  const [timestamp,setTimestamp] = useState(0);

  // Switching to a Media Source rather than a URL for the video location

  const myMediaSource = new MediaSource();
  const url = URL.createObjectURL(myMediaSource)

  let url = `https://video-bucket-aws.s3.ap-southeast-2.amazonaws.com/${quality}/videoplayback.mp4`
  
  
  useEffect(()=>{ 
    // Skip proccess on first time render
    if(!vid){
      vid = document.getElementById('video');
   }
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
          <Dropdown>
          <Dropdown.Toggle variant="link" size="lg">
              &#x2699;
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => {setQuality('360p');setTimestamp(vid.currentTime)}}>360p</Dropdown.Item>
            <Dropdown.Item onClick={() => {setQuality('720p');setTimestamp(vid.currentTime)}}>720p</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
      </div>
    </div>
  ); 
}

export default App;
