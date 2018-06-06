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
	
	
	//页面跳转部分
	@RequestMapping("/announce")
	public String list(ModelMap map, HttpSession session) {
		String userID = (String) session.getAttribute("userID");
		if (userID == null) {
		return "/login";
		}
		return "/announce/announcement";
	}
	
	@RequestMapping("/createannouncement")
	public String create(ModelMap map, HttpSession session) {
		String userID = (String) session.getAttribute("userID");
		if (userID == null) {
		return "/login";
		}
		return "/announce/create";
	}
	
	@RequestMapping("/modifyannoucement")
	public String modify(ModelMap map, HttpSession session) {
		String userID = (String) session.getAttribute("userID");
		if (userID == null) {
		return "/login";
		}
		return "/announce/modify";
	}
	
	@RequestMapping("/announcedetail")
	public String detail0(ModelMap map, HttpSession session) {
		String userID = (String) session.getAttribute("userID");
		if (userID == null) {
		return "/login";
		}
		return "/announce/detail";
	}
	
	@RequestMapping("/spot")
	public String spotlist(ModelMap map, HttpSession session) {
		String userID = (String) session.getAttribute("userID");
		if (userID == null) {
		return "/login";
		}
		return "/site/spot";
	}
	
	@RequestMapping("/addspot")
	public String addspot(ModelMap map, HttpSession session) {
		String userID = (String) session.getAttribute("userID");
		if (userID == null) {
		return "/login";
		}
		return "/site/addspot";
	}

	@RequestMapping("/spotdetail")
	public String spotde(ModelMap map, HttpSession session) {
		String userID = (String) session.getAttribute("userID");
		if (userID == null) {
		return "/login";
		}
		return "/site/spotdetail";
	}
	
	/**
	 * @Title: setannoucement_ID 
	 * @Description: 使用session存储当前公告的ID
	 */
	@RequestMapping("/setAnnouncementID")
	public @ResponseBody String setannoucement_ID(@RequestBody Map<String,Object> map, HttpSession session) {
		String a_ID = map.get("a_ID").toString();
		System.out.println("Announcement_ID - > " + a_ID);
		session.setAttribute("announcement_ID", a_ID);
		return "{\"result\":\"success\"}";
	}
	//session存储当前site_ID
	@RequestMapping("/setSiteID")
	public @ResponseBody String setSiteID(String site_ID, HttpSession session) {
		System.out.println("site_ID - > " + site_ID);
		session.setAttribute("site_ID", site_ID);
		return "{\"result\":\"success\"}";
	}
	
	/**
	 * 以下是通过接口调用远程服务
	 */
	@Autowired
	private ManagementService managementService;
	
	@RequestMapping("/getAnnouncementList")
	@ResponseBody
	public String getlist() {
		return managementService.list();
	}
	@RequestMapping("/getAnnouncementPage")
	@ResponseBody
	public String getlistPage(@RequestBody Map<String, Object> reqMap) {
		return managementService.listbypage(reqMap);
	}
	@RequestMapping("/getStickyList")
	@ResponseBody
	public String getStickylist() {
		return managementService.listSticky();
	}
	
	@RequestMapping("/release")
	@ResponseBody
	public String release(@RequestBody Map<String, Object> reqMap, HttpSession session) {
		System.out.println(reqMap);
		return managementService.release(reqMap);
	}
	
	@RequestMapping("/update")
	@ResponseBody
	public String update(@RequestBody Map<String, Object> reqMap) {
//		reqMap.put("ad_ID", "80d09f45cdd24b55926ba52b77204b05");
		return managementService.modify(reqMap);
	}
	
	@RequestMapping("/announceDetail")
	@ResponseBody
	public String detail(HttpSession session) {
		String a_ID = (String) session.getAttribute("announcement_ID");
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("a_ID", a_ID);
		System.out.println(managementService.detail(map));
		return managementService.detail(map);
	}
	
	@RequestMapping("/delete")
	@ResponseBody
	public String deleteAnn(HttpSession session) {
		String a_ID = (String) session.getAttribute("announcement_ID");
		Map<String, Object> reqMap = new HashMap<String, Object>();
		reqMap.put("a_ID", a_ID);
		System.out.println(managementService.delete(reqMap));
		return managementService.delete(reqMap);
	}
	
	@RequestMapping("/stick")
	@ResponseBody
	public String stickAnn(HttpSession session) {
		String a_ID = (String) session.getAttribute("announcement_ID");
		Map<String, Object> reqMap = new HashMap<String, Object>();
		reqMap.put("a_ID", a_ID);
		System.out.println(managementService.stick(reqMap));
		return managementService.stick(reqMap);
	}
	
	@RequestMapping("/unstick")
	@ResponseBody
	public String unstickAnn(HttpSession session) {
		String a_ID = (String) session.getAttribute("announcement_ID");
		Map<String, Object> reqMap = new HashMap<String, Object>();
		reqMap.put("a_ID", a_ID);
		System.out.println(managementService.unstick(reqMap));
		return managementService.unstick(reqMap);
	}
	
	@RequestMapping("/getSiteList")
	@ResponseBody
	public String getSitelist() {
		return managementService.listAllSite();
	}
	
	@RequestMapping("/addSimpleSite")
	@ResponseBody
	public String simpleAddSite(@RequestBody Map<String, Object> reqMap) {
		return managementService.addSimple(reqMap);
	}
	
	@RequestMapping("/updatepart")
	@ResponseBody
	public String updatepart(@RequestBody Map<String, Object> reqMap) {
		return managementService.updatepart(reqMap);
	}
	
	@RequestMapping("/getSiteDetail")
	@ResponseBody
	public String SiteDetail(HttpSession session) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("site_ID", session.getAttribute("site_ID").toString());
		return managementService.findByID(map);
	}
	
	@RequestMapping("/deletesite")
	@ResponseBody
	public String delSite(HttpSession session) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("site_ID", session.getAttribute("site_ID").toString());
		return managementService.delByID(map);
	}
	
}
