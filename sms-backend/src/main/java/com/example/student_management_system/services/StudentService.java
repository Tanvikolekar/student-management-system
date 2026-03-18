package com.example.student_management_system.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.student_management_system.model.entity.Student;
import com.example.student_management_system.repository.StudentRepository;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public List <Student> getAll() {
        return studentRepository.findAll();
    }

    public Student studentEntries(Student student){
        return studentRepository.save(student);
    }
    
    public boolean removeStudent(int id){
        studentRepository.deleteById(id);
        return true;
    }

    public Student updateStudent(int id , Student updatedStudent){
        Optional <Student> existingStudent = studentRepository.findById(id);
        if(existingStudent.isPresent()){
            Student student = existingStudent.get();
            if(updatedStudent.getFirst_name() != null) student.setFirst_name(updatedStudent.getFirst_name());
            if(updatedStudent.getLast_name() != null) student.setLast_name(updatedStudent.getLast_name());
            if(updatedStudent.getAddress() != null) student.setAddress(updatedStudent.getAddress());
            if(updatedStudent.getEmail() != null) student.setEmail(updatedStudent.getEmail());
            if(updatedStudent.getPhone() != null) student.setPhone(updatedStudent.getPhone());
            if(updatedStudent.getGender() != null) student.setGender(updatedStudent.getGender());
            if(updatedStudent.getDob() != null) student.setDob(updatedStudent.getDob());
            return studentRepository.save(student);
        } else {
            throw new RuntimeException("Student with id " + id + " not found");
        }
    }
}
