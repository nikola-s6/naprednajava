package rs.ac.bg.fon.electronichealthrecords.dto.mappers;

import org.springframework.stereotype.Service;
import rs.ac.bg.fon.electronichealthrecords.dto.PatientDTO;
import rs.ac.bg.fon.electronichealthrecords.models.Patient;
import rs.ac.bg.fon.electronichealthrecords.models.Role;

import java.util.Set;
import java.util.function.Function;

@Service
public class PatientDTOMapper implements Function<Patient, PatientDTO> {
    @Override
    public PatientDTO apply(Patient patient) {
        return new PatientDTO(
                patient.getJmbg(),
                patient.getFirstName(),
                patient.getLastName(),
                patient.getEmail(),
                patient.getGender(),
                patient.getPhoneNumber(),
                patient.getResidentialAddress(),
                (Set<Role>) patient.getAuthorities()
        );
    }
}
