  
    /**    
    * @Title: SalerInfoService.java  
    * @Package com.example.demo.service  
    * @Description: TODO(用一句话描述该文件做什么)  
    * @author 彭冲 
    * @date 2018年4月8日  
    * @version V1.0    
    */  
    
package com.example.demo.service;

import java.util.Map;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**  
    * @ClassName: SalerInfoService  
    * @Description: TODO(这里用一句话描述这个类的作用)  
    * @author 彭冲 
    * @date 2018年4月8日  
    *    
    */
@FeignClient(value = "neighborhood-saler-info-service")
public interface SalerInfoService {
	@RequestMapping(value="/Saler/modify",method=RequestMethod.GET)
	public String modify(Map<String, String> req);
	
	@RequestMapping(value="/Saler/info",method=RequestMethod.GET)
	public Object getInfo(String s_ID) ;
}
