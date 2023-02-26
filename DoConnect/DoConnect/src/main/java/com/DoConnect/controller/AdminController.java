package com.DoConnect.controller;

import com.DoConnect.dto.AuthenticationRequest;
import com.DoConnect.dto.SignupRequest;
import com.DoConnect.dto.UserDto;
import com.DoConnect.responce.GeneralResponse;
import com.DoConnect.services.AdminService;
import com.DoConnect.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    AdminService adminService;

    @PostMapping({"/sign-up"})
    public ResponseEntity<?> signupAdmin(@RequestBody(required = true) @Valid SignupRequest signupRequest) {

        if (adminService.hasUserWithEmail(signupRequest.getEmail()))
            return new ResponseEntity<>("User already exists", HttpStatus.NOT_ACCEPTABLE);

        UserDto createdUser = adminService.createAdmin(signupRequest);
        if (createdUser == null)
            return new ResponseEntity<>("User not created, come again later", HttpStatus.NOT_ACCEPTABLE);

        return new ResponseEntity<>(createdUser, HttpStatus.OK);
    }

    @PostMapping("login")
    public GeneralResponse login(@RequestBody AuthenticationRequest authenticationRequest) {
        GeneralResponse response = new GeneralResponse();
        try {

            return adminService.login(authenticationRequest);
        } catch (Exception ex) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Sorry Something Wrong Happened.");
            return response;
        }
    }

    @GetMapping("allQuestions")
    public GeneralResponse getAllQuestion() {
        GeneralResponse response = new GeneralResponse();
        try {
            response.setData(adminService.getAllQuestions());
            response.setStatus(HttpStatus.OK);
            response.setMessage("Questions Fetched Successfully!!!");
            return response;
        } catch (Exception ex) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Sorry Something Wrong Happened.");
            return response;
        }
    }

    @GetMapping("allAnswers")
    public GeneralResponse getAllAnswers() {
        GeneralResponse response = new GeneralResponse();
        try {
            response.setData(adminService.getAllAnswers());
            response.setStatus(HttpStatus.OK);
            response.setMessage("Answers Fetched Successfully!!!");
            return response;
        } catch (Exception ex) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Sorry Something Wrong Happened.");
            return response;
        }
    }

    @PostMapping("approveAnswer/{id}")
    public GeneralResponse approveAnswer(@PathVariable Long id) {
        GeneralResponse response = new GeneralResponse();
        try {
            response.setData(adminService.approveAnswer(id));
            response.setStatus(HttpStatus.OK);
            response.setMessage("Questions Fetched Successfully!!!");
            return response;
        } catch (Exception ex) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Sorry Something Wrong Happened.");
            return response;
        }
    }

    @PostMapping("approveQuestion/{id}")
    public GeneralResponse approveQuestion(@PathVariable Long id) {
        GeneralResponse response = new GeneralResponse();
        try {
            response.setData(adminService.approveQuestion(id));
            response.setStatus(HttpStatus.OK);
            response.setMessage("Questions Fetched Successfully!!!");
            return response;
        } catch (Exception ex) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Sorry Something Wrong Happened.");
            return response;
        }
    }

    @DeleteMapping("{id}")
    public GeneralResponse deleteQuestion(@PathVariable Long id) {
        GeneralResponse response = new GeneralResponse();
        try {
            adminService.deleteQuestion(id);
            response.setStatus(HttpStatus.OK);
            response.setMessage("Questions Delete Successfully!!!");
            return response;
        } catch (Exception ex) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Sorry Something Wrong Happened.");
            return response;
        }
    }

    @DeleteMapping("answer/{id}")
    public GeneralResponse deleteAnswer(@PathVariable Long id) {
        GeneralResponse response = new GeneralResponse();
        try {
            adminService.deleteAnswer(id);
            response.setStatus(HttpStatus.OK);
            response.setMessage("Questions Delete Successfully!!!");
            return response;
        } catch (Exception ex) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Sorry Something Wrong Happened.");
            return response;
        }
    }
}
