package com.DoConnect.services;


import com.DoConnect.dto.AnswerDto;
import com.DoConnect.dto.QuestionDto;
import com.DoConnect.dto.QuestionSearchResponceDto;
import com.DoConnect.dto.SingleQuestionDto;
import com.DoConnect.responce.GeneralResponse;

import java.util.List;

public interface QuestionService {

    String addQuestion( QuestionDto questionDto);

    List<QuestionDto> getAllQuestions();

    SingleQuestionDto getQuestionById(Long id, Long userId);

    QuestionSearchResponceDto searchQuestionByTitle(String title, int pageNum);

    GeneralResponse addAnswer(AnswerDto answerDto);

}
