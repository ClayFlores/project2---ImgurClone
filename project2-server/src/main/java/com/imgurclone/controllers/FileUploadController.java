package com.imgurclone.controllers;

import com.imgurclone.services.S3UploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;

@RestController
@RequestMapping(name = "files")
@CrossOrigin(origins = "*")
public class FileUploadController {

    @Autowired
    S3UploadService s3UploadService;

    @Autowired
    ServletContext servletContext;

    @PostMapping(path = "upload")
    public String handlePost(@RequestParam("user-file") MultipartFile multipartFile) throws IOException, InterruptedException, URISyntaxException {

        if(multipartFile == null ) {
            System.out.println("The file is null we aren't writing anything");
        }
//
        File uploadDir = (File) servletContext.getAttribute(ServletContext.TEMPDIR);
        File transferFile = new File(uploadDir + "/" + multipartFile.getOriginalFilename());
        multipartFile.transferTo(transferFile);


        // Now that file is uploaded we need to call the service to get the correct s3 url
        s3UploadService.uploadImage(transferFile);


        return "response";
    }




}
