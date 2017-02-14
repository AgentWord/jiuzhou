package cn.mutu.land.model;

// Generated 2017-2-12 21:29:17 by Hibernate Tools 4.0.0

import java.util.List;
import javax.naming.InitialContext;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Example;

/**
 * Home object for domain model class EmployeeManagement.
 * @see cn.mutu.land.model.EmployeeManagement
 * @author Hibernate Tools
 */
public class EmployeeManagementHome {

	private static final Log log = LogFactory
			.getLog(EmployeeManagementHome.class);

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

	public void persist(EmployeeManagement transientInstance) {
		log.debug("persisting EmployeeManagement instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void attachDirty(EmployeeManagement instance) {
		log.debug("attaching dirty EmployeeManagement instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(EmployeeManagement instance) {
		log.debug("attaching clean EmployeeManagement instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void delete(EmployeeManagement persistentInstance) {
		log.debug("deleting EmployeeManagement instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public EmployeeManagement merge(EmployeeManagement detachedInstance) {
		log.debug("merging EmployeeManagement instance");
		try {
			EmployeeManagement result = (EmployeeManagement) sessionFactory
					.getCurrentSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public EmployeeManagement findById(int id) {
		log.debug("getting EmployeeManagement instance with id: " + id);
		try {
			EmployeeManagement instance = (EmployeeManagement) sessionFactory
					.getCurrentSession().get(
							"cn.mutu.land.model.EmployeeManagement", id);
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

	public List findByExample(EmployeeManagement instance) {
		log.debug("finding EmployeeManagement instance by example");
		try {
			List results = sessionFactory.getCurrentSession()
					.createCriteria("cn.mutu.land.model.EmployeeManagement")
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
