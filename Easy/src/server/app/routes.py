import json
import os
from app import app
from flask import jsonify, request, send_from_directory, current_app

@app.route('/videos')
def list_videos():
    with open('./manifest.json') as f:
        videos_manifest = json.load(f)
    output = jsonify(videos_manifest["videos"])
    return output

@app.route('/video')
def get_video():
    video_id = request.args.get('videoId')
    quality = request.args.get('quality')

    if not quality:
        # TODO: Need to make a decision around default 
        # qualities and wether to always enforce a
        # default resolution on upload or implement a lookup for the manifest
        quality = 1080
    
    # Construct the path relative to the directory
    video_path = os.path.join(video_id, f'{quality}.mp4')

    # Assuming 'video-files' is a directory in the root of your Flask app
    directory = os.path.join(current_app.root_path, 'video-files')
    
    # Checking if the path is valid and the file exists could prevent serving files outside of 'video-files'
    # and handle potential 404 more gracefully
    full_path = os.path.join(directory, video_path)
    if not os.path.isfile(full_path):
        return "File not found.", 404

    # Serving the file
    return send_from_directory(directory=directory, path=video_path)