  
    /**    
    * @Title: SalerInfoController.java  
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

import com.example.demo.service.SalerInfoService;

/**  
    * @ClassName: SalerInfoController  
    * @Description: TODO(这里用一句话描述这个类的作用)  
    * @author 彭冲 
    * @date 2018年4月8日  
    *    
    */
@Controller
public class SalerInfoController {
	@Resource
	private SalerInfoService salerInfoService;
	
	@RequestMapping("/modify")
	@ResponseBody
	public String modify(@RequestBody Map<String, String> req) {
		return salerInfoService.modify(req);
	}
	
	@RequestMapping("/info")
	@ResponseBody
	public Object getInfo(String s_ID) {
		System.out.println("adasd:"+s_ID);
		return salerInfoService.getInfo(s_ID);
	}
}
