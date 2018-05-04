package com.oldneighborhood.demo.service;

import java.util.Map;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;

@FeignClient(value = "neighborhood-sendcode-service")
public interface SendCodeService {
	@RequestMapping(value="/sendcode/sendMsg")
	public String sendCode(Map<String,Object> reqMap);
	
	@RequestMapping(value="/sendcode/validateCode")
	public String validateCode(Map<String, Object> reqMap);
}
