package cn.mutu.land.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.mutu.land.model.ProjectManagement;

@Service
public class ProjectManagerService {
	@Autowired
	private SessionFactory sessionFactory;
	@Autowired
	private HttpServletRequest request;

	// -----------------------------当前登录信息---------------------------
	// 当前登录用户
	public String getCurrentUser() {
		String userName = request.getUserPrincipal().getName();
		return userName;
	}

	// -----------------------------项目信息---------------------------
	// 查询项目信息
	@SuppressWarnings("unchecked")
	public Map<String, Object> getProjectInfoList(String searchKey) {
		String hql = "FROM ProjectManagement as pro";
		if (!searchKey.equals("")) {
			String hql2 = " where pro.proId like '%" + searchKey + "%'"
					+ "or pro.proStatus like '%" + searchKey + "%'";
			hql = hql + hql2;
		}
		System.out.println(hql);
		List<ProjectManagement> results = null;
		org.hibernate.Query query = sessionFactory.getCurrentSession()
				.createQuery(hql);
		results = (List<ProjectManagement>) query.list();
		Map<String, Object> myMapResult = new TreeMap<String, Object>();
		myMapResult.put("root", results);
		myMapResult.put("success", true);
		return myMapResult;
	}

	// 删除项目信息
	public void deleteProjectInfoById(String Id) {
		ProjectManagement result = null;
		Session session = sessionFactory.getCurrentSession();
		try {
			result = (ProjectManagement) session.get(ProjectManagement.class,
					Integer.parseInt(Id));
			session.delete(result);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 添加项目信息
	@SuppressWarnings("unchecked")
	public Map<String, Object> addProjectInfo(
			ProjectManagement projectManagement) {
		String userName = request.getUserPrincipal().getName();
		Session session = sessionFactory.getCurrentSession();
		Map<String, Object> roleInfoResults = new HashMap<String, Object>();
		try {
			double remain = projectManagement.getProMoney()
					- projectManagement.getProIncome();
			System.out.println(remain);

			projectManagement.setProRemain(remain);
			projectManagement.setProStatus("已提交");
			projectManagement.setProStartTime(projectManagement
					.getProStartTime().substring(0, 10));
			projectManagement.setProEndTime(projectManagement.getProEndTime()
					.substring(0, 10));
			projectManagement.setProApplication(userName);
			session.save(projectManagement);
			roleInfoResults.put("success", true);
			roleInfoResults.put("msg", ",successfully saved");
		} catch (Exception er) {
			roleInfoResults.put("failure", true);
			roleInfoResults.put("msg", ",failure saved。");
			System.out.println(er.getMessage());
		}
		return roleInfoResults;

	}

	// 编辑更新角色信息
	public void updateProjectInfo(ProjectManagement projectManagement) {
		Session session = sessionFactory.getCurrentSession();
		projectManagement.setProStartTime(projectManagement.getProStartTime()
				.substring(0, 10));
		projectManagement.setProEndTime(projectManagement.getProEndTime()
				.substring(0, 10));

		session.saveOrUpdate(projectManagement);
	}

}
