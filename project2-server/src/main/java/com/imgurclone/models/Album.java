package com.imgurclone.models;

import javax.persistence.*;
import java.sql.Timestamp;
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
    private Timestamp dateCreated;

    //many to one
    @ManyToOne
    @JoinColumn(name="userCreator", referencedColumnName="ID", columnDefinition="INT")
    private User userCreator;

    @OneToMany(mappedBy="album")
    private Set<Image> imageSet;

    @OneToMany(mappedBy = "album")
    private Set<AlbumTag> tagList;

    @OneToMany(mappedBy="album")
    private Set<Comment> commentSet;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAlbumTitle() {
        return albumTitle;
    }

    public void setAlbumTitle(String albumTitle) {
        this.albumTitle = albumTitle;
    }

    public Timestamp getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Timestamp dateCreated) {
        this.dateCreated = dateCreated;
    }

    public User getUserCreator() {
        return userCreator;
    }

    public void setUserCreator(User userCreator) {
        this.userCreator = userCreator;
    }

    public Set<Image> getImageSet() {
        return imageSet;
    }

    public void setImageSet(Set<Image> imageSet) {
        this.imageSet = imageSet;
    }

    public Set<AlbumTag> getTagList() {
        return tagList;
    }

    public void setTagList(Set<AlbumTag> tagList) {
        this.tagList = tagList;
    }

    public Set<Comment> getCommentSet() {
        return commentSet;
    }

    public void setCommentSet(Set<Comment> commentSet) {
        this.commentSet = commentSet;
    }

    @Override
    public String toString() {
        return "Album{" +
                "id=" + id +
                ", albumTitle='" + albumTitle + '\'' +
                ", dateCreated=" + dateCreated +
                ", userCreator=" + userCreator +
                ", imageSet=" + imageSet +
                ", tagList=" + tagList +
                ", commentSet=" + commentSet +
                '}';
    }
}
