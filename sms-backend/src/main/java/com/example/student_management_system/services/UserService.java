package com.example.student_management_system.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.student_management_system.model.entity.User;
import com.example.student_management_system.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;


    public User register(User user){
        user.setPassword(encoder.encode(user.getPassword()));
        user.setUsername(user.getUsername());
        return userRepository.save(user);
    }

    public String login(User user){
        User existing = userRepository.findByUsername(user.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));

        if (encoder.matches(user.getPassword(), existing.getPassword())) {
            return "Login Successful";
        } else {
            throw new RuntimeException("Invalid Password");
        }
    }
}
