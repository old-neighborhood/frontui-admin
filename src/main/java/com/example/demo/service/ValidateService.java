  
    /**    
    * @Title: ValidateService.java  
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
    * @ClassName: ValidateService  
    * @Description: TODO(这里用一句话描述这个类的作用)  
    * @author 彭冲 
    * @date 2018年4月8日  
    *    
    */
@FeignClient(value = "neighborhood-validate-service")
public interface ValidateService {
	@RequestMapping(value="/Saler/getID",method=RequestMethod.GET)
	public String getID();
	
	@RequestMapping(value="/Saler/login",method=RequestMethod.GET)
	public String login(Map<String,Object> reqMap);
	
	
	
}
