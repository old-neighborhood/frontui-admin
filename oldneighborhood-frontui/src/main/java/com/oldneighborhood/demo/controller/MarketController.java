package com.oldneighborhood.demo.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.oldneighborhood.demo.service.MarketService;

@Controller
public class MarketController {
	@Resource
	private MarketService marketService;
	
	
	
	@RequestMapping("/setM_ID")
	@ResponseBody
	public String setM_ID(String m_ID,HttpSession session) {
		session.setAttribute("m_ID", m_ID);
		return "{\"result\":\"success\"}";
	}
	
	@RequestMapping("/getAllMarkets")
	@ResponseBody
	public List<Object> getMarketList(){
		return marketService.getMarketList();
	}
	
	@RequestMapping("/getMarket")
	@ResponseBody
	public Object getMarket(HttpSession session){
		return marketService.getMarket(session.getAttribute("m_ID").toString());
	}
	
	@RequestMapping("/modifyMarket")
	@ResponseBody
	public String modifyMarket(@RequestBody Map<String,Object> reqMap,HttpSession session) {
		reqMap.put("m_ID", session.getAttribute("m_ID").toString());
		return marketService.modifyMarket(reqMap);
	}
	
	
	@RequestMapping("/recoverMarket")
	@ResponseBody
	public String recoverMarket(HttpSession session) {
		return marketService.recoverMarket(session.getAttribute("m_ID").toString());
	}
}
