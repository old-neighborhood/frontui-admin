package com.oldneighborhood.demo.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @ClassName: CommonService
 * @Description: 包括发送验证码、注册、地图、上传下载文件......
 * @author user005
 * @date 2018年5月10日
 */
@FeignClient(value = "neighborhood-common-service")
public interface CommonService {
	//sendcode
	@RequestMapping(value = "/common/sendcode/sendMsg")
	public String sendCode(Map<String, Object> reqMap);
	@RequestMapping(value = "/common/sendcode/validateCode")
	public String validateCode(Map<String, Object> reqMap);
	
	//register
	@RequestMapping("/common/register/usersignup")
	public String usersignup(Map<String, Object> reqMap);
	@RequestMapping("/common/register/salersignup")
	public String salersignup(Map<String, Object> reqMap);

	//file
//	@RequestMapping("/common/file/fileupload")
//	public String uploadfile(HttpServletRequest request, HttpServletResponse response);
//	
//	//record excel
//	@RequestMapping("/common/record/import")
//	public String importin(HttpServletRequest request, HttpServletResponse response);
//	@RequestMapping("/common/record/export")
//	public String exportout(HttpServletRequest request, HttpServletResponse response);
//	@RequestMapping("/common/record/upload")
//	public String upload(HttpServletRequest request, HttpServletResponse response);
//	@RequestMapping("/common/record/download")
//	public String download(HttpServletRequest request, HttpServletResponse response);
	
	//map
	@RequestMapping("/common/map/ip")
	public String ip2addr();
}
