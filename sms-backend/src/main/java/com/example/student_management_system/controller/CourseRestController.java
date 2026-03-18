package com.example.student_management_system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.student_management_system.model.entity.Course;
import com.example.student_management_system.model.entity.Teacher;
import com.example.student_management_system.model.dto.CourseRequest;
import com.example.student_management_system.repository.TeacherRepository;
import com.example.student_management_system.services.CourseService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/course")
public class CourseRestController {
    @Autowired
    private CourseService courseService;
    @Autowired
    private TeacherRepository teacherRepository;

    @GetMapping("getall")
    public List <Course> getall() {
        return courseService.getall();
    }

    @PostMapping("add")
    public Course addCourse(@RequestBody CourseRequest req){
        Course course = new Course();
        course.setCourse_name(req.getCourse_name());
        if (req.getTeacher_id() != null) {
            Teacher t = teacherRepository.findById(req.getTeacher_id()).orElse(null);
            course.setTeacher(t);
        }
        return courseService.addCourse(course);
    }

    @DeleteMapping("delete/{id}")
    public boolean removeCourse(@PathVariable int id){
        courseService.removeCourse(id);
        return true;
    }
    
    @PutMapping("update/{id}")
    public Course putMethodName(@PathVariable int id, @RequestBody CourseRequest req){        
        Course course = new Course();
        course.setCourse_name(req.getCourse_name());
        if (req.getTeacher_id() != null) {
            Teacher t = teacherRepository.findById(req.getTeacher_id()).orElse(null);
            course.setTeacher(t);
        }
        return courseService.update(id, course);
    }
}
