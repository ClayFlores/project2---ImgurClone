package com.imgurclone.controllers;

import com.imgurclone.daos.AlbumDao;
import com.imgurclone.models.Album;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("albums")
public class AlbumsController {
    @Autowired
    private AlbumDao albumDao;


    @GetMapping(path="/", produces= MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<List<Album>> getAlbumsForHomepage(HttpServletRequest request) {
        List<Album> mostRecentAlbums = albumDao.getTenMostRecentAlbums();
        System.out.println("Hello");
        System.out.println(mostRecentAlbums.get(0).getId());
        return new ResponseEntity<>(mostRecentAlbums, HttpStatus.OK);
    }
}
