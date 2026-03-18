package com.example.student_management_system.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CourseRequest {
    private String course_name;
    private Integer teacher_id;
}
