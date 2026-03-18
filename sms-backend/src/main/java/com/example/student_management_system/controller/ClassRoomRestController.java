package com.example.student_management_system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.student_management_system.model.dto.ClassRoomRequest;
import com.example.student_management_system.model.entity.ClassRoom;
import com.example.student_management_system.model.entity.Course;
import com.example.student_management_system.model.entity.Teacher;
import com.example.student_management_system.repository.CourseRepository;
import com.example.student_management_system.services.ClassRoomService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;



@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/classroom")
public class ClassRoomRestController {
    @Autowired
    private ClassRoomService classRoomService;
    @Autowired
    private CourseRepository courseRepository;

    @GetMapping("getall")
    public List <ClassRoom> getall(){
        return classRoomService.getall();
    }

    @PostMapping("add")
    public ClassRoom add(@RequestBody ClassRoomRequest req){
        ClassRoom classroom = new ClassRoom();
        classroom.setClass_name(req.getClass_name());
        if(req.getCourse_id() != null){
            Course c = courseRepository.findById(req.getCourse_id()).orElse(null);
            classroom.setCourse(c);
        }
        return classRoomService.addClassRoom(classroom);
    }

    @DeleteMapping("delete/{id}")
    public boolean removeClassroom(@PathVariable int id){
        classRoomService.removeClassroom(id);
        return true;
    }

    @PutMapping("update/{id}")
    public ClassRoom updateClassRoom(@PathVariable int id , @RequestBody ClassRoomRequest req){
        ClassRoom classroom = new ClassRoom();
        classroom.setClass_name(req.getClass_name());
        if (req.getCourse_id() != null) {
            Course c = courseRepository.findById(req.getCourse_id()).orElse(null);
            classroom.setCourse(c);
        }
        return classRoomService.updateClassRoom(id,classroom);
    }
}
