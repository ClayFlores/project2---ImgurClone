package com.imgurclone.models;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Objects;

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

    @ManyToOne
    @JoinColumn(name="ALBUMID", referencedColumnName = "ID", columnDefinition = "INT")
    private Album album;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public LocalDate getDateSubmitted() {
        return dateSubmitted;
    }

    public void setDateSubmitted(LocalDate dateSubmitted) {
        this.dateSubmitted = dateSubmitted;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Album getAlbum() {
        return album;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Image image = (Image) o;
        return getId() == image.getId() &&
                Objects.equals(getImagePath(), image.getImagePath()) &&
                Objects.equals(getCaption(), image.getCaption()) &&
                Objects.equals(getDateSubmitted(), image.getDateSubmitted()) &&
                Objects.equals(getUser(), image.getUser()) &&
                Objects.equals(getAlbum(), image.getAlbum());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getImagePath(), getCaption(), getDateSubmitted(), getUser(), getAlbum());
    }

    @Override
    public String toString() {
        return "Image{" +
                "id=" + id +
                ", imagePath='" + imagePath + '\'' +
                ", caption='" + caption + '\'' +
                ", dateSubmitted=" + dateSubmitted +
                ", user=" + user +
                ", album=" + album +
                '}';
    }
}
