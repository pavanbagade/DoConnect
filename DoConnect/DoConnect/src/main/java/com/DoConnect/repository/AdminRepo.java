package com.DoConnect.repository;

import com.DoConnect.entities.Admin;
import com.DoConnect.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepo extends JpaRepository<Admin, Long> {

    Admin findFirstByEmail(String email);

    Optional<Admin> findByEmail(String email);
}
