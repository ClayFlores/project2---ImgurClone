package com.imgurclone.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping(name = "files")
public class FileUploadController {


    @PostMapping(path = "upload")
    public String handlePost(@RequestParam("user-file") MultipartFile multipartFile) throws  IOException {

        if(multipartFile == null ) {
            System.out.println("The file is null we aren't writing anything");
        }

        String uploadDir = "/Users/ratulahmed/Desktop/imgur-clone-revature/project2-server/src/main/resources/tmp";
        File transferFile = new File(uploadDir + "/" + multipartFile.getOriginalFilename());
        multipartFile.transferTo(transferFile);



        return "response";
    }


}
