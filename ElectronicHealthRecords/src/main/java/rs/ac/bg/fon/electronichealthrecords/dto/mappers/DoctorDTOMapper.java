package rs.ac.bg.fon.electronichealthrecords.dto.mappers;

import org.springframework.stereotype.Service;
import rs.ac.bg.fon.electronichealthrecords.dto.DoctorDTO;
import rs.ac.bg.fon.electronichealthrecords.models.Doctor;
import rs.ac.bg.fon.electronichealthrecords.models.Role;

import java.util.Set;
import java.util.function.Function;

@Service
public class DoctorDTOMapper implements Function<Doctor, DoctorDTO> {
    @Override
    public DoctorDTO apply(Doctor doctor) {
        return new DoctorDTO(
                doctor.getId(),
                doctor.getFirstName(),
                doctor.getLastName(),
                doctor.getSpecialization(),
                doctor.getEmail(),
                doctor.getGender(),
                doctor.getPhoneNumber(),
                doctor.getResidentialAddress(),
                (Set<Role>) doctor.getAuthorities()
        );
    }
}
