package com.springproject.hellodoc.controllers;

import com.springproject.hellodoc.models.Appointment;
import com.springproject.hellodoc.models.Doctor;
import com.springproject.hellodoc.models.Patient;
import com.springproject.hellodoc.repositories.AppointmentRepository;
import com.springproject.hellodoc.repositories.DoctorRepository;
import com.springproject.hellodoc.repositories.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.ui.Model;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class ServicesController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @GetMapping("/services")
    public String services(Model model) {
        model.addAttribute("doctors", doctorRepository.findAll());
        model.addAttribute("patients", patientRepository.findAll());
        return "services";
}


    @PostMapping("/book-appointment")
    public String bookAppointment(@RequestParam Long doctorId, @RequestParam Long patientId, @RequestParam String date, @RequestParam String time, Model model, RedirectAttributes redirectAttributes) {
        Doctor doctor = doctorRepository.findById(doctorId).orElseThrow(() -> new RuntimeException("Doctor not found"));
        Patient patient = patientRepository.findById(patientId).orElseThrow(() -> new RuntimeException("Patient not found"));

        Appointment appointment = new Appointment();
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setDate(date);
        appointment.setTime(time);
        appointmentRepository.save(appointment);

        redirectAttributes.addFlashAttribute("message", "Appointment successfully booked!");
        return "redirect:/services";
    }

    @PostMapping("/ask-question")
    public String askQuestion(@RequestParam String question, Model model) {
        // Call ChatGPT API and handle the response
        String answer = callChatGPT(question); // Example method
        model.addAttribute("answer", answer);
        return "services";
    }

    private String callChatGPT(String question) {
        // Implementation of calling ChatGPT API
        return "Example answer"; // Replace with actual response
    }
}
