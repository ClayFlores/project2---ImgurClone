package com.imgurclone.models;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "albums")
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="albumtitle")
    private String albumTitle;

    @Column(name = "datecreated")
    private LocalDate dateCreated;

    @ManyToOne
    @JoinColumn(name="userCreator")
    private User userCreator;

    int userCreatorId;




}
