package rs.ac.bg.fon.electronichealthrecords.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.electronichealthrecords.models.Doctor;
import rs.ac.bg.fon.electronichealthrecords.repository.DoctorRepository;
import rs.ac.bg.fon.electronichealthrecords.repository.PatientRepository;

import java.util.Optional;

@Service
public class AppUserService implements UserDetailsService {

    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;

    public AppUserService(DoctorRepository doctorRepository, PatientRepository patientRepository) {
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        in case of patient username is jmbg, in case of doctor username is email
        if (username.contains("@")){
            Optional<Doctor> optionalDoctor = doctorRepository.findByEmail(username);
            if (optionalDoctor.isPresent()){
                return optionalDoctor.get();
            }
        }
        return patientRepository.findById(Long.parseLong(username)).orElseThrow(() -> new UsernameNotFoundException("User not found!"));
    }
}
