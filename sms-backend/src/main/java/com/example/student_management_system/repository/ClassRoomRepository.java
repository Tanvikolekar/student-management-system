package com.example.student_management_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.student_management_system.model.entity.ClassRoom;

@Repository
public interface ClassRoomRepository extends JpaRepository < ClassRoom , Integer> {
    
}
