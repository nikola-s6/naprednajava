package rs.ac.bg.fon.electronichealthrecords.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.electronichealthrecords.dto.EmploymentDTO;
import rs.ac.bg.fon.electronichealthrecords.dto.EmploymentWODoctorDTO;
import rs.ac.bg.fon.electronichealthrecords.dto.mappers.DoctorDTOMapper;
import rs.ac.bg.fon.electronichealthrecords.dto.mappers.HospitalWODoctorsDTOMapper;
import rs.ac.bg.fon.electronichealthrecords.models.Doctor;
import rs.ac.bg.fon.electronichealthrecords.models.Employment;
import rs.ac.bg.fon.electronichealthrecords.models.Hospital;
import rs.ac.bg.fon.electronichealthrecords.repository.DoctorRepository;
import rs.ac.bg.fon.electronichealthrecords.repository.EmploymentRepository;
import rs.ac.bg.fon.electronichealthrecords.repository.HospitalRepository;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmploymentService {

    private final EmploymentRepository employmentRepository;
    private final DoctorRepository doctorRepository;
    private final HospitalRepository hospitalRepository;
    private final DoctorDTOMapper doctorDTOMapper;
    private final HospitalWODoctorsDTOMapper hospitalWODoctorsDTOMapper;

    public EmploymentService(EmploymentRepository employmentRepository, DoctorRepository doctorRepository, HospitalRepository hospitalRepository, DoctorDTOMapper doctorDTOMapper, HospitalWODoctorsDTOMapper hospitalWODoctorsDTOMapper) {
        this.employmentRepository = employmentRepository;
        this.doctorRepository = doctorRepository;
        this.hospitalRepository = hospitalRepository;
        this.doctorDTOMapper = doctorDTOMapper;
        this.hospitalWODoctorsDTOMapper = hospitalWODoctorsDTOMapper;
    }

    public EmploymentDTO employ(Long doctorId, Long hospitalId) {
        Doctor doctor = doctorRepository.findById(doctorId).orElseThrow(EntityNotFoundException::new);
        Hospital hospital = hospitalRepository.findById(hospitalId).orElseThrow(EntityNotFoundException::new);

        Employment employment = new Employment();
        employment.setDoctor(doctor);
        employment.setHospital(hospital);
        employment.setSince(new Date());

        Employment save = employmentRepository.save(employment);

        return new EmploymentDTO(save.getId(), doctorDTOMapper.apply(save.getDoctor()), save.getSince(),  hospitalWODoctorsDTOMapper.apply(save.getHospital()));
    }

    public List<EmploymentWODoctorDTO> findAllDOctorEmployments(Long id) {
        if(!doctorRepository.existsById(id)) {
            throw new EntityNotFoundException();
        }
        return employmentRepository.findAllByDoctorId(id).stream().map(
                (employment -> new EmploymentWODoctorDTO(employment.getId(), employment.getSince(), hospitalWODoctorsDTOMapper.apply(employment.getHospital())))
        ).collect(Collectors.toList());
    }

    public void delete(Long id) {
        employmentRepository.deleteById(id);
    }
}
