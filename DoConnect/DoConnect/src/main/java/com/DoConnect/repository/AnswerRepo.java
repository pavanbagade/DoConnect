package com.DoConnect.repository;

import com.DoConnect.entities.Answer;
import com.DoConnect.entities.Status;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepo extends JpaRepository<Answer,Long> {

    List<Answer> findAllByStatus(Status status);
}
