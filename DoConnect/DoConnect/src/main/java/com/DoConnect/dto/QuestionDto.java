package com.DoConnect.dto;

import java.util.Date;

import com.DoConnect.entities.Status;

public class QuestionDto {

    private  Long id;
    private String title;
    private String body;
    private Date createdDate;
    private Long user_id;
    private String userName;
    private Status status;

    private int voted;

    private boolean userAnswered = false;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }


    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }


    public int getVoted() {
        return voted;
    }

    public void setVoted(int voted) {
        this.voted = voted;
    }


    public boolean isUserAnswered() {
        return userAnswered;
    }

    public void setUserAnswered(boolean userAnswered) {
        this.userAnswered = userAnswered;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
