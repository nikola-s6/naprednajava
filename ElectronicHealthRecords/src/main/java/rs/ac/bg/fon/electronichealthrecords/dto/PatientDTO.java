package rs.ac.bg.fon.electronichealthrecords.dto;

import rs.ac.bg.fon.electronichealthrecords.models.Gender;
import rs.ac.bg.fon.electronichealthrecords.models.Role;

import java.util.Set;

public record PatientDTO(Long jmbg, String firstName, String lastName, String email, Gender gender, String phoneNumber, String residentialAddress, Set<Role> authorities) {
}
