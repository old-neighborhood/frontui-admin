package com.oldneighborhood.demo.service;

import java.util.Map;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;

@FeignClient(value="neighborhood-register-service")
public interface RegisterService {
	
	@RequestMapping("/register/usersignup")
	public String usersignup(Map<String,Object> reqMap);
	
	@RequestMapping("/register/salersignup")
	public String salersignup(Map<String,Object> reqMap);
}
