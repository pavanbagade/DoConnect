package com.DoConnect.services;

import com.DoConnect.dto.*;
import com.DoConnect.entities.Admin;
import com.DoConnect.entities.Answer;
import com.DoConnect.entities.Questions;
import com.DoConnect.entities.Status;
import com.DoConnect.entities.User;
import com.DoConnect.repository.AdminRepo;
import com.DoConnect.repository.AnswerRepo;
import com.DoConnect.repository.QuestionsRepo;
import com.DoConnect.repository.UserRepo;
import com.DoConnect.responce.GeneralResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AdminServiceImpl implements AdminService{

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private QuestionsRepo questionsRepo;

    @Autowired
    private AnswerRepo answerRepo;

    public UserDto createAdmin(SignupRequest signupRequest) {
        Admin admin = new Admin();
        admin.setEmail(signupRequest.getEmail());
        admin.setName(signupRequest.getName());
        admin.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));

        admin = adminRepo.save(admin);
        if (admin == null)
            return  null;

        return admin.mapAdmintoUserDto();
    }

    public Boolean hasUserWithEmail(String email) {
        return adminRepo.findFirstByEmail(email) != null;
    }

    @Override
    public GeneralResponse login(AuthenticationRequest authenticationRequest) {
        GeneralResponse generalResponse = new GeneralResponse();
        Optional<Admin> optionalAdmin = adminRepo.findByEmail(authenticationRequest.getUsername());
        if(optionalAdmin.isPresent()){
            if(new BCryptPasswordEncoder().matches(authenticationRequest.getPassword(),optionalAdmin.get().getPassword())){
                UserDto userDto = new UserDto();
                userDto.setId(optionalAdmin.get().getId());
                userDto.setRole(1);

                generalResponse.setStatus(HttpStatus.OK);
                generalResponse.setData(userDto);
            }
            else{
                generalResponse.setStatus(HttpStatus.NOT_ACCEPTABLE);
                generalResponse.setMessage("Password is not correct");
            }
        }
        else{
            generalResponse.setStatus(HttpStatus.NOT_ACCEPTABLE);
            generalResponse.setMessage("Admin Not Found");
        }
        return generalResponse;
    }

    @Override
    public List<QuestionDto> getAllQuestions() {
        List<QuestionDto> questionDtoList = new ArrayList<>();
        questionsRepo.findAllByStatus(Status.POSTED).forEach(questions -> {
            QuestionDto questionDto = questions.getDto();
            questionDto.setUserName(questions.getUser().getName());
            questionDtoList.add(questionDto);
        });
        return questionDtoList;
    }

    @Override
    public List<AnswerDto> getAllAnswers() {
        List<AnswerDto> answerDtoList = new ArrayList<>();
        answerRepo.findAllByStatus(Status.POSTED).forEach(answer -> {
            AnswerDto answerDto = answer.getDto();
            answerDto.setUser_id(answer.getUser().getId());
            answerDto.setUserName(answer.getUser().getName());
            answerDto.setReturnedImg(answer.getImg());

            answerDtoList.add(answerDto);

        });
        return answerDtoList;
    }

    @Override
    public GeneralResponse approveAnswer(Long id) {
        GeneralResponse response = new GeneralResponse();
        Optional<Answer> optionalAnswer = answerRepo.findById(id);
            if (optionalAnswer.isPresent()) {
                Answer answer = optionalAnswer.get();
                answer.setStatus(Status.APPROVED);
                answerRepo.save(answer);

                response.setMessage("Answer Approved Successfully");
                response.setStatus(HttpStatus.OK);
                return response;
            } else {
                response.setMessage("Answer Not Found");
                response.setStatus(HttpStatus.NOT_ACCEPTABLE);
                return response;
            }
    }

    @Override
    public GeneralResponse approveQuestion(Long id) {
        GeneralResponse response = new GeneralResponse();
        Optional<Questions> optionalQuestions = questionsRepo.findById(id);
        if (optionalQuestions.isPresent()) {
            Questions questions = optionalQuestions.get();
            questions.setStatus(Status.APPROVED);
            questionsRepo.save(questions);

            response.setMessage("Question Approved Successfully");
            response.setStatus(HttpStatus.OK);
            return response;
        } else {
            response.setMessage("Answer Not Found");
            response.setStatus(HttpStatus.NOT_ACCEPTABLE);
            return response;
        }

    }

    @Override
    public void deleteQuestion(Long id) {
        questionsRepo.deleteById(id);
    }

    @Override
    public void deleteAnswer(Long id) {
        answerRepo.deleteById(id);
    }
}
