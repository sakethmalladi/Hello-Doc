package com.springproject.hellodoc.repositories;

import com.springproject.hellodoc.models.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}