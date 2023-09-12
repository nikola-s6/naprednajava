package rs.ac.bg.fon.electronichealthrecords.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.bg.fon.electronichealthrecords.models.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
}
