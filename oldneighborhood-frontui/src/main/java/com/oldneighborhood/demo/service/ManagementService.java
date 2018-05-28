package com.oldneighborhood.demo.service;

import java.util.Map;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;

@FeignClient(value = "neighborhood-management-service")
public interface ManagementService {
	//公告management/announcement/listSticky
	//公告列表
	@RequestMapping(value="/management/announcement/listall")
	public String list();
	@RequestMapping(value="management/announcement/listSticky")
	public String listSticky();
	//发布公告
	@RequestMapping(value="/management/announcement/release")
	public String release(Map<String,Object> reqMap);
	//查看公告
	@RequestMapping(value="/management/announcement/announcedetail")
	public String detail(Map<String,Object> reqMap);
	//修改公告
	@RequestMapping(value="/management/announcement/modify")
	public String modify(Map<String,Object> reqMap);
	//置顶
	@RequestMapping(value="/management/announcement/stick")
	public String stick(Map<String,Object> reqMap);
	//取消置顶
	@RequestMapping(value="/management/announcement/unstick")
	public String unstick(Map<String,Object> reqMap);
	//删除
	@RequestMapping(value="/management/announcement/delete")
	public String delete(Map<String,Object> reqMap);
	//景点
	

}
