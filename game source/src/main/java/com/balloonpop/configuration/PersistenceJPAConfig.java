package com.balloonpop.configuration;

import java.util.Properties;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.hibernate.jpa.HibernatePersistenceProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * @author vishnu
 *
 */
@EnableTransactionManagement
@EnableJpaRepositories("com.balloonpop.repository")
@PropertySource({ "classpath:db.properties" })
public class PersistenceJPAConfig {

	private static final String PROPERTY_NAME_DATABASE_DRIVER = "db.driver";
	private static final String PROPERTY_NAME_DATABASE_PASSWORD = "db.password";
	private static final String PROPERTY_NAME_DATABASE_URL = "db.url";
	private static final String PROPERTY_NAME_DATABASE_USERNAME = "db.username";

	private static final String PROPERTY_NAME_HIBERNATE_DIALECT = "hibernate.dialect";
	private static final String PROPERTY_NAME_HIBERNATE_SHOW_SQL = "hibernate.show_sql";

	private static final String PROPERTY_NAME_HIBERNATE_MIN_SIZE = "hibernate.c3p0.min_size";
	private static final String PROPERTY_NAME_HIBERNATE_MAX_SIZE = "hibernate.c3p0.max_size";
	private static final String PROPERTY_NAME_HIBERNATE_TIMEOUT = "hibernate.c3p0.timeout";
	private static final String PROPERTY_NAME_HIBERNATE_MAX_STATEMENTS = "hibernate.c3p0.max_statements";
	private static final String PROPERTY_NAME_HIBERNATE_IDLE_TEST_PERIOD = "hibernate.c3p0.idle_test_period";

	private static final String PROPERTY_NAME_ENTITYMANAGER_PACKAGES_TO_SCAN = "entitymanager.packages.to.scan";

	@Resource
	private Environment env;

	/**
	 * DataSource
	 * 
	 * @return DataSource
	 */
	@Bean
	public DataSource dataSource() {
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setDriverClassName(env.getRequiredProperty(PROPERTY_NAME_DATABASE_DRIVER));
		dataSource.setUrl(env.getRequiredProperty(PROPERTY_NAME_DATABASE_URL));
		dataSource.setUsername(env.getRequiredProperty(PROPERTY_NAME_DATABASE_USERNAME));
		dataSource.setPassword(env.getRequiredProperty(PROPERTY_NAME_DATABASE_PASSWORD));

		return dataSource;
	}

	/**
	 * LocalContainerEntityManagerFactoryBean
	 * 
	 * @return LocalContainerEntityManagerFactoryBean
	 */
	@Bean
	public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
		LocalContainerEntityManagerFactoryBean entityManagerFactoryBean = new LocalContainerEntityManagerFactoryBean();
		entityManagerFactoryBean.setDataSource(dataSource());
		entityManagerFactoryBean.setPersistenceProviderClass(HibernatePersistenceProvider.class);
		entityManagerFactoryBean
				.setPackagesToScan(env.getRequiredProperty(PROPERTY_NAME_ENTITYMANAGER_PACKAGES_TO_SCAN));
		entityManagerFactoryBean.setJpaProperties(hibProperties());
		return entityManagerFactoryBean;
	}

	/**
	 * return hibernate properties
	 * 
	 * @return Properties
	 */
	private Properties hibProperties() {
		Properties properties = new Properties();
		properties.put(PROPERTY_NAME_HIBERNATE_DIALECT, env.getRequiredProperty(PROPERTY_NAME_HIBERNATE_DIALECT));
		properties.put(PROPERTY_NAME_HIBERNATE_SHOW_SQL, env.getRequiredProperty(PROPERTY_NAME_HIBERNATE_SHOW_SQL));
		properties.put(PROPERTY_NAME_HIBERNATE_MIN_SIZE, env.getRequiredProperty(PROPERTY_NAME_HIBERNATE_MIN_SIZE));
		properties.put(PROPERTY_NAME_HIBERNATE_MAX_SIZE, env.getRequiredProperty(PROPERTY_NAME_HIBERNATE_MAX_SIZE));
		properties.put(PROPERTY_NAME_HIBERNATE_TIMEOUT, env.getRequiredProperty(PROPERTY_NAME_HIBERNATE_TIMEOUT));
		properties.put(PROPERTY_NAME_HIBERNATE_MAX_STATEMENTS,
				env.getRequiredProperty(PROPERTY_NAME_HIBERNATE_MAX_STATEMENTS));
		properties.put(PROPERTY_NAME_HIBERNATE_IDLE_TEST_PERIOD,
				env.getRequiredProperty(PROPERTY_NAME_HIBERNATE_IDLE_TEST_PERIOD));
		return properties;
	}

	/**
	 * JpaTransactionManager
	 * 
	 * @return JpaTransactionManager
	 */
	@Bean
	public JpaTransactionManager transactionManager() {
		JpaTransactionManager transactionManager = new JpaTransactionManager();
		transactionManager.setEntityManagerFactory(entityManagerFactory().getObject());
		return transactionManager;
	}
}
