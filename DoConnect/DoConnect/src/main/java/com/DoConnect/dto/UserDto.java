package com.DoConnect.dto;

public class UserDto {

    private Long id;
    private String email;
    private String name;
    private Integer role;

    public UserDto(Long id, String email, String name, Integer role) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.role = role;
    }

    public UserDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getRole() {
        return role;
    }

    public void setRole(Integer role) {
        this.role = role;
    }
}
