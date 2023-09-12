package rs.ac.bg.fon.electronichealthrecords.dto;

import org.springframework.security.core.userdetails.UserDetails;

public record LoginResponseDTO(UserDetails user, String jwt) {
}
