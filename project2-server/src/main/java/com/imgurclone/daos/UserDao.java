package com.imgurclone.daos;

import com.imgurclone.models.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public class UserDao {

    @Autowired
    private SessionFactory sessionFactory;


    @Autowired
    public UserDao(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }


    public void save(User user) {
        Session session = sessionFactory.getCurrentSession();
        session.save(user);
    }

}
