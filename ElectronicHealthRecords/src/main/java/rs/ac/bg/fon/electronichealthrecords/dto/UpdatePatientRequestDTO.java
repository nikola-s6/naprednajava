package rs.ac.bg.fon.electronichealthrecords.dto;

import rs.ac.bg.fon.electronichealthrecords.models.Gender;

public record UpdatePatientRequestDTO(
        Long jmbg,
        String firstName,
        String lastName,
        String email,
        Gender gender,
        String phoneNumber,
        String residentialAddress
) {
}
