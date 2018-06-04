package com.oldneighborhood.demo.service;

import java.util.Map;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(value = "neighborhood-forum-management-service")
public interface ForumService {
	@RequestMapping(value="/oldneighborhood/forum/forumlist",method=RequestMethod.GET)
	public String forumlist(Map<String, Object> reqMap);
	
	@RequestMapping(value="/oldneighborhood/forum/totalposts",method=RequestMethod.GET)
	public String totalposts(String f_ID);
	
	@RequestMapping(value="/oldneighborhood/forum/postlist",method=RequestMethod.GET)
	public String postlist(Map<String, Object> reqMap);
	
	@RequestMapping(value="/oldneighborhood/forum/forumdetail",method=RequestMethod.GET)
	public String forumdetail(String f_ID);
	
	@RequestMapping(value="/oldneighborhood/forum/newforum",method=RequestMethod.GET)
	public String newforum(Map<String, Object> reqMap);
	
	@RequestMapping(value="/oldneighborhood/forum/editforum",method=RequestMethod.GET)
	public String editforum(Map<String, Object> reqMap);
	
	@RequestMapping(value="/oldneighborhood/forum/stickforum",method=RequestMethod.GET)
	public String stickforum(String f_ID);
	
	@RequestMapping(value="/oldneighborhood/forum/unstickforum",method=RequestMethod.GET)
	public String unstickforum(String f_ID);
	
	@RequestMapping(value="/oldneighborhood/forum/deleteforum",method=RequestMethod.GET)
	public String deleteforum(String f_ID);
	
	@RequestMapping(value="/oldneighborhood/forum/newpost",method=RequestMethod.GET)
	public String newpost(Map<String, Object> reqMap);
	
	@RequestMapping(value="/oldneighborhood/forum/editpost",method=RequestMethod.GET)
	public String editpost(Map<String, Object> reqMap);
	
	@RequestMapping(value="/oldneighborhood/forum/deletepost",method=RequestMethod.GET)
	public String deletepost(String f_ID);

	@RequestMapping(value="/oldneighborhood/forum/totalrows",method=RequestMethod.GET)
	public String totalrows();
	
	@RequestMapping(value="/oldneighborhood/forum/totalCollect",method=RequestMethod.GET)
	public int totalCollect(String f_ID);
	
	@RequestMapping(value="/oldneighborhood/forum/isCollect",method=RequestMethod.GET)
	public boolean isCollect(Map<String, Object> reqMap);
	
	@RequestMapping(value="/oldneighborhood/forum/newCollect",method=RequestMethod.GET)
	public boolean newCollect(Map<String, Object> reqMap);
	
	@RequestMapping(value="/oldneighborhood/forum/deleteCollect",method=RequestMethod.GET)
	public boolean deleteCollect(Map<String, Object> reqMap);
	
	@RequestMapping(value="/oldneighborhood/forum/postImg",method=RequestMethod.GET)
	public String postImg(Map<String, Object> reqMap);
}