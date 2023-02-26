package com.wipro.websocketdemo.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/main")
public class EmailController {
	
	@Autowired
	private EmailConfig emailConfig;
	
	@GetMapping("/info")
	public String getInfo() {
		return "blasdfkdsjkf";
	}
	
	@GetMapping("/send")
	public String sendEmail() {
	     return emailConfig.sendMail();
	}

}
