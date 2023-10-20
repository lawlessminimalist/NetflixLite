package com.lawless.netflixlite.server;

import com.lawless.netflixlite.server.controller.VideoController;
import com.lawless.netflixlite.server.data.VideoRepo;
import com.lawless.netflixlite.server.service.VideoService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
