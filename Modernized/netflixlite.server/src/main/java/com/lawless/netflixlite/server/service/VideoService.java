package com.lawless.netflixlite.server.service;

import com.lawless.netflixlite.server.data.Video;
import com.lawless.netflixlite.server.data.VideoRepo;
import com.lawless.netflixlite.server.exceptions.VideoAlreadyExistsException;
import com.lawless.netflixlite.server.exceptions.VideoNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
@Service
@AllArgsConstructor
public class VideoService implements VideoServices {
    private VideoRepo repo;

    @Override
    public Video getVideo(String name) {
        Video found = repo.findByName(name);
        if(found == null){
            throw new VideoNotFoundException();
        }
        return found;

    }

    @Override
    public void saveVideo(MultipartFile file, String name) throws IOException {
        if(repo.existsByName(name)){
            throw new VideoAlreadyExistsException();
        }
        Video newVid = new Video(name,file.getBytes());
        repo.save(newVid);
    }

    @Override
    public List<String> getAllVideoNames() {
        return repo.getAllEntryNames();
    }
}
