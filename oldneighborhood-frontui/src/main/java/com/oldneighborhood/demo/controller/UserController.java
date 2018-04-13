package com.oldneighborhood.demo.controller;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.oldneighborhood.demo.entity.User;

import net.sf.json.JSONException;
import net.sf.json.JSONObject;

@Controller
public class UserController {
	//默认页面
	@RequestMapping(value= {"/","/index"})
	public String index(ModelMap map) {
		return "/index";
	}
	
	//login
	@RequestMapping("/login")
	public String login(ModelMap map) {
		return "/login";
	}
	
	//register
	@RequestMapping("/register")
	public String register(ModelMap map) {
		return "/register";
	}
	
	//用户协议
	@RequestMapping("/agree")
	public String agree(ModelMap map) {
		return "/agree";
	}
	
	//login out
	@RequestMapping("/loginout")
	public String loginout(ModelMap map, HttpSession session) {
		session.invalidate();
		return "/login";
	}
	
	@Value("${login.url}")
	private String url;
	
	@RequestMapping("/loginValidation")
	@ResponseBody
	public String user(@RequestBody Map<String, Object> reqMap, ModelMap map, HttpSession session) throws JSONException {
		System.out.println("loginValidation");
		User user = new User(
				reqMap.get("username").toString(),
				reqMap.get("password").toString(),
				reqMap.get("type").toString());
		RestTemplate restTemplate = new RestTemplate();
		String res = restTemplate.postForObject(url, reqMap, String.class);
		System.out.println(res);
		JSONObject json = JSONObject.fromObject(res);
		if (json.getString("result").equals("success")) {
//			user.setUser_ID(user_ID);
			session.setAttribute("user", user);
		}
		return res;
	}
	
	//profile
	@RequestMapping("/profile")
	public String profile(ModelMap map, HttpSession session) {
		User user = (User) session.getAttribute("user");
		if (user == null) {
			return "/login";
		}
		return "/index";
	}

}
