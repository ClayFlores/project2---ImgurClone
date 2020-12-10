package com.imgurclone.controllers;

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

    @Autowired
    private static final Logger logger = LogManager.getLogger(AlbumsController.class);


    @GetMapping(path="/", produces= MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<List<Album>> getAlbumsForHomepage(HttpServletRequest request) {
        List<Album> mostRecentAlbums = albumDao.getTenMostRecentAlbums();
        logger.debug("getAlbumsForHomepage retrieved albums. mostRecentAlbums[0].title: "+mostRecentAlbums.get(0)
                .getAlbumTitle());
        return new ResponseEntity<>(mostRecentAlbums, HttpStatus.OK);
    }
}
