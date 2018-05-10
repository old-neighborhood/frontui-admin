package com.oldneighborhood.demo.controller;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
//import com.oldneighborhood.demo.entity.User;
import com.oldneighborhood.demo.service.CommonService;
import com.oldneighborhood.demo.service.LoginService;

import net.sf.json.JSONException;
import net.sf.json.JSONObject;

@Controller
public class UserController {
	// 默认页面
	@RequestMapping(value = { "/", "/index" })
	public String index(ModelMap map) {
		//检查是否有session
		return "/index";
	}
	
//	@RequestMapping("/saler")
//	public String salerpage(ModelMap map) {
//		return "redirect:http://192.168.48.134:8080/SalerIndex";
//	}	
	
	// login
	@RequestMapping("/login")
	public String login(ModelMap map) {
		return "/login";
	}

	// register
	@RequestMapping("/register")
	public String register(ModelMap map) {
		return "/register";
	}
	
	// 忘記密碼
	@RequestMapping("/forgetpassword")
	public String forgetpassword(ModelMap map) {
		return "/forgetpassword";
	}


	// 用户协议
	@RequestMapping("/agree")
	public String agree(ModelMap map) {
		return "/agree";
	}

	// login out
	@RequestMapping("/loginout")
	public String loginout(ModelMap map, HttpSession session) {
		session.invalidate();
		return "/login";
	}
	
	//获取验证码与验证
	@Autowired
	private CommonService commonService;
	
	@RequestMapping("/getCode")
	@ResponseBody
	public String getCode(@RequestBody Map<String, Object> reqMap) {
		System.out.println(reqMap);
		String res = commonService.sendCode(reqMap);
		System.out.println(res);
		return res;
	}
	
	@RequestMapping("/validatecode")
	@ResponseBody
	public String validateCode(@RequestBody Map<String, Object> reqMap) {
		String res = commonService.validateCode(reqMap);
		return res;
	}
	
	@RequestMapping("/usersignup")
	@ResponseBody
	public String userSignUp(@RequestBody Map<String, Object> reqMap) {
		String res = commonService.usersignup(reqMap);
		System.out.println(res);
		return res;
	}
	
	@RequestMapping("/salersignup")
	@ResponseBody
	public String salerSignUp(@RequestBody Map<String, Object> reqMap) {
		String res = commonService.salersignup(reqMap);
		System.out.println(res);
		return res;
	}

	//登录验证获取信息
	@Autowired
	private LoginService loginService;
	
	@RequestMapping("/loginValidation")
	@ResponseBody
	public String user(@RequestBody Map<String, Object> reqMap, HttpSession session)
			throws JSONException {
		String res = loginService.login(reqMap);
		JSONObject json = JSONObject.fromObject(res);
		if (json.get("result").equals("success")) {
			session.setAttribute("userID", json.get("ID"));
			session.setAttribute("username", reqMap.get("username"));
			session.setAttribute("usertype", json.get("type"));
		}
		System.out.println(res);
		return res;
	}
	
	@RequestMapping("/getInfo")
	public String profile(@RequestBody Map<String, Object> reqMap, HttpSession session) {
//		String userID = (String) session.getAttribute("userID");
//		String userType = (String) session.getAttribute("usertype");
		return loginService.getInfo(reqMap);
	}

}
