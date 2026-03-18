package com.example.student_management_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.student_management_system.model.entity.Registration;

public interface RegistrationRepository extends JpaRepository<Registration,Long> {
    
}
