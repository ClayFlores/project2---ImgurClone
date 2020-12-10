package com.imgurclone.models;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "albums")
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="album_title")
    private String albumTitle;

    @Column(name = "date_created")
    private LocalDate dateCreated;



    int userCreatorId;




}
