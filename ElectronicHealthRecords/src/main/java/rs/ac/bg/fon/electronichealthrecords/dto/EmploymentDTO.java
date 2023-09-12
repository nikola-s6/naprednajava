package rs.ac.bg.fon.electronichealthrecords.dto;

import rs.ac.bg.fon.electronichealthrecords.models.Hospital;

import java.util.Date;

public record EmploymentDTO(
        Long id,
        DoctorDTO doctor,
        Date date,
        HospitalWODoctorsDTO hospital
) {
}
