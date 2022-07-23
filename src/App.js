import './App.css';

function App() {
  return (
    <div className="App">
        <video width="320" height="240" controls id={"streamingWindow"}>
          <source src="https://video-bucket-aws.s3.ap-southeast-2.amazonaws.com/360p/videoplayback.mp4" type="video/mp4"/>
        </video>
        
    </div>
  );
}

export default App;
