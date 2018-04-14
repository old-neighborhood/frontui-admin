package com.oldneighborhood.demo.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
// @RequestMapping("/config")
public class ConfigController {

	// admin管理员信息
	@RequestMapping("/admin")
	public String admintable(ModelMap map, HttpSession session) {
		// User user = (User) session.getAttribute("user");
		// if (user == null) {
		// return "/login";
		// }
		return "/config/admin";
	}

	// admin管理员信息
	@RequestMapping("/newadmin")
	public String newadmin(ModelMap map, HttpSession session) {
		// User user = (User) session.getAttribute("user");
		// if (user == null) {
		// return "/login";
		// }
		return "/config/new";
	}

}
