package rs.ac.bg.fon.electronichealthrecords.dto.mappers;

import org.springframework.stereotype.Service;
import rs.ac.bg.fon.electronichealthrecords.dto.HospitalWODoctorsDTO;
import rs.ac.bg.fon.electronichealthrecords.models.Hospital;

import java.util.function.Function;

@Service
public class HospitalWODoctorsDTOMapper implements Function<Hospital, HospitalWODoctorsDTO> {
    @Override
    public HospitalWODoctorsDTO apply(Hospital hospital) {
        return new HospitalWODoctorsDTO(
                hospital.getId(),
                hospital.getAddress(),
                hospital.getName()
        );
    }
}
