package com.oldneighborhood.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class StatisticsController {
	
	@RequestMapping("/flow")
	public String flow() {
		return "/statistics/flow";
	}

}
