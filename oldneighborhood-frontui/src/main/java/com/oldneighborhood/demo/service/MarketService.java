package com.oldneighborhood.demo.service;

import java.util.List;
import java.util.Map;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(value = "neighborhood-market-management-service")
public interface MarketService {
	
	@RequestMapping("/Saler/getAllMarkets")
	public List<Object> getMarketList();
	
	@RequestMapping(value="/Saler/getMarket",method=RequestMethod.GET)
	public Object getMarket(String m_ID);
	
	@RequestMapping(value="/Saler/modifyMarket",method=RequestMethod.GET)
	public String modifyMarket(Map<String,Object> reqMap);
	
	@RequestMapping(value="/Saler/addMarket",method=RequestMethod.GET)
	public String addMarket(Map<String,Object> reqMap);
	
	@RequestMapping(value="/Saler/deleteMarket",method=RequestMethod.GET)
	public String deleteMarket(String m_ID);

	@RequestMapping(value="/Saler/recoverMarket",method=RequestMethod.GET)
	public String recoverMarket(String m_ID);
}
