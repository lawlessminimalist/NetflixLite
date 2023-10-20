package com.lawless.netflixlite.server.data;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Video {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(unique = true)
    private String name;

    @Lob
    private byte[] data;

    public Video(String name,byte[] data){
        this.name = name;
        this.data = data;
    }


}
