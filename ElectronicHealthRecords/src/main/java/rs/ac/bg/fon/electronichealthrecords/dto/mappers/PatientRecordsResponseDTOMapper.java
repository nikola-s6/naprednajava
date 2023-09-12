package rs.ac.bg.fon.electronichealthrecords.dto.mappers;

import org.springframework.stereotype.Service;
import rs.ac.bg.fon.electronichealthrecords.dto.RecordsResponseDTO;
import rs.ac.bg.fon.electronichealthrecords.models.Record;

import java.util.function.Function;

@Service
public class PatientRecordsResponseDTOMapper implements Function<Record, RecordsResponseDTO> {

    private final DoctorDTOMapper doctorDTOMapper;
    private final HospitalWODoctorsDTOMapper hospitalWODoctorsDTOMapper;

    public PatientRecordsResponseDTOMapper(DoctorDTOMapper doctorDTOMapper, HospitalWODoctorsDTOMapper hospitalWODoctorsDTOMapper) {
        this.doctorDTOMapper = doctorDTOMapper;
        this.hospitalWODoctorsDTOMapper = hospitalWODoctorsDTOMapper;
    }

    @Override
    public RecordsResponseDTO apply(Record record) {
        return new RecordsResponseDTO(
                record.getId(),
                doctorDTOMapper.apply(record.getDoctor()),
                hospitalWODoctorsDTOMapper.apply(record.getHospital()),
                record.getDiagnosis(),
                record.getTreatment(),
                record.getMedication(),
                record.getDate(),
                record.getMediaDescription(),
                record.getMedia()
        );
    }
}
