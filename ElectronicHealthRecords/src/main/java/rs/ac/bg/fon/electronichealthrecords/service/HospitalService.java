package rs.ac.bg.fon.electronichealthrecords.service;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.electronichealthrecords.models.Hospital;
import rs.ac.bg.fon.electronichealthrecords.repository.HospitalRepository;

import java.util.List;

@Service
public class HospitalService {
    private final HospitalRepository hospitalRepository;

    public HospitalService(HospitalRepository hospitalRepository) {
        this.hospitalRepository = hospitalRepository;
    }

    public Hospital createHospital(Hospital hospital) {
        return hospitalRepository.save(hospital);
    }

    public List<Hospital> getAll() {
        return hospitalRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }
}
