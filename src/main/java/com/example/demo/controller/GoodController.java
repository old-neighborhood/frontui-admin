  
    /**    
    * @Title: GoodController.java  
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

import com.example.demo.service.GoodService;

/**  
    * @ClassName: GoodController  
    * @Description: TODO(这里用一句话描述这个类的作用)  
    * @author 彭冲 
    * @date 2018年4月8日  
    *    
    */
@Controller
public class GoodController {
	@Resource
	private GoodService goodService;
	@RequestMapping("/getG_ID")
	@ResponseBody
	public String getG_ID() {
		return goodService.getG_ID();
	}
	
	@RequestMapping("/setG_ID")
	@ResponseBody
	public String setM_ID(String g_ID) {
		return goodService.setG_ID(g_ID);
	}
	
	@RequestMapping("/getGoods")
	@ResponseBody
	public List<Object> getGoodList(String m_ID){
		return goodService.getGoods(m_ID);
	}
	
	@RequestMapping("/getGood")
	@ResponseBody
	public Object getGood(){
		return goodService.getGood();
	}
	
	@RequestMapping("/modifyGood")
	@ResponseBody
	public String modifyGood(@RequestBody Map<String,Object> reqMap) {
		return goodService.modifyGood(reqMap);
	}
	
	@RequestMapping("/addGood")
	@ResponseBody
	public String addGood(@RequestBody Map<String,Object> reqMap) {
		return goodService.addGood(reqMap);
	}
	
	@RequestMapping("/deleteGood")
	@ResponseBody
	public String deleteGood(String g_ID) {
		System.out.println("aadasd:"+g_ID);
		return goodService.deleteGood(g_ID);
	}
}
