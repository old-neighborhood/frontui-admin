package com.oldneighborhood.demo.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class CommonController {
	
	@RequestMapping("/upload")
	public @ResponseBody String uploadfile(@RequestParam("file") MultipartFile multipartFile, HttpServletRequest req) {
		return null;
	}

}
