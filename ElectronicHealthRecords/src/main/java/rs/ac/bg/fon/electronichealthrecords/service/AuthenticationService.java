package rs.ac.bg.fon.electronichealthrecords.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.electronichealthrecords.dto.DoctorDTO;
import rs.ac.bg.fon.electronichealthrecords.dto.LoginRequestDTO;
import rs.ac.bg.fon.electronichealthrecords.dto.LoginResponseDTO;
import rs.ac.bg.fon.electronichealthrecords.dto.PatientDTO;
import rs.ac.bg.fon.electronichealthrecords.dto.mappers.DoctorDTOMapper;
import rs.ac.bg.fon.electronichealthrecords.dto.mappers.PatientDTOMapper;
import rs.ac.bg.fon.electronichealthrecords.models.Doctor;
import rs.ac.bg.fon.electronichealthrecords.models.Patient;
import rs.ac.bg.fon.electronichealthrecords.models.Role;
import rs.ac.bg.fon.electronichealthrecords.repository.DoctorRepository;
import rs.ac.bg.fon.electronichealthrecords.repository.PatientRepository;
import rs.ac.bg.fon.electronichealthrecords.repository.RoleRepository;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class AuthenticationService {
    private final RoleRepository roleRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    private final PatientDTOMapper patientDTOMapper;
    private final DoctorDTOMapper doctorDTOMapper;

    public AuthenticationService(RoleRepository roleRepository, PasswordEncoder passwordEncoder, PatientRepository patientRepository, DoctorRepository doctorRepository, AuthenticationManager authenticationManager, TokenService tokenService, PatientDTOMapper patientDTOMapper, DoctorDTOMapper doctorDTOMapper) {
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.patientDTOMapper = patientDTOMapper;
        this.doctorDTOMapper = doctorDTOMapper;
    }

    public PatientDTO registerPatient(Patient patient) {
        Role patientRole = roleRepository.findByAuthority("PATIENT").get();
        Set<Role> authorities = new HashSet<>();
        authorities.add(patientRole);
        patient.setAuthorities(authorities);
        patient.setPassword(passwordEncoder.encode(patient.getPassword()));

        return patientDTOMapper.apply(patientRepository.save(patient));
    }

    public DoctorDTO registerDoctor(Doctor doctor) {
        Role doctorRole = roleRepository.findByAuthority("DOCTOR").get();
        Set<Role> authorities = new HashSet<>();
        authorities.add(doctorRole);
        doctor.setAuthorities(authorities);
        doctor.setPassword(passwordEncoder.encode(doctor.getPassword()));

        return doctorDTOMapper.apply(doctorRepository.save(doctor));
    }

    public PatientDTO registerAdmin(Patient admin) {
        Role patientRole = roleRepository.findByAuthority("ADMIN").get();
        Set<Role> authorities = new HashSet<>();
        authorities.add(patientRole);
        admin.setAuthorities(authorities);
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));

        return patientDTOMapper.apply(patientRepository.save(admin));
    }

    public LoginResponseDTO loginUser(LoginRequestDTO body) throws AuthenticationException, EntityNotFoundException{
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(body.username(), body.password())
        );

        String token = tokenService.generateJWT(auth);

        if (body.username().contains("@")) {
            return new LoginResponseDTO(doctorRepository.findByEmail(body.username()).orElseThrow(EntityNotFoundException::new), token);
        }
        return new LoginResponseDTO(patientRepository.findById(Long.parseLong(body.username())).orElseThrow(EntityNotFoundException::new), token);
    }

    public PatientDTO grantAdminAuthority(Long id) {
        Patient patient = patientRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        Role admin = roleRepository.findByAuthority("ADMIN").get();
        Set<Role> authorities = new HashSet<>();
        authorities.add(admin);
        patient.setAuthorities(authorities);
        return patientDTOMapper.apply(patientRepository.save(patient));
    }

    public PatientDTO revokeAdminRole(Long id) {
        Patient patient = patientRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        Role admin = roleRepository.findByAuthority("PATIENT").get();
        Set<Role> authorities = new HashSet<>();
        authorities.add(admin);
        patient.setAuthorities(authorities);
        return patientDTOMapper.apply(patientRepository.save(patient));
    }
}
