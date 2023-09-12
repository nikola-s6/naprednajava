package rs.ac.bg.fon.electronichealthrecords.dto;

import rs.ac.bg.fon.electronichealthrecords.models.Image;

import java.util.Date;
import java.util.List;

public record RecordsResponseDTO(
        Long id,
        DoctorDTO doctor,
        HospitalWODoctorsDTO hospital,
        String diagnosis,
        String treatment,
        String medication,
        Date date,
        String mediaDescription,
        List<Image> media
) {
}
