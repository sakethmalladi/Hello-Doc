package com.springproject.hellodoc.controllers;

import com.springproject.hellodoc.models.Doctor;
import com.springproject.hellodoc.repositories.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorRestController {

    @Autowired
    private DoctorRepository doctorRepository;

    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        List<Doctor> doctors = doctorRepository.findAll();
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
        Optional<Doctor> doctor = doctorRepository.findById(id);
        return doctor.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Doctor>> searchDoctors(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String specialization,
            @RequestParam(required = false) String location) {
        List<Doctor> doctors = doctorRepository.findAll();
        
        // Filter by search criteria
        if (name != null && !name.isEmpty()) {
            doctors = doctors.stream()
                    .filter(d -> d.getName() != null && d.getName().toLowerCase().contains(name.toLowerCase()))
                    .collect(Collectors.toList());
        }
        if (specialization != null && !specialization.isEmpty()) {
            doctors = doctors.stream()
                    .filter(d -> d.getSpecialization() != null && d.getSpecialization().toLowerCase().contains(specialization.toLowerCase()))
                    .collect(Collectors.toList());
        }
        if (location != null && !location.isEmpty()) {
            doctors = doctors.stream()
                    .filter(d -> d.getLocation() != null && d.getLocation().toLowerCase().contains(location.toLowerCase()))
                    .collect(Collectors.toList());
        }
        
        return ResponseEntity.ok(doctors);
    }
}

