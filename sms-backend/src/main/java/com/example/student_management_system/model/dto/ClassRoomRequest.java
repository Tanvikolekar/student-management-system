package com.example.student_management_system.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ClassRoomRequest {
    private String class_name;
    private Integer course_id;
}
