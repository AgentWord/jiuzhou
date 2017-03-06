package cn.mutu.land.model;

// Generated 2017-3-6 20:24:26 by Hibernate Tools 4.0.0

import java.util.List;
import javax.naming.InitialContext;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Example;

/**
 * Home object for domain model class ProjectManagement.
 * @see cn.mutu.land.model.ProjectManagement
 * @author Hibernate Tools
 */
public class ProjectManagementHome {

	private static final Log log = LogFactory
			.getLog(ProjectManagementHome.class);

	private final SessionFactory sessionFactory = getSessionFactory();

	protected SessionFactory getSessionFactory() {
		try {
			return (SessionFactory) new InitialContext()
					.lookup("SessionFactory");
		} catch (Exception e) {
			log.error("Could not locate SessionFactory in JNDI", e);
			throw new IllegalStateException(
					"Could not locate SessionFactory in JNDI");
		}
	}

	public void persist(ProjectManagement transientInstance) {
		log.debug("persisting ProjectManagement instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void attachDirty(ProjectManagement instance) {
		log.debug("attaching dirty ProjectManagement instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(ProjectManagement instance) {
		log.debug("attaching clean ProjectManagement instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void delete(ProjectManagement persistentInstance) {
		log.debug("deleting ProjectManagement instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public ProjectManagement merge(ProjectManagement detachedInstance) {
		log.debug("merging ProjectManagement instance");
		try {
			ProjectManagement result = (ProjectManagement) sessionFactory
					.getCurrentSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public ProjectManagement findById(java.lang.Integer id) {
		log.debug("getting ProjectManagement instance with id: " + id);
		try {
			ProjectManagement instance = (ProjectManagement) sessionFactory
					.getCurrentSession().get(
							"cn.mutu.land.model.ProjectManagement", id);
			if (instance == null) {
				log.debug("get successful, no instance found");
			} else {
				log.debug("get successful, instance found");
			}
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(ProjectManagement instance) {
		log.debug("finding ProjectManagement instance by example");
		try {
			List results = sessionFactory.getCurrentSession()
					.createCriteria("cn.mutu.land.model.ProjectManagement")
					.add(Example.create(instance)).list();
			log.debug("find by example successful, result size: "
					+ results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}
}
