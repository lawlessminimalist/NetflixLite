package com.lawless.netflixlite.server.service;

import com.lawless.netflixlite.server.data.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

public interface VideoServices {
    Video getVideo(String name);
    void saveVideo(MultipartFile file,String name) throws IOException;
    List<String> getAllVideoNames();
}
