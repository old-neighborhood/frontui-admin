package com.oldneighborhood.demo.service;

import java.util.Map;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(value = "neighborhood-validate-service")
public interface LoginService {
	@RequestMapping(value="/Saler/login",method=RequestMethod.GET)
	public String login(Map<String,Object> reqMap);
	
	@RequestMapping(value="/Saler/getInfo",method=RequestMethod.GET)
	public String getInfo(Map<String, Object> reqMap);
}
