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


  let vidURL = `https://video-bucket-aws.s3.ap-southeast-2.amazonaws.com/${quality}/video/videoplayback_${quality}_video.webm`
  let getVid = (async () => {

    // Create a MediaSource instance and connect it to video element
    const mediaSource = new MediaSource();
    // This creates a URL that points to the media buffer,
    // and assigns it to the video element src
    vid.src = URL.createObjectURL(mediaSource);
  
    // Video that will be fetched and appended
  
    // Fetch remote URL, getting contents as binary blob
    const vidBlob = await (await fetch(vidURL)).blob();
      console.log(vidURL)
    // We need array buffers to work with media source
    const vidBuff = await vidBlob.arrayBuffer();
  
    /**
     * Before we can actually add the video, we need to:
     *  - Create a SourceBuffer, attached to the MediaSource object
     *  - Wait for the SourceBuffer to "open"
     */
    /** @type {SourceBuffer} */
    const sourceBuffer = await new Promise((resolve, reject) => {
      const getSourceBuffer = () => {
        try {
          const sourceBuffer = mediaSource.addSourceBuffer(`video/webm; codecs="vp9,opus"`);
          resolve(sourceBuffer);
        } catch (e) {
          reject(e);
        }
      };
      if (mediaSource.readyState === 'open') {
        getSourceBuffer();
      } else {
        mediaSource.addEventListener('sourceopen', getSourceBuffer);
      }
    });
  
    // Now that we have an "open" source buffer, we can append to it
    sourceBuffer.appendBuffer(vidBuff);
    // Listen for when append has been accepted and
    // You could alternative use `.addEventListener` here instead
    sourceBuffer.onupdateend = () => {
      // Nothing else to load
      mediaSource.endOfStream();
      // Start playback!
      // Note: this will fail if video is not muted, due to rules about
      // autoplay and non-muted videos
      vid.play();
    };
  });

  useEffect(()=>{ 
    // Skip proccess on first time render
    if(!vid){
      vid = document.getElementById('video');

    }
      getVid();
      videoRef.current?.load();
      vid.currentTime = timestamp;
    
    },[quality,vid,timestamp])

  return (
    <div className="App">
      <div className="videoPanel">
        <video id="video" controls autoPlay muted ref={videoRef} >
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
