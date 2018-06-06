package com.oldneighborhood.demo.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class StatisticsController {
	
	@RequestMapping("/flow")
	public String flow(HttpSession session) {
		String userID = (String) session.getAttribute("userID");
		if (userID == null) {
			return "/login";
		}
		return "/statistics/flow";
	}

}
