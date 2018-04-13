  
    /**    
    * @Title: GoodService.java  
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
    * @ClassName: GoodService  
    * @Description: TODO(这里用一句话描述这个类的作用)  
    * @author 彭冲 
    * @date 2018年4月8日  
    *    
    */
@FeignClient(value = "neighborhood-good-management-service")
public interface GoodService {
	@RequestMapping(value="/Saler/getG_ID",method=RequestMethod.GET)
	public String getG_ID();
	
	@RequestMapping(value="/Saler/setG_ID",method=RequestMethod.GET)
	public String setG_ID(String g_ID);
	
	@RequestMapping(value="/Saler/getGoods",method=RequestMethod.GET)
	public List<Object> getGoods(String m_ID);
	
	@RequestMapping(value="/Saler/getGood",method=RequestMethod.GET)
	public Object getGood();
	
	@RequestMapping(value="/Saler/modifyGood",method=RequestMethod.GET)
	public String modifyGood(Map<String,Object> reqMap);
	
	@RequestMapping(value="/Saler/addGood",method=RequestMethod.GET)
	public String addGood(Map<String,Object> reqMap);
	
	@RequestMapping(value="/Saler/deleteGood",method=RequestMethod.GET)
	public String deleteGood(String m_ID);
}
