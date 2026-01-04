package com.springproject.hellodoc.controllers;

import com.springproject.hellodoc.models.Appointment;
import com.springproject.hellodoc.models.Doctor;
import com.springproject.hellodoc.models.Patient;
import com.springproject.hellodoc.repositories.AppointmentRepository;
import com.springproject.hellodoc.repositories.DoctorRepository;
import com.springproject.hellodoc.repositories.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentRestController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll();
        return ResponseEntity.ok(appointments);
    }

    @PostMapping
    public ResponseEntity<?> createAppointment(@RequestBody Map<String, Object> appointmentData) {
        try {
            Long doctorId = Long.parseLong(appointmentData.get("doctorId").toString());
            Optional<Doctor> doctorOpt = doctorRepository.findById(doctorId);
            
            if (doctorOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("Doctor not found");
            }

            Doctor doctor = doctorOpt.get();
            
            // Find or create patient
            String patientName = appointmentData.get("patientName").toString();
            String patientEmail = appointmentData.get("patientEmail").toString();
            String patientPhone = appointmentData.get("patientPhone").toString();
            
            Patient patient = patientRepository.findByName(patientName)
                    .orElseGet(() -> {
                        Patient newPatient = new Patient();
                        newPatient.setName(patientName);
                        newPatient.setEmail(patientEmail);
                        newPatient.setPhone(patientPhone);
                        newPatient.setAge(0); // Default age if not provided
                        if (appointmentData.containsKey("reason")) {
                            newPatient.setProblemDescription(appointmentData.get("reason").toString());
                        }
                        return patientRepository.save(newPatient);
                    });

            // Create appointment
            Appointment appointment = new Appointment();
            appointment.setDoctor(doctor);
            appointment.setPatient(patient);
            appointment.setDate(appointmentData.get("appointmentDate").toString());
            appointment.setTime(appointmentData.get("appointmentTime").toString());
            appointment.setDuration(30); // Default 30 minutes
            appointment.setTotalFee(doctor.getFeePer30Min());

            Appointment savedAppointment = appointmentRepository.save(appointment);
            return ResponseEntity.ok(savedAppointment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating appointment: " + e.getMessage());
        }
    }
}

