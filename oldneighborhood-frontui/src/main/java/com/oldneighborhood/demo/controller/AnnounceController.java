package com.oldneighborhood.demo.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.oldneighborhood.demo.service.ManagementService;

//import net.sf.json.JSONObject;

@Controller
public class AnnounceController {
	/**
	 * 
	 * @Title: list
	 * @Description: 返回页面
	 */
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
	public String detail0(ModelMap map, HttpSession session) {
		// User user = (User) session.getAttribute("user");
		// if (user == null) {
		// return "/login";
		// }
		return "/announce/detail";
	}
	
	@RequestMapping("/announceDetail")
	@ResponseBody
	public String detail(HttpSession session) {
		// User user = (User) session.getAttribute("user");
		// if (user == null) {
		// return "/login";
		// }
		String url="http://localhost:8083/oldneighborhood/announcement/announcedetail";
		Integer announce_ID = Integer.parseInt(session.getAttribute("announcement_ID").toString());
		RestTemplate rs = new RestTemplate();
		Map<String, Object> postData = new HashMap<String, Object>();
		postData.put("a_ID", announce_ID);
		String res = rs.postForObject(url, postData, String.class);
//		JSONObject json = JSONObject.fromObject(res);
//		session.setAttribute("announce", json.toString());
		return res;
	}
	
	/**
	 * @Title: detail 
	 * @Description: 使用session存储当前公告的ID
	 */
	@RequestMapping("/setAnnouncementID")
	public String detail(String announcement_ID, HttpSession session) {
		
		session.setAttribute("announcement_ID", announcement_ID);
		return "{\"result\":\"success\"}";
	}
	
	
	/**
	 * 以下是通过接口调用远程服务
	 */
	@Autowired
	private ManagementService announcementService;
	
	@RequestMapping("/getlist")
	@ResponseBody
	public String getlist(@RequestBody Map<String, Object> reqMap) {
		return announcementService.list(reqMap);
	}
	
	@RequestMapping("/release")
	@ResponseBody
	public String release(@RequestBody Map<String, Object> reqMap, HttpSession session) {
		System.out.println(reqMap);
		return announcementService.release(reqMap);
	}

}
