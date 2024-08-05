package com.springproject.hellodoc.repositories;

import com.springproject.hellodoc.models.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}