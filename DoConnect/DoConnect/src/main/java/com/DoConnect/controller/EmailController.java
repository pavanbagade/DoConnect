package com.DoConnect.controller;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.DoConnect.dto.EmailMessage;
import com.DoConnect.services.EmailSenderService;

@RestController
public class EmailController {
	
	 private final EmailSenderService emailSenderService;

	    public EmailController(EmailSenderService emailSenderService) {
	        this.emailSenderService = emailSenderService;
	    }

	    @PostMapping("/send-email")
	    public EmailMessage sendEmail(@RequestBody EmailMessage emailMessage) {
			JavaMailSenderImpl mailSender=new JavaMailSenderImpl();
			mailSender.setHost("smtp.mailtrap.io");
			mailSender.setPort(587);
			mailSender.setUsername("0f9ec9928a4776");
			mailSender.setPassword("1e23e8076b0dfb");
	    	
			SimpleMailMessage mailMessage = new SimpleMailMessage();
			mailMessage.setFrom("pavanbagade28@gmail.com");
			mailMessage.setTo("pavanbagade28@gmail.com");
			mailMessage.setSubject("verify");
			mailMessage.setText("done");
			 
			mailSender.send(mailMessage);
			
			return emailMessage;
	        
	    }


}
