  
    /**    
    * @Title: MarketService.java  
    * @Package com.example.demo.service  
    * @Description: TODO(用一句话描述该文件做什么)  
    * @author 彭冲 
    * @date 2018年4月8日  
    * @version V1.0    
    */  
    
package com.example.demo.service;

import java.util.List;
import java.util.Map;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


/**  
    * @ClassName: MarketService  
    * @Description: TODO(这里用一句话描述这个类的作用)  
    * @author 彭冲 
    * @date 2018年4月8日  
    *    
    */
@FeignClient(value = "neighborhood-market-management-service")
public interface MarketService {
	@RequestMapping(value="/Saler/getM_ID",method=RequestMethod.GET)
	public String getM_ID();
	
	@RequestMapping(value="/Saler/setM_ID",method=RequestMethod.GET)
	public String setM_ID(String m_ID);
	
	@RequestMapping(value="/Saler/getMarkets",method=RequestMethod.GET)
	public List<Object> getMarketList(String s_ID);
	
	@RequestMapping(value="/Saler/getMarket",method=RequestMethod.GET)
	public Object getMarket();
	
	@RequestMapping(value="/Saler/modifyMarket",method=RequestMethod.GET)
	public String modifyMarket(Map<String,Object> reqMap);
	
	@RequestMapping(value="/Saler/addMarket",method=RequestMethod.GET)
	public String addMarket(Map<String,Object> reqMap);
	
	@RequestMapping(value="/Saler/deleteMarket",method=RequestMethod.GET)
	public String deleteMarket(String m_ID);
}
