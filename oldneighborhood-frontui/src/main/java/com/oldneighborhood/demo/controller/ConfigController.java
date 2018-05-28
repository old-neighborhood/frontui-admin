package com.oldneighborhood.demo.controller;

import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.oldneighborhood.demo.service.ConfigService;

//import net.sf.json.JSONObject;

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
	
	@RequestMapping("/api")
	public String api() {
		// User user = (User) session.getAttribute("user");
		// if (user == null) {
		// return "/login";
		// }
		return "/config/api";
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
	@RequestMapping("/api/all")
	@ResponseBody
	public String apiALl() {
		return configService.allapis();
	}
	@RequestMapping("/api/modify")
	@ResponseBody
	public String modifyAPI(@RequestBody Map<String, Object> reqMap) {
		return configService.modifyapi(reqMap);
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
