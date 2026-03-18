package com.example.student_management_system.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.student_management_system.model.entity.Teacher;
import com.example.student_management_system.repository.TeacherRepository;

@Service
public class TeacherService {
    @Autowired
    private TeacherRepository teacherRepository;

        public List<Teacher> getAll() {
        return teacherRepository.findAll();
    }

    public Teacher addTeacher(Teacher teacher){
        return teacherRepository.save(teacher);
    }

    public boolean removeTeacher(int id){
        teacherRepository.deleteById(id);
        return true;
    }

    public Teacher updateTeacher(int id , Teacher updatedTeacher){
        Optional <Teacher> existingTeacher = teacherRepository.findById(id);
        if(existingTeacher.isPresent()){
            Teacher teacher = existingTeacher.get();
            if(updatedTeacher.getFirst_name() != null) teacher.setFirst_name(updatedTeacher.getFirst_name());
            if(updatedTeacher.getLast_name() != null) teacher.setLast_name(updatedTeacher.getLast_name());
            if(updatedTeacher.getSubject() != null) teacher.setSubject(updatedTeacher.getSubject());
            if(updatedTeacher.getEmail() != null)teacher.setEmail(updatedTeacher.getEmail());
            if(updatedTeacher.getPhone() != null) teacher.setPhone(updatedTeacher.getPhone());
            return teacherRepository.save(teacher);
        } else {
            throw new RuntimeException("Student with id " + id + " not found");
        }
    }

}