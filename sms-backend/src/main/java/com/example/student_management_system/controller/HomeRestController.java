package com.example.student_management_system.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.student_management_system.model.entity.Student;
import com.example.student_management_system.services.StudentService;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/student")
public class HomeRestController {

    @Autowired
    private StudentService studentService;

    @GetMapping("getall")
    public List <Student> getAllStudents(Student student){
        return studentService.getAll();
    }

    @PostMapping("add")
    public Student studentEntries(@RequestBody Student student) {
        return studentService.studentEntries(student);
    }
    
    @PostMapping("delete/{id}")
    public boolean removeStudent(@PathVariable int id) {
        studentService.removeStudent(id);
        return true;
    }
    
    @PutMapping("update/{id}")
    public Student updateStudent(@PathVariable int id , @RequestBody Student updatedStudent) {
        return studentService.updateStudent(id , updatedStudent);
    }

    
}
