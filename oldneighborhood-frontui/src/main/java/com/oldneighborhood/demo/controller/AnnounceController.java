package com.oldneighborhood.demo.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AnnounceController {
	//公告列表
	@RequestMapping("/announce")
	public String list(ModelMap map, HttpSession session) {
		// User user = (User) session.getAttribute("user");
		// if (user == null) {
		// return "/login";
		// }
		return "/announce/announcement";
	}
	
	@RequestMapping("/createannouncement")
	public String create(ModelMap map, HttpSession session) {
		// User user = (User) session.getAttribute("user");
		// if (user == null) {
		// return "/login";
		// }
		return "/announce/create";
	}
	
	@RequestMapping("/modifyannoucement")
	public String modify(ModelMap map, HttpSession session) {
		// User user = (User) session.getAttribute("user");
		// if (user == null) {
		// return "/login";
		// }
		return "/announce/modify";
	}
	
	@RequestMapping("/announcedetail")
	public String detail(ModelMap map, HttpSession session) {
		// User user = (User) session.getAttribute("user");
		// if (user == null) {
		// return "/login";
		// }
		return "/announce/detail";
	}
	

}
