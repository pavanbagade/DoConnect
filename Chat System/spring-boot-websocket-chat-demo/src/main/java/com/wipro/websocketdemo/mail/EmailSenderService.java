package com.wipro.websocketdemo.mail;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;

@Service
public class EmailSenderService {
    
	@Autowired
    private JavaMailSender mailSender;

    public void sendSimpleEmail(String toEmail,
                                String subject,
                                String body
    ) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("gopivishwakarma795@gmail.com");
        message.setTo("vishwakarmamayank621@gmail.com");
        message.setText("this is a demo messate from gopi...");
        message.setSubject("Hello There");
        mailSender.send(message);
        System.out.println("Mail Send...");


    }

    }

