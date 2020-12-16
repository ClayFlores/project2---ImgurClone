package com.imgurclone.controllers;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.hamcrest.CoreMatchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:test-application-context.xml"})
@WebAppConfiguration
public class UserControllerTest {

    /**
     * the WebApplicationContext used by the test class
     */
    @Autowired
    private WebApplicationContext wac;

    /**
     * the MockMvc generated from the web application context
     */
    private MockMvc mockMvc;

    /**
     * setup method - initialize the mockMvc from the web application context
     * @throws Exception
     */
    @Before
    public void setup() throws Exception {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
    }

    /**
     * tests that /users/authenticate returns the correct user when given a valid email-password combination
     * @throws Exception
     */
    @Test
    public void givenLoginValidEmailPassword_whenMockMVC_thenResponseOK() throws Exception {
        String testEmail = "test10@example.com";
        String testPassword = "password";
        int expectedId = 11;
        MvcResult mvcResult = mockMvc
                .perform(post("/users/authenticate")
                        .content("{\"email\":\"test10@example.com\",\"password\":\"password\"}")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id", is(expectedId)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email", is(testEmail)))
                .andReturn();
        Assert.assertEquals("application/json;charset=UTF-8",mvcResult.getResponse().getContentType());
    }
}
