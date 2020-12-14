package com.imgurclone.services;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.auth.ClasspathPropertiesFileCredentialsProvider;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferManagerBuilder;
import com.amazonaws.services.s3.transfer.Upload;
import com.imgurclone.models.Album;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import java.io.File;

@PropertySource("classpath:AwsCredentials.properties")
@Service
public class S3UploadService {

    private final String bucketName = "imgurclone-bucket";

    @Value("${AWSAccessKeyId}")
    private String awsAccessKey;

    @Value("${AWSSecretKey}")
    private String awsSecretKey;

    @Value("${region}")
    private String awsRegion;



    public void uploadImage(File transferFile) throws InterruptedException {
        AWSCredentials awsCredentials = new BasicAWSCredentials(awsAccessKey, awsSecretKey);
        AmazonS3 s3Client = AmazonS3ClientBuilder
                    .standard()
                    .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                    .withRegion(awsRegion)
                    .build();

        TransferManager tm = TransferManagerBuilder.standard()
                .withS3Client(s3Client)
                .build();

        Upload upload = tm.upload(bucketName, transferFile.getName(), new File(transferFile.getAbsolutePath()));
        upload.waitForCompletion();

    }






}
