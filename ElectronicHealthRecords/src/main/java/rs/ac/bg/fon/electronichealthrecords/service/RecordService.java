package rs.ac.bg.fon.electronichealthrecords.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.electronichealthrecords.dto.CreateRecordRequestDTO;
import rs.ac.bg.fon.electronichealthrecords.dto.RecordsResponseDTO;
import rs.ac.bg.fon.electronichealthrecords.dto.mappers.PatientRecordsResponseDTOMapper;
import rs.ac.bg.fon.electronichealthrecords.models.Image;
import rs.ac.bg.fon.electronichealthrecords.models.Record;
import rs.ac.bg.fon.electronichealthrecords.repository.DoctorRepository;
import rs.ac.bg.fon.electronichealthrecords.repository.HospitalRepository;
import rs.ac.bg.fon.electronichealthrecords.repository.PatientRepository;
import rs.ac.bg.fon.electronichealthrecords.repository.RecordRepository;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecordService {

    private final ImageService imageService;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final HospitalRepository hospitalRepository;
    private final RecordRepository recordRepository;

    private final PatientRecordsResponseDTOMapper patientRecordsResponseDTOMapper;

    public RecordService(ImageService imageService, PatientRepository patientRepository, DoctorRepository doctorRepository, HospitalRepository hospitalRepository, RecordRepository recordRepository, PatientRecordsResponseDTOMapper patientRecordsResponseDTOMapper) {
        this.imageService = imageService;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.hospitalRepository = hospitalRepository;
        this.recordRepository = recordRepository;
        this.patientRecordsResponseDTOMapper = patientRecordsResponseDTOMapper;
    }

    public Record createRecord(CreateRecordRequestDTO record) throws IOException, URISyntaxException {
        Record rcrd = new Record();
        List<Image> images = new ArrayList<>();
        if(record.media() != null) {
            images = imageService.saveImages(record.media());
        }

        rcrd.setMedia(images);
        patientRepository.findById(record.patientId()).ifPresentOrElse(rcrd::setPatient, () -> {
            throw new EntityNotFoundException();
        });
        doctorRepository.findById(record.doctorId()).ifPresentOrElse(rcrd::setDoctor, () -> {
            throw new EntityNotFoundException();
        });
        hospitalRepository.findById(record.hospitalId()).ifPresentOrElse(rcrd::setHospital, () -> {
            throw new EntityNotFoundException();
        });
        rcrd.setDate(new Date());
        rcrd.setDiagnosis(record.diagnosis());
        rcrd.setTreatment(record.treatment());
        rcrd.setMedication(record.medication());
        rcrd.setMediaDescription(record.mediaDescription());
        return recordRepository.save(rcrd);
    }

    public List<RecordsResponseDTO> getPatientRecords(Long jmbg) {
        return recordRepository.findAllByPatientJmbg(jmbg).stream().map(patientRecordsResponseDTOMapper).collect(Collectors.toList());
    }
}
