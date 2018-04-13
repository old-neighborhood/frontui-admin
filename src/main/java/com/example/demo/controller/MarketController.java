  
    /**    
    * @Title: MarketController.java  
    * @Package com.example.demo.controller  
    * @Description: TODO(用一句话描述该文件做什么)  
    * @author 彭冲 
    * @date 2018年4月8日  
    * @version V1.0    
    */  
    
package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.service.MarketService;

/**  
    * @ClassName: MarketController  
    * @Description: TODO(这里用一句话描述这个类的作用)  
    * @author 彭冲 
    * @date 2018年4月8日  
    *    
    */
@Controller
public class MarketController {
	@Resource
	private MarketService marketService;
	
	@RequestMapping("/getM_ID")
	@ResponseBody
	public String getM_ID() {
		return marketService.getM_ID();
	}
	
	@RequestMapping("/setM_ID")
	@ResponseBody
	public String setM_ID(String m_ID) {
		return marketService.setM_ID(m_ID);
	}
	
	@RequestMapping("/getMarkets")
	@ResponseBody
	public List<Object> getMarketList(String s_ID){
		return marketService.getMarketList(s_ID);
	}
	
	@RequestMapping("/getMarket")
	@ResponseBody
	public Object getMarket(){
		return marketService.getMarket();
	}
	
	@RequestMapping("/modifyMarket")
	@ResponseBody
	public String modifyMarket(@RequestBody Map<String,Object> reqMap) {
		return marketService.modifyMarket(reqMap);
	}
	
	@RequestMapping("/addMarket")
	@ResponseBody
	public String addMarket(@RequestBody Map<String,Object> reqMap) {
		return marketService.addMarket(reqMap);
	}
	
	@RequestMapping("/deleteMarket")
	@ResponseBody
	public String deleteMarket(String m_ID) {
		System.out.println("aadasd:"+m_ID);
		return marketService.deleteMarket(m_ID);
	}
}
