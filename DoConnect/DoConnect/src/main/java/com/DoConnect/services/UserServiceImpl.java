package com.DoConnect.services;

import com.DoConnect.dto.SignupRequest;
import com.DoConnect.dto.UserDto;
import com.DoConnect.entities.User;
import com.DoConnect.repository.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepo userRepo;

   

    public UserDto createUser(SignupRequest signupRequest) {
        User user = new User(signupRequest.getEmail(), new BCryptPasswordEncoder().encode(signupRequest.getPassword()), signupRequest.getName(), 2);
        user = userRepo.save(user);
        if (user == null)
            return  null;

        return user.mapUsertoUserDto();
    }

    public Boolean hasUserWithEmail(String email) {
        return userRepo.findFirstByEmail(email) != null;
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    @Override
    public void createAdminAccount() {
        User adminAccount = userRepo.findByRole(1);
        if(null == adminAccount){
            User user = new User();
            user.setEmail("admin@gmail.com");
            user.setPassword(new BCryptPasswordEncoder().encode("admin"));
            user.setName("Admin");
            user.setRole(1);
            userRepo.save(user);
        }
    }
}
