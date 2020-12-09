package com.imgurclone.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.orm.hibernate4.HibernateTransactionManager;
import org.springframework.orm.hibernate4.LocalSessionFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.util.Properties;

@Configuration
@EnableTransactionManagement
public class PersistenceConfig {

    public DataSource dataSource() {
        return null;
    }

    public LocalSessionFactoryBean entityManager() {
        return null;
    }

    public HibernateTransactionManager transactionManager() {
        return null;
    }

    private Properties getHibernateProperties() {
        return null;
    }
}
