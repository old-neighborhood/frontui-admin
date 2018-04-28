package com.oldneighborhood.demo.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.client.RestTemplate;

@Controller
public class ForumController {
	
	@RequestMapping("/forum")
	public String forums(ModelMap map, HttpSession session) {
		// User user = (User) session.getAttribute("user");
		// if (user == null) {
		// return "/login";
		// }
		return "/forum/forum";
	}
	
	@RequestMapping("/posts")
	public String forum(ModelMap map, HttpSession session) {
		// User user = (User) session.getAttribute("user");
		// if (user == null) {
		// return "/login";
		// }
		return "/forum/posts";
	}
	
	
	@RequestMapping("/setForumID")
	public String setForumID(String f_ID, HttpSession session) {
		// User user = (User) session.getAttribute("user");
		// if (user == null) {
		// return "/login";
		// }
		session.setAttribute("f_ID", f_ID);
		return "{\"result\":\"success\"}";
	}
	
	/**
	 * @Title: getForumDetail
	 * @Description: 獲取主題帖的詳細信息返回json
	 */
	@RequestMapping("/getForumDetail")
	@ResponseBody
	public String getForumDetail(HttpSession session) {
//		String forum_ID = (String)session.getAttribute("f_ID");
//		RestTemplate rs = new RestTemplate();
		return "";
	}
	
	/**
	 * @Title: getPostsList
	 * @Description: 獲取回帖信息
	 */
	@RequestMapping("/getPostsList")
	@ResponseBody
	public String getPostsList(HttpSession session) {
//		String forum_ID = (String)session.getAttribute("f_ID");
//		RestTemplate rs = new RestTemplate();
		return "";
	}
	
	@RequestMapping("/deleteForum")
	@ResponseBody
	public String deleteForum(HttpSession session) {
//		String forum_ID = (String)session.getAttribute("f_ID");
		return "";
	}
	
	@RequestMapping("/stickForum")
	@ResponseBody
	public String stickForum(HttpSession session) {
//		String forum_ID = (String)session.getAttribute("f_ID");
		return "";
	}
	

}
