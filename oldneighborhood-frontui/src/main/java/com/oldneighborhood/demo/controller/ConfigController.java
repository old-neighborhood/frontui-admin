package com.oldneighborhood.demo.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import net.sf.json.JSONObject;

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
		return "/config/newadmin";
	}

	// admin管理员信息
	@RequestMapping("/admin/all")
	@ResponseBody
	public String ALL() {
		RestTemplate restTemplate = new RestTemplate();
		String url = "http://114.212.244.99:8087/oldneighborhood/admin/all";
//		String request = "{\"ad_id\":" + ad_id + "}";
		String res = restTemplate.postForObject(url, null, String.class);
		System.out.println(res);
		JSONObject json = JSONObject.fromObject(res);
		if (json.getString("result").equals("success")) {
			return "redirect:/config/admin";
		}else {
			return "";
//			return Content("<script>alert('添加成功！');window.location.href='/client';</script>");
		}
	}
	
}
