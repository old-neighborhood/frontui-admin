  
    /**    
    * @Title: ValidateController.java  
    * @Package com.example.demo.controller  
    * @Description: TODO(用一句话描述该文件做什么)  
    * @author 彭冲 
    * @date 2018年4月8日  
    * @version V1.0    
    */  
    
package com.example.demo.controller;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.service.ValidateService;

/**  
    * @ClassName: ValidateController  
    * @Description: TODO(这里用一句话描述这个类的作用)  
    * @author 彭冲 
    * @date 2018年4月8日  
    *    
    */
@Controller
public class ValidateController {
	@Resource
	private ValidateService validateService;
	
	@RequestMapping("/")
	public String test1() {
		return "/login";
	}
	
	@RequestMapping("/getID")
	@ResponseBody
	public String getID() {
		return validateService.getID();
	}
	
	@RequestMapping("/login")
	@ResponseBody
	public String login(@RequestBody Map<String,Object> reqMap) {
		return validateService.login(reqMap);
	}
	
	@RequestMapping("/MarketList")
	public String getMarkets() {
		return "/MarketList";
	}
	@RequestMapping("/ApplyMarket")
	public String applyMarket() {
		return "/ApplyMarket";
	}
	@RequestMapping("/ModifyMarket")
	public String modifyMarket() {
		return "/ModifyMarket";
	}
	@RequestMapping("/MarketInfo")
	public String getMarketInfo() {
		return "/MarketInfo";
	}
	
	@RequestMapping("/SalerInfo")
	public String salerInfo() {
		return "/SalerInfo";
	}
	@RequestMapping("/SalerInfoModify")
	public String salerInfoModify() {
		return "/SalerInfoModify";
	}
	@RequestMapping("/UserIndex")
	public String User() {
		return "/userIndex";
	}
	@RequestMapping("/SalerIndex")
	public String Saler() {
		return "/salerIndex";
	}
	@RequestMapping("/AdminIndex")
	public String Admin() {
		return "/adminIndex";
	}
}
