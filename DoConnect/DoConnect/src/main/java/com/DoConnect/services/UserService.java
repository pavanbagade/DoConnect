package com.DoConnect.services;


import com.DoConnect.dto.SignupRequest;
import com.DoConnect.dto.UserDto;

public interface UserService {

     void createAdminAccount();

     UserDto createUser(SignupRequest signupRequest);

     Boolean hasUserWithEmail(String email);
}
