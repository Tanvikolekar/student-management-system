package com.example.student_management_system.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.student_management_system.model.entity.ClassRoom;
import com.example.student_management_system.repository.ClassRoomRepository;


@Service
public class ClassRoomService {
    @Autowired
    private ClassRoomRepository classRoomRepository;
    

    public List <ClassRoom> getall(){
        return classRoomRepository.findAll();
    }

    public ClassRoom addClassRoom(ClassRoom classroom){
        return classRoomRepository.save(classroom);
    }

    public boolean removeClassroom(int id){
        classRoomRepository.deleteById(id);
        return true;
    }

    public ClassRoom updateClassRoom(int id , ClassRoom updatedClassroom){
        Optional<ClassRoom> existingCR = classRoomRepository.findById(id);
        if(existingCR.isPresent()){
            ClassRoom classRoom = existingCR.get();

            if(updatedClassroom.getClass_name() != null){
                classRoom.setClass_name(updatedClassroom.getClass_name());
            }
            if(updatedClassroom.getCourse() != null){
                classRoom.setCourse(updatedClassroom.getCourse());
            }
            return classRoomRepository.save(classRoom);
        }else {
            throw new RuntimeException("ClassRoom with id " + id + " not found");
        }
    }
}
