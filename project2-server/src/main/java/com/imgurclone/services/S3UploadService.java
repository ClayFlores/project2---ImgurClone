package com.imgurclone.services;

import com.amazonaws.AmazonClientException;
import com.amazonaws.SdkClientException;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferManagerBuilder;
import com.amazonaws.services.s3.transfer.Upload;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.net.URL;

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

            Upload upload = tm.upload(bucketName, transferFile.getName(), new File(transferFile.getAbsolutePath()));
            upload.waitForCompletion();

            URL s3Url = s3Client.getUrl(bucketName, transferFile.getName());
            System.out.println("The name of the file that will be in s3 " + transferFile.getName());
            System.out.println(s3Url.toString());



            //TODO HERE WE SHOULD ALTER THE ALBUM OBJECT AND EDIT THE IMAGE URL AND STORE IN DB
            // DAO CALL


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
