package com.DoConnect.dto;

import java.util.List;

public class SingleQuestionDto {

    private QuestionDto questionDto;

    private List<AnswerDto> answerDtoList;

    public QuestionDto getQuestionDto() {
        return questionDto;
    }

    public void setQuestionDto(QuestionDto questionDto) {
        this.questionDto = questionDto;
    }

    public List<AnswerDto> getAnswerDtoList() {
        return answerDtoList;
    }

    public void setAnswerDtoList(List<AnswerDto> answerDtoList) {
        this.answerDtoList = answerDtoList;
    }
}
