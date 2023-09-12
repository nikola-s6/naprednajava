package rs.ac.bg.fon.electronichealthrecords.controller;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import rs.ac.bg.fon.electronichealthrecords.dto.DoctorDTO;
import rs.ac.bg.fon.electronichealthrecords.dto.LoginRequestDTO;
import rs.ac.bg.fon.electronichealthrecords.dto.LoginResponseDTO;
import rs.ac.bg.fon.electronichealthrecords.dto.PatientDTO;
import rs.ac.bg.fon.electronichealthrecords.models.Doctor;
import rs.ac.bg.fon.electronichealthrecords.models.Patient;
import rs.ac.bg.fon.electronichealthrecords.service.AuthenticationService;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {


    private final AuthenticationService authenticationService;


    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register/patient")
    public PatientDTO registerPatient(@RequestBody Patient patient){
        return authenticationService.registerPatient(patient);
    }

    @PostMapping("/register/doctor")
    public DoctorDTO registerDoctor(@RequestBody Doctor doctor){
        return authenticationService.registerDoctor(doctor);
    }

//    admin has same properties as patient, only difference is authority is set to ADMIN
    @PostMapping("/register/admin")
    public PatientDTO registerAdmin(@RequestBody Patient admin){
        return authenticationService.registerAdmin(admin);
    }

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO body){
        try {
            return authenticationService.loginUser(body);
        }catch (EntityNotFoundException | AuthenticationException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "User not found", e
            );
        }
    }

    @PostMapping("/patient/{id}/grant")
    public PatientDTO grantAdminAuthority(@PathVariable("id") Long id) {
        try {
            return authenticationService.grantAdminAuthority(id);
        }catch (EntityNotFoundException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "User not found", e
            );
        }
    }

    @PostMapping("/patient/{id}/revoke")
    public PatientDTO revokeAdminRole(@PathVariable("id") Long id) {
        try {
            return authenticationService.revokeAdminRole(id);
        }catch (EntityNotFoundException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "User not found", e
            );
        }
    }



}
