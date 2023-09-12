package rs.ac.bg.fon.electronichealthrecords.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.electronichealthrecords.dto.PatientDTO;
import rs.ac.bg.fon.electronichealthrecords.dto.UpdatePatientRequestDTO;
import rs.ac.bg.fon.electronichealthrecords.dto.mappers.PatientDTOMapper;
import rs.ac.bg.fon.electronichealthrecords.models.Patient;
import rs.ac.bg.fon.electronichealthrecords.repository.PatientRepository;

import java.util.Optional;

@Service
public class PatientService {
    private final PatientRepository patientRepository;
    private final PatientDTOMapper patientDTOMapper;

    public PatientService(PatientRepository patientRepository, PatientDTOMapper patientDTOMapper) {
        this.patientRepository = patientRepository;
        this.patientDTOMapper = patientDTOMapper;
    }

    public PatientDTO getPatient(long patientId) {
        return patientDTOMapper.apply(
                patientRepository.findById(patientId)
                        .orElseThrow(EntityNotFoundException::new)
        );
    }

    public PatientDTO update(UpdatePatientRequestDTO patient) {
        Patient p = patientRepository.findById(patient.jmbg())
                .orElseThrow(EntityNotFoundException::new);

        p.setFirstName(patient.firstName());
        p.setLastName(patient.lastName());
        p.setEmail(patient.email());
        p.setGender(patient.gender());
        p.setPhoneNumber(patient.phoneNumber());
        p.setResidentialAddress(patient.residentialAddress());

        return patientDTOMapper.apply(
                patientRepository.save(p)
        );
    }
}
