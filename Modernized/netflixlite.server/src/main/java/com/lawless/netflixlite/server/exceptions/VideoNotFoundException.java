package com.lawless.netflixlite.server.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "A video with this name cannot be found")
public class VideoNotFoundException extends RuntimeException{
}
