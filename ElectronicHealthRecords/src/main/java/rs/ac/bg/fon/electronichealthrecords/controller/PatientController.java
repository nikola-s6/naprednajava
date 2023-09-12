package rs.ac.bg.fon.electronichealthrecords.controller;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import rs.ac.bg.fon.electronichealthrecords.dto.PatientDTO;
import rs.ac.bg.fon.electronichealthrecords.dto.UpdatePatientRequestDTO;
import rs.ac.bg.fon.electronichealthrecords.service.PatientService;

@RestController
@RequestMapping("/api/v1/patient")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping("/{id}")
    public PatientDTO getPatient(@PathVariable("id") Long patientId) {
        try {
            return patientService.getPatient(patientId);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Patient not found!", e);
        }
    }

    @PutMapping()
    public PatientDTO update(@RequestBody UpdatePatientRequestDTO patient) {
        try {
            return patientService.update(patient);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Patient not found!", e);
        }
    }

}
