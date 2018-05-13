package com.oldneighborhood.demo.controller;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.oldneighborhood.demo.service.ConfigService;

import net.sf.json.JSONObject;

@Controller
public class ConfigController {

	// admin管理员信息
	@RequestMapping("/admin")
	public String admintable() {
		// User user = (User) session.getAttribute("user");
		// if (user == null) {
		// return "/login";
		// }
		return "/config/admin";
	}

	// admin管理员信息
	@RequestMapping("/newadmin")
	public String newadmin() {
		// User user = (User) session.getAttribute("user");
		// if (user == null) {
		// return "/login";
		// }
		return "/config/newadmin";
	}

	@Autowired
	private ConfigService configService;
	// admin管理员信息
	@RequestMapping("/admin/all")
	@ResponseBody
	public String adminALl() {
		return configService.alladmins();
	}
	
	@RequestMapping("/admin/new")
	@ResponseBody
	public String adminNew(@RequestBody Map<String, Object> reqMap) {
		return configService.newAdmin(reqMap);
	}
	
	@RequestMapping("/admin/delete")
	@ResponseBody
	public String delAdmin(@RequestBody Map<String, Object> reqMap) {
		return configService.delAdmin(reqMap);
	}
	
	@RequestMapping("/admin/modify")
	@ResponseBody
	public String modifyAdmin(@RequestBody Map<String, Object> reqMap) {
		return configService.modifyAdmin(reqMap);
	}
	
}
