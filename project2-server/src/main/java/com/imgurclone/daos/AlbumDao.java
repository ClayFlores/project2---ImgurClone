package com.imgurclone.daos;

import com.imgurclone.models.Album;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class AlbumDao {
    private SessionFactory sessionFactory;

    /**
     * log4j logger
     */
    private static final Logger logger = LogManager.getLogger(AlbumDao.class);

    @Autowired
    public AlbumDao(SessionFactory sessionFactory){
        this.sessionFactory = sessionFactory;
    }

    @Transactional
    public void insert(Album album) {
        Session session = sessionFactory.getCurrentSession();
        session.save(album);
    }

    @Transactional
    public void update(Album album){
        Session session = sessionFactory.getCurrentSession();
        session.update(album);
    }

    /**
     * returns the 10 most recent albums in the database as a List
     * @return the 10 most recent albums
     */
    @Transactional
    public List<Album> getTenMostRecentAlbums(){
        logger.debug("getTenMostRecentAlbums beginning");

        Session session = sessionFactory.getCurrentSession();
        Criteria criteria = session.createCriteria(Album.class);
        criteria.addOrder(Order.desc("dateCreated"));
        criteria.setMaxResults(10);

        logger.debug("getTenMostRecentAlbums Criteria set up");

        List<Album> result = criteria.list();

        logger.debug("getTenMostRecentAlbums Criteria executed");
        logger.debug("getTenMostRecentAlbums result[0] title: "+result.get(0).getAlbumTitle());

        return result;
    }

}
