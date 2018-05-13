package com.oldneighborhood.demo.service;

import java.util.Map;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@FeignClient(value = "neighborhood-config-service")
public interface ConfigService {
	//admin
	@RequestMapping(value="/config/admin/all")
	public String alladmins();
	@RequestMapping("/config/admin/new")
	public String newAdmin(@RequestBody Map<String, Object> reqMap);
	@RequestMapping("/config/admin/delete")
	public String delAdmin(@RequestBody Map<String, Object> reqMap);
	@RequestMapping("/config/admin/mofify")
	public String modifyAdmin(@RequestBody Map<String, Object> reqMap);
	
	//api
	@RequestMapping(value="/config/api/all")
	public String allapis(Map<String, Object> reqMap);
	//Statistic
	@RequestMapping("/config/statistics/crowd")
	public String getCrowd(Map<String, Object> reqMap);
	@RequestMapping("/config/statistics/parkinglot")
	public String getParkingLot(Map<String, Object> reqMap);
	@RequestMapping("/config/statistics/ticket")
	public String getTicket(Map<String, Object> reqMap);
	//Future
	@RequestMapping("/config/future/data")
	public String getFuture(Map<String, Object> reqMap);
}
