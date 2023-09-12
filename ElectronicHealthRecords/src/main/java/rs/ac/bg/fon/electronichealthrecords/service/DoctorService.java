package rs.ac.bg.fon.electronichealthrecords.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.electronichealthrecords.dto.DoctorDTO;
import rs.ac.bg.fon.electronichealthrecords.dto.UpdateDoctorRequestDTO;
import rs.ac.bg.fon.electronichealthrecords.dto.mappers.DoctorDTOMapper;
import rs.ac.bg.fon.electronichealthrecords.models.Doctor;
import rs.ac.bg.fon.electronichealthrecords.repository.DoctorRepository;

import java.util.Optional;

@Service
public class DoctorService {
    private final DoctorRepository doctorRepository;
    private final DoctorDTOMapper doctorDTOMapper;

    public DoctorService(DoctorRepository doctorRepository, DoctorDTOMapper doctorDTOMapper) {
        this.doctorRepository = doctorRepository;
        this.doctorDTOMapper = doctorDTOMapper;
    }

    public DoctorDTO update(UpdateDoctorRequestDTO doctor) {
        Doctor doc = doctorRepository.findById(doctor.id()).orElseThrow(EntityNotFoundException::new);

        doc.setFirstName(doctor.firstName());
        doc.setLastName(doctor.lastName());
        doc.setSpecialization(doctor.specialization());
        doc.setEmail(doctor.email());
        doc.setGender(doctor.gender());
        doc.setPhoneNumber(doctor.phoneNumber());
        doc.setResidentialAddress(doctor.residentialAddress());

        Doctor save = doctorRepository.save(doc);

        return doctorDTOMapper.apply(save);
    }

    public DoctorDTO findById(Long id) {
        return doctorDTOMapper.apply(doctorRepository.findById(id).orElseThrow(EntityNotFoundException::new));
    }
}
