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
    let audioURL = `https://video-bucket-aws.s3.ap-southeast-2.amazonaws.com/${quality}/audio/videoplayback_${quality}_audio.mp4`
    console.log(audioURL)
   
    // Fetch remote URL, getting contents as binary blob
    const vidBlob = await (await fetch(vidURL)).blob();
    const audioBlob = await(await fetch(audioURL)).blob();


    // Client side slicing - NOT usually how this works but sourcebuffers are
    // incredibly tempermental  

    // Split the blob into quarters to reduce the size of the video
    const vid_slice_size = vidBlob.size/4; 
    const audio_slice_size = audioBlob.size/4; 
    // We need array buffers to work with media source
    const vidBuff0 = await vidBlob.slice(0,vid_slice_size).arrayBuffer();
    const vidBuff1 = await vidBlob.slice(vid_slice_size,vid_slice_size*2).arrayBuffer();
    const vidBuff2 = await vidBlob.slice(vid_slice_size*2,vid_slice_size*3).arrayBuffer();
    const vidBuff3 = await vidBlob.slice(vid_slice_size*3,vid_slice_size*4).arrayBuffer();
    
    const audioBuff0 = await audioBlob.slice(0,vid_slice_size).arrayBuffer();
    const audioBuff1 = await audioBlob.slice(vid_slice_size,vid_slice_size*2).arrayBuffer();
    const audioBuff2 = await audioBlob.slice(vid_slice_size*2,vid_slice_size*3).arrayBuffer();
    const audioBuff3 = await audioBlob.slice(vid_slice_size*3,vid_slice_size*4).arrayBuffer();

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

  // const audioSourceBuffer = await new Promise((resolve, reject) => {
	// 	const getSourceBuffer = () => {
	// 		try {
	// 			const audioSourceBuffer = mediaSource.addSourceBuffer('audio/mp4; codecs="mp4a.40.2"');
	// 			resolve(audioSourceBuffer);
	// 		} catch (e) {
	// 			reject(e);
	// 		}
	// 	};
	// 	if (mediaSource.readyState === 'open') {
	// 		getSourceBuffer();
	// 	} else {
	// 		mediaSource.addEventListener('sourceopen', getSourceBuffer);
	// 	}
	// });
  
	console.log({
		sourceBuffer,
		mediaSource,
		vid
	});

  let buffers = [(vidBuff0,audioBuff0),(vidBuff1,audioBuff1),(vidBuff2,audioBuff2),(vidBuff3,audioBuff3)]
  
  buffers.forEach((vidBuff,_) => {
    let duration = 0;
    sourceBuffer.appendBuffer(vidBuff);
    //audioSourceBuffer.appendBuffer(audioBuff)
    sourceBuffer.onupdateend = () => {
      // Nothing else to load
      mediaSource.endOfStream();
      // Update Video Buffer Duration Appended
      var delta = vidBuff0.duration;
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
