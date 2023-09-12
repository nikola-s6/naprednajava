package rs.ac.bg.fon.electronichealthrecords.dto;

import java.util.Date;

public record EmploymentWODoctorDTO(
        Long id,
        Date date,
        HospitalWODoctorsDTO hospital
) {
}
