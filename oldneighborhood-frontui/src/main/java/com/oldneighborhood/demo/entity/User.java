package com.oldneighborhood.demo.entity;

import java.io.Serializable;

public class User implements Serializable{
	private static final long serialVersionUID = 7103192432217445832L;
	
	private String user_ID;
	private String user_name;
	private String user_password;
	private String user_type;
	public User(String user_name, String user_password, String user_type) {
		super();
		this.user_name = user_name;
		this.user_password = user_password;
		this.user_type = user_type;
	}
	public String getUser_ID() {
		return user_ID;
	}
	public void setUser_ID(String user_ID) {
		this.user_ID = user_ID;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getUser_password() {
		return user_password;
	}
	public void setUser_password(String user_password) {
		this.user_password = user_password;
	}
	public String getUser_type() {
		return user_type;
	}
	public void setUser_type(String user_type) {
		this.user_type = user_type;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
