package com.lawless.netflixlite.server.data;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface VideoRepo extends JpaRepository<Video,Long> {
    Video findByName(String name);
    boolean existsByName(String name);
    //JPA Data query to select from the H2 database when calling the getAllEntryNames
    @Query(nativeQuery = true, value="SELECT name FROM video")
    List<String> getAllEntryNames();
}
