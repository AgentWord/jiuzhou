package cn.mutu.land.web;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.mutu.land.common.Encoder;
import cn.mutu.land.model.ProjectManagement;
import cn.mutu.land.service.ProjectManagerService;

@Controller
public class ProjectManagerController {
	@Autowired
	private ProjectManagerService ProjectManagerService;

	// ----------------------------------项目信息-------------------------------
	// 查询项目信息
	@RequestMapping(value = "/get_ProjectInfo")
	// ,method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> getProjectInfo(
			@RequestParam("searchKeyword") String searchKeyword)
			throws IOException {
		searchKeyword = Encoder.encode(searchKeyword);
		System.out.println("searchKeyword:" + searchKeyword);
		return this.ProjectManagerService.getProjectInfoList(searchKeyword);
	}

	// 删除项目信息
	@RequestMapping(value = "/del_ProjectInfo")
	@ResponseBody
	public void delProjectInfo(@RequestParam("Id") String id)
			throws IOException {

		this.ProjectManagerService.deleteProjectInfoById(id);
	}

	// 添加项目信息
	@RequestMapping(value = "/add_ProjectInfo")
	@ResponseBody
	public Map<String, Object> addProjectInfo(
			@RequestBody ProjectManagement projectManagement)
			throws IOException {
		this.ProjectManagerService.addProjectInfo(projectManagement);
		Map<String, Object> userInfoResults = new HashMap<String, Object>();
		userInfoResults.put("success", true);
		userInfoResults.put("msg", ",successfully saved");
		return (userInfoResults);
	}

	// 修改用户信息
	@RequestMapping(value = "/update_ProjectInfo")
	@ResponseBody
	public void updateProjectInfo(
			@RequestBody ProjectManagement projectManagement)
			throws IOException {
		this.ProjectManagerService.updateProjectInfo(projectManagement);
	}

}
