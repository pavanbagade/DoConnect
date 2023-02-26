package com.wipro.websocketdemo;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.boot.context.event.ApplicationReadyEvent;
//import org.springframework.context.event.EventListener;
//
//import com.example.websocketdemo.mail.EmailSenderService;

@SpringBootApplication
public class WebsocketDemoApplication {
	
	//@Autowired
//	private EmailSenderService emailSenderService;

	public static void main(String[] args) {
		SpringApplication.run(WebsocketDemoApplication.class, args);
		
		
	}
	
//	@EventListener(ApplicationReadyEvent.class)
//	public void send() {
//		System.err.println("inside");
//		emailSenderService.sendSimpleEmail(null, null, null);
//	}
}
