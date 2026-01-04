package com.springproject.hellodoc.controllers;
import com.springproject.hellodoc.models.*;
import com.springproject.hellodoc.repositories.*;
import com.springproject.hellodoc.services.ChatGPTService;
import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.*;

@Controller
public class ServicesController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.api.url}")
    private String apiUrl;

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @SuppressWarnings("unused")
    @Autowired
    private ChatGPTService chatGPTService;

    @GetMapping("/services")
    public String services(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String specialization,
            @RequestParam(required = false) Double userLatitude,
            @RequestParam(required = false) Double userLongitude,
            @RequestParam(required = false, defaultValue = "10") int miles,
            Model model) {

        List<Doctor> doctors;

        if (userLatitude != null && userLongitude != null) {
            doctors = doctorRepository.findByLocationAndSpecializationWithinMiles(userLatitude, userLongitude, miles, specialization);
        } else {
            doctors = doctorRepository.findByLocationAndSpecialization(location, specialization);
        }

        model.addAttribute("doctors", doctors);
        model.addAttribute("patients", patientRepository.findAll());
        return "services";
    }

    @PostMapping("/book-appointment")
    public String bookAppointment(
            @RequestParam Long doctorId,
            @RequestParam String patientName,
            @RequestParam int patientAge,
            @RequestParam String patientEmail,
            @RequestParam String patientPhone,
            @RequestParam String problemDescription,
            @RequestParam int appointmentDuration,
            @RequestParam String appointmentDate,
            @RequestParam String appointmentTime,
            Model model,
            RedirectAttributes redirectAttributes) {

        try {
            // Find Doctor
            Doctor doctor = doctorRepository.findById(doctorId)
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));

            // Find or Create Patient
            Patient patient = patientRepository.findByName(patientName).orElseGet(() -> {
                Patient newPatient = new Patient();
                newPatient.setName(patientName);
                newPatient.setAge(patientAge);
                newPatient.setEmail(patientEmail);
                newPatient.setPhone(patientPhone);
                return patientRepository.save(newPatient);
            });

            // Calculate Total Fee
            double totalFee = (Math.ceil(appointmentDuration / 30.0)) * doctor.getFeePer30Min();

            // Create Stripe PaymentIntent
            Stripe.apiKey = stripeApiKey; // Set Stripe API key

            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount((long) (totalFee * 100)) // Convert to cents
                    .setCurrency("usd")
                    .putAllMetadata(Map.of(
                            "doctorId", String.valueOf(doctorId),
                            "patientName", patientName,
                            "appointmentDate", appointmentDate,
                            "appointmentTime", appointmentTime
                    ))
                    .build();

            PaymentIntent intent = PaymentIntent.create(params);

            // Save appointment details temporarily to model
            model.addAttribute("doctor", doctor);
            model.addAttribute("patient", patient);
            model.addAttribute("appointmentDuration", appointmentDuration);
            model.addAttribute("appointmentDate", appointmentDate);
            model.addAttribute("appointmentTime", appointmentTime);
            model.addAttribute("clientSecret", intent.getClientSecret());

            return "payment"; // Redirect to payment page to complete payment
        } catch (Exception e) {
            e.printStackTrace();
            redirectAttributes.addFlashAttribute("error", "Failed to initiate payment. Please try again.");
            return "redirect:/services";
        }
    }

    @PostMapping("/confirm-payment")
    public String confirmPayment(
            @RequestParam String paymentIntentId,
            @RequestParam Long doctorId,
            @RequestParam String patientName,
            @RequestParam int patientAge,
            @RequestParam String patientEmail,
            @RequestParam String patientPhone,
            @RequestParam String appointmentDate,
            @RequestParam String appointmentTime,
            @RequestParam int appointmentDuration,
            RedirectAttributes redirectAttributes) {

        try {
            // Retrieve PaymentIntent to confirm payment status
            Stripe.apiKey = stripeApiKey;
            PaymentIntent intent = PaymentIntent.retrieve(paymentIntentId);

            if (!"succeeded".equals(intent.getStatus())) {
                throw new RuntimeException("Payment not successful");
            }

            // Save Appointment
            Doctor doctor = doctorRepository.findById(doctorId)
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));

            Patient patient = patientRepository.findByName(patientName).orElseGet(() -> {
                Patient newPatient = new Patient();
                newPatient.setName(patientName);
                newPatient.setAge(patientAge);
                newPatient.setEmail(patientEmail);
                newPatient.setPhone(patientPhone);
                return patientRepository.save(newPatient);
            });

            Appointment appointment = new Appointment();
            appointment.setDoctor(doctor);
            appointment.setPatient(patient);
            appointment.setDate(appointmentDate);
            appointment.setTime(appointmentTime);
            appointment.setDuration(appointmentDuration);
            appointment.setTotalFee((Math.ceil(appointmentDuration / 30.0)) * doctor.getFeePer30Min());
            appointmentRepository.save(appointment);

            redirectAttributes.addFlashAttribute("message", "Appointment booked successfully!");
            return "redirect:/services";
        } catch (Exception e) {
            e.printStackTrace();
            redirectAttributes.addFlashAttribute("error", "Failed to confirm payment. Please try again.");
            return "redirect:/services";
        }
    }
}
