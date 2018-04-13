package com.oldneighborhood.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ErrorController {
	
	@RequestMapping(value= {"/404"})
	public String error404(ModelMap map) {
		return "/error/404";
	}
	
	@RequestMapping(value= {"/500"})
	public String error500(ModelMap map) {
		return "/error/500";
	}

}
