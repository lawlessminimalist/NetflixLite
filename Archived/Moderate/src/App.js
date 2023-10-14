import './App.css';
import { useEffect, useState, useRef} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const videoRef = useRef();
  const [quality,setQuality] = useState('360p');
  const [timestamp,setTimestamp] = useState(0);

  // Switching to a Media Source rather than a URL for the video location

  let vid = document.getElementById('video');

  let getVid = (async () => {
    vid = document.getElementById('video');

    // Create a MediaSource instance and connect it to video element
    const mediaSource = new MediaSource();
    // This creates a URL that points to the media buffer,
    // and assigns it to the video element src
    vid.src = URL.createObjectURL(mediaSource);
  
    // Video that will be fetched and appended
    let vidURL = `https://video-bucket-aws.s3.ap-southeast-2.amazonaws.com/${quality}/video/videoplayback.webm`
    
    // Embed required audio URL into the video
    // You can start to see the file management becoming complex
    // let audioURL = `https://video-bucket-aws.s3.ap-southeast-2.amazonaws.com/${quality}/audio/videoplayback_${quality}_audio.webm`


    //Imagine for instance having to implement the ability to switch languages,quality,subtitle tracks etc. It might look a little like
    //let vidURL = `https://video-bucket-aws.s3.ap-southeast-2.amazonaws.com/${quality}/${subtitle}/video/videoplayback${number}.webm`
    //Now we begin to see why we should segment on the server side


    // Fetch remote URL, getting contents as binary blob
    const vidBlob = await (await fetch(vidURL)).blob();

    // Split the blob into quarters to reduce the size of the video
    const slice_size = vidBlob.size/4;
    // We need array buffers to work with media source
    let vidBuff0 = await vidBlob.slice(0,slice_size).arrayBuffer();
    let vidBuff1 = await vidBlob.slice(slice_size,slice_size*2).arrayBuffer();
    let vidBuff2 = await vidBlob.slice(slice_size*2,slice_size*3).arrayBuffer();
    let vidBuff3 = await vidBlob.slice(slice_size*3,slice_size*4).arrayBuffer();
  
    /**
     * Before we can actually add the video, we need to:
     *  - Create a SourceBuffer, attached to the MediaSource object
     *  - Wait for the SourceBuffer to "open"
     */
    /** @type {SourceBuffer} */
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
	console.log({
		sourceBuffer,
		mediaSource,
		vid
	});

  let buffers = [vidBuff0,vidBuff1,vidBuff2,vidBuff3]
  let duration = 0;

  buffers.forEach((buffer) => {
    sourceBuffer.appendBuffer(buffer);
    
    sourceBuffer.onupdateend = () => {
      // Nothing else to load
      mediaSource.endOfStream();
      // Update Video Buffer Duration Appended
      const delta = buffer.duration;
      duration += delta;
      sourceBuffer.timestampOffset = duration;
      // Start playback!
      // Note: this will fail if video is not muted, due to rules about
      // autoplay and non-muted videos
      vid.play();
    };
  }
  )

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
