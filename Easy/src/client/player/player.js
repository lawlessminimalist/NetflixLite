document.addEventListener('DOMContentLoaded',function(){
    const urlParams = new URLSearchParams(window.location.search)
    const videoId = urlParams.get('videoId')

    const videoPath =`http://localhost:8000/video?videoId=${videoId}`
    const videoElement = document.getElementById('videoElement')
    const videoSrc = document.createElement('source')
    videoSrc.src = videoPath
    videoElement.append(videoSrc)

    videoElement.load()
})