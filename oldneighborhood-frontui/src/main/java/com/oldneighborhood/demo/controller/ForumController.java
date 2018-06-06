package com.oldneighborhood.demo.controller;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.client.RestTemplate;

import com.oldneighborhood.demo.service.ForumService;


@Controller
public class ForumController {
	@Resource
	private ForumService forumService;
	
	@RequestMapping("/forum")
	public String forums(HttpSession session) {
		String userID = (String) session.getAttribute("userID");
		if (userID == null) {
			return "/login";
		}
		return "/forum/forum";
	}
	
	@RequestMapping("/posts")
	public String forum(HttpSession session) {
		String userID = (String) session.getAttribute("userID");
		if (userID == null) {
			return "/login";
		}
		return "/forum/posts";
	}
	
	@RequestMapping("/setF_ID")
	@ResponseBody
	public String setF_ID(String f_ID,HttpSession session) {
		session.setAttribute("f_ID", f_ID);
		return "{\"result\":\"success\"}";
	}
	
	@RequestMapping("/setP_ID")
	@ResponseBody
	public String setP_ID(String p_ID,HttpSession session) {
		session.setAttribute("p_ID", p_ID);
		return "{\"result\":\"success\"}";
	}
	
	@RequestMapping(path= {"/totalrows"})
	@ResponseBody
	public String totalrows() {
		return forumService.totalrows();
	}
	
	@RequestMapping("/forumlist")
	@ResponseBody
	public String forumlist(@RequestBody Map<String, Object> reqMap) {
		return forumService.forumlist(reqMap);
	}
	
	@RequestMapping(path= {"/totalposts"})
	@ResponseBody
	public String totalposts(HttpSession session) {
		return forumService.totalposts(session.getAttribute("f_ID").toString());
	}
	
	@RequestMapping("/postlist")
	@ResponseBody
	public String postlist(@RequestBody Map<String, Object> reqMap,HttpSession session) {
		reqMap.put("f_ID", session.getAttribute("f_ID").toString());
		return forumService.postlist(reqMap);
	}
	
	@RequestMapping("/forumdetail")
	@ResponseBody
	public String forumdetail(HttpSession session) {
		return forumService.forumdetail(session.getAttribute("f_ID").toString());
	}
	
	@RequestMapping("/newforum")
	@ResponseBody
	public String newforum(@RequestBody Map<String, Object> reqMap) {
		return forumService.newforum(reqMap);
	}
	
	@RequestMapping("/editforum")
	@ResponseBody
	public String editforum(@RequestBody Map<String, Object> reqMap,HttpSession session) {
		reqMap.put("f_ID", session.getAttribute("f_ID").toString());
		return forumService.editforum(reqMap);
	}
	
	@RequestMapping("/strickform")
	@ResponseBody
	public String strickform(HttpSession session) {
		return forumService.stickforum(session.getAttribute("f_ID").toString());
	}
	
	@RequestMapping("/unstrickform")
	@ResponseBody
	public String unstrickform(HttpSession session) {
		return forumService.unstickforum(session.getAttribute("f_ID").toString());
	}
	
	@RequestMapping("/deleteforum")
	@ResponseBody
	public String deleteform(HttpSession session) {
		return forumService.deleteforum(session.getAttribute("f_ID").toString());
	}
	
	@RequestMapping("/deletepost")
	@ResponseBody
	public String deletepost(HttpSession session) {
		return forumService.deletepost(session.getAttribute("p_ID").toString());
	}
	
	@RequestMapping("/totalCollect")
	@ResponseBody
	public String totalCollect(@RequestBody Map<String, Object> reqMap) {
		return forumService.totalCollect(reqMap.get("f_ID").toString())+"";
	}
	
	

}

/*@Controller
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
	
	*//**
	 * @Title: getForumDetail
	 * @Description: 獲取主題帖的詳細信息返回json
	 *//*
	@RequestMapping("/getForumDetail")
	@ResponseBody
	public String getForumDetail(HttpSession session) {
//		String forum_ID = (String)session.getAttribute("f_ID");
//		RestTemplate rs = new RestTemplate();
		return "";
	}
	
	*//**
	 * @Title: getPostsList
	 * @Description: 獲取回帖信息
	 *//*
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
	

}*/
