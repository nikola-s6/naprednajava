package rs.ac.bg.fon.electronichealthrecords.controller;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import rs.ac.bg.fon.electronichealthrecords.dto.EmploymentDTO;
import rs.ac.bg.fon.electronichealthrecords.dto.EmploymentWODoctorDTO;
import rs.ac.bg.fon.electronichealthrecords.models.Employment;
import rs.ac.bg.fon.electronichealthrecords.service.EmploymentService;

import java.util.List;

@RestController
@RequestMapping("api/v1/employment")
public class EmploymentController {

    private final EmploymentService employmentService;

    public EmploymentController(EmploymentService employmentService) {
        this.employmentService = employmentService;
    }

    @PostMapping("/doctor/{doctorId}/hospital/{hospitalId}")
    public EmploymentDTO createEmployment(@PathVariable("doctorId") Long doctorId, @PathVariable("hospitalId") Long hospitalId) {
        try {
            return employmentService.employ(doctorId, hospitalId);
        }catch (EntityNotFoundException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Doctor not found!", e
            );
        }
    }

    @GetMapping("/doctor/{id}")
    public List<EmploymentWODoctorDTO> getDoctorsEmployments(@PathVariable("id") Long id) {
        try {
            return employmentService.findAllDOctorEmployments(id);
        }catch (EntityNotFoundException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Doctor not found!", e
            );
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        employmentService.delete(id);
    }
}
