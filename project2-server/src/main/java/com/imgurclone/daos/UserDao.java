package com.imgurclone.daos;

import com.imgurclone.models.User;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

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

    public User getByEmail(String email) {
        Session session = sessionFactory.getCurrentSession();
        String hql = "From User where email=:email";
        Query query = session.createQuery(hql);
        query.setString("email", email);
        return (User) query.list().get(0);
    }

    public User getById (int id) {
        Session session = sessionFactory.getCurrentSession();
        String hql = "From User where id=:id";
        Query query = session.createQuery(hql);
        query.setInteger("id", id);
        return (User) query.list().get(0);
    }

    public User getByEmailAndPasswordHash(String email, String passwordHash) {
        Session session = sessionFactory.getCurrentSession();
        String hql = "From User where email=:email and passwordhash=:pw";
        Query query = session.createQuery(hql);
        query.setString("email", email);
        query.setString("pw", passwordHash);
        List<User> user = query.list();

        if(user.size() > 1 || user.size() == 0) {
            System.out.println(">>>>>>Something went wrong in the UserDao.getByEmailAndPasswordHash");
            return null;
        }

        return (User) query.list().get(0);
    }

}
