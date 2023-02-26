package com.DoConnect.services;




public interface EmailSenderService {
	
public String[] getAdminEmails();
	
	public String sendMailWhenQuestion(String msg);
	
	public String sendMailWhenAnswered(String msg);

}
