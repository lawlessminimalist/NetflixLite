# Basic Implementation of Streaming Video

## Overview
The purpose of this implementation is to set the ground-work for the more complex implementations to come after it. It's incredibly simple in how it functions and is comprised of two parts:
- The Server: The service which will host the video content to the consumer
- The Client: The web client which will load and play the video content to the user

### The Server
In this basic implementation we will host the content locally via a NGINX file server that will be listening for connections locally on port 8080, (mapped to port 80 in the container it's running from)

### The Client
In this basic implementation we will create a sample html client with a faux netflix UI to stream the content available to the user in Netflix-esque video panels.

## Deployment
_TODO: Make this a script to run_
In order to deploy this solution, you must follow the below steps:
- navigate to the `/src/server` folder
- ensure your local docker application is running/installed
- run the commands 
```
docker build -t video-server .
docker run -d -p 8080:80 video-server
```
- open the file `video-player.html` in your browser of choice _note: must support html video tags_
- voila, the video should be streaming to your browser through the magic of whoever built the html5 default video player
_interesting note: the html5 video automatically buffers and chunks the download of the file from the nginx server as you can see from the inital load and buffer of the video_

## Some more details
There is some level of complexity in the HTML and Javascript at the client level (in comparison to the back-end at least). This is due to the front-end UI remaining consistent across all three implementations of increasing complexity. 
