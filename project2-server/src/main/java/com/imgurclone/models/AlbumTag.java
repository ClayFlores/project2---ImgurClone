package com.imgurclone.models;

import javax.persistence.*;

@Entity
@Table(name ="albumtags")
public class AlbumTag {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name="albumid")
    private Album album;

    @Column(name = "tagname")
    private String tagName;
}
