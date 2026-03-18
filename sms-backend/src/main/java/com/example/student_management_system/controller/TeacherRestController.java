package com.example.student_management_system.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.student_management_system.model.entity.Teacher;
import com.example.student_management_system.services.TeacherService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/teacher")
public class TeacherRestController {
    @Autowired
    private TeacherService teacherService;

    @GetMapping("/getall")
    public List<Teacher> getAllTeachers() {
        return teacherService.getAll();
    }

    @PostMapping("/add")
    public Teacher addTeacher(@RequestBody Teacher teacher){
        return teacherService.addTeacher(teacher);
    }

    @DeleteMapping("delete/{id}")
    public boolean removeTeacher(@PathVariable int id){
        teacherService.removeTeacher(id);
        return true;
    }

    @PutMapping("update/{id}")
    public Teacher putMethodName(@PathVariable int id, @RequestBody Teacher updadatedteacher) {
        return teacherService.updateTeacher(id, updadatedteacher);
    }


}
