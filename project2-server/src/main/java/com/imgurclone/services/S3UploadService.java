package com.imgurclone.services;

import com.amazonaws.AmazonClientException;
import com.amazonaws.SdkClientException;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferManagerBuilder;
import com.amazonaws.services.s3.transfer.Upload;
import com.imgurclone.daos.AlbumDao;
import com.imgurclone.models.Album;
import com.imgurclone.models.Image;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.net.URL;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@PropertySource("classpath:AwsCredentials.properties")
@Service
public class S3UploadService {

    @Autowired
    AlbumDao albumDao;

    private final String bucketName = "imgurclone-bucket";

    @Value("${AWSAccessKeyId}")
    private String awsAccessKey;

    @Value("${AWSSecretKey}")
    private String awsSecretKey;

    @Value("${region}")
    private String awsRegion;


    public void uploadImage(File transferFile, String imageCaption, int albumId) throws InterruptedException {
        try {
            AWSCredentials awsCredentials = new BasicAWSCredentials(awsAccessKey, awsSecretKey);
            AmazonS3 s3Client = AmazonS3ClientBuilder
                        .standard()
                        .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                        .withRegion(awsRegion)
                        .build();

            TransferManager tm = TransferManagerBuilder.standard()
                    .withS3Client(s3Client)
                    .build();


            Upload upload = tm.upload(new PutObjectRequest(bucketName, transferFile.getName(), new File(transferFile.getAbsolutePath()))
                    .withCannedAcl(CannedAccessControlList.BucketOwnerFullControl));

            upload.waitForCompletion();

            URL s3Url = s3Client.getUrl(bucketName, transferFile.getName());
            System.out.println("The name of the file that will be in s3 " + transferFile.getName());
            System.out.println(s3Url.toString());



            // Here we Create an Image Object AND EDIT THE IMAGE URL AND STORE IN DB
            //

            // Construct the date
            LocalDateTime ldt = LocalDateTime.ofInstant(Instant.now(), ZoneOffset.UTC);
            Timestamp ts = Timestamp.valueOf(ldt);

            // Construct the image using the new URL from s3
            Image image = new Image();
            image.setImagePath(s3Url.toString());
            image.setDateSubmitted(ts);
            image.setCaption(imageCaption);
            albumDao.insertNewImage(albumId, image);


        } catch (SdkClientException e) {
            //TODO add logging
            System.out.println("S3 could not be contacted for a response, or the client could not parse the response");
            e.printStackTrace();
        } catch (AmazonClientException e) {
            //TODO add logging
            System.out.println("S3 could not successfully process the request");
            e.printStackTrace();
        }

    }
}
