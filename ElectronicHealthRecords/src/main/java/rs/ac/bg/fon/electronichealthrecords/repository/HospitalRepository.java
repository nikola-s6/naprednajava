package rs.ac.bg.fon.electronichealthrecords.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.bg.fon.electronichealthrecords.models.Hospital;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Long> {
}
