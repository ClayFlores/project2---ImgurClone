package com.imgurclone.models;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name="USERS")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "email")
    private String email;

    //TODO make this a hashed valued
    @Column(name = "passwordHash")
    private String passwordHash;

    @OneToMany
    private List<Album> albumList;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordHash() {return passwordHash;}

    public void setPasswordHash(String passwordHash) {this.passwordHash = passwordHash;}

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return getId() == user.getId() &&
                Objects.equals(getEmail(), user.getEmail()) &&
                Objects.equals(getPasswordHash(), user.getPasswordHash()) &&
                Objects.equals(albumList, user.albumList);
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getEmail(), getPasswordHash(), albumList);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", passwordHash='" + passwordHash + '\'' +
                ", albumList=" + albumList +
                '}';
    }
}
