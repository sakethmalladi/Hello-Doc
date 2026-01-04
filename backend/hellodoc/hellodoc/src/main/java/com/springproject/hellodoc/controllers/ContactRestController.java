package com.springproject.hellodoc.controllers;

import com.springproject.hellodoc.models.ContactMessage;
import com.springproject.hellodoc.repositories.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactRestController {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @GetMapping
    public ResponseEntity<List<ContactMessage>> getAllMessages() {
        List<ContactMessage> messages = contactMessageRepository.findAll();
        return ResponseEntity.ok(messages);
    }

    @PostMapping
    public ResponseEntity<?> createContactMessage(@RequestBody Map<String, String> contactData) {
        try {
            ContactMessage message = new ContactMessage();
            message.setName(contactData.get("name"));
            message.setEmail(contactData.get("email"));
            // Use message field as subject if subject not provided, or default
            String subject = contactData.getOrDefault("subject", "General Inquiry");
            if (subject.isEmpty()) {
                subject = "General Inquiry";
            }
            message.setSubject(subject);
            message.setMessage(contactData.get("message"));

            ContactMessage savedMessage = contactMessageRepository.save(message);
            return ResponseEntity.ok(savedMessage);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving message: " + e.getMessage());
        }
    }
}

