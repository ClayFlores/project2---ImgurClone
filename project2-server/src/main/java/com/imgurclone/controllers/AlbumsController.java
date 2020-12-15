package com.imgurclone.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.imgurclone.daos.AlbumDao;
import com.imgurclone.models.Album;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("albums")
public class AlbumsController {
    @Autowired
    private AlbumDao albumDao;

    @Autowired
    private static final Logger logger = LogManager.getLogger(AlbumsController.class);

    @Autowired
    private ObjectMapper objectMapper;


    @GetMapping(path="/homepageAlbums", produces= MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<List<Album>> getAlbumsForHomepage(HttpServletRequest request) {
        List<Album> mostRecentAlbums = albumDao.getTenMostRecentAlbums();
        logger.debug("getAlbumsForHomepage retrieved albums. mostRecentAlbums[0].title: "+mostRecentAlbums.get(0)
                .getAlbumTitle());
        try {
            logger.debug("getAlbumsForHomepage mostRecentAlbums as json with objectMapper: "
                    +objectMapper.writeValueAsString(mostRecentAlbums));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(mostRecentAlbums,  HttpStatus.OK);
    }


    @GetMapping(path="/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<Album> getAlbumWithId(HttpServletRequest request,
                                                @PathVariable("id") String id) {
        Album album = albumDao.getSingleAlbumById(Integer.parseInt(id));
        logger.debug("getAlbumWithId retrieved album. title: " + album.getAlbumTitle());
        try{
            logger.debug("getAlbumWithId album as json with objectMapper: "
                    + objectMapper.writeValueAsString(album)) ;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(album, HttpStatus.OK);
    }

    // this doesnt seem like a good strategy for the most part, title would be very limiting
    @GetMapping(path="/byTitle/{title}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<Album> getAlbumWithTitle(HttpServletRequest request,
                                                @PathVariable("title") String title) {
        Album album = albumDao.getSingleAlbumByTitle(title);
        logger.debug("getAlbumWithTitle retrieved album. title: " + album.getAlbumTitle());
        try{
            logger.debug("getAlbumWithTitle album as json with objectMapper: "
                    + objectMapper.writeValueAsString(album)) ;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(album, HttpStatus.OK);
    }
}
