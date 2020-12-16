package com.imgurclone.controllers;

import com.imgurclone.models.Album;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.ArrayList;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.contains;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:test-application-context.xml"})
@WebAppConfiguration
public class AlbumsControllerTest {
    @Autowired
    private WebApplicationContext wac;

    private MockMvc mockMvc;

    @Before
    public void setup() throws Exception {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
    }

    /**
     * tests that /albums/homepageAlbums returns a json object with an array of 10 albums
     * @throws Exception
     */
    @Test
    public void givenHomepageAlbumsURI_whenMockMVC_thenResponseOK() throws Exception {
        MvcResult mvcResult = this.mockMvc
                .perform(get("/albums/homepageAlbums"))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$").isArray())
                .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(10)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.[*].id").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.[*].albumTitle").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.[*].dateCreated").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.[*].imageSet").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.[*].tagList").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.[*].commentSet").exists())
                .andReturn();
        Assert.assertEquals("application/json;charset=UTF-8",mvcResult.getResponse().getContentType());
    }

    /**
     * tests that /albums/{id} returns the album with the correct id
     * @throws Exception
     */
    @Test
    public void givenAlbumId_whenMockMVC_thenResponseOK() throws Exception {
        int testAlbumId = 13;
        MvcResult mvcResult = this.mockMvc
                .perform(get("/albums/"+testAlbumId))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id", is(testAlbumId)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.albumTitle").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.dateCreated").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.imageSet").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.tagList").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.commentSet").exists())
                .andReturn();
        Assert.assertEquals("application/json;charset=UTF-8",mvcResult.getResponse().getContentType());
    }

    /**
     * tests that /albums/byTitle/{title} returns the album with the correct title
     * @throws Exception
     */
    @Test
    public void givenAlbumTitle_whenMockMVC_thenResponseOK() throws Exception {
        String testAlbumTitle = "miners strike";
        MvcResult mvcResult = this.mockMvc
                .perform(get("/albums/byTitle/"+testAlbumTitle))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.albumTitle").value(testAlbumTitle))
                .andExpect(MockMvcResultMatchers.jsonPath("$.dateCreated").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.imageSet").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.tagList").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.commentSet").exists())
                .andReturn();
        Assert.assertEquals("application/json;charset=UTF-8",mvcResult.getResponse().getContentType());
    }

    //TODO: check that the albums are from the right user
    /**
     * tests that /albums/byUser/{userId} returns an array of albums when given a valid user id with albums
     * @throws Exception
     */
    @Test
    public void givenAlbumUserId_whenMockMVC_thenResponseOK() throws Exception {
        int testUserId = 2;
        MvcResult mvcResult = this.mockMvc
                .perform(get("/albums/byUser/"+testUserId))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$").isArray())
                .andExpect(MockMvcResultMatchers.jsonPath("$.[*].id").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.[*].albumTitle").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.[*].dateCreated").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.[*].imageSet").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.[*].tagList").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.[*].commentSet").exists())
                .andReturn();
        Assert.assertEquals("application/json;charset=UTF-8",mvcResult.getResponse().getContentType());
    }

    //TODO: check that the albums have a tag with the correct name
    /**
     * tests that /albums/byTag/{tagName} returns an empty array of albums when given a tagName that doesn't exist
     * @throws Exception
     */
    @Test
    public void givenNonExistentAlbumTag_whenMockMVC_thenResponseOK() throws Exception {
        String testTagName = "afgb7yawheufnaweuy8fbn9ufbhn";
        MvcResult mvcResult = this.mockMvc
                .perform(get("/albums/byTag/"+testTagName))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$").isArray())
                .andExpect(MockMvcResultMatchers.jsonPath("$").isEmpty())
                .andReturn();
        Assert.assertEquals("application/json;charset=UTF-8",mvcResult.getResponse().getContentType());
    }


}
