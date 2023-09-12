package rs.ac.bg.fon.electronichealthrecords.controller;

import org.springframework.web.bind.annotation.*;
import rs.ac.bg.fon.electronichealthrecords.models.Hospital;
import rs.ac.bg.fon.electronichealthrecords.service.HospitalService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/hospital")
public class HospitalController {

    private final HospitalService hospitalService;

    public HospitalController(HospitalService hospitalService) {
        this.hospitalService = hospitalService;
    }

    @PostMapping("/create")
    public Hospital createHospital(@RequestBody Hospital hospital){
        return hospitalService.createHospital(hospital);
    }

    @GetMapping("")
    public List<Hospital> getAll() {
        return hospitalService.getAll();
    }
}
