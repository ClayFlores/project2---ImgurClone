package com.imgurclone.models;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name="AlbumComments")
public class Comment {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;

    @Column(name="body")
    private String body;

    @ManyToOne
    @JoinColumn(name="usercommenter")
    private User userCommenter;

    @ManyToOne
    @JoinColumn(name="albumid")
    private Album album;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public User getUserCommenter() {
        return userCommenter;
    }

    public void setUserCommenter(User userCommenter) {
        this.userCommenter = userCommenter;
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
        Comment comment = (Comment) o;
        return getId() == comment.getId() &&
                Objects.equals(getBody(), comment.getBody()) &&
                Objects.equals(getUserCommenter(), comment.getUserCommenter()) &&
                Objects.equals(getAlbum(), comment.getAlbum());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getBody(), getUserCommenter(), getAlbum());
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", body='" + body + '\'' +
                ", userCommenter=" + userCommenter +
                ", album=" + album +
                '}';
    }
}
