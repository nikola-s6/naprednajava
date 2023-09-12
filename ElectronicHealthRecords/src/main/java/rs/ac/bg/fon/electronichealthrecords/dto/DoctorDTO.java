package rs.ac.bg.fon.electronichealthrecords.dto;

import rs.ac.bg.fon.electronichealthrecords.models.DoctorSpecialization;
import rs.ac.bg.fon.electronichealthrecords.models.Gender;
import rs.ac.bg.fon.electronichealthrecords.models.Role;

import java.util.Set;

public record DoctorDTO(Long id, String firstName, String lastName, DoctorSpecialization specialization, String email, Gender gender, String phoneNumber, String residentialAddress, Set<Role> authorities) {
}
