package com.example.student_management_system.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.student_management_system.model.entity.Course;
import com.example.student_management_system.repository.CourseRepository;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository ;

    public List <Course> getall(){
        return courseRepository.findAll();
    }

    public Course addCourse(Course course){
        return courseRepository.save(course);
    }

    public boolean removeCourse(int id){
        courseRepository.deleteById(id);
        return true;
    }

    public Course update (int id , Course updatedCourse){
        Optional <Course> existingCourse = courseRepository.findById(id);
        if(existingCourse.isPresent()){
            Course course = existingCourse.get();

            if(updatedCourse.getCourse_name() != null){
                course.setCourse_name(updatedCourse.getCourse_name());
            }
            if(updatedCourse.getTeacher() != null){
                course.setTeacher(updatedCourse.getTeacher());
            }
            return courseRepository.save(course);
        }else {
            throw new RuntimeException("Course with id " + id + " not found");
        }
    }
}
