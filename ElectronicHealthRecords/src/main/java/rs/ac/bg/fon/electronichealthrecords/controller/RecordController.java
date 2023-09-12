package rs.ac.bg.fon.electronichealthrecords.controller;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import rs.ac.bg.fon.electronichealthrecords.dto.CreateRecordRequestDTO;
import rs.ac.bg.fon.electronichealthrecords.dto.RecordsResponseDTO;
import rs.ac.bg.fon.electronichealthrecords.models.Record;
import rs.ac.bg.fon.electronichealthrecords.service.RecordService;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/record")
public class RecordController {
    private final RecordService recordService;

    public RecordController(RecordService recordService) {
        this.recordService = recordService;
    }


    @PostMapping("/create")
    public Record createRecord(@ModelAttribute CreateRecordRequestDTO record){
        System.out.println(record);
        try {
            return recordService.createRecord(record);
        }catch (EntityNotFoundException e) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Entity not found!", e);
        }catch (IOException | URISyntaxException e){
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Exception", e
            );
        }
    }

    @GetMapping("/patient/{jmbg}")
    public List<RecordsResponseDTO> getPatientRecords(@PathVariable("jmbg") Long jmbg) {
        return recordService.getPatientRecords(jmbg);
    }
}
