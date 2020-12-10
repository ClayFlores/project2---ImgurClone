package com.imgurclone.models;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

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

    //many to one
    @ManyToOne
    @JoinColumn(name="userCreator")
    private User userCreator;

    @OneToMany(mappedBy = "album")
    private Set<AlbumTag> tagList;

    int userCreatorId;




}
