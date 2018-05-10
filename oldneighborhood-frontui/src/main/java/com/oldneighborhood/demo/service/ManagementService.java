package com.oldneighborhood.demo.service;

import java.util.Map;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;

@FeignClient(value = "neighborhood-management-service")
public interface ManagementService {
	//公告
	//公告列表
	@RequestMapping(value="/annoucement/list")
	public String list(Map<String,Object> reqMap);
	//发布公告
	@RequestMapping(value="/annoucement/release")
	public String release(Map<String,Object> reqMap);
	//查看公告
	@RequestMapping(value="/annoucement/announcedetail")
	public String detail(Map<String,Object> reqMap);
	//修改公告
	@RequestMapping(value="/annoucement/modify")
	public String modify(Map<String,Object> reqMap);
	//置顶
	@RequestMapping(value="/annoucement/stick")
	public String stick(Map<String,Object> reqMap);
	//取消置顶
	@RequestMapping(value="/annoucement/unstick")
	public String unstick(Map<String,Object> reqMap);
	//删除
	@RequestMapping(value="/annoucement/delete")
	public String delete(Map<String,Object> reqMap);
	//景点
	

}
