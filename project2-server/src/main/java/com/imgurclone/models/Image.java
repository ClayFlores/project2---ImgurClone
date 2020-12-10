package com.imgurclone.models;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "images")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "image_path")
    private String imagePath;

    @Column(name = "captions")
    private String caption;

    @Column(name = "date_submitted")
    private LocalDate dateSubmitted;

    // foreign key map relationships later
    @OneToOne
    private User user;

    @OneToOne
    private Album album;

}
