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
//import org.springframework.web.client.RestTemplate;

import com.oldneighborhood.demo.service.ManagementService;

//import net.sf.json.JSONObject;

@Controller
public class ManagementController {
	
	@RequestMapping("/market")
	public String market(ModelMap map, HttpSession session) {
		// User user = (User) session.getAttribute("user");
		// if (user == null) {
		// return "/login";
		// }
		return "/site/market";
	}
	
	//页面跳转部分
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
	
	@RequestMapping("/spot")
	public String spotlist(ModelMap map, HttpSession session) {
		// User user = (User) session.getAttribute("user");
		// if (user == null) {
		// return "/login";
		// }
		return "/site/spot";
	}
	
	@RequestMapping("/addspot")
	public String addspot(ModelMap map, HttpSession session) {
		// User user = (User) session.getAttribute("user");
		// if (user == null) {
		// return "/login";
		// }
		return "/site/addspot";
	}

	@RequestMapping("/spotdetail")
	public String spotde(ModelMap map, HttpSession session) {
		// User user = (User) session.getAttribute("user");
		// if (user == null) {
		// return "/login";
		// }
		return "/site/spotdetail";
	}
	
	/**
	 * @Title: setannoucement_ID 
	 * @Description: 使用session存储当前公告的ID
	 */
	@RequestMapping("/setAnnouncementID")
	public @ResponseBody String setannoucement_ID(@RequestBody Map<String,Object> map, HttpSession session) {
		String a_ID = map.get("a_ID").toString();
		String prev_ID = map.get("prev_ID").toString();
		String next_ID = map.get("next_ID").toString();
		System.out.println("Announcement_ID - > " + a_ID + "<" + prev_ID + ">" + next_ID);
		session.setAttribute("announcement_ID", a_ID);
		return "{\"result\":\"success\"}";
	}
	
	/**
	 * 以下是通过接口调用远程服务
	 */
	@Autowired
	private ManagementService announcementService;
	
	@RequestMapping("/getAnnouncementList")
	@ResponseBody
	public String getlist() {
		return announcementService.list();
	}
	@RequestMapping("/getStickyList")
	@ResponseBody
	public String getStickylist() {
		return announcementService.listSticky();
	}
	
	@RequestMapping("/release")
	@ResponseBody
	public String release(@RequestBody Map<String, Object> reqMap, HttpSession session) {
		System.out.println(reqMap);
		return announcementService.release(reqMap);
	}
	
	@RequestMapping("/announceDetail")
	@ResponseBody
	public String detail(HttpSession session) {
		String a_ID = (String) session.getAttribute("announcement_ID");
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("a_ID", a_ID);
		System.out.println(announcementService.detail(map));
		return announcementService.detail(map);
	}
	
	@RequestMapping("/delete")
	@ResponseBody
	public String deleteAnn(HttpSession session) {
		String a_ID = (String) session.getAttribute("announcement_ID");
		Map<String, Object> reqMap = new HashMap<String, Object>();
		reqMap.put("a_ID", a_ID);
		System.out.println(announcementService.delete(reqMap));
		return announcementService.delete(reqMap);
	}
	
	@RequestMapping("/stick")
	@ResponseBody
	public String stickAnn(HttpSession session) {
		String a_ID = (String) session.getAttribute("announcement_ID");
		Map<String, Object> reqMap = new HashMap<String, Object>();
		reqMap.put("a_ID", a_ID);
		System.out.println(announcementService.stick(reqMap));
		return announcementService.stick(reqMap);
	}
	
	@RequestMapping("/unstick")
	@ResponseBody
	public String unstickAnn(HttpSession session) {
		String a_ID = (String) session.getAttribute("announcement_ID");
		Map<String, Object> reqMap = new HashMap<String, Object>();
		reqMap.put("a_ID", a_ID);
		System.out.println(announcementService.unstick(reqMap));
		return announcementService.unstick(reqMap);
	}
	

}
