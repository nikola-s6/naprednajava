package rs.ac.bg.fon.electronichealthrecords.controller;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import rs.ac.bg.fon.electronichealthrecords.dto.DoctorDTO;
import rs.ac.bg.fon.electronichealthrecords.dto.UpdateDoctorRequestDTO;
import rs.ac.bg.fon.electronichealthrecords.service.DoctorService;

@RestController
@RequestMapping("/api/v1/doctor")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @PutMapping()
    public DoctorDTO update(@RequestBody UpdateDoctorRequestDTO doctor){
        try {
            return doctorService.update(doctor);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Doctor not found!", e
            );
        }
    }

    @GetMapping("{id}")
    public DoctorDTO findById(@PathVariable("id") Long id){
        try {
            return doctorService.findById(id);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Doctor not found!", e
            );
        }
    }

}
