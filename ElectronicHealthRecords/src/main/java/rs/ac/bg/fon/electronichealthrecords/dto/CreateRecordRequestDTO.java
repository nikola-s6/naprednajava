package rs.ac.bg.fon.electronichealthrecords.dto;

import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

public record CreateRecordRequestDTO(
        Long patientId,
        Long doctorId,
        Long hospitalId,
        String diagnosis,
        String treatment,
        String medication,
        String mediaDescription,
        List<MultipartFile> media
) {
}
