package com.DoConnect.services;

import com.DoConnect.dto.*;
import com.DoConnect.responce.GeneralResponse;

import java.util.List;

public interface AdminService {

    UserDto createAdmin(SignupRequest signupRequest);

    Boolean hasUserWithEmail(String email);

    GeneralResponse login(AuthenticationRequest authenticationRequest);

    List<QuestionDto> getAllQuestions();

    GeneralResponse approveAnswer(Long id);

    GeneralResponse approveQuestion(Long id);

    public void deleteQuestion(Long id);

    public void deleteAnswer(Long id);

    List<AnswerDto> getAllAnswers();
}
