package com.example.student_management_system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.student_management_system.model.dto.AuthResponse;
import com.example.student_management_system.model.entity.User;
import com.example.student_management_system.services.UserService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody User user) {
        AuthResponse response = userService.register(user);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
public ResponseEntity<AuthResponse> login(@RequestBody User user) {
    AuthResponse response = userService.login(user);
    return ResponseEntity.ok(response);
}
}
