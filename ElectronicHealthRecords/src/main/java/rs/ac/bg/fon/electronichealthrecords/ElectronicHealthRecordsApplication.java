package rs.ac.bg.fon.electronichealthrecords;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import rs.ac.bg.fon.electronichealthrecords.models.Role;
import rs.ac.bg.fon.electronichealthrecords.repository.RoleRepository;


@SpringBootApplication
public class ElectronicHealthRecordsApplication {

    public static void main(String[] args) {
        SpringApplication.run(ElectronicHealthRecordsApplication.class, args);
    }

    @Bean
    CommandLineRunner run(RoleRepository roleRepository){
        return args -> {
            if(roleRepository.findByAuthority("ADMIN").isPresent()) return;
            roleRepository.save(new Role("ADMIN"));
            roleRepository.save(new Role("DOCTOR"));
            roleRepository.save(new Role("PATIENT"));
        };
    }

}
