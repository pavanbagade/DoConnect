package com.wipro.websocketdemo.mail;

import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;

import org.springframework.stereotype.Component;

import javax.activation.*;

@Component
public class EmailConfig {
	
	public String sendMail() {
		String to = "";//change accordingly
	      String from = "gopivishwakarma795@gmail.com";//change accordingly
	      String host = "smtp.gmail.com";//or IP address
	      
	     //Get the session object
	      Properties properties = System.getProperties();
	      properties.setProperty("mail.smtp.host", host);
	      //properties.setProperty("mail.host", "smtp.gmail.com"); 
	      properties.put("mail.smtp.auth", "true");  
	      properties.put("mail.smtp.port", "587");
	     // properties.put("mail.smtp.socketFactory.port", "465");  
	      properties.put("mail.smtp.socketFactory.class","javax.net.ssl.SSLSocketFactory");  
	      properties.put("mail.smtp.socketFactory.fallback", "false");
	      properties.put("spring.mail.username", "gopivishwakarma795@gmail.com");
	      properties.put("spring.mail.password", "gdhvekfoftakiyvb");
	      Session session = Session.getDefaultInstance(properties);

	     //compose the message
	      try{
	         MimeMessage message = new MimeMessage(session);
	         message.setFrom(new InternetAddress(from));
	         message.addRecipient(Message.RecipientType.TO,new InternetAddress(to));
	         message.setSubject("Hello there...");
	         message.setText("This is a test email by gopi...");
	         
	         

	         // Send message
	         Transport.send(message);
	        
	         System.out.println("message sent successfully...."+message.getSubject());

	      }catch (MessagingException mex) {mex.printStackTrace();}
	      
	      return "message sent successfully...";
	 }
	
	
}
