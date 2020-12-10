package com.imgurclone.models;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "images")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "imagepath")
    private String imagePath;

    @Column(name = "caption")
    private String caption;

    @Column(name = "datesubmitted")
    private LocalDate dateSubmitted;

    // foreign key map relationships later
    @OneToOne
    @JoinColumn(name="USERCREATOR", referencedColumnName = "ID", columnDefinition = "INT")
    private User user;

    @OneToOne
    @JoinColumn(name="ALBUMID", referencedColumnName = "ID", columnDefinition = "INT")
    private Album album;

}
