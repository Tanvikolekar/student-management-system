package com.example.student_management_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.student_management_system.model.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {

    java.util.Optional<User> findByUsername(String username);
    
}
